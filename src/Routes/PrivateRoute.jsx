import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../slices/auth";
import { clearClientID, clearTokens, getAccessToken, getClientID } from "../utils/cookies";
import GeneralPaths from "./RoutePaths/GeneralPaths";



const PrivateRoute = ({children}) => {
    const dispatch = useDispatch()
    const {isAuthenticated , isAdmin} = useSelector((state) => state.auth);

    const accessToken = getAccessToken();
    const clientID = getClientID();

    if(isAuthenticated && isAdmin && accessToken && clientID) 
        return children

    if(isAuthenticated) {
        dispatch(logout())
        clearTokens()
        clearClientID();
    }
    return <Navigate to={GeneralPaths.NOTFOUND}  replace/>;

}

export default PrivateRoute