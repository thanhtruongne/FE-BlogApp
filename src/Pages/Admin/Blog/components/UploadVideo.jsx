import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
  const UploadVideos = (
      {
        dataForm,
        setDataForm,
        setData,
        name,
        form
      }
    ) => {
    const [videoUrl, setVideoUrl] = useState(null);
    

    useEffect(() => {
      if(dataForm?.videoURL &&  dataForm?.videoURL != undefined) {
        setVideoUrl(dataForm?.videoURL)
      }
    },[dataForm])


    const beforeUpload = (file) => {
        const isVideo = file.type.startsWith("video/");
        if (!isVideo) {
          message.error("Chỉ được phép upload file video!");
        }
        return isVideo;
      };

    const handleChange = (info) => {
        if (videoUrl) { 
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(info.file.originFileObj);
        setVideoUrl(url);
        setData((prev) => ({...prev,videos : info.file.originFileObj})); 
        form.setFieldValue(name, info.file.originFileObj);
    };



    return (
       <div>
          <Upload
            accept="video/*"
            beforeUpload={beforeUpload}
            showUploadList={false}
            customRequest={({ file, onSuccess }) => {
            setTimeout(() => {
                onSuccess("ok");
            }, 1000);
            }}
            onChange={handleChange}
        >
            <Button icon={<UploadOutlined />}>Chọn Video</Button>
        </Upload>

        {videoUrl && (
            <div style={{ marginTop: 20 }}>
            <video width="100%" controls>
                <source src={videoUrl} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video.
            </video>
            </div>
        )}
      </div>

    );
  };

  export default UploadVideos;