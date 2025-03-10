import React, { useState, useEffect } from 'react';
import { BackTop, Button, FloatButton } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const ScrollPage = () => {
  const [open, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>   
      <FloatButton.BackTop style={{display: 'inline-block'}} icon={<SendOutlined rotate={-90} />}>
            <Button type="default" shape="circle" style={{height:"39px",width:"39px"}}   />
      </FloatButton.BackTop>
    </>
  );
};

export default ScrollPage;