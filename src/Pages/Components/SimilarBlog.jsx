import { CommentOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const SimilarBlog = (props) => {
    const { data, handleClickCommentBlog } = props
    return (
        <div className="mb-[13px] pb-[13px] w-full flex" style={{ borderBottom: "1px solid #E5E5E5" }}>
            <div className="mr-[10px] relative w-[25%]">
                <Link to={data?.slug} className="pb-[60%] block overflow-hidden w-full bg-[#f4f4f4]">
                    <img className="object-cover w-full h-full absolute top-0 left-0 bottom-0 right-0" src={data?.imageURL} alt="" />
                </Link>
            </div>
            <div className="">
                <h2 className="text-[14px] font-weight-[400] mb-[4px]">
                    <strong><Link to={data?.slug} className="text-[#222]">{data?.title}</Link></strong>
                </h2>
                <p className="text-[12px]  text-[#4f4f4f]">
                    <Link to={data?.slug} className="text-[#222]">
                        {data?.description}
                    </Link>
                    {data.comments && data.comments.length > 0 && (
                        <Link target="__blank" className="ml-2 cursor-pointer" onClick={() => handleClickCommentBlog(data?.slug)}>
                            <CommentOutlined size="6" />
                            <span className="text-[#076db6] text-[12px]">{data.comments.length}</span>
                        </Link>

                    )}
                </p>
            </div>



        </div>
    )
}


export default SimilarBlog