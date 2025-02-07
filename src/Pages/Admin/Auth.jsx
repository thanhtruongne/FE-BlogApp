import { KeyOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { HttpStatusCode } from "axios";
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthencationApi from "../../apis/Authencation.api";
import { logoPNG } from "../../assets/svg_export";
import showMessage from "../../Helpers/showMessage";
import AdminPaths from "../../Routes/RoutePaths/AdminPaths";
import GeneralPaths from '../../Routes/RoutePaths/GeneralPaths';
import { getUserCurrent, login } from "../../slices/auth";
import { clearClientID, clearTokens, getAccessToken, getClientID } from "../../utils/cookies";



const  AuthLoginSystem = () => {
  const [loadingBtn,setLoadingBtn] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const navigate = useNavigate();


  useEffect(() => {
     try {
        const access = getAccessToken(),clientID = getClientID();
        if( access !== undefined && clientID !== undefined) {
          const decoded = jwtDecode(access);
          if(decoded?.userID == clientID) {
                navigate(GeneralPaths.NOTFOUND)
          }
          else { // phát hiện hacker dùng token để giả data
              clearClientID();
              clearTokens();
                navigate(GeneralPaths.NOTFOUND)
          }
        }
        if(isAuthenticated)  navigate(GeneralPaths.NOTFOUND)

     } catch (error) {
      console.log(error)
     }
    
  },[isAuthenticated,navigate])

  

  const handleLogin = async() => {
    setLoadingBtn(true);
    const values = await form.validateFields();
    if(values) {
       try {
        const res = await AuthencationApi.loginAdminSystem(values);
        console.log(res)
        if(res?.status != HttpStatusCode.Ok) {
          showMessage(res?.message, res?.status);
          setLoadingBtn(false);
          return;
        } else {
          showMessage(res?.message,'success');
          
          dispatch(login(res.data)) // set up tokens vào redux
          
          await dispatch(getUserCurrent()).unwrap() // fetch user profile
          navigate(AdminPaths.DASHBOARD);
        }

       } catch (error) {
          showMessage(error?.message,'error');
       } 
       setLoadingBtn(false)
    }
  }

  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        {/* <FixedPlugin /> */}
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%]  lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:min-h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                  <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
                     {/* Sign in section */}
                     <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                        <div className="w-full flex items-center justify-center">
                          <img src={logoPNG} className="object-cover max-w-[60%]" alt="" />
                        </div>
                       <div className="mb-6 flex items-center  gap-3">
                         <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                         <p className="text-base text-gray-600 dark:text-white">**</p>
                         <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                       </div>
                       {/* form */}
                       <Form
                        onFinish={handleLogin}
                        form={form}
                        id='new-login-form'
                        className='ant-form ant-form-horizontal'
                        autoComplete="off"
                        initialValues={{ 
                          system : true
                         }}
                       >
                       
                        <div className="account-login bg-[#e6e6e6] w-full rounded-[10px] flex items-center flex-col" style={{ padding:'24px 30px 28px' }}>

                       
                          <Form.Item
                              name='email'
                              rules={[
                                  {
                                      required: true,
                                      message: 'Email không được bỏ trống',
                                  },
                              ]}
                          >
                              <Input
    
                                  autoComplete="off"
                                  className='w-100 border-bottom'
                                  prefix={<UserOutlined />}
                              />
                          </Form.Item>

                          <Form.Item
                              // autoComplete="new-password"
                              name='password'
                              rules={[
                                  {
                                      required: true,
                                      message: 'Mật khẩu không được bỏ trống',
                                  },
                              ]}
                          >
                              <Input.Password

                                  autoComplete="off"
                                  prefix={<KeyOutlined />}
                                  className='w-100 border-bottom'
                                  // placeholder={'Password'}
                              />
                          </Form.Item>

                          <Form.Item
                          name='system'
                          >
                            <Input type="hidden" defaultValue={true}/>
                          </Form.Item>


                            <Button     
                                loading={loadingBtn}
                                className='text-uppercase mt-2'
                                type='primary'
                                icon={<LoginOutlined size='large' />}
                                htmlType='submit'
                              
                            >
                              Đăng nhập
                            </Button>
                        </div>
                       </Form>

                      
                     </div>
                   </div>
                    
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AuthLoginSystem
