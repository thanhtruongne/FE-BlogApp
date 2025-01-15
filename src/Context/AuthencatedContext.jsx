import React, {createContext, useContext, useEffect, useState} from "react";
import {message} from "antd";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axiosInstance from "../utils/axios";
import { ThemeContext } from "./ThemeContext";
import { getAccessToken,getClientID } from "../utils/cookies";


import {
    DotChartOutlined, LogoutOutlined,
    SafetyCertificateOutlined,
    SettingOutlined,
    UserOutlined,
    UserSwitchOutlined
} from "@ant-design/icons";
import GeneralPaths from "../Routes/RoutePaths/GeneralPaths";
import AuthencationApi from "../ServicesAPI/Authencation.api";
import stausCode from "../utils/stausCode";

export const AuthenticatedContext = createContext();

const AuthenticatedProvider = ({children}) => {
    const [newNotifies, setNewNotifies] = useState({data: [], totalUnread: 0, type: null, loading: true})
    const [user, setUser] = useState({})
    const [dataMenu, setDataMenu] = useState([]);
    let location = useLocation()
    let navigate = useNavigate();
  
    const { general,setGeneral, widthScreen  } = useContext(ThemeContext)


    const getProfileUser = async() => {
        try {
            const response = await AuthencationApi.profile();
            if(response.data?.status == stausCode.OK) {
                const data = response?.data;
                setUser(data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let token = getAccessToken(),clientID = getClientID();
        if(!token || !clientID) {
            navigate(GeneralPaths.NOTFOUND)
        }
        getProfileUser();
    },[])



    return (
        <AuthenticatedContext.Provider
        value={{
            dataMenu, widthScreen, user, setUser,
            newNotifies, setNewNotifies
        }}
        >
            {children}
        </AuthenticatedContext.Provider>
    )



}


export default AuthenticatedProvider;