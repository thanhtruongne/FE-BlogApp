import { CheckCircleFilled, CloseCircleFilled, InfoCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import showMessage from "../../../../Helpers/showMessage";
import TreeSelectCustom from "../../../../components/Customs/Select/TreeSelect";
import useDebounce from '../../../../hook/useDebounce';
const { RangePicker } = DatePicker;
const {Option} = Select
const FormSearchingData = ({setData,dataForm,setDataForm,className,fetchData}) => {
   const [form] = Form.useForm();
   const [filter,setFilter] = useState({})
   const [loadingBtn,setLoadingBtn] = useState(false);
   const [isFormValid, setIsFormValid] = useState(false)
   const [searchValue,setSearchValue] = useState('')
   const debouncedSearchTerm = useDebounce(searchValue,1000)


   const handleSearch = () => {
       setLoadingBtn(true)
       try {
          const values = form.getFieldsValue();
          if(values) {
            if(!values.author_id || values.author_id.length  == 0) {
                delete values.author_id;
            }
            if(values.dateTime && values.dateTime.length > 0) {
                values.createdAt = {};
                if(values?.dateTime[1]) {
                    if( values?.dateTime[1]?.isBefore(values.dateTime[0])) {
                        showMessage('Ngày kết thúc phải lớn hơn ngày bắt đầu!','error');
                        return;
                    }
                    values.createdAt['lte'] = values?.dateTime[1].format("DD-MM-YYYY")
                }
                values.createdAt['gte'] = values?.dateTime[0].format("DD-MM-YYYY")

                delete values.dateTime  
            }
            if(values.search_query) {
                values.text = {search : values.search_query}
            }
            delete values.search_query;
            fetchData(values)
          }
       } catch (error) {
         console.log(error)
         showMessage(error.message,'error');
       }
       setLoadingBtn(false)
   }

   useEffect(() => {
    // if (debouncedSearchTerm && debouncedSearchTerm.length > 1) {
        handleSearch();
    // }
  }, [debouncedSearchTerm]);
   


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
        const { status, dateTime  ,author_id, categories_id } = allValues;
        if (status  || dateTime || author_id?.length > 0 || categories_id?.length > 0) {
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

        <Form.Item name="author_id" className='py-2'>
            <Select
                mode="multiple"
                size='middle'
                style={{ width : 200 }}
                placeholder="Chọn tác giả"
                className='w-full'
            >
                {dataForm?.role_id && dataForm?.role_id?.map(item => {
                    return <Option value={item?._id} >{item.full_name}</Option>
                })}
            </Select>   
        </Form.Item>
        
        <Form.Item name="search_query" className='py-2'>
          <Input type='text' placeholder="Tìm kiếm title" onChange={(e) => setSearchValue(e.target.value)} style={{ width: 400 }} />
        </Form.Item>

        <Form.Item name="dateTime" className='py-2'>
            <RangePicker 
                format="DD-MM-YYYY"
                placeholder={["Thời gian bắt đầu","Thời gian sau"]}
                allowClear
                allowEmpty={[false,true]}
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