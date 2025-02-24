import { CheckCircleFilled, CloseCircleFilled, InfoCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useState } from "react";
import showMessage from "../../../../Helpers/showMessage";
import TreeSelectCustom from "../../../../components/Customs/Select/TreeSelect";
const {Option} = Select

const FormSearchingData = ({setData,dataForm,setDataForm,className,fetchData}) => {
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
            if(values.dateTime) {
                values.dateTime = values.dateTime.format("YYYY-MM-DD")
            }
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
            value: 'Pending',
            label:  (
                <span>
                    Pending
                    <InfoCircleFilled style={{marginLeft : 9,color : 'yellow' }} />
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
    const { status, dateTime , search_query , categories_id } = allValues;
    if (status  || dateTime || search_query || categories_id?.length > 0) {
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
        <TreeSelectCustom
            name="categories_id"
            rules={null}
            // placeHolder='C'
            className='w-[200px] py-2'
            placeHolder='Chọn danh mục'
            label={null}
            data={dataForm?.category ?? []}
            isMultiple={true}
            isCheckable={true}
        />
        
        <Form.Item name="search_query" className='py-2'>
          <Input type='text' placeholder="Tìm kiếm title" style={{ width: 200 }} />
        </Form.Item>

        <Form.Item name="dateTime" className='py-2'>
            <DatePicker 
                placeholder="Thời gian tạo tin"
                allowClear
            // onChange={(date, dateString) => setDataForm({...dataForm,dateTime : })}
             />
        </Form.Item>

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



export default FormSearchingData