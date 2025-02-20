
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, TreeSelect } from "antd";
import { useEffect } from 'react';
import showMessage from "../../../Helpers/showMessage";

const FormResourceCategories = ({data,handleSubmit,handleCloseModal,loadingBtn,setData,type,form,dataTree}) => {
  const { Option } = Select;
  const { TextArea } = Input;

  const handleSubmitData = async() => {
    try {
        const value = await form.validateFields()
        if(value) 
            handleSubmit(value,type)      
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
         name='title'
         label={'Title'}  
         rules={[{ required: true, message: 'Title không được bỏ trống' },]}
        >
            <Input
               type="text"
               name="title"
               maxLength={190}
            />       
        </Form.Item>
        
        <Form.Item
         name='description'
         label={'Description'}  
         rules={[
            // { required: true, message: 'Số điện thoại không được bỏ trống' },
         ]}
        >
           <TextArea 
                rows={4}
           />
        </Form.Item>

        <Form.Item
          name="parent_id"
          label={'Danh mục cha'}  
        >
            {/* <TreeSelect
                fieldNames={'parent_id'}
                treeLine={true}
                treeData={dataTree}
            /> */}
            <TreeSelect
              showSearch
              fieldNames={'parent_id'}
              // fieldNames={'parent_id'}
              style={{
                width: '100%',
              }}

              dropdownStyle={{
                maxHeight: 400,
                overflow: 'auto',
              }}
              placeholder="Chọn danh mục cha"
              allowClear
              treeDefaultExpandAll
              // onChange={onChangeTreeSelect}
              treeData={dataTree} 
              // onPopupScroll={onPopupScroll}
            />
        </Form.Item>
       


        <Form.Item
         name='status'
         label={'Trạng thái'}     
        >
        <Select defaultValue={"Active"} placeholder={"Chọn trạng thái"} >
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


export default FormResourceCategories