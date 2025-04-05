import React from "react";
import TabDataUserInfo from "../../Pages/Authencated/components/SidebarUser";
import HomePage from "../../Pages/HomePage";
import SlugForm from "../../Pages/SlugForm";
import GeneralPaths from "../RoutePaths/GeneralPaths";
import UserRouteWrapper from "../UserRouteWrapper";
const UserRoute = [
    { path: GeneralPaths.HOMEPAGE, element: <HomePage /> },
    { path: GeneralPaths.SLUG_DATA, element: <SlugForm /> },
    { 
        path: GeneralPaths.INFO_USER_DETAIL,
        element: (
            <UserRouteWrapper>
                <TabDataUserInfo type={'general'} />
            </UserRouteWrapper>
    )
 },
    // { path: GeneralPaths.POST_SAVED, element: <TabDataUserInfo type={'saved'} /> },
    // { path: GeneralPaths.POST_VIEWED, element: <TabDataUserInfo type={'viewed'} /> },
]

export default UserRoute