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
        isCheckable = false,
        handleOnChange = null
    }
) => {

    const findSlugByValue = (value, data) => {
        for (const item of data) {
          if (item.value === value) return item.slug;
          if (item.children) {
            const slug = findSlugByValue(value, item.children);
            if (slug) return slug;
          }
        }
        return "";
    };

    const handleChange = (value) => {
        const slug = findSlugByValue(value, data);
        handleOnChange(slug)
    }
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
            onChange={handleChange}
            placeholder={placeHolder}
            treeDefaultExpandAll
            multiple={isMultiple}
            treeCheckable={isCheckable}
        />
        
    </Form.Item>
  )
};
export default TreeSelectCustom;