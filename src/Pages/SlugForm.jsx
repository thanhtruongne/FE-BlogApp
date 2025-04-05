import { Skeleton } from "antd";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GeneralApi from "../apis/General.api";
import BreadCrumb from "../components/Generals/BreadCrumb";
import RenderContentHTML from "../components/Generals/renderContent";
import Comment from "./Components/Blogs/Comments/Comment";
import MostViewdTemplate from "./Components/Blogs/MostViewdTemplate";
import SimilarBlog from "./Components/SimilarBlog";

const SlugForm = () => {    
   const  { slug } = useParams()
   const [loading, setLoading] = useState(false)
   const [data,setData] = useState(null)


   const fetchDataSlug = async(data) => {
    setLoading(true)
    try {
     await GeneralApi.getPageDataBySlug(slug)
     .then(res => {
        if(res.status == HttpStatusCode.Ok) {
            setData(res.data)
        }
     })   
    } catch (error) {
        console.log(error)
    }
    setLoading(false)
   }

   useEffect(() => {
     if(slug)
        fetchDataSlug(slug)
   },[slug])

    return (
        <div className=" pt-[20px]">
                {/* sideContent */}
                <div className="content_section_page">
                    <div className="wrapper container">
                        <div className="w-full relative" style={{ maxWidth: 'calc(100% - 420px)' }}>
                            {loading ? <Skeleton active className="mb-4" paragraph={{ rows: 25 }} /> : (
                                <>
                                    <div className="header_content_breadCrumb mb-[10px] w-full flex justify-between">
                                        <BreadCrumb items={data?.result.breadCrumb} />
                                        <span className="date text-[#757575] text-[14px] block">{data?.result?.formatDate} (GMT+7)</span>
                                    </div>  

                                    <div className="">
                                        <h1 className="text-[32px] font-bold mb-[15px] font-merriweather">{data?.result.title}</h1>
                                        <p className="description text-[18px] font-weight-[400] mb-[15px]" style={{ lineHeight : "160%" }}>
                                            {data?.result.description}
                                        </p>
                                        <article className="w-full text-[#222] relative p-0 " style={{ font : '400 18px arial' }}>
                                            <RenderContentHTML html={data?.result?.content} />
                                        </article>

                                        <div className="box-content-title mt-8">
                                            
                                            { loading ? <Skeleton active /> : 
                                                (data?.similarBlog && data?.similarBlog.length > 0 && data?.similarBlog?.map((item,index) => {
                                                    if(index >=3) return;
                                                    return <SimilarBlog data={item}/>
                                                }))
                                            }
                                        </div>

                                    </div>
                                </>
                            )}

                        </div>

                        {data?.similarBlog && data?.similarBlog.length > 3 && <MostViewdTemplate data={data?.similarBlog}/>}
                    </div>
                </div>

            <div className="bg-white">
                <Comment data={data?.result} loading={loading}/>
            </div>
        </div>
    )
}


export default SlugForm;