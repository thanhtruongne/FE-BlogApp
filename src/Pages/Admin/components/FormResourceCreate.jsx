import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from "antd";
import { useEffect } from "react";

import showMessage from "../../../Helpers/showMessage";

const FormResourceCreate = ({data,handleSubmit,handleCloseModal,loadingBtn}) => {
  const [form] = Form.useForm()
  const { Option } = Select;
  
  const handleSubmitData = async() => {
    try {
        const value = await form.validateFields()
        if(value) 
            handleSubmit(value)      
    } catch (error) {
       console.log('Error',error)
       showMessage(error.message,'error') 
    }   
  }

  useEffect(() => {
    form.setFieldsValue(data)
  },[data])

  return (
    <Form
        form={form}
        layout="vertical" 
        autoComplete="off"
        onFinish={handleSubmitData}
    >
        <Form.Item
         name='_id'
         hidden
        >
           <Input
            type="hidden"
        />   
        </Form.Item>  
        

        <Form.Item
         name='full_name'
         label={'Họ và tên'}  
         rules={[{ required: true, message: 'Họ và tên không được bỏ trống' },]}
        >
            <Input
               type="text"
               name="full_name"
               maxLength={190}
            />       
        </Form.Item>  

        <Form.Item
         name='email'
         label={'Email'}  
         rules={[
            { required: true, message: 'Email không được bỏ trống' },
            { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , message: 'Email không hợp lệ' },
         ]}
        >
            <Input
               type="text"
               name="email"
               maxLength={190}
            />       
        </Form.Item>

        <Form.Item
         name='password'
         label={'Mật khẩu'}  
         rules={[{ required: true, message: 'Mật khẩu không được bỏ trống' }]}
        >
            <Input
               type="password"
               disabled
            />       
        </Form.Item>


        
        <Form.Item
         name='phone'
         label={'Số điện thoại'}  
         rules={[
            { required: true, message: 'Số điện thoại không được bỏ trống' },
            { pattern: /^(?:\+84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])\d{7}$/ , message : "Số điện thoại không hợp lệ"}
         ]}
        >
            <Input
                name="phone"
               type="text"
               value={123}
            />       
        </Form.Item>

        <Form.Item
         name='address'
         label={'Địa chỉ'}  
         rules={[
            { required: true, message: 'Địa chỉ không được bỏ trống' }]}
        >
            <Input
                name="address"
               type="text"
            />       
        </Form.Item>

        <Form.Item
         name='status'
         label={'Trạng thái'}     
        >
          <Select placeholder={"Chọn trạng thái"}>
            <Option value="Active">Active <CheckCircleFilled  style={{ color : "green" }} /></Option>
            <Option value="Block">Block <CloseCircleFilled  style={{ color : "red" }}/></Option>
         </Select> 
         
        </Form.Item>

        <div className="w-full flex justify-end items-center mt-[12px]">
            <Space>
                <Form.Item label={null}>
                    <Button loading={loadingBtn} type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>
                <Form.Item label={null} className="ml-[3px]">
                    <Button htmlType="button" onClick={handleCloseModal}>
                        Hủy
                    </Button>
                </Form.Item>
            </Space>
        </div>
       
    </Form>
  )

}


export default FormResourceCreate