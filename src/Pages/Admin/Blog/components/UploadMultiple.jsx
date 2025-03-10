import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
  const UploadMultiple = (
      {
        dataForm,
        setDataForm,
        setData,
        name,
        form
      }
    ) => {
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState("");
    const [previewVisible, setPreviewVisible] = useState(false);
    

    useEffect(() => {
      console.log(dataForm.multipleImageURL,'multipleImageURL');
      if(dataForm?.multipleImageURL &&  dataForm?.multipleImageURL[0] != undefined) {
        const files = dataForm.multipleImageURL.map((url, index) => ({
            uid: `-${index}`,
            name: `image-${index}.jpg`,
            status: "done",
            url,
            val : dataForm?.images[index]
          }));
       
        setFileList(files)  
      }
    },[dataForm])




    const handleChange = ({ fileList }) => {
      console.log(fileList,'handleChnage')
      setFileList(fileList); // Giữ lại duy nhất 1 file
      if (fileList.length > 0) {
        const files = fileList.map(item => item.originFileObj || item.val)
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

    useEffect(() => {
      return () => {
        fileList.forEach(file => {
          if (file.url?.startsWith("blob:")) {
            URL.revokeObjectURL(file.url);
          }
        });
      };  
    }, [fileList]);


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
              // onRemove={handleRemove}
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