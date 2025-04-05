import { Layout, Popover } from "antd";
import moment from "moment";
import 'moment/locale/vi';
import { useState } from "react";
import { MdAccountCircle, MdNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import SpanText from "../../components/Generals/SpanText";
import ModalLogin from "../../Pages/Authencated/components/ModalLogin";
import tabNavNotifications from "./Notifications/components/tabNav";
import TabUserProvide from "./TabUserProvide";
moment.locale('vi')




const {Header} = Layout;
const HeaderVertical = (props) => {
   const {dispatch,navigate,logo,currentUser,isAuthenticated} = props;
   const [isScrolled, setIsScrolled] = useState(false);
   const [openNotify , setOpenNotify] = useState(false)
   const [showLoginModal, setShowLoginModal] = useState(false);
   return (
      <Header
         className={'horizontal_header'}
         style={{
               top: 0,
               position: 'relative',
               zIndex: 100,
               height: '4rem',
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               background: '#fff'
         }}
      >
         <div className="mx-auto w-full container">
            <div className='flex justify-between items-center' style={{ height : 60, }} >
              <div className="flex items-center w-[45%]">              
                    <div className="">
                        <Link to={'/'}>
                            <img 
                            // src={logo} 
                            src='https://s1.vnecdn.net/vnexpress/restruct/i/v9559/v2_2019/pc/graphics/logo.svg'
                            // className="w-full h-full"
                            height={28} width={150}
                            />
                        </Link>
                    </div>
                    
                    <SpanText 
                        class_name={'time_now'} 
                        text={moment().format('dddd, D/M/YYYY')}
                    /> 
              </div>

              <div className="flex items-center w-[55%]">   
                     <Link to='#' className="span_custom ml-8">
                        Mới nhất
                     </Link>
                     <Link to='#' className="span_custom ml-8">
                        Tin theo khu vực
                     </Link>
                <div className="ml-8">
                  {isAuthenticated && currentUser ? (
                     <TabUserProvide user={currentUser}/>
                   
                  ) :  (
                     <>
                        <div className="flex items-center span_custom cursor-pointer" onClick={() => setShowLoginModal(!showLoginModal)}>
                              <MdAccountCircle />
                              <span className="ml-2">Đăng nhập</span>
                        </div>
                        <ModalLogin 
                           isOpen={showLoginModal}
                           setOpenModal={setShowLoginModal}
                           dispatch={dispatch} 
                           navigate={navigate} 
                        />
                     </>
                  )}
                </div>
                <div className="ml-4 pr-4">
                    <div className="flex items-center span_custom cursor-pointer">
                        <Popover
                              placement="bottom"
                              content={tabNavNotifications}
                              trigger="click"
                              open={openNotify}
                              className="ant-tabs-tab-width"
                              onOpenChange={(open) => setOpenNotify(open)}
                        >
                              <MdNotifications className="span_custom" />
                        </Popover>
                    </div>
                </div>
              </div>
              
            </div>
         </div>

       
           
      </Header>


      
   )
}



export default HeaderVertical