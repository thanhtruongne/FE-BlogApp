import { SmileOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';

const { TextArea } = Input;

const CommentInput = ({handleSubmitCommentParent,loading,form,id}) => {


  return (
      <Form
        form={form}
        onFinish={handleSubmitCommentParent}
        className=""
      >
        {/* Comment text area */}
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập ý kiến của bạn',
            },
          ]}
        >
          <div className="textarea-wrapper">
            <TextArea
              placeholder="Ý kiến"
              rows={4}
              name='content'
              className="custom-textarea"
              autoSize={{ minRows: 4, maxRows: null }}
            />
            <SmileOutlined className="smile-icon" />
          </div>
        </Form.Item>

        {/* Name input and submit button */}
        <div className="input-button-wrapper">
          <Form.Item
            name="full_name"
            className="name-input-container"
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
  );
};

export default CommentInput;
