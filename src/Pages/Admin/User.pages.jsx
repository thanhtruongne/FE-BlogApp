import React, { useState,useEffect } from "react"
import { DownOutlined } from '@ant-design/icons';
import { Form, Radio, Space,Tag, Switch, Table,Dropdown } from 'antd';
import GeneralApi from "../../ServicesAPI/General.api";
import { HttpStatusCode } from "axios";

const UserPages = () => {
  const [data,setData] = useState([]);
  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState('large');
  const [showTitle, setShowTitle] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [rowSelection, setRowSelection] = useState({});
  const [tableLayout, setTableLayout] = useState(undefined);
  const [top, setTop] = useState('none');
  const [bottom, setBottom] = useState('bottomRight');

  const fetchDataUsers = async() => {
   
       try {
        setLoading(true)
        const res = await GeneralApi.getAllDataUsers();
        if(res?.status == HttpStatusCode.Ok) {
          setData(res?.data);
          setLoading(false)
        }
       } catch (error) {
          console.log(error);
          setLoading(false)
       }
  }

  useEffect(() => {
    fetchDataUsers()
  },[])

  const itemsAction = [ 
    {
      key: '1',
      danger: true,
      label : (
        <a target="_blank" rel="noopener noreferrer" href="#">
          Xóa
        </a>
      )
    },
    {
      key: '2',
      label : (
        <a target="_blank" rel="noopener noreferrer" href="#">
         Gửi thông báo
        </a>
      )
    },
  ]

  const tableColumns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'avatar',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'full_name',
    },
    {
      title: 'Email',
      dataIndex : 'email',
      sorter: (a, b) => a.email - b.email,
      
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Bài đăng',
      dataIndex : 'posts'
    },
    {
      title: 'Trạng thái',
      dataIndex : 'status',
      key: 'status',
      render : (value) => 
       (
        <span>
          <Tag color={value == 'Active' ? 'success' : "error"} key={value}>
              {value}
          </Tag> 
        </span>
       )
      
    },
    {
      title : 'Action',
      key: 'action',
      sort  :true,
      render : () => {
      return(
        <Space size="middle">
        <a>Chỉnh sửa</a>
        <Dropdown
           menu={{ items: itemsAction }} // Use menu with items for Ant Design v5
           trigger={["click"]} // Define the trigger explicitly
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Tùy chọn
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
      </Space>
      )
      }
    }
  ]

  const tableProps = {
    bordered,
    loading,
    size,
    title:  undefined,
    showHeader,
    footer:  undefined,
    rowSelection,
    tableLayout: tableLayout ,
  };

  const scroll = {
    y  : 240,
    x : '100vw'
  };

  return (
    <div>
    <div className="mt-3 grid  gap-5">
        <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none w-full h-full p-4">       
        <Table
          {...tableProps}
          pagination={{
            position: [top, bottom],
          }}
          columns={tableColumns}
          dataSource={data}
          // scroll={scroll}
        />
        </div>
    </div>
  </div>
  )
   
}



export default UserPages