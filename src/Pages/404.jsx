import React from "react";
import AdminPaths from "../Routes/RoutePaths/AdminPaths";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons"
import GeneralPaths from "../Routes/RoutePaths/GeneralPaths";

const Error404 = () => {

    const navigate = useNavigate();

    const handleRedirect = () => {
       return navigate(GeneralPaths.HOMEPAGE)
    }


    return (
        <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div class="mx-auto max-w-screen-sm text-center">
                    <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                    <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Có lỗi đã xảy ra.</p>
                    <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Vui lòng chờ hoặc phản hồi qua hệ thống.</p>
                    <Button 
                      onClick={handleRedirect}
                      className='text-uppercase mt-2'
                      type='primary'
                      icon={<LoginOutlined size='large' />}
                    >
                        Quay về
                    </Button>
                </div>   
            </div>
        </section>
    )
}

export default Error404