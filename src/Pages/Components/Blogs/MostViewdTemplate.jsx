import { CommentOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


const MostViewdTemplate = ({data}) => {
    return (
        <div className="w-full relative top-0 h-auto " style={{ maxWidth : "355px",padding : "20px 0 0 55px" }}>
        <div className="mb-[20px] w-full relative flex-auto">
            <div className="sticky top-[70px]">
                <div className="overflow-hidden mb-[20px] w-full" style={{ transform : 'translate3d(0px, 0px, 0px)',opacity : '1' }}>
                    <div className="title_option_blog relative text-[18px] font-bold text-[#222] w-full" style={{ lineHeight : '1.6' }}>
                        <Link className="inline-block relative title-box">
                           Xem nhiều
                        </Link>
                    </div>
                    {data?.similarBlog && data?.similarBlog.length > 3 && data?.similarBlog?.map((temp,key) => {
                        if(key  >=  3) {
                            return (
                            <article className="pb-[16px] mb-[16px] w-full" style={{ borderBottom : '1px solid #E5E5E5'}}>
                                <div className="w-[110px] mr-[10px] relative">
                                    <Link to={temp.slug} className="thumb pb=[60%]">
                                        <img src={temp.imageURL} className="object-cover w-full h-full absolute top-0 left-0 bottom-0 right-0" alt="" />
                                    </Link>
                                </div>
                                <div className="mb-0 text-[14px]" style={{ lineHeight : "160%" }}>
                                    <Link to={temp.slug}>
                                        {temp.title}
                                    </Link>
                                    <span className="meta-news">
                                        <a href="" className="count_cmt">
                                            <CommentOutlined /> 
                                            <span>121</span>
                                        </a>
                                    </span>
                                </div>
                            </article>
                            )
                        };                                 
                    })}
                   
                </div>
            </div>
        </div>
    </div>
    )
}

export default MostViewdTemplate;