import { useContext, useState } from "react"
import {Badge, Button, Col, Dropdown, Layout, Row, theme, Typography} from "antd";
import Icon, {LoadingOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";
import { bell_fill } from "../../assets/svg_export";
import SpanText from "../../components/Generals/SpanText";

const {Header} = Layout;
const HeaderVertical = (props) => {
   const [openModal,setOpenModal] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);
   const {general,dateFormat} = useContext(ThemeContext)
   const {token: { colorBgContainer, colorIcon}} = theme.useToken()



   return (
      <Header
         className={'horizontal_header container'}
         style={{
               top: 0,
               position: 'sticky',
               zIndex: 100,
               height: '4rem',
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               background: colorBgContainer
         }}
      >
         <div className="mx-auto w-full">
         <Row className='row_header' justify='space-between' >
                <Col xl={8} lg={9} className={'flex items-center justify-center overflow-visible'}>
                    <Link to={'/'}>
                        <img src={general?.logo} height={28} width={150}/>
                    </Link>
                    <SpanText 
                        class_name={'time_now'}
                        text={dateFormat?.format('dddd, D/M/YYYY')}
                    /> 
                </Col>
                <Col xl={4} lg={2} className={'flex items-center justify-center'}>
                       tetasdasd
                </Col>

                <Col xl={3}
                     lg={5}
                     className={'pr-4 flex items-center justify-center'}
                >

                    <Dropdown
                        style={{minWidth: '21rem'}}
                        className='dropdown-notify ml-2 cursor_pointer'
                        menu={{
                            items: []
                        }}
                        trigger={['click']}
                    >
                        <Badge>
                            <Icon component={bell_fill} className='ant-icon-svg'/>
                        </Badge>
                    </Dropdown>


                    <Typography.Paragraph className='mx-2 mb-0 primary_color text-nowrap'>{general?.welcome}</Typography.Paragraph>
                    <Dropdown
                        className='dropdown-user'
                        menu={
                            ''
                        }
                        trigger={['click']}
                    >
                        <img src={''}
                             onClick={(e) => e.preventDefault()}
                             className='avatar'
                        />
                    </Dropdown>
                </Col>
            </Row>
         </div>
           
      </Header>


      
   )
}



export default HeaderVertical