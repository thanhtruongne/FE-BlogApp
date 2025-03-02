
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from "antd";
import { useEffect } from 'react';
import showMessage from '../../../../Helpers/showMessage';
import UploadAvatarResource from '../../components/UploadAvatarResource';
const FormModalResource = ({data,handleSubmit,handleCloseModal,loadingBtn,setData,type,form,dataForm}) => {
  const { Option } = Select;
  const { TextArea } = Input;

  const handleSubmitData = async() => {
    try {
        const value = await form.validateFields()
        console.log(value)
        if(value) 
            handleSubmit(value,type)      
    } catch (error) {
        console.log('Error',error)
        showMessage(error.message,'error') 
    }   
  }
  
  useEffect(() => {
    if(data) { 
      form.setFieldsValue(data)
    }

  },[data])

  return (
    <Form
        form={form}
        layout="vertical" 
        autoComplete="off"
        onFinish={handleSubmitData}
        initialValues={{ 
          status : 'Active'
        }}
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
         name='avatar'
         label="Hỉnh ảnh"
         rules={[{required : true , message : "Hỉnh ảnh không được bỏ trống"}]}
        >
            <UploadAvatarResource
              data={data}
              setData={setData}
            />
        </Form.Item>  

        <Form.Item
         name='full_name'
         label={'Tên'}  
         rules={[{ required: true, message: 'Tên không được bỏ trống' },]}
        >
            <Input
               type="text"
               name="full_name"
               maxLength={190}
            />       
        </Form.Item>
        
        <Form.Item
          name='description'
          label={'Giới thiệu'}  
          rules={[
              { required: true, message: 'Giới thiệu không được bỏ trống' },
          ]}
        >
           <TextArea 
              name='description'
              rows={4}
           />
        </Form.Item>

        <Form.Item
          name="role_id"
          label={'Danh mục vai trò'}  
          rules={[{required : true , message : "Vai trò không được trống"}]}
        >
           <Select 
              allowClear
              options={dataForm}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? optionA?.title).toLowerCase().localeCompare((optionB?.label ?? optionB?.title).toLowerCase())
              }
              showSearch
              placeholder="Tìm kiếm vai trò !"

           />
        </Form.Item>
       


        <Form.Item
         name='status'
         label={'Trạng thái'}     
        >
        <Select defaultValue={"Active"} placeholder={"Chọn trạng thái"}>
            <Option value="Active" >Active <CheckCircleFilled   style={{ color : "green" }} /></Option>
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


export default FormModalResource