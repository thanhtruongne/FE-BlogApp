    import { Breadcrumb, Layout, theme, Row, Col} from "antd";
    import Icon, { CommentOutlined } from "@ant-design/icons"
    import React, { useContext, useEffect, useState } from "react";
    const { Content } = Layout


    const HomePage = () => {
        const {
            token: { colorBgContainer, borderRadiusLG },
        } = theme.useToken();
        document.title = "Dashboard"

        return (
            <Layout className="bg-white">
                <Content className="h-full flex">
                   <div className="col-left-custom-home">
                        <div className="wrapper_folder flex">
                            <article className="article-topstory w-full flex">
                                <div className="image_thumb relative w-4/6">
                                    <a href="" className="thumb thumb-5x3">
                                        <img style={{ transform:'translateX(-50%)',left:'50%' }} src="https://res.cloudinary.com/dcbsaugq3/image/upload/v1730118942/Y8mEbAbHJQPeai8JUtDK9c_QSZJRGK6r9MApQDjSRER8KLBI6mf156yckKuRyXbGhqI8yo2NVbbiPIBcQhyR9a-L8UAk5PN6cw_rw_cbv1pw.webp" alt="" />
                                    </a>
                                </div>
                                <div className="w-2/6">
                                    <h3 className="title-news">
                                        <a href="">Báo Thái Lan chỉ ra 5 lý do thất bại trước Việt Nam</a>
                                    </h3>
                                    <p className="description">
                                        <a href="">
                                        Thái LanHàng thủ, thẻ đỏ, bàn thắng của Supachok, trọng tài và thay người không tốt là những nguyên nhân khiến Thái Lan thua Việt Nam 2-3 ở lượt về chung kết ASEAN Cup 2024, theo tờ Siam Sport.
                                        </a>
                                    </p>
                                    <p className="meta-news">
                                        <a href="" className="count_cmt">
                                            <CommentOutlined /> 
                                            <span>121</span>
                                        </a>
                                    </p>
                                </div>
                               
                            </article>
                        </div>

                        <div className="sub-news-top relative">
                            <div className="h-full">
                                <div className="w-full max-h-full">
                                    <ul className="list-sub-feature">
                                        <li className="data_list_item flex flex-wrap items-end content-between p-0 mr-5 w-full relative">
                                            <div className="w-full m-0 relative p-0 order-2">
                                                <a href="" className="thumb thumb-5x3">
                                                    <img 
                                                    src="https://i1-vnexpress.vnecdn.net/2025/01/06/screenshot20250106at232150-173-2329-5703-1736180568.png?w=300&h=180&q=100&dpr=1&fit=crop&s=2v1ZSRciq-GjWUvx5ynB4A" alt=""
                                                    className="-translate-x-2/4  left-2/4" 
                                                     />
                                                </a>
                                            </div>
                                            {/* title */}
                                            <h3 className="order-1 mb-1.5 min-h-[50px] text-[15px] font-bold" style={{ fontFamily:'serif' }}>
                                                <a href="">Vết thương của Xuân Son 'nghiêm trọng hơn ghi nhận ban đầu'</a>
                                                <span className="meta-news ml-2">
                                                    <a href="">
                                                        <CommentOutlined /> 
                                                        <span>121</span>
                                                    </a>
                                                </span>
                                            </h3>
                                        </li>
                                        <li className="data_list_item flex flex-wrap items-end content-between p-0 mr-5 w-full relative">
                                            <div className="w-full m-0 relative p-0 order-2">
                                                <a href="" className="thumb thumb-5x3">
                                                    <img 
                                                    src="https://i1-vnexpress.vnecdn.net/2025/01/06/screenshot20250106at232150-173-2329-5703-1736180568.png?w=300&h=180&q=100&dpr=1&fit=crop&s=2v1ZSRciq-GjWUvx5ynB4A" alt=""
                                                    className="-translate-x-2/4  left-2/4" 
                                                     />
                                                </a>
                                            </div>
                                            {/* title */}
                                            <h3 className="order-1 mb-1.5 min-h-[50px] text-[15px] font-bold" style={{ fontFamily:'serif' }}>
                                                <a href="">Vết thương của Xuân Son 'nghiêm trọng hơn ghi nhận ban đầu'</a>
                                                <span className="meta-news ml-2">
                                                    <a href="">
                                                        <CommentOutlined /> 
                                                        <span>121</span>
                                                    </a>
                                                </span>
                                            </h3>
                                        </li>
                                        {/* Tác giã nổi bật */}
                                        <li className="author w-[240px] pb-[82px] mr-0 block absolute right-0 h-full">
                                            <a href="" style={{ color:'#9f224e' }} className="text-[14px] leading-[16px] mb-[5px] w-full mt-[4px] font-bold">
                                                Góc nhìn
                                            </a>
                                            <article className="w-full pr-0 pb-0 mb-0" style={{ position:'initial' }}>
                                                <h3 className="title-news">
                                                    <a href="">Xí xóa cho Supachok</a>
                                                </h3>
                                                <p className="description">
                                                    <a href="">Xí xóa cho Supachok 
                                                        Supachok bị dí đám lửa bởi những đồng đội đã châm ngòi cho cuộc tấn công mà đáng lẽ phải là pha trả bóng.
                                                    </a>
                                                </p>
                                                {/* avatar */}
                                                <div className="absolute right-0 bottom-0 mt-[3px] flex justify-between items-center w-full">
                                                    <p className="meta-news">
                                                        <a href="" className="cat">
                                                            Đặng Duy Linh
                                                        </a>
                                                        <a href="" className="block mt-[8px]">
                                                            <CommentOutlined /> 
                                                            <span>121</span>
                                                        </a>
                                                    </p>
                                                    <div className="w-[72px] m-0 relative " >
                                                        <a href="" className="thumb rounded-full" style={{ paddingTop:'100%' }}>
                                                            <img 
                                                              className="-translate-x-2/4  left-2/4" 
                                                            src="https://i1-vnexpress.vnecdn.net/2023/09/30/DuyLinhremovebgpreviewpng-1696038222.png?w=100&h=100&q=100&dpr=1&fit=crop&s=aUjaP87_I3dgpxcng5fcAg" alt="" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </article>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                   </div>

                   <aside className="col-right-top">

                   </aside>
                
                </Content>

              
            </Layout>

        )
    }



    export default HomePage;