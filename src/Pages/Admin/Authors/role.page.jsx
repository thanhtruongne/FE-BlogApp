import { DownOutlined, ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Form, Modal, Space, Switch, Table } from "antd";
import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorAPI from '../../../apis/admin/Authors/AuthorAPI';
import showMessage from '../../../Helpers/showMessage';
import useStyle from '../../../hook/useStyles';
import FormModalRoleResource from './components/FormModalRoleResource';
import FormRoleSearching from './components/FormRoleSearch';
const RoleAuthorPage = () => {
  const navigate = useNavigate()
  const { styles } = useStyle();
  const [dataSource,setDataSource] = useState([]);
  const [dataForm,setDataForm] = useState({});
  const [params,setParams] = useState({});
  const [title , setTitle] = useState('');
  const [loadingModal, setLoadingModal] = useState(false);
  const [ openModal, setOpenModal] = useState(false);
  const [typeAction, setTypeOption] = useState({
      create : 'create#nested', edit : 'edit#nested',remove : "remove#nested"
  })
  const [loadingBtn,setLoadingBtn] = useState(false);
  const [type,setType] = useState('')
  const [loading,setLoading] = useState('')
  const [form] = Form.useForm();
  const {confirm} = Modal;
    const [loadingSwitch , setLoadingSwitch] = useState(false); 

  const columns = [
    {
      title: 'Title',
      render : (record) => record.label
       
    },
    {
        title: 'Trạng thái',
        render : (record) => {
          return (
            <Switch  
              onChange={(value) => handleChangeStatus(record?.value,value)} 
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
                <a onClick={() => handleOptionUser(typeAction.remove,record._id)} rel="noopener noreferrer" href="#">
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
              <Button onClick={() => handleOptionUser(typeAction.edit,record._id)} color='default' type="primary">Chỉnh sửa</Button>
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

  const handleFetchSearching = (values) => {

  }
  
  const handleChangeStatus = (id,status) => {

  }
  

  const showDeleteConfirm = (_id) => {
    confirm({
    title: 'Bạn có chắc muốn xóa dữ liệu này không !',
    icon: <ExclamationCircleFilled />,
    content: email || ' ',
    okText: 'Confirm',
    cancelText: 'No',
    async onOk() {
        try {
            await AuthorAPI.fetchRemoveRoleAuthor(_id)
        .then(res => {
            if(res?.status == HttpStatusCode.Ok) {
                showMessage(res?.message,'success')
                fetchDataUsers()
                
            } else {
                showMessage(res?.message,'warning')
                return
            }
        })        
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
const fetchDataRoleAuthorResource = async(params) => {
    try {
        setLoading(true)
        const res = await AuthorAPI.fetchGetDataRoleAuthor(params);
        if(res?.status == HttpStatusCode.Ok) {
            setDataSource(res?.data);
            setLoading(false)
        }
    } catch (error) {
        showMessage(error.message,'error')
        setLoading(false)
        return;
    }
} 
const handleSubmit = async(data,optionType) => {
    setLoadingBtn(true)
    try {
    if(data) {
        if(optionType == typeAction?.create) {
            await AuthorAPI.fetchStoreRoleAuthor(data)
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
        // fetchDataRoleAuthorResource(params)
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


  const handleOpenModalOption = (type, id = null) => {
    handleStoreResource(id,type);
  }
  const handleStoreResource = (id = null, type = null)  => {
    setOpenModal(true)  
    if(type == typeAction.create) {
        form.resetFields()
        setType(typeAction?.create)
        setTitle('Tạo thông tin vai trò')
    }
    if(type == typeAction.edit) {
        setType(typeAction?.edit)
        setTitle('Chỉnh sửa thông tin vai trò')
        // fetchDataDetail(id);
    }
    if(type == typeAction.remove) {
        showDeleteConfirm(id); 
    }
 }

  const handleCloseModal = () => {
    form.resetFields();
    setDataForm({})
    setOpenModal(false);
  }




  useEffect(() => {
    fetchDataRoleAuthorResource(params)
  },[])


  return (
    <div className="">
      <div className="flex justify-between items-centers my-8 px-4">
          <div className="w-[50%]">
                <FormRoleSearching 
                    fetchData={handleFetchSearching}
                />
          </div>
          <div className="mt-3">
              <Button type='primary' onClick={() => handleOpenModalOption(typeAction?.create)}  icon={<PlusOutlined /> }>
                  Thêm mới
              </Button>
              
          </div>
      </div>
      <div className="">
          <Table
              className={styles.customTable}
              columns={columns}
              dataSource={dataSource}
              pagination={{
                  pageSize: 10,
              }}
          />
      </div>

      <Modal
            title={title}
            open={openModal}
            confirmLoading={loadingModal}
            footer={null}
            onCancel={handleCloseModal}
        >
          <FormModalRoleResource 
             form={form}
             type={type}
             data={dataForm}
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


export default RoleAuthorPage