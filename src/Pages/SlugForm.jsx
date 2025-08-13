import { ArrowLeftOutlined, CopyOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tooltip } from "antd";
import { HttpStatusCode } from "axios";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GeneralApi from "../apis/General.api";
import BreadCrumb from "../components/Generals/BreadCrumb";
import RenderContentHTML from "../components/Generals/renderContent";
import { useModalLoginProvider } from "../contexts/ModalContext";
import showMessage from "../Helpers/showMessage";
import { openNotification } from "../Helpers/showNotifacation";
import constants from "../utils/constants";
import Comment from "./Components/Blogs/Comments/Comment";
import MostViewdTemplate from "./Components/Blogs/MostViewdTemplate";
import SideBarNavIcon from "./Components/SideBarNavIcon";
import SimilarBlog from "./Components/SimilarBlog";

const SlugForm = (props) => {
    const { data, isLoading, urlString } = props;
    const queryClient = useQueryClient();
    const location = useLocation();
    const { isAuthenticated } = useSelector(state => state.auth);
    const { setModalContext, openModalContext } = useModalLoginProvider();
    const commentRef = useRef(null);
    const navigate = useNavigate();

    const handleScrollToComment = useCallback(() => {
        commentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const fetchActionSavePost = async (postId) => {
        try {
            const response = await GeneralApi.handleSavePost(postId);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const handleSavePostData = useMutation({
        mutationFn: (postId) => fetchActionSavePost(postId),
        onSuccess: (response) => {
            if (response.status === HttpStatusCode.Ok) {
                
                queryClient.setQueryData(urlString, (oldData) => {
                   return {
                    ...oldData,
                    checkSave: response.data
                   }
                });

                openNotification({
                    type: 'success',
                    message: 'Thành công',
                    description: response.message || 'Lưu bài viết thành công',
                    duration: 2,
                });
            }
        },
        onError: (error) => {
            queryClient.invalidateQueries(urlString);
            
            openNotification({
                type: 'error',
                message: 'Lỗi',
                description: error.message || 'Có lỗi xảy ra khi lưu bài viết',
                duration: 2,
            });
        },
    });

    const { isPending } = handleSavePostData;

    const handleClickCommentBlog = useCallback(() => {
        navigate('/' + urlString + "#box_comment");
    }, [urlString, navigate]);

    const handleCopyLink = useCallback(async () => {
        try {
            const URL = import.meta.env.VITE_APP_FRONTEND;
            const linkRedirect = URL + urlString;
            await navigator.clipboard.writeText(linkRedirect);
            showMessage('Copy link thành công.', 'success');
        } catch (err) {
            console.error('Lỗi khi copy:', err);
        }
    }, [urlString]);

    useEffect(() => {
        if (location.hash === '#box_comment') {
            handleScrollToComment();
        } else {
            scrollToTop();
        }
    }, [location.hash, handleScrollToComment, scrollToTop]);

    const iconDataProp = useMemo(() => ({
        commentRef,
        iconSave: data?.checkSave,
        dataPrev: data?.result?.categories_id,
        handleCopyLink,
        handleSavePostData,
        handleScrollToComment
    }), [data?.checkSave, data?.result?.categories_id, handleCopyLink, handleSavePostData, handleScrollToComment]);

    const handleClickSave = () => {
        if(!isAuthenticated) {
            setModalContext(!openModalContext)
            return;
        }

        handleSavePostData.mutate(data?.result._id)
    }

    return (
        <div className="relative">
            <div className="bg-[#fcfaf6] w-full">
                <div className="container flex">
                    <div className="sidebar_social_pinned">
                        <SideBarNavIcon {...iconDataProp} />
                    </div>
                    <div className="content_section_page mt-[20px] w-full" style={{ maxWidth: "calc(100% - 420px)" }}>
                        <div className="container">
                            <div className="w-full relative">
                                <div className="header_content_breadCrumb mb-[10px] w-full flex justify-between">
                                    <BreadCrumb items={data?.result.breadCrumb} />
                                    <span className="date text-[#757575] text-[14px] block">{data?.result?.formatDate} (GMT+7)</span>
                                </div>

                                <div>
                                    <h1 className="text-[32px] font-bold mb-[15px] font-merriweather">{data?.result.title}</h1>
                                    <p className="description text-[18px] font-weight-[400] mb-[15px]" style={{ lineHeight: "160%" }}>
                                        {data?.result.description}
                                    </p>
                                    <article className="w-full text-[#222] relative p-0" style={{ font: '400 18px arial' }}>
                                        <RenderContentHTML html={data?.result?.content} />
                                    </article>

                                    <div className="my-3">
                                        {data?.similarBlog?.length > 0 && data?.similarBlog?.map((item, index) => (
                                            <div key={index} className="box-content-title mt-8">
                                                <SimilarBlog data={item} handleClickCommentBlog={handleClickCommentBlog} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="row-prev mb-4 flex w-full">
                                <Tooltip placement="bottom" title={"Dẫn đến " + data?.result?.categories_id?.title}>
                                    <Link className="px-[10px] mr-2 relative bg-white h-[40px] text-[#4f4f4f]" style={{
                                        borderRadius: '4px',
                                        border: "1px solid #e5e5e5",
                                        lineHeight: "40px"
                                    }}>
                                        <ArrowLeftOutlined />
                                    </Link>
                                </Tooltip>

                                <Link
                                    onClick={handleClickSave}
                                    className="px-[10px] mr-2 relative bg-white h-full text-[#4f4f4f]" style={{
                                        borderRadius: '4px',
                                        border: "1px solid #e5e5e5",
                                        lineHeight: "40px"
                                    }}
                                    disabled={isPending}
                                >
                                    {isPending ? 'Đang lưu...' : (data.checkSave ? 'Đã lưu' : 'Lưu bài viết')}
                                </Link>

                                <Tooltip placement="bottom" title={"Copy đường dẫn"}>
                                    <Link
                                        className="px-[10px] relative bg-white h-full text-[#4f4f4f] ms-auto" style={{
                                            borderRadius: '4px',
                                            border: "1px solid #e5e5e5",
                                            lineHeight: "40px"
                                        }} onClick={handleCopyLink}>
                                        <CopyOutlined />
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    {data?.dataGenerateBlog && data?.dataGenerateBlog.length > 0 && (
                        <MostViewdTemplate data={data?.dataGenerateBlog} handleClickCommentBlog={handleClickCommentBlog} />
                    )}
                </div>
            </div>

            <div className="bg-white" ref={commentRef}>
                <Comment data={data?.result} loading={isLoading} />
            </div>
        </div>
    );
};

export default SlugForm;