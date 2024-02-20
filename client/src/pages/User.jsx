import { useEffect, useState } from 'react'
import axiosInstance from '../Helper/axiosInstance'

export const User = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    useEffect(() => {
        axiosInstance.get("/users/getUser")
            .then(res => {
                console.log(res.data.data)
                setUsername(res.data.data.username);
                setEmail(res.data.data.email)
                setRole(res.data.data.role)
            })
    }, [])
    return (
        <div className='h-[90vh] flex flex-col justify-center items-center bg-slate-950 gap-3'>
            <div className="text-4xl text-white">
                <span className='text-3xl text-slate-300'>Username: </span>{username}
            </div>
            <div className="text-3xl text-slate-400">
                <span className='text-slate-300 text-2xl'>Email :</span> {email}
            </div>
            <div className="text-3xl text-slate-300">
                Role: {role}
            </div>
        </div>
    )
}