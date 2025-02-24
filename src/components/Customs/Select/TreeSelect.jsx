import { Form, TreeSelect } from 'antd';
import React from 'react';

const TreeSelectCustom = (
    {
        name,
        label,
        value,
        data,
        className,
        placeHolder = "Chọn dữ liệu",
        rules = [{required: true, message: 'Danh mục không được bỏ trống',}],
        isMultiple = false,
        isCheckable = false
    
    }
) => {
  return (
    <Form.Item
        name={name}
        label={label}
        rules={rules}
        className={className}
    >
        <TreeSelect
            
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
            multiple={isMultiple}
            treeCheckable={isCheckable}
        />
        
    </Form.Item>
  )
};
export default TreeSelectCustom;