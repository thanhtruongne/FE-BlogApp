import { Layout } from 'antd';
import { HttpStatusCode } from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GeneralApi from '../apis/General.api';
// import '../assets/sass/client.css';
import { useNavigate } from 'react-router-dom';
import { MenuButton, ScrollPage } from '../components/Generals/general_export';
import useAuth from '../hook/useAuth';
import { getCategory } from '../slices/category';
import { setGeneral } from '../slices/generalSlice';
import LayoutHorizontal from "./LayoutTypes/layoutHorizon";

const UserLayouts = () => { 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const general = useSelector((state) => state.general); 
    const {categories} = useSelector(state => state.category);
    const {isAuthenticated,currentUser} = useAuth();
    const fetchDataSetting = async() => {
         try {
            await GeneralApi.getDataLayout()
            .then(res =>{
                if(res.status == HttpStatusCode.Ok) {
                    dispatch(setGeneral(res.data[0]))
                }
            })
         } catch (error) {
            console.log(error,'Error')
         }
    }

    const fetchDataCategoryTree = async() => {
        try {
            await GeneralApi.getCategoryNavbar()
            .then(res => {
                if(res.status == HttpStatusCode.Ok) {
                    dispatch(getCategory(res.data))
                }
            })
        } catch (error) {
            console.log(error,'Error')
        }
    }


    useEffect(() => {
        if(!general) {
            fetchDataSetting()
        }
        if(!categories) {
            fetchDataCategoryTree()
        }
    },[dispatch])
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
            general={general}
            categories={categories}
            dispatch={dispatch}
            navigate={navigate}
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
        />
        
    </Layout>
    )
}



export default UserLayouts;