  import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import ImgCrop from 'antd-img-crop';
import React, { useState } from "react";
  const UploadThumbData = ({data,setData,name,label,form,rules=[{required : true,message : label + ' không đươc bỏ trống'}]}) => {
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState("");
    const [previewVisible, setPreviewVisible] = useState(false);
    
    const handleChange = ({ fileList: newFileList }) => {
      setFileList(newFileList); // Giữ lại duy nhất 1 file
      if (newFileList.length > 0) {
        const file = newFileList[0].originFileObj;
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
        setData({ ...data,thumb : file }); 
        form.setFieldValue(name, file);
      }
    };
    const handlePreview = async (file) => {
      if (file.url) {
        setPreviewImage(file.url);
      } else if (file.thumbUrl) {
        setPreviewImage(file.thumbUrl);
      } else {
        setPreviewImage(URL.createObjectURL(file.originFileObj));
      }
      setPreviewVisible(true);
    };


    return (
       <div>
        <ImgCrop rotationSlider>
          <Upload
              accept="image/*" 
              fileList={fileList}
              // name={name}
              action={null}
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok"); 
                }, 1000);
              }}
              onPreview={handlePreview}
              onChange={handleChange}
            >
                {fileList.length === 0 && (
                  <Button icon={<PlusOutlined />}>Tải ảnh lên</Button>
                )}
            </Upload>
        </ImgCrop>
        <Modal open={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
            <img alt="avatar preview" style={{ width: "100%" }} src={previewImage} />
          </Modal>
      </div>

    );
  };

  export default UploadThumbData;