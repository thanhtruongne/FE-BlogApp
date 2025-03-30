import { Tabs } from "antd";
import { AiFillNotification, AiOutlineComment, AiOutlineFundView } from "react-icons/ai";
import { useSelector } from "react-redux";
import CommentComponent from "./comment";
import Notifications from "./notification";
import ViewdNotify from "./viewed";


const tabNavNotifications = () => {
    const {isAuthenticated} = useSelector(state => state.auth)
    const items = [
        {
            label: <AiFillNotification />,
            key: 'notify',
            children: <Notifications  />,
        },
        {
            label: <AiOutlineComment />,
            key: 'viewed',
            children: <ViewdNotify  isAuthenticated={isAuthenticated}/>,
        },
        {
            label: <AiOutlineFundView />,
            key: 'comment',
            children:  <CommentComponent isAuthenticated={isAuthenticated} />,
        },
    ]

    return (
        <Tabs 
          size="large"
          centered 
          type="card"
          defaultActiveKey="notify"
          items={items}
          className="h-[427px] relative overflow-y-auto tabnav_custom"
        />
    )
}


export default tabNavNotifications