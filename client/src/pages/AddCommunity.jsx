import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import axiosInstance from '../axiosInstance'
import toast from 'react-hot-toast'
import { useState } from 'react'

function AddCommunity() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    return (
        <div className='h-[90vh] flex justify-center items-center'>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-5xl text-gray-50 font-medium pl-10">Add Community</h1>
                <InputBox label={"Community title"} onChange={(e) => setTitle(e.target.value)} placeholder={"Title"} />
                <InputBox label={"Community Description"} onChange={(e) => setDescription(e.target.value)} placeholder={"Descriptioin"} />
                <Button label={"Add Community"} onClick={async () => {
                    axiosInstance.post("/community/createCommunity", {
                        title,
                        description
                    })
                }} />
            </div>
        </div>
    )
}

export default AddCommunity