import { Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
const StatusSelectActive = ({name,label,value,type = null,className,placeHolder = "Chọn trạng thái",rules = [{required: true, message: 'Danh mục không được bỏ trống',}]}) => {
   const [options , setOptions] = useState([]);

   const switchTypeCase = (type) => {
        switch(type) {
            case 'approved' : 
               break;
            default :  

                setOptions([
                    {
                        value: 'Active',
                        label: `Active`,
                    },
                    {
                        value: 'Block',
                        label: 'Block',
                    },
                ]) 
            break;
        }
   }


   useEffect(() => {
    switchTypeCase(type)
   },[])
  
  
    return (
    <Form.Item
        name={name}
        label={label}
        rules={rules}
        className={className}
    >
        <Select
            className='w-full'
            value={value}
            dropdownStyle={{
                maxHeight: 400,
                overflow: 'auto',
            }}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            options={options}
            fieldNames={name}
            showSearch
            allowClear
            placeholder={placeHolder}
        />
        
    </Form.Item>
  )
};
export default StatusSelectActive;