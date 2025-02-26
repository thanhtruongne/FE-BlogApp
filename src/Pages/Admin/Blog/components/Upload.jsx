    import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import ImgCrop from 'antd-img-crop';
import React, { useEffect, useState } from "react";
    const UploadThumbData = (
        {
          data,
          setData,
          name,
          label,
          form
        }
      ) => {
      const [fileList, setFileList] = useState([]);
      const [previewImage, setPreviewImage] = useState("");
      const [previewVisible, setPreviewVisible] = useState(false);
      

      useEffect(() => {
         if(data?.imageURL) {
          setFileList([
            {
              uid: "-1",
              name: "thumbnail.jpg",
              status: "done",
              url: data.imageURL, 
            },
          ]);
         }
      },[data?.imageURL])






      const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList); // Giữ lại duy nhất 1 file
        if (newFileList) {
          const file = newFileList[0].originFileObj;
          setData((prev) => ({...prev,thumb : file})); 
          form.setFieldValue(name, file);
          console.log(data);
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
          <ImgCrop rotationSlider >
            <Upload
                accept="image/*" 
                fileList={fileList}
                name={name}
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