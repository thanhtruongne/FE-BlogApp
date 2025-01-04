import { useLocation,useNavigate } from "react-router-dom";


const wrapperBaseComponent = (Component) => (props) => {
    const location = useLocation();
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    return <Component {...props} location={location} navigate={navigate}/>
}


export {
    wrapperBaseComponent
}