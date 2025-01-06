import Icon from '@ant-design/icons';
import {Layout, Tooltip} from 'antd';
import LayoutHorizontal from "./LayoutTypes/layoutHorizon";
import { useContext } from "react";
import { ThemeContext } from '../Context/ThemeContext';
import { ScrollPage,MenuButton } from '../components/Generals/general_export';
import HomePage from '../Pages/HomePage';


const UserLayouts = () => {
    const {items , dataMenu, general,dateFormat} = useContext(ThemeContext)
    
    return (
        <Layout id='authenticate-layout' className='bg-white' style={{ position: 'relative' }}>
        <div style={{ position: "relative" }}>
            <div
                style={{
                    position: "fixed",
                    top: "94vh",
                    right: "0",
                    transform: "translateX(0px)",
                    zIndex: "3",
                }}>

                <MenuButton />
            </div>
            <div style={{position:"relative"}} >
                <div
                    style={{
                        position: "fixed",
                        top: "94vh",
                        right: "0",
                        transform: "translateY(72px)",
                        zIndex: "3",
                    }}
                >
                    <ScrollPage/>
                </div>
            </div>
        </div>
        {/* horizon */}
       <LayoutHorizontal 
        className='horizontal'
        items={items}
        items2={dataMenu}
        avatar={''}
        dateNow={dateFormat?.format('dddd, D/M/YYYY')}
        logo={general?.logo}
        />
        
    </Layout>
    )
}



export default UserLayouts;