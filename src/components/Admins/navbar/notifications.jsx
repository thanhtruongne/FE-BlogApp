import { Avatar, List } from 'antd';
import { Link } from 'react-router-dom';

export default function Notifications({ data }) {
    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
                <List.Item
                    className={`mt-2 rounded px-2 list-item-notify ${item.markAread ? 'item-mark-hover' : 'list-item-notify-markARead'}`}
                    key={item?.post_title}
                    extra={
                        <Link to={'/system/blog/form/' + item.postId?.id + "?markARead=" + item.id + "&view=viewComment"}>
                            <img
                                width={120}
                                alt="logo"
                                src={item?.postId?.imageURL || item?.post_image}
                            />
                        </Link>

                    }
                >
                    <Link to={'/system/blog/form/' + item.postId?.id + "?markARead=" + item.id + "&view=viewComment"} className="w-full">
                        <List.Item.Meta
                            avatar={<Avatar shape='circle' src={item?.userId?.imageURL} />}
                            title={
                                <div className="subject">{item.subject}</div>
                            }
                        />
                        {/* <span>{item.comment_nickname}</span> */}
                    </Link>
                </List.Item>
            )}
        />
    )
}

