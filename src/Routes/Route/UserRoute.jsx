import React from "react";
import HomePage from "../../Pages/HomePage";
import SlugForm from "../../Pages/SlugForm";
import GeneralPaths from "../RoutePaths/GeneralPaths";
const UserRoute = [
    { path: GeneralPaths.HOMEPAGE, element: <HomePage /> },
    { path: GeneralPaths.SLUG_DATA, element: <SlugForm /> },
]

export default UserRoute