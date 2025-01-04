import { Layout } from "antd"
import { useContext } from "react"
import headerVertical from "./components/headerVertical"
import { Outlet } from "react-router-dom"


const LayoutWithHeader = () => {
    // const {  items } = useContext(AuthenticatedContext)
    window.title = Lang.get('laother.title_project')
    return(
        <Layout id='authenticate-layout' style={{ position: 'relative' }}>
            <headerVertical
                hasLeftMenu={false}
                items={items}
            />
            <div className='p-2'>
                <Outlet/>
            </div>

        </Layout>
    )
}

export default LayoutWithHeader