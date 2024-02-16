import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Index = () => {
    const [Roomcode, setRoomcode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (ev) => {
        ev.preventDefault()
        navigate(`/room/${Roomcode}`);
    }
    return (
        <div className="h-[90vh] flex justify-center items-center">
            <div className="h-[30vh] w-[30vw] border bg-slate-500 rounded-lg p-5">
                <form onSubmit={handleSubmit} className="block">
                    <div className="">
                        <label className="text-left flex text-3xl text-white p-2">Enter Room Code: </label>
                        <input type="text" value={Roomcode} onChange={(e) => setRoomcode(e.target.value)} required placeholder="Enter your room code" className="w-full rounded-lg px-2 py-3 bg-slate-800 text-white" />
                        <button type="submit" className="bg-white p-2 m-2 rounded-xl text-blue-500 font-bold">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Index;