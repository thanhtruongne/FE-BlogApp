import { Select } from "antd";


const SelectMultiple = ({data,setData}) => {

    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = data.filter((item) => !selectedItems.includes(item));


    return (
        <Select
          mode="multiple"
          placeholder="Inserted are removed"
          value={selectedItems}
          onChange={setSelectedItems}
          className="w-full"
          options={filteredOptions.map((item) => ({
            value: item,
            label: item,
          }))}
        />
      );
}

export default SelectMultiple