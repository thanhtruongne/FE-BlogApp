  import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';



  const UploadAvatarResource = ({ data, setData }) => {
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState("");
    const [previewVisible, setPreviewVisible] = useState(false);
    useEffect(() => {
      if (data?.avatar && data?.avatar !== "null" && data?.avatar !== "") {
        setFileList([
          {
            uid: "-1",
            name: "avatar",
            status: "done",
            url: typeof data.avatar === "string" ? data.avatar : URL.createObjectURL(data.avatar),
          },
        ]);
      } else {
        setFileList([]);
      }
    }, [data]);

    const handleChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
      if (newFileList.length > 0) {
        const file = newFileList[0].originFileObj;
        const imageUrl = URL.createObjectURL(file);
        setData({ ...data,avatar : file }); 
        setPreviewImage(imageUrl);
        console.log(newFileList)
      }
    }

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
      <div className="">

      
      <ImgCrop rotationSlider>
        <Upload
          name="avatar"
          accept="image/*"
          fileList={fileList}
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

  export default UploadAvatarResource;