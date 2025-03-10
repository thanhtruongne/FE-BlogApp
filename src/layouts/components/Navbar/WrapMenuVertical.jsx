import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";




const WrapMenuVertical = ({categories,openMenu,setOpenMenu}) => {
    const style_hidden = openMenu ? {top: "calc(100% - 3) !important",visibility: 'visible', opacity: 1} : {top: "-100% !important",visibility: 'hidden', opacity: 0};

   return (
     <section className='wrap-all-menu' style={style_hidden} >
        <div className="" style={{ height : '100vh' }}>
        <div className="container">
            <div className="header_menu flex justify-between items-center">
                <span class="text-[18px] text-[#4f4f4f] inline-block font-bold" style={{ fontFamily : "Merriweather" }}>Tất cả chuyên mục</span>   
                <div className="text-[#076db6] cursor-pointer text-right" onClick={() => setOpenMenu(false)}>
                     Đóng
                     <CloseOutlined className="ml-2" />
                </div>
            </div>
            <div className="content py-[15px] w-full">
                <div className="w-full" style={{ height : 133 }}>
                    <div className="w-full h-full relative">
                        <div className="relative h-full p-0" style={{ width : "calc(100% + 17px)"  }}>
                            <div className="wrap-menu flex flex-wrap">
                                 {categories && categories?.length > 0 && categories.map((item,key) => {
                                    return (
                                        <div className="w-[150px] mb-[30px] text-[14px] mr-3" style={{ flex: '1 1 150px' }}>
                                            <div className="text-[#9f224e] text-[16px] font-bold" >
                                                <Link to={item.slug}>{item.title}</Link>
                                            </div>
                                            {item.children && item.children?.length > 0 && item.children.map((val,index) => {
                                                return (
                                                    <div>
                                                        <Link className='py-[8px] inline-block' to={val.slug}>{val.title}</Link>
                                                    </div>
                                                )
                                            })} 
                                           {/* {item.children && item.children?.length > 2 && (
                                                <li className="view-more" onClick={handleHidden}>
                                                    Xem thêm
                                                </li>
                                           )} */}
                                        </div> 
                                    )
                                 })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
     </section>

      
   )
}



export default WrapMenuVertical