import { CheckCircleFilled, CloseCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from "antd";
import { useState } from "react";
import showMessage from "../../../../Helpers/showMessage";
import SelectMultiple from '../../../../components/Customs/Select/SelectMultiple';
const FormSearchAuthor = ({dataFormRole,className,fetchData}) => {
   const [form] = Form.useForm();
   const [filter,setFilter] = useState({})
   const [loadingBtn,setLoadingBtn] = useState(false);
   const [isFormValid, setIsFormValid] = useState(false)

   const handleSearch = () => {
        setLoadingBtn(true)
       try {
          const values = form.getFieldsValue();
          console.log(values)
          if(values) {
            fetchData(values)
          }
       } catch (error) {
         console.log(error)
         showMessage(error.message,'error');
       }
       setLoadingBtn(false)
   }
   


   const options = [
        {
            value: 'Active',
            label:  (
                <span>
                    Active
                    <CheckCircleFilled   style={{ color : "green",marginLeft : 9 }} />
                </span>
            ),
        },
        {
            value: 'Block',
            label:  (
                <span>
                    Block
                    <CloseCircleFilled style={{marginLeft : 9,color : 'red' }} />
                </span>
            ),
        }
   ]

   const checkFormValidity = (changedValues,allValues) => {
    const { status, search_query , role_id } = allValues;
    if (status || search_query || role_id?.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
   }

   return (
    <Form
       className={className}
       form={form}
       onFinish={handleSearch}
       layout="inline"
       onValuesChange={checkFormValidity}
    >
        
        <Form.Item name="search_query" className='py-2'>
          <Input type='text' placeholder="Tìm kiếm tên" style={{ width: 200 }} />
        </Form.Item>

        <SelectMultiple 
            data={dataFormRole}
            name="role_id"
            className='w-[200px]'
        />


        <Form.Item name="status" className='py-2'>
            <Select
                // mode="multiple"
                size='middle'
                style={{ width : 200 }}
                placeholder="Chọn trạng thái"
                className='w-full'
                fieldNames="status"
                options={options}
            />
        </Form.Item>


        <Form.Item className='py-2'>
            <Button  loading={loadingBtn} disabled={!isFormValid} icon={<SearchOutlined />} type="primary" className='ml-6' htmlType="submit">
                 Tìm kiếm
            </Button>
        </Form.Item>
    </Form>
   )

}



export default FormSearchAuthor