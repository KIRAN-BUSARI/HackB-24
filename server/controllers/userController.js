import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import zod from "zod";
import jwt from "jsonwebtoken";

const cookieOptions = {
    secure: process.env.NODE_ENV === 'development' ? true : false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true
}

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const registerSchema = zod.object({
        email: zod.string().email(),
        username: zod.string().min(3).max(20).trim(),
        password: zod.string().min(8).max(20).trim(),
    })


    // const { email, username, password,  } = registerSchema.safeParse(req.body) /* Not Works */
    const { email, username, password } = registerSchema.parse(req.body)
    // const { email, username, password,  } = req.body

    if (
        // [email, username, password, ].some((field) => field?.trim() === "")
        !email, !username, !password
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    const token = await user.generateAccessToken();

    user.password = undefined;

    res.cookie('token', token, cookieOptions);

    res.clearCookie('token', cookieOptions);

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

const loginUser = asyncHandler(async (req, res) => {
    const loginSchema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8).max(20).trim()
    })

    const { email, password } = req.body;

    const loginValidation = loginSchema.safeParse(req.body);

    if (!loginValidation.success) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({
        email
    }).select("+password") // Password is not available by default so we need to specify by default

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(400, "Password is incorrect")
    }

    user.save();

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    // console.log(loggedInUser);

    if (!loggedInUser) {
        throw new ApiError(500, "Something went wrong while logging in the user")
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )
    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged Out Successfully"))
})

const changePassword = asyncHandler(async (req, res) => {
    const changePasswordSchema = zod.object({
        oldPassword: zod.string().min(8).max(20).trim(),
        newPassword: zod.string().min(8).max(20).trim(),
        confirmNewPassword: zod.string().min(8).max(20).trim()
    })

    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const changePasswordValidation = changePasswordSchema.safeParse(req.body);

    if (!changePasswordValidation.success) {
        throw new ApiError(400, "All fields are Required")
    }

    if (newPassword !== confirmNewPassword) {
        throw new ApiError(400, "Password does not match")
    }

    const { refreshToken } = req.cookies;
    // console.log(refreshToken);
    if (!refreshToken) {
        throw new ApiError(404, "Signin to access this route")
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!decoded) {
        throw new ApiError(404, "User does not exist")
    }

    const userId = decoded?._id;
    // console.log(userId);

    const user = await User.findById(userId).select("+password");

    // console.log(user);
    // console.log(oldPassword);
    const isPasswordValid = await user.comparePassword(oldPassword);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid Password")
    }

    if (newPassword === oldPassword) {
        throw new ApiError(400, "New Password cannot be same as old password")
    }
    user.password = newPassword;

    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Password Changed Successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        throw new ApiError(404, "Signin to access this route")
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!decoded) {
        throw new ApiError(404, "User does not exist")
    }

    const userId = decoded?._id;

    const user = await User.findById(userId);

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User Fetched Successfully"))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    getCurrentUser
}