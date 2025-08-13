import { Button, Popconfirm } from 'antd';
import React, { useState } from 'react';

const PopupConfirm = ({title,content,fetchAction,type="delete"}) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    
    const handleOk = () => {
        setConfirmLoading(true);
        try {
            fetchAction()
        } catch (error) {
            console.log(error)
        }
        setOpen(false);
        setConfirmLoading(false);
    };


    return (
      <Popconfirm
        title={title}
        description={content}
        open={open}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={() => setOpen(false) }
      >
        <Button type="primary" onClick={() =>  setOpen(true)}>
           Xóa
        </Button>
      </Popconfirm>
    );
}

export default PopupConfirm;    
