import { useState } from "react"
import {Layout,Badge, Button, Col, Dropdown,theme,Typography} from "antd";
import Icon, {LoadingOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import { wrapperBaseComponent } from "../../Helpers";


const {Header} = Layout;
const HeaderVertical = (props) => {
   const [openModal,setOpenModal] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);

   const { location , navigate, hasLeftMenu, items} = props




   return (
      <Header
         className={isDashboard ? collapsed ? "horizontal_header" : 'horizontal_header_dashboard' : 'horizontal_header ' }
         style={{
               top: 0,
               position: 'sticky',
               zIndex: 100,
               paddingLeft: 0,
               paddingRight: 12,
               height: '4rem',
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               background: colorBgContainer
         }}
      />
   )
}



export default wrapperBaseComponent(HeaderVertical)