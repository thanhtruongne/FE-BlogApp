import { Layout } from 'antd';
import { MenuButton, ScrollPage } from '../components/Generals/general_export';
import LayoutHorizontal from "./LayoutTypes/layoutHorizon";


const UserLayouts = () => { 
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
        items={''}
        items2={''}
        avatar={''}
        dateNow={dateFormat?.format('dddd, D/M/YYYY')}
        logo={general?.logo}
        />
        
    </Layout>
    )
}



export default UserLayouts;