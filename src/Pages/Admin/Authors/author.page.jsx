import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Form, Image, Modal, Space, Switch, Table } from "antd";
import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorAPI from '../../../apis/admin/Authors/AuthorAPI';
import showMessage from '../../../Helpers/showMessage';
import useStyle from '../../../hook/useStyles';
import FormModalResource from './components/FormModalResource';
import FormSearchAuthor from './components/FormSearchAuthor';


const AuthorPage = () => {
  const navigate = useNavigate()
  const { styles } = useStyle();
  const [dataSource,setDataSource] = useState([]);
  const [dataForm,setDataForm] = useState({});
  const [dataSelect,setDataSelect] = useState([])
  const [params,setParams] = useState({});
  const [title , setTitle] = useState('');
  const [loadingModal, setLoadingModal] = useState(false);
  const [ openModal, setOpenModal] = useState(false);
  const [typeAction, setTypeOption] = useState({
      create : 'create#nested',
       edit : 'edit#nested'
  })
  const [loadingBtn,setLoadingBtn] = useState(false);
  const [type,setType] = useState('')
  const [form] = Form.useForm();
  const [loading,setLoading] = useState(false);
  const [loadingSwitch , setLoadingSwitch] = useState(false);
  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'imageURL',
      render : (record) =>{
        if (record) {
          return (
              <Image
              className="rounded-full"
              width={150}
              height={150}
              src={record}
            /> 
          )
        }
      }
    },
    {
      title: 'Tên',
      render : (record) => record.full_name   
    },
    {
      title: 'Vai trò',
      dataIndex: 'role_id',
      render : (value) => value?.title
    },
    {
      title: 'Trạng thái',
      // dataIndex: 'status',
      render : (record) => {
        return (
          <Switch  
            onChange={(value) => handleChangeStatus(record?._id,value,'authors')} 
            loading={loadingSwitch}
            checked={record?.status == 'Active' ? true : false}
          />
        )
      }
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
              <a  rel="noopener noreferrer" href="#">
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
            <Button color='default' onClick={() => handleOpenModalOption(typeAction.edit,record?._id)} type="primary">Chỉnh sửa</Button>
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
  ];

  const handleChangeStatus = async(id,status,modelName) => {
    setLoadingSwitch(true)
     try {
      console.log(id,status,modelName)
       await AuthorAPI.fetchHandleChangeStatus({id,status,modelName})
        .then(res => {
          if(res.status == HttpStatusCode.Ok) {
            fetchDataAuthorResource(params)
          }
       })
     } catch (error) {
       showMessage(error.message,'error');

     }
     setLoadingSwitch(false)
  }

  const handleFetchSearching = () => {

  }

  const handleOpenModalOption = (type, id = null) => {
    handleStoreResource(id,type);
  }

  const fetchDataAuthorResource = async(params) => {
    setLoading(true)
    try {
      const res = await AuthorAPI.fetchGetAllData(params);
      if(res?.status == HttpStatusCode.Ok) {
          setDataSource(res?.data);
        }
       
    } catch (error) {
      showMessage(error.message,'error')
    }
    setLoading(false)
  } 

  const fetchDataRoleAuthorSelect = async() => {
    try {
      const res = await AuthorAPI.fetchGetDataRoleAuthor();
      if(res?.status == HttpStatusCode.Ok) {
        setDataSelect(res.data);
      }
    } catch (error) {
      showMessage(error.message,'error')
      return;
    }
  }

  const handleStoreResource = (id = null, type = null)  => {
   
    if(type == typeAction.create) {
        form.resetFields()
        setType(typeAction?.create)
        setTitle('Tạo thông tin tác giả')
         setOpenModal(true)  
    }
    if(type == typeAction.edit) {
        setType(typeAction?.edit)
        setTitle('Chỉnh sửa thông tin tác giả')
        fetchDataDetail(id);
         setOpenModal(true)  
    }
}

const fetchDataDetail = async(id) => {
  try {
    await AuthorAPI.fetchGetDetailByAuthorID(id)
    .then(res => {
      if(res.status == HttpStatusCode.Ok) {
          setDataForm(res.data);
      }
    })
  } catch (error) {
    
  }
}

  const handleCloseModal = () => {
    form.resetFields();
    setDataForm({})
    setOpenModal(false);
  }

 const handleSubmit = async(data,optionType) => {
    setLoadingBtn(true)
    try {
      if(data) {
        if(optionType == typeAction?.create) {
           await AuthorAPI.fetchStoreResourceData(data)
          .then(res => {
            if(res.status == HttpStatusCode.Ok) {
              showMessage(res?.message,'success')
            }
          })
        } 
        // if(optionType == type?.edit) {
        //   const response = await GeneralAdminApi.updateDataUser(data,data?._id)
        //   .then(res => {
        //     if(res.status == HttpStatusCode.Ok) {
        //       showMessage(response?.message,'success')
        //     }
        //   })
        // } 
        fetchDataAuthorResource(params)
        handleCloseModal()
      }
    } catch (error) {
      console.log(error,'Error')
      showMessage(error.message,'error')
    }
    setLoadingBtn(false)
  }

  useEffect(() => {
    fetchDataRoleAuthorSelect()
    fetchDataAuthorResource(params)
  },[])

  return (
    <div className="">
      <div className="flex justify-between items-centers my-8 px-4">
          <div className="w-[70%]">
            <FormSearchAuthor
                dataForm={dataForm}
                fetchData={handleFetchSearching}
            />
          </div>
          <div className="mt-3">
              <Button type='primary' onClick={() => handleOpenModalOption(typeAction?.create)}    icon={<PlusOutlined /> }>
                  Thêm mới
              </Button>
              
          </div>
      </div>
      <div className="p-4">
          <Table
              className={styles.customTable}
              columns={columns}
              dataSource={dataSource}
              pagination={{
                  pageSize: 10,
              }}
              // loading={loading}
          />
      </div>
      <Modal
            title={title}
            open={openModal}
            confirmLoading={loadingModal}
            footer={null}
            onCancel={handleCloseModal}
        >
          <FormModalResource 
             form={form}
             type={type}
             data={dataForm}
             dataForm={dataSelect}
             actionType={typeAction}
             setData={setDataForm}
             handleSubmit={handleSubmit}
             handleCloseModal={handleCloseModal}
             loadingBtn={loadingBtn}
          />
        </Modal>
  </div>
  )
}


export default AuthorPage