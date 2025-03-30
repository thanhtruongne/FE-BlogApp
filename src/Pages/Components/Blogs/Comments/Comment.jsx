import { Form, Tabs } from "antd";
import { HttpStatusCode } from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import GeneralApi from "../../../../apis/General.api";
import showMessage from "../../../../Helpers/showMessage";
import FormComment from "../FormComment";
import NewestComment from "./NewestComment";
import PopularComment from "./PopularComment";


const Comment = ({data,loading}) => {
    const { isAuthenticated } = useSelector(state => state.auth)
    const [dataComment, setDataComment] = useState(null)
    const [loadingBtn,setLoadingBtn] = useState(false)
    const [form] = Form.useForm();


    const handleSubmitCommentParent = async(values) => {
        setLoadingBtn(true)
        try {
            if(values) {
              await GeneralApi.createCommentBlog(id,values)
                .then(res => {
                    if(res.status === HttpStatusCode.Ok) {
                        showMessage(res.message,'success');
                        setDataComment(res.data)
                        form.resetFields()
                    }
                })
            }
         } catch (error) {
            console.log(error);
         }
         setLoadingBtn(false)
    }

    const items = [
        {
          key: 'careabout',
          label: 'Quan tâm nhất',
          children: <PopularComment data={data?.comments} loading={loading} />,
        },
        {
          key: 'newest',
          label: 'Mới nhất',
          children: <NewestComment postId={data?._id} />,
        },
    ];
    return (
        <section className="p-0 m-0 w-full">
            <div className="container">
                <div className="comment_category">
                    <div className="sidebar_content_comment">
                        <div className="section_comment">
                            <div className="w-full">
                                <div className="mb-[20px]" style={{ transform : 'translate3d(0px, 0px, 0px)', opacity : 1 }}>

                                    <div className="comment_title">
                                        <div className="title_type">
                                            <h3 className="inline-block font-bold">
                                                Ý kiến
                                            </h3>
                                            <span>(222)</span>
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
                                        <Tabs defaultActiveKey="careabout" items={items} />
                                    </div>
                                  

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sidebar_v2"></div>
            </div>
        </section>
    )
}   

export default Comment;