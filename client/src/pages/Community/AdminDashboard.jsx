import { Button } from "../../components/Button"
import { useNavigate } from 'react-router-dom'
function AdminDashboard() {
    const navigate = useNavigate();
    return (
        <>
            <div className="h-[90vh] mx-auto w-full max-w-7xl flex flex-col justify-center items-center text-4xl text-orange-600">
                Admin Dashboard
                <Button label={"Add Community"} onClick={async () => {
                    navigate(`/addCommunity`)
                }} />
            </div>
        </>
    )
}

export default AdminDashboard