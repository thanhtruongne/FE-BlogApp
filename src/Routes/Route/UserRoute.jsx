import Error404 from "../../Pages/404";
import TabDataUserInfo from "../../Pages/Authencated/components/SidebarUser";
import DynamicRouter from "../../Pages/DynamicRouter";
import HomePage from "../../Pages/HomePage";
import GeneralPaths from "../RoutePaths/GeneralPaths";
import UserRouteWrapper from "../UserRouteWrapper";
const UserRoute = [
    {
        path: GeneralPaths.INFO_USER_DETAIL,
        element: (
            <UserRouteWrapper>
                <TabDataUserInfo type={'general'} />
            </UserRouteWrapper>
        )
    },
    { path: GeneralPaths.HOMEPAGE, element: <HomePage /> },
    { path: GeneralPaths.SLUG_DATA, element: <DynamicRouter /> },
    { path: GeneralPaths.NOTFOUND, element: <Error404 /> },

]

export default UserRoute