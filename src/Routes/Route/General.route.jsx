import React from "react";
import GeneralPaths from "../RoutePaths/GeneralPaths";
import HomePage from "../../Pages/HomePage";
import Error404 from "../../Pages/404";



const GeneralRoute = [
    // { path: GeneralPaths.HOMEPAGE, element: <HomePage /> },
    { path: GeneralPaths.NOTFOUND, element: <Error404 /> },
]

export default GeneralRoute