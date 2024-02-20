import { useRecoilValue } from "recoil";

import { Navigate, Outlet } from "react-router-dom";
import { isLoggedInAtom } from "../../recoil/atoms/atom.js";

export const AuthNotRequired = () => {
    const isLoggedIn = useRecoilValue(isLoggedInAtom);
    return isLoggedIn ? <Navigate to={"/"} replace /> : <Outlet />;
};