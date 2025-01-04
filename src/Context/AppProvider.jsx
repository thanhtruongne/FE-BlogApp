import React, { useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import vi from 'antd/locale/vi_VN';
import { ThemeContext } from "./ThemeContext.jsx";

const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [general, setGeneral] = useState({ logo: '', welcome: '', permissions: [] })
    const [disabledBtnActivity, setDisableBtnActivity] = useState(true)
    const [antdTheme, setAntdTheme] = useState(0)
    const [widthScreen, setWidthScreen] = useState(window.innerWidth);

    const lightTheme = {
        components: {
            Table: {
                borderRadius: 0,
                boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
                colorTextHeading: '#000000',
                headerBg: '#ddd',
                cellPaddingBlock: 8,
                algorithm: true,
            },
            Input: {
                colorPrimary: 'transparent',
                boxShadow: '1px transparent',
            },
            Radio: {
                colorPrimary: 'var(--background-btn)', // Màu chính của Radio
                colorPrimaryHover: 'var(--background-btn-hover)', // Màu khi hover
            }
        },
        token: {
            layoutBg: '#f5f5f5',
            lightGrayBg: '#ececec',
            lightGrayBgActive: '#dadada',
            screenLGMax: 1499,
            screenXL: 1500,
            screenXLMin: 1500
        }
    };

    useEffect(() => {
        window.onresize = () => {
            setWidthScreen(window.innerWidth)
        }
    }, [])



    return (
        <ThemeContext.Provider value={{
            loading, setLoading, general, setGeneral, setAntdTheme, widthScreen,
            disabledBtnActivity, setDisableBtnActivity
        }}>
            <ConfigProvider theme={nightMode > 0 ? darkTheme : lightTheme} locale={vi}>
                <div className={nightMode > 0 ? 'night-mode-layout' : 'light-mode-layout'}>
                    {children}
                </div>
            </ConfigProvider>
        </ThemeContext.Provider>
    );
}



export default AppProvider