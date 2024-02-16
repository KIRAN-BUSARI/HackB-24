import { useState } from "react"
import zod from "zod";
import { toast } from "react-hot-toast"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../axiosInstance"

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  // const [signupData, setSignupData] = useState({
  //   username: "",
  //   email: "",
  //   password: ""
  // })
  const navigate = useNavigate();

  // const handleUserInput = (event) => {
  //   const { name, value } = event.target;
  //   setSignupData({
  //     ...signupData,
  //     [name]: value,
  //   });
  // };

  // const createNewAccount = async (event) => {
  //   event.preventDefault()

  //   const signinSchema = zod.object({
  //     username: zod.string().min(3).max(20).trim(),
  //     email: zod.string().email(),
  //     password: zod.string().min(8).max(20).trim(),
  //   })
  //   const validSchema = signinSchema.safeParse(signupData)

  //   if (!validSchema.success) {
  //     toast.error("All fields are required")
  //   }
  //   signupData.password = "kiran@123#";
  //   const validPassword = signupData.password.trim().length > 8 || 16
  //   console.log(validPassword);
  //   if (!validPassword) {
  //     toast.error("Password is required")
  //   }
  // }


  return <div className="bg-slate-300 h-[90vh] flex justify-center">
    <div className="flex flex-col justify-center">
      {/* <form onSubmit={createNewAccount}> */}
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(e) => { setUsername(e.target.value) }} placeholder="John" label={"username"} />
        <InputBox onChange={(e) => { setemail(e.target.value) }} placeholder="john@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => { setPassword(e.target.value) }} placeholder="12345678" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            let response = axiosInstance.post("/users/signup", {
              // username: signupData.username,
              // email: signupData.email,
              // password: signupData.password
              username,
              email,
              password
            })
            toast.promise(response, {
              loading: "Creating account...",
              success: "Account created successfully",
              error: "Could not create account"
            })
            response = await response
            navigate("/")
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
      {/* </form> */}
    </div>
  </div>
}

export default Signup