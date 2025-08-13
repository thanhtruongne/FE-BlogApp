import { CommentOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


const MostViewdTemplate = (props) => {
    const { data, handleClickCommentBlog } = props

    return (
        <div className="side_bar_viewed">
            <div className="wrapper_viewed ">
                <div className="sticky top-[70px] w-full">
                    <div className="overflow-hidden mb-[20px] w-full transform_viewed">
                        <div className="title-box-category">
                            <Link className="inner-title inline-block relative">
                                Xem nhiều
                            </Link>
                        </div>
                        {data && data.length > 0 && data?.map((temp, key) => {
                            return (
                                <article className="pb-[16px] mb-[16px] w-full flex" style={{ borderBottom: '1px solid #E5E5E5' }}>
                                    <div className="w-[50%] mr-[10px] relative  ">
                                        <Link to={temp.slug} className="thumb pb-[60%] mr-2">
                                            <img src={temp.imageURL} className="object-cover w-full h-full absolute top-0 left-0 bottom-0 right-0" alt="" />
                                        </Link>
                                    </div>
                                    <div className="mb-0 text-[14px] w-full">
                                        <Link to={temp.slug}>
                                            {temp.title}
                                        </Link>
                                        <span className="meta-news ml-2 cursor-pointer">
                                            <span onClick={() => handleClickCommentBlog(temp?.slug)} className="count_cmt">
                                                <CommentOutlined />
                                                <span>121</span>
                                            </span>
                                        </span>
                                    </div>
                                </article>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div >
    )
}

export default MostViewdTemplate;