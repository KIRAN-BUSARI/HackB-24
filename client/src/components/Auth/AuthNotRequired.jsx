import { useRecoilValue } from "recoil";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../recoil/atom";

const AuthNotRequired = () => {
    const { isLoggedIn } = useRecoilValue(auth);
    return isLoggedIn ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default AuthNotRequired;
