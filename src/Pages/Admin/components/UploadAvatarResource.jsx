import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import showMessage from '../../../Helpers/showMessage';



const UploadAvatarResource = ({ data, setData }) => {
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  useEffect(() => {
      if(data?.avatar) {
        setFileList([
          {
            uid: "-1",
            name: data?.full_name,
            status: "done",
            url: data.avatar,
          },
        ]);
      } 
      else {
        setFileList([])
      }

  }, [data]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      const imageUrl = URL.createObjectURL(file);
      setData({ ...data,avatar : file }); 
      setPreviewImage(imageUrl);
      console.log(data)
    }
  };


  const beforeUpload = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp",'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      showMessage("Chỉ chấp nhận file ảnh (JPG, PNG, WEBP)",'error');
      // setFileList([])
      return;
    }
    return true;
  };



  const handlePreview = () => {
    setPreviewVisible(true);
    console.log(previewVisible)
  };
  return (
    <div className="">

    
    <ImgCrop rotationSlider>
    <Upload
      name="avatar"
      listType="picture-circle"
      fileList={fileList}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      onPreview={handlePreview}
      maxCount={1}
      showUploadList={{ showPreviewIcon: false }}
    >
      {fileList.length === 0 && (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
        </div>
      )}
      {/* {imageURL ?? <img />} */}
    </Upload>
  </ImgCrop>

  <Modal open={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
    <img alt="avatar preview" style={{ width: "100%" }} src={previewImage} />
  </Modal>
</div>
  );
};

export default UploadAvatarResource;