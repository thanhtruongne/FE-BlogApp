
import { AppstoreAddOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStyle from '../../../hook/useStyles';
import AdminPaths from '../../../Routes/RoutePaths/AdminPaths';
const BlogPage = () => {
    const navigate = useNavigate()
    const { styles } = useStyle();
    const [dataSource,setDataSource] = useState([]);
    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
        //   width: 150,
        },
        {
          title: 'Age',
          dataIndex: 'age',
        //   width: 150,
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
    ];
    const [type,setType] = useState({
        create : "create#post",edit : 'edit#post'
    })

    const handleRedirectForm = (typeAction) => {
        if( typeAction == type.create) {
            navigate(AdminPaths.MANAGER_POST_FORM)
        }
    }

    return  (
        <div className="">
            <div className="">
                <div className="text-right mt-3">
                    <Button type='primary' onClick={() => handleRedirectForm(type.create)}  icon={<PlusOutlined /> }>
                        Thêm mới
                    </Button>

                    <Button 
                        type='primary' 
                        style={{ background : 'green' }} 
                        className='ml-4'
                        icon={<AppstoreAddOutlined /> }>
                        Duyệt bình luận
                    </Button>
                </div>
            </div>
            <div className="">
                <Table
                    className={styles.customTable}
                    columns={columns}
                    dataSource={[]}
                    pagination={{
                        pageSize: 50,
                    }}
                    scroll={{
                        y: 55 * 5,
                    }}
                />
            </div>
        </div>
      
    )

}


export default BlogPage