import { Card,Avatar } from 'antd';
import React from 'react';
import { useNavigate  } from 'react-router-dom';
const { Meta } = Card;

const CardCustom = (props) => {
  const { href,title,description,icon } = props;
  const navigate = useNavigate();

  const handleRedirect = () => {
    if(href) return navigate(href)
  }


  return (
    <> 
      <Card  bordered={false} onClick={handleRedirect} style={{ cursor:'pointer' }}>
        <Meta
          className='flex items-center'
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={title}
          description={description}
        />  
      </Card>
    </>
  );
}

export default CardCustom;
