import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TimeFormat from '../../../../../components/Generals/TimeFormat';
const { TextArea } = Input;

const CommentItem = ({data}) => {
  const [form] = Form.useForm();
  const [showReply, setShowReply] = useState(false);
  const [loading, setLoading] = useState(false);


  const onFinish = (values) => {
   
    form.resetFields();
    setShowReply(false);
  };

  return (
        <div className="pb-3">
            <div className="comment_item">
                <div className="">
                    <div className="user_status relative float-left">
                        <Link className="avata_coment block">
                            T
                        </Link>
                    </div>

                </div>

                <div className="comment_content">
                    <p>
                        <span className="text-[#222] mr-2">
                            {data.full_name}
                        </span>
                        
                        {data.content}
                    </p>
                    <div className="block_like_web w-full pt-4 mt-3">
                        <div className="reaction flex items-center mr-[24px]">
                                <div className="flex items-center bg-none relative p-0 text-[14px] text-[#757575]">
                                <i className="ic ic-like"></i>
                                <span className="text-[14px] text-[#757575]">Thích</span>
                                </div>
                        </div>

                        <div className="reaction_container">
                            <div className="reaction_total">
                                <span className="item_like mr-1">
                                    <img width={14} height={14} src="https://s1.vnecdn.net/vnexpress/restruct/c/v3230/v2/wcomment/pc/vne/images/graphics/like.svg" alt="" />
                                </span>
                                {data.like && data.like > 0 && (<span className="ml-2 text-[#757575]">{data.like}</span>)}
                                
                            </div>
                        </div>
                        <span onClick={() => setShowReply(!showReply)} className="ml-5 mr-3 text-[14px] text-[#757575] cursor-pointer">Trả lời</span>
                        <span className="text-[14px] text-[#757575] ml-auto"><TimeFormat timestamp={data.createdAt} /></span>


                        
                    </div>
                    
                </div>
            </div>

            {showReply && (
                <Form
                    form={form}
                    onFinish={onFinish}
                    className="reply-form relative pl-[20px] ml-[45px]"
                >
                    <Form.Item
                    className=' item_side'
                    name="reply"
                    rules={[
                        { 
                            required: true, 
                            message: 'Vui lòng nhập nội dung bình luận' 
                        }
                    ]}
                    >
                    <TextArea
                        placeholder="Chia sẻ ý kiến của bạn"
                        autoSize={{ minRows: 3 }}
                        className="reply-input"
                    />
                    </Form.Item>

                    <div className="input-button-wrapper">
                        <Form.Item
                            name="full_name"
                            className="name-input-container mb-0"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập họ và tên',
                                },
                            ]}
                        >
                            <Input
                            placeholder="Họ và tên"
                            className="name-input"
                            name='full_name'
                            />
                        </Form.Item>

                        <Form.Item className="submit-button-container">
                            <Button 
                            type="primary"
                            htmlType="submit"
                            className="submit-button"
                            loading={loading}
                            >
                                Gửi
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            )}
        </div>
  );
};

export default CommentItem;