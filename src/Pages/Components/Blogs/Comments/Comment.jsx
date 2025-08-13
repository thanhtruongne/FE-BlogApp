import { Form, Skeleton, Tabs } from "antd";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import GeneralApi from "../../../../apis/General.api";
import showMessage from "../../../../Helpers/showMessage";
import FormComment from "../FormComment";
// import './Comment.scss';
import NewestComment from "./NewestComment";
import PopularComment from "./PopularComment";

const Comment = ({ data, loading }) => {
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [form] = Form.useForm();
    const [activeKey, setActiveKey] = useState('careabout');
    const [dataCare, setDataCare] = useState([])
    const [dataNewest, setDataNewest] = useState([])
    const [total, setTotal] = useState(0)
    const [hasMore, sethasMore] = useState(null);
    const [filter, setFilter] = useState({
        limit: 4,
    })
    const [isSwitch, setSwitch] = useState(false);
    const [page, setPage] = useState(1);



    const handleSubmitCommentParent = async (values) => {
        setLoadingBtn(true)
        try {
            if (values) {
                await GeneralApi.createCommentBlog(data?._id, values)
                    .then(res => {
                        if (res.status === HttpStatusCode.Ok) {
                            showMessage(res.message, 'warning');
                            form.resetFields()
                        }
                    })
            }
        } catch (error) {
            console.log(error);
        }
        setLoadingBtn(false)
    }

    useEffect(() => {
        const shouldFetch =
            (activeKey === 'careabout' && (!dataCare || dataCare.length === 0)) ||
            (activeKey === 'newest' && (!dataNewest || dataNewest.length === 0));

        const countKey = {
            'careabout': dataCare.length, 'newest': dataNewest.length,
        }

        const paramsMap = {
            careabout: { sort: { createdAt: 1 }, limit: filter.limit },
            newest: { sort: { like: 1, createdAt: -1 }, limit: filter.limit },
        };

        const setterMap = {
            careabout: setDataCare,
            newest: setDataNewest,
        };
        setTotal(countKey[activeKey])
        // if (!shouldFetch) return;
        fetchDataComment(paramsMap[activeKey], setterMap[activeKey], data?._id);

    }, [activeKey, data])

    const fetchDataComment = async (params, setData, postID) => {
        setLoadingBtn(true)
        try {
            if (postID) {
                await GeneralApi.getCommentByQuery(postID, params)
                    .then(res => {
                        if (res.status == HttpStatusCode.Ok) {
                            setData(res.data)
                            setTotal(res.options.totalComment)
                            sethasMore(res.options.hasMore)
                        }

                    })
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoadingBtn(false);
        }
    }

    const globalCommentProps = {
        postId: data?._id,
        loading: loadingBtn,
        hasMore,
        sethasMore,
        filter,
        setTotal,
        setPage,
        page,
        setSwitch,
        isSwitch,
    }

    const items = [
        {
            key: 'careabout',
            label: 'Quan tâm nhất',
            children:
                <PopularComment
                    data={dataCare}
                    setData={setDataCare}
                    {...globalCommentProps}
                />,
        },
        {
            key: 'newest',
            label: 'Mới nhất',
            children:
                <NewestComment
                    data={dataNewest}
                    setData={setDataNewest}
                    {...globalCommentProps}
                />,
        },
    ];
    const handleSwitchChangeTab = (key) => {
        setActiveKey(key)
        setPage(1)
    }

    return (
        <section className="p-0 m-0 w-full">
            <div className="container">
                {loading ? <Skeleton active /> :
                    <>
                        <div className="comment_category">
                            <div className="sidebar_content_comment">
                                <div className="section_comment">
                                    <div className="w-full">
                                        <div className="mb-[20px]" style={{ transform: 'translate3d(0px, 0px, 0px)', opacity: 1 }}>

                                            <div className="comment_title">
                                                <div className="title_type">
                                                    <h3 className="inline-block font-bold">
                                                        Ý kiến
                                                    </h3>
                                                    (<span>{total}</span>)
                                                </div>
                                            </div>

                                            <div className="input_comment">
                                                <FormComment
                                                    handleSubmitCommentParent={handleSubmitCommentParent}
                                                    loading={loadingBtn}
                                                    form={form}
                                                />
                                            </div>

                                            <div className="filter_comment">
                                                <Tabs defaultActiveKey={activeKey} onChange={(key) => handleSwitchChangeTab(key)} items={items} />
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar_v2"></div>
                    </>
                }

            </div>
        </section>
    )
}

export default Comment;