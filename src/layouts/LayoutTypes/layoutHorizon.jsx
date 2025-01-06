import React from 'react';
import { Layout, Menu, theme, Col, Dropdown, Badge } from 'antd';
const { Header, Footer } = Layout;
import {SpanText} from '../../components/Generals/general_export';
import HeaderVertical from '../components/headerVertical';
import { Outlet } from 'react-router-dom';

const LayoutHorizontal = (props) => {
    const {notifies, items ,avatar ,dateNow, logo} = props;
    const {
        token: { colorBgContainer, colorIcon },
    } = theme.useToken();
    return (
        <div id='vertical-layout'>
            <HeaderVertical
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