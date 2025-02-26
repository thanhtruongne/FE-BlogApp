import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
  const UploadMultiple = (
      {
        data,
        setData,
        name,
        form
      }
    ) => {
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState("");
    const [previewVisible, setPreviewVisible] = useState(false);
    

    useEffect(() => {
      if(data?.multipleImageURL) {
        const files = data.multipleImageURL.map((url, index) => ({
            uid: `-${index}`,
            name: `image-${index}.jpg`,
            status: "done",
            url,
          }));

        setFileList(files)  
      }
    },[data?.multipleImageURL])




    const handleChange = ({ fileList }) => {
      setFileList(fileList); // Giữ lại duy nhất 1 file
      if (fileList.length > 0) {
        const files = fileList.map(item => item.originFileObj)
        setData((prev) => ({...prev,images : files})); 
        form.setFieldValue(name, files);
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
          <Upload
              accept="image/*" 
              fileList={fileList}
              name={name}
              multiple
              action={null}
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok"); 
                }, 300);
              }}
              onPreview={handlePreview}
              onChange={handleChange}
            >
                {fileList.length === 0 && (
                  <Button icon={<PlusOutlined />}>Tải ảnh lên</Button>
                )}
            </Upload>
        <Modal open={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
            <img alt="avatar preview" style={{ width: "100%" }} src={previewImage} />
          </Modal>
      </div>

    );
  };

  export default UploadMultiple;