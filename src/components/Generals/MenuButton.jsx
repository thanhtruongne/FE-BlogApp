import React, { useState } from 'react';
import { FloatButton, Tooltip } from 'antd';
import {CommentOutlined,EnvironmentOutlined,WechatWorkOutlined ,MenuOutlined} from '@ant-design/icons';

const MenuButton = () => {
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ display: 'inline-block' }}>
        <FloatButton.Group
            type='default'
            open={open}
            trigger="click"
            style={{ right: 24 }}
            icon={<MenuOutlined />}
        >
          {/* <Tooltip title="Góp ý" placement="left">
          <Tooltip title={Lang.get('lamenu.suggest')} placement="left">
            <FloatButton type='default' href='/student-suggest'  icon={<CommentOutlined />} />
          </Tooltip>
          {/* <Tooltip title="Địa điểm đào tạo" placement="left"> */}
          {/* <Tooltip title={Lang.get('lamenu.training_location')} placement="left">
            <FloatButton type='default' href='/google-map'  icon={<EnvironmentOutlined />} />
          </Tooltip> */}
          {/* <Tooltip title="Liên hệ" placement="left"> */}
          {/* <Tooltip title={Lang.get('lamenu.contact')} placement="left">
            <FloatButton type='default' href='/contact' icon={<WechatWorkOutlined />} />
          </Tooltip>  */}
        </FloatButton.Group>
      </div>
    </>
  );
};

export default MenuButton;