import toast from "react-hot-toast"
import axiosInstance from "../axiosInstance"
import Card from "./Community/Card"
import { useState, useEffect } from "react"
function Home() {
    const [username, setUsername] = useState("")
    useEffect(() => {
        axiosInstance.get("/users/getUser")
            .then(res => {
                console.log(res.data.data)
                setUsername(res.data.data.username);
            })
    }, [])
    return (
        <div className="h-[10vh] justify-center items-center flex text-5xl">
            {/* <Card />
            Home */}
            {username}
        </div>
    )
}

export default Home