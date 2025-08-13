import { CommentOutlined } from "@ant-design/icons";
import { Layout, Skeleton } from "antd";
import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GeneralApi from "../apis/General.api";
import LayoutComponents from "./Components/layoutComponents";
import ContentPage from "./containers/ContentPage";
const { Content } = Layout
const HomePage = () => {
    document.title = "Dashboard"
    
    const [dataContent , setDataContent] = useState(null);
    const [loadingContent,setLoadingContent] = useState(false)


    const fetchDataContentPage = async() => {
        setLoadingContent(true)
        try {
          await GeneralApi.getDataContentPage()
          .then(res => {
            if(res.status == HttpStatusCode.Ok) {
                setDataContent(res.data)
            }
          })
        } catch (error) {
          console.log(error,'Error')   
        }
        setLoadingContent(false)
    }

    useEffect(() => {
        fetchDataContentPage()
    },[])

    console.log(dataContent?.topic_content,'dataContnet');
    return (
        <Layout className="bg-white pt-[20px]">
            <div className="container">
                <Content className="h-full flex pb-[40px]" style={{ borderBottom :  '1px solid #e5e5e5' }}>
                            <div className="col-left-custom-home">
                                <div className="wrapper_folder flex">
                                {loadingContent ? Array(1).fill(null).map(item => {
                                                return  <Skeleton active />
                                            }) : (
                                                <article className="article-topstory w-full flex">
                                                    <div className="image_thumb relative w-4/6">
                                                        <Link to={dataContent?.high_view[0]?.slug} className="thumb thumb-5x3">
                                                            <img style={{ transform:'translateX(-50%)',left:'50%' }} src={dataContent?.high_view[0].imageURL} alt="" />
                                                        </Link>
                                                    </div>
                                                    <div className="w-2/6">
                                                        <h3 className="title-news">
                                                            <Link to={dataContent?.high_view[0].slug}>{dataContent?.high_view[0].title}</Link>
                                                        </h3>
                                                        <p className="description">
                                                            <Link to="">
                                                                {dataContent?.high_view[0]?.description}
                                                            </Link>
                                                        </p>
                                                        <p className="meta-news">
                                                            <a href="" className="count_cmt">
                                                                <CommentOutlined /> 
                                                                <span>121</span>
                                                            </a>
                                                        </p>
                                                    </div>   
                                                </article>

                                            )}
                            
                                </div>

                                <div className="sub-news-top relative">
                                    <div className="h-full">
                                        <div className="w-full max-h-full">
                                            <ul className="list-sub-feature">
                                            {loadingContent ? Array(3).fill(null).map(data => {
                                                return  (
                                                    <li className="data_list_item flex flex-wrap items-end content-between p-0 mr-5 w-full relative">
                                                        <Skeleton active />
                                                    </li>
                                                )
                                            }) :
                                                dataContent && dataContent.high_view && dataContent.high_view.length > 0 && dataContent?.high_view?.map((item,index) => {
                                                        if(index != 0) {
                                                            return (
                                                                <li className="data_list_item flex flex-wrap items-end content-between p-0 mr-5 w-full relative">
                                                                    <div className="w-full m-0 relative p-0 order-2">
                                                                        <Link to={item.slug} className="thumb thumb-5x3">
                                                                            <img 
                                                                                src={item.imageURL} alt=""
                                                                                className="-translate-x-2/4  left-2/4" 
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                    {/* title */}
                                                                    <h3 className="order-1 mb-1.5 min-h-[50px] text-[15px] font-bold" style={{ fontFamily:'serif' }}>
                                                                        <Link to={item.slug}>{item.title}</Link>
                                                                        <span className="meta-news ml-2">
                                                                            <Link href="">
                                                                                <CommentOutlined /> 
                                                                                <span>121</span>
                                                                            </Link>
                                                                        </span>
                                                                    </h3>
                                                                </li>
                                                            )
                                                        }
                                                })
                                            }
                                            {dataContent && dataContent.topic_content && (
                                                <li className="author w-[240px] pb-[82px] mr-0 block absolute right-0 h-full">
                                                    <a href="" style={{ color:'#9f224e' }} className="text-[14px] leading-[16px] mb-[5px] w-full mt-[4px] font-bold">
                                                    {dataContent.topic_content.name}
                                                    </a>
                                                    <article className="w-full pr-0 pb-0 mb-0" style={{ position:'initial' }}>
                                                        <h3 className="title-news" style={{ fontWeight : 'bold' }}>
                                                            <Link to={dataContent.topic_content.topic.slug}>{dataContent.topic_content.topic.title}</Link>
                                                        </h3>
                                                        <p className="description">
                                                            <Link to={dataContent.topic_content.topic.slug}>
                                                                {dataContent.topic_content.topic.description}
                                                            </Link>
                                                        </p>
                                                        {/* avatar */}
                                                        <div className="absolute right-0 bottom-0 mt-[3px] flex justify-between items-center w-full">
                                                            <p className="meta-news">
                                                                <Link to={dataContent.topic_content.topic.slug} className="cat">
                                                                    {dataContent.topic_content.topic.author_id?.full_name}
                                                                </Link>
                                                                <span  className="block mt-[8px]">
                                                                    <CommentOutlined /> 
                                                                    <span>121</span>
                                                                </span>
                                                            </p>
                                                            <div className="w-[72px] m-0 relative " >
                                                                <Link to={dataContent.topic_content.topic.slug}  className="thumb rounded-full" style={{ paddingTop:'100%' }}>
                                                                    <img 
                                                                        className="-translate-x-2/4  left-2/4" 
                                                                    src={dataContent.topic_content.topic.author_id.imageURL} alt="" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </article>
                                                </li>
                                            )}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                

                    <aside className="col-right-top">

                    </aside>
                
                </Content>
                
                {/* Body */}
                <ContentPage
                    dataContent={dataContent}
                    loadingContent={loadingContent}
                />

                {/* Load component layout */}
                <LayoutComponents 
                    dataContent={dataContent}
                    loadingContent={loadingContent}
                />

            </div>
            
        </Layout>

    )
}



export default HomePage;