import React from 'react';
import { BellOutlined, GlobalOutlined} from '@ant-design/icons';
import { Layout, Menu, theme, Col, Dropdown, Badge } from 'antd';
const { Header, Footer } = Layout;


const LayoutHorizontal = (props) => {
    const {notifies, items , avatar, logo} = props;
    const {
        token: { colorBgContainer, colorIcon },
    } = theme.useToken();
    

    return (
        <div id='vertical-layout'>
         <Header
             style={{
                 position: 'sticky',
                 top: 0,
                 zIndex: 1,
                 width: '100%',
                 display: 'flex',
                 justifyContent: 'space-between',
                 alignItems: 'center',
                 background: colorBgContainer,
                 height: '4rem'
             }}
             >
                <div
                     style={{
                         width: '100%',
                         display: 'flex',
                         alignItems: 'center',
                 }}>
 
                  <img src={logo} width={50} height={50} style={{marginRight: '1rem'}}/>
 
                 <Menu
                     mode="horizontal"
                     defaultSelectedKeys={['0']}
                     items={items2}
                     style={{
                         height: '100%',
                         flex: 1,
                         minWidth: 0,
                     }}
                 />
                </div>
                 <Col span={8}
                         style={{
                             display: 'flex',
                             justifyContent: 'end',
                             alignItems: 'center',
                             paddingRight: '1rem'
                         }}
                     >
 
                         <Dropdown
                             className='dropdown-language mr-1'
                             placement="bottomRight"
                             menu={{
                                 items: languages,
                             }}
                             trigger={['click']}
                         >
 
                             <GlobalOutlined  style={{fontSize: '20px', color: colorIcon}}  onClick={(e) => e.preventDefault()}/>
                         </Dropdown>
                             <Dropdown
                             style={{minWidth: '21rem'}}
                             className='dropdown-notify'
                             placement="bottomCenter"
                             menu={{
                                 items: notifies
                             }}
                             trigger={['click']}
                         >
 
                             <Badge count={12} style={{cursor: 'pointer'}}>
                                 <BellOutlined style={{fontSize: '22px', color: colorIcon}}/>
                             </Badge>
 
                         </Dropdown>
 
                         <div className='flex-center mr-1'>
                             <h5 style={{marginRight: '3px'}}>150</h5>
                             <img src={point} width={20}/>
                         </div>
 
                         <span className='mr-1'>Chào buổi sáng, asdasd</span>
                         <Dropdown
                             className='dropdown-user'
                             menu={{
                                 items,
                             }}
                             trigger={['click']}
                         >
 
                             <img src={avatar}
                                 onClick={(e) => e.preventDefault()}
                                 className='avatar'
                             />
 
                         </Dropdown>
                     </Col>
 
 
 
             </Header>
                 {children }
             <Footer
                 style={{
                     padding: ' 0 0 24px 0',
                     textAlign: 'center',
                 }}
             >
                 Ant Design ©{new Date().getFullYear()}test footer
             </Footer>
        </div>
   );
}



export default LayoutHorizontal