import { Outlet } from 'react-router-dom'
import Header from './pages/Header/Header'
import LoggedInHeader from './pages/Header/LoggedInHeader'
import Footer from './pages/Footer';
// import { AuthRequired } from "./components/Auth/AuthRequired";
// import { AuthNotRequired } from "./components/Auth/AuthNotRequired";
function Layout() {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    console.log(isLoggedIn);
    return (
        <>
            {isLoggedIn && <LoggedInHeader />}
            {!isLoggedIn &&
                < Header />}
            < Outlet />
            <Footer />
        </>
    )
}

export default Layout