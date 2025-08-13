import { HomeOutlined, MenuOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import WrapMenuVertical from "./WrapMenuVertical";

const NavbarVertical = ({ categories }) => {
   const [openModal, setOpenModal] = useState(false);

   return (
      <section className="w-full bg-white sticky top-0" style={{ zIndex: 100 }}>
         <nav className="w-full text-[14px] border-b border-t border-[#E5E5E5] border-solid">
            <div className="mx-auto" style={{ maxWidth: 1440 }}>
               <ul className="px-[15px] mx-auto flex justify-center">
                  <li className="list_item py-[12px] home">
                     <Link to='/' className="icon">
                        <HomeOutlined className='icon-header' />
                     </Link>
                  </li>
                  {categories && categories?.length > 0 && categories.map((item, index) => {
                     let items = [];
                     item.children && item?.children?.length > 0 && item.children.map((val, key) => {
                        items.push({
                           key,
                           label: val.title,
                           value: val.slug
                        })
                     })

                     return (
                        <Dropdown
                           className="max-w-[180px]"
                           menu={{ items }}
                        >
                           <li className="list_item py-[12px] home">
                              <Link to={item.slug}>
                                 {item.title}
                              </Link>
                           </li>
                        </Dropdown>
                     )
                  })}
                  <li className="list_item py-[12px]">
                     <Link to='#' onClick={() => setOpenModal(true)}>
                        <MenuOutlined />
                     </Link>

                  </li>
               </ul>
            </div>
         </nav>

         <WrapMenuVertical
            categories={categories}
            openMenu={openModal}
            setOpenMenu={setOpenModal}
         />
      </section>


   )
}



export default NavbarVertical