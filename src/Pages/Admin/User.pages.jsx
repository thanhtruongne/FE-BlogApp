import { DownOutlined, ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Form, Image, Modal, Pagination, Space, Table, Tag } from 'antd';
import { HttpStatusCode } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import GeneralAdminApi from '../../apis/admin/Users/General.api';
import showMessage from '../../Helpers/showMessage';
import FormResourceCreate from './components/FormResourceCreate';
const UserPages = () => {
  const [data,setData] = useState([]);
  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState('large');
  const [showHeader, setShowHeader] = useState(true);
  const [rowSelection, setRowSelection] = useState({});
  const [tableLayout, setTableLayout] = useState(undefined);
  const [optionsFilter,setOptionFilter] = useState({});
  const [params , setParams] = useState({})
  const [actionDo , setAction] = useState({ // để mã code hay ký tự cg dc
      block : 'code#blockAcc',
      delete : 'code#remove',
      create : 'code#create',
      edit : 'code#edit'
  })
  const [loadingModal, setLoadingModal] = useState(false)
  const [openModal,setOpenModal] = useState(false)
  const [fieldModal,setfieldModal] = useState({
    email : '',
    address : '',
    password : 'lock',
    status : '',
    role : '',
    _id : '',
    phone : '',
    full_name: '',
    previewAvatar : '',
    avatar : ''
  })  
  const [loadingBtn,setLoadingBtn] = useState(false);
  const [titleModal,setTitleModal] = useState('');
  const [type,setType] = useState({
    create : 'create###',edit : "edit##form##modal"
  })
  const {confirm} = Modal;
  const [optionType,setOptionType] = useState(null);



  const [form] = Form.useForm();

  const showModalEdit = useCallback(async(id) => { 
    setOpenModal(!openModal)
    setLoadingModal(!loadingModal)
    setOptionType(type?.edit)
    setTitleModal('Chỉnh sửa thông tin')
    try {
      let response = await GeneralAdminApi.getDetailUser(id)
        .then(res => {
          if(res.status == HttpStatusCode.Ok) {
            setfieldModal(res?.data)
          }
        })
    } catch (error) {
      showMessage(error.message,'error');
      
    }
    setLoadingModal(!loadingModal)

  },[openModal])


  
  const handleCloseModal = () => {
    form.resetFields();
    setOpenModal(!openModal)
  }

  const fetchDataUsers = async(params) => {
       try {
          setLoading(true)
          const res = await GeneralAdminApi.getAllDataUsers(params);
          if(res?.status == HttpStatusCode.Ok) {
              setData(res?.data);
              setOptionFilter(res.options)
              setLoading(false)
          }
       } catch (error) {
          showMessage(error.message,'error')
          setLoading(false)
          return;
       }
  }

  useEffect(() => {
    fetchDataUsers(params)
  },[params])


  const handleOptionUser = (type,id = null ,email = null) => {
    switch(type) {
        case actionDo.block :
          break;
        case actionDo.delete:
          showDeleteConfirm(email,id); // xóa resource
          break;
        case actionDo.create:
          showModalCreate(); // xóa resource
          break;
        case actionDo.edit : 
          showModalEdit(id) // mở modal
          break;
        default : 
          break; 
    }
  }

  const handleSubmit = async(data,optionType) => {
    setLoadingBtn(true)
    console.log(data,optionType)
    try {
      if(data) {
        if(optionType == type?.create) {
          const response = await GeneralAdminApi.storeDataUser(data)
        } 
        if(optionType == type?.edit) {
          const response = await GeneralAdminApi.updateDataUser(data,data?._id)
        } 
        if(response?.status == HttpStatusCode.Ok) {
          showMessage(response?.message,'success')
        }
        fetchDataUsers()
        handleCloseModal()
      }
      else {
        showMessage(response?.message,'error')
      }
    } catch (error) {
      console.log(error,'Error')
      showMessage(error.message,'error')
    }
    setLoadingBtn(false)
  }


  const showDeleteConfirm = (email,_id) => {
    confirm({
      title: 'Bạn có chắc muốn xóa dữ liệu này không !',
      icon: <ExclamationCircleFilled />,
      content: email || ' ',
      okText: 'Confirm',
      cancelText: 'No',
      async onOk() {
         try {
           const resovleData = await GeneralAdminApi.removeResourceUser(_id)
           console.log(resovleData)
           if(resovleData?.status == HttpStatusCode.Ok) {
              showMessage(resovleData?.message,'success')
              fetchDataUsers()
              
           } else {
              showMessage(resovleData?.message,'warning')
              return
           }
         } catch (error) {
          showMessage(error.message,'error');
          return
         }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };


  const showModalCreate = () => {
    form.resetFields()
    setfieldModal({ email : '',
      address : '',
      password : 'lock',
      status : 'Active',
      role : '',
      _id : '',
      phone : '',
      full_name: '',
      previewAvatar : '',
      avatar : ''})
    setOpenModal(true)
    setOptionType(type?.create)
    setTitleModal('Tạo thông tin người dùng')
  }

  const tableColumns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'avatar',
      key : 'avatar',
      render : (value) => {
        return (  
        <Image
          width={150}
          src={value ?? ' '}
        /> )
      
      }
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
      render : (value) =>  {
      return  (
          <span>
            <Tag color={value == 'Active' ? '#87d068' : "#f50"} key={value}>
                {value}
            </Tag> 
          </span>
         )
      }
       
     
      
    },
    {
      title: 'Hoạt động',
      dataIndex : 'timeMoment'
    },
    {
      title : 'Action',
      key: 'action',
      sort  :true,
      render : (record) => {       
        const itemsAction = [ 
          {
            key: '1',
            danger: true,
            label : (
              <a onClick={() => handleOptionUser(actionDo.delete,record._id,record?.email)} rel="noopener noreferrer" href="#">
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
        return(
          <Space size="middle">
            <Button onClick={() => handleOptionUser(actionDo.edit,record._id)} color='default' type="primary">Chỉnh sửa</Button>
          <Dropdown
            menu={{ items: itemsAction }}
            trigger={["click"]} 
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

  return (
    <div>
    <div className="mt-3 grid  gap-5">
        <div className="text-right">
          <Button type='primary'  icon={<PlusOutlined /> } onClick={() => handleOptionUser(actionDo?.create)} danger>
             Thêm mới
          </Button>
        </div>
        <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none w-full h-full p-4">       
        <Table
          {...tableProps}
          pagination={false}
          columns={tableColumns}
          dataSource={data}
          // scroll={scroll}
        />
        <Pagination 
          pageSize={3}
          defaultCurrent={optionsFilter?.totalPages}
          total={optionsFilter?.totalItems}
          onChange={(page, size) => {
             setParams({
                page : page
             })
          }}
          style={{ marginTop: "20px", justifyContent: "right" }}
        />
        </div>
    </div>
    
    <Modal
        title={titleModal}
        open={openModal}
        confirmLoading={loadingModal}
        footer={null}
        onCancel={handleCloseModal}
      >
        <FormResourceCreate 
          form={form}
          type={optionType}
          data={fieldModal}
          setData={setfieldModal}
          handleSubmit={handleSubmit}
          handleCloseModal={handleCloseModal}
          loadingBtn={loadingBtn}
        />
    </Modal>
  </div>
  )
   
}



export default UserPages