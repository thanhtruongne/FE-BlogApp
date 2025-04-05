import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderVertical from '../components/headerVertical';
import NavbarVertical from '../components/Navbar/NavbarVertical';
const LayoutHorizontal = (props) => {
    const {general,categories,dispatch,navigate,isAuthenticated,currentUser} = props;
    const {logo , setting} = general;
        
        return (
        <div id='vertical-layout'>
            <HeaderVertical
                logo={logo}
                dispatch={dispatch}
                navigate={navigate}
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}
            />
            <NavbarVertical 
               categories={categories}
            />
            <Layout>
                <Layout
                    className=''
                    style={{
                        transition: 'all .4s',
                        backgroundColor : "#fff"
                    }}
                >
                    <Outlet className=''/>
                </Layout>
            </Layout>

            <Footer />

        </div>
        
   );
}



export default LayoutHorizontal