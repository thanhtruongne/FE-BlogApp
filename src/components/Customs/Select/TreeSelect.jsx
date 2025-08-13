import { Form, TreeSelect } from 'antd';

const TreeSelectCustom = (
    {
        name,
        label,
        value,
        data,
        className,
        placeHolder = "Chọn dữ liệu",
        rules = [{ required: true, message: 'Danh mục không được bỏ trống', }],
        isMultiple = false,
        isCheckable = false,
        handleOnChange = null
    }
) => {

    const filterTreeNode = (inputValue, treeNode) => {
        const nodeTitle = treeNode.title.toLowerCase();
        return nodeTitle.includes(inputValue.toLowerCase());
    };

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
                // onChange={handleChange}
                placeholder={placeHolder}
                treeDefaultExpandAll
                multiple={isMultiple}
                treeCheckable={isCheckable}
                filterTreeNode={filterTreeNode}
            />

        </Form.Item>
    )
};
export default TreeSelectCustom;