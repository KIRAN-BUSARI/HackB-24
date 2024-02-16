import { toast } from "react-hot-toast"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axiosInstance from "../axiosInstance"
import zod from "zod";
export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [signinData, setSigninData] = useState({
    //     email: "",
    //     password: ""
    // })
    const navigate = useNavigate();
    // const handleUserInput = (event) => {
    //     const { name, value } = event.target;
    //     setSigninData({
    //         ...signinData,
    //         [name]: value,
    //     });
    // };
    // const handleSignin = (event) => {
    //     event.preventDefault();

    //     const signinSchema = zod.object({
    //         email: zod.string().email(),
    //         password: zod.string().min(8).max(20).trim(),
    //     })
    //     const validSchema = signinSchema.safeParse(signinData)
    //     if (!validSchema.success) {
    //         toast.error("All fields are required")
    //     }
    //     signinData.password = "kiran@123#";
    //     const validPassword = signinData.password.trim().length > 8 || 16
    //     console.log(validPassword);
    //     if (!validPassword) {
    //         toast.error("Password is required")
    //     }
    // }
    return (
        <div className="bg-slate-300 h-[90vh] flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox onChange={(e) => { setEmail(e.target.value) }} placeholder="kiran@gmail.com" label={"Email"} />
                    {/* <div className="text-left">
                        <label className="text-sm font-medium text-left py-2">Email</label>
                    </div>
                    <input type="email" onChange={handleUserInput} placeholder="kiran@gmail.com" value={signinData.email} className="w-full px-2 py-1 border rounded border-slate-200" /> */}
                    <InputBox onChange={(e) => { setPassword(e.target.value) }} placeholder="123456" label={"Password"} />
                    {/* <div className="text-left">
                        <label htmlFor="password" className="text-sm font-medium text-left py-2">Password</label>
                    </div>
                    <input type="password" onChange={handleUserInput} placeholder="123456" value={signinData.password} className="w-full px-2 py-1 border rounded border-slate-200" /> */}
                    <div className="pt-4">
                        <Button onClick={async () => {
                            let res = axiosInstance.post("/users/signin", {
                                email,
                                password
                            })
                            toast.promise(res, {
                                loading: "Logging in...",
                                success: "Logged in successfully",
                                error: "Could not log in"
                            })
                            res = await res;
                            localStorage.setItem("accessToken", res.data.accessToken)
                            navigate("/")
                        }} label={"Sign in"} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    )
}