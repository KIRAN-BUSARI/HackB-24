import { Button } from '../components/Button';

function Signout() {

    const handleSignout = () => {
        localStorage.setItem("isLoggedIn", false)
        localStorage.setItem("accessToken", "")
        localStorage.setItem("role", "")
        window.location.reload()
    }
    return (
        <>
            <Button label="Sign out" onClick={handleSignout} />
        </>
    )
}

export default Signout