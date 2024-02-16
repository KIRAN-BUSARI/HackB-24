import { useRecoilValue } from "recoil";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "../../recoil/atom";

const AuthRequired = ({ allowedRoles }) => {
    const { isLoggedIn, role } = useRecoilValue(auth);
    const location = useLocation();

    return isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (
        <Outlet />
    ) : isLoggedIn ? (
        <Navigate to={"/denied"} state={{ from: location }} replace />
    ) : (
        <Navigate to={"/login"} state={{ from: location }} replace />
    );
};

export default AuthRequired;
