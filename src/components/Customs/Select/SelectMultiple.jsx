import { Form, Select } from "antd";
import { useState } from "react";


const SelectMultiple = ({data,name,label = null,rules = null,setData,className= "w-full"}) => {

    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = data?.filter((item) => !selectedItems.includes(item));


    return (
      <Form.Item
        name={name}
        label={label}
        className="py-2"
        rules={rules}
      >
        <Select
          mode="multiple"
          placeholder="Inserted are removed"
          value={selectedItems}
          onChange={setSelectedItems}
          style={{ width : 200 }}
          options={filteredOptions?.map((item) => ({
            value: item,
            label: item,
          }))}
        />

      </Form.Item>
      );
}

export default SelectMultiple