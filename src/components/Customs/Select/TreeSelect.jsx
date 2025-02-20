import { Form, TreeSelect } from 'antd';
import React from 'react';

const TreeSelectCustom = ({name,label,value,data,className,placeHolder = "Chọn dữ liệu",rules = [{required: true, message: 'Danh mục không được bỏ trống',}]}) => {
  return (
    <Form.Item
        name={name}
        label={label}
        rules={rules}
        className={className}
    >
        <TreeSelect
            className='w-full'
            style={{
                width: '100%',
            }}
            value={value}
            dropdownStyle={{
                maxHeight: 400,
                overflow: 'auto',
            }}
            treeData={data}
            fieldNames={name}
            showSearch
            allowClear
            placeholder={placeHolder}
            treeDefaultExpandAll
        />
        
    </Form.Item>
  )
};
export default TreeSelectCustom;