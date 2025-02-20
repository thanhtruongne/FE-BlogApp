import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import React, { useState } from "react";

const UploadThumbData = ({data,setData,name,label,rules=[{required : true,message : label + ' không đươc bỏ trống'}]}) => {
  const [fileList, setFileList] = useState([]);

  // Chỉ chọn 1 file duy nhất
  const handleChange = ({ fileList }) => {
    setFileList(fileList.slice(-1)); // Giữ lại duy nhất 1 file
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      console.log(file)
      setData({ ...data,thumb : file }); 
    }
  };



  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
    >
        <Upload
        accept="image/*" 
        name={name}
        fileList={fileList}
        beforeUpload={() => false} 
        onChange={handleChange}
        maxCount={1} 
        >
            <Button icon={<UploadOutlined />}>Tải hình ảnh</Button>
        </Upload>
    </Form.Item>
  );
};

export default UploadThumbData;