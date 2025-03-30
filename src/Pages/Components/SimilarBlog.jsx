import { Link } from "react-router-dom"

const SimilarBlog = ({data}) => {
   return ( 
        <div className="mb-[13px] pb-[13px] w-full flex" style={{ borderBottom : "1px solid #E5E5E5" }}>
            <div className="mr-[10px] relative w-[25%]">
                <Link to={data?.slug} className="pb-[60%] block overflow-hidden w-full bg-[#f4f4f4]">
                    <img className="object-cover w-full h-full absolute top-0 left-0 bottom-0 right-0" src={data?.imageURL} alt="" />
                </Link>
            </div>
            <div className="">
                <h2 className="text-[14px] font-weight-[400] mb-[4px]">
                    <Link to={data?.slug} className="text-[#222]">{data?.title}</Link>
                </h2>
                <p className="text-[14px] font-weight-[400] text-[#4f4f4f]">
                    <Link to={data?.slug} className="text-[#222]">
                        {data?.description}
                    </Link>
                </p>
            </div>
        </div>
   )
}


export default SimilarBlog