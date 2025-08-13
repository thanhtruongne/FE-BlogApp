import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { logout } from "../slices/auth";
import { clearClientID, clearTokens } from "../utils/cookies";
import GeneralPaths from "./RoutePaths/GeneralPaths";


const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch()
    const { isAuthenticated, isAdmin, accessToken, clientId } = useAuth();

    if (isAuthenticated || isAdmin || accessToken || clientId) {
        return children
    }
    else {
        dispatch(logout())
        clearTokens()
        clearClientID();
        return <Navigate to={GeneralPaths.NOTFOUND} replace />;
    }

}

export default PrivateRoute