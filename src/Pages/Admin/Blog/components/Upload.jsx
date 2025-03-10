import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useEffect, useState } from "react";

const UploadThumbData = ({ dataForm, setData, name, form }) => {
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    if (dataForm?.imageURL) {
      setFileList([
        {
          uid: "-1",
          name: "thumbnail.jpg",
          status: "done",
          url: dataForm.imageURL ?? null,
        },
      ]);
    }
  }, [dataForm?.imageURL]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj || newFileList[0].url;
      setData((prev) => ({ ...prev, thumb: file }));
      form.setFieldValue(name, file);
    }
  };

  const handlePreview = async (file) => {
    let imgSrc = file.url || file.thumbUrl;

    if (!imgSrc && file.originFileObj) {
      const blob = URL.createObjectURL(file.originFileObj);
      imgSrc = blob;
    }

    setPreviewImage(imgSrc);
    setPreviewVisible(true);
  };

  useEffect(() => {
    return () => {
      if (fileList) {
        URL.revokeObjectURL(fileList[0]?.url);
      }
    };
  }, [fileList]);

  
  return (
    <div>
      <ImgCrop rotationSlider>
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
          {fileList.length === 0 && <Button icon={<PlusOutlined />}>Tải ảnh lên</Button>}
        </Upload>
      </ImgCrop>

      <Modal open={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img alt="avatar preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default UploadThumbData;