import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderVertical from '../components/headerVertical';
import NavbarVertical from '../components/Navbar/NavbarVertical';
const { Header, Footer } = Layout;
const LayoutHorizontal = ({className,general,categories}) => {
     const {logo , setting} = general;
     


    return (
        <div id='vertical-layout'>
            <HeaderVertical
                logo={logo}
            />
            <NavbarVertical 
               categories={categories}
            />
            <Layout className={'bg-white container'}>
                <Layout
                    className='pt-5 bg-white'
                    style={{
                        transition: 'all .4s'
                    }}
                >
                    <Outlet className='h-100'/>
                </Layout>
            </Layout>

        </div>
        
   );
}



export default LayoutHorizontal