import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Space, Switch, Table } from 'antd';
import { HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react';
import CategoriesAPI from '../../apis/admin/Categories/CategoriesAPI';
import showMessage from '../../Helpers/showMessage';
import FormResourceCategories from './components/FormResourceCategories';
const CategoriesPages = () => {
    const { confirm } = Modal;
    const [title , setTitle] = useState('');
    const [loadingModal, setLoadingModal] = useState(false);
    const [ openModal, setOpenModal] = useState(false);
    const [typeAction, setTypeOption] = useState({
        create : 'create#nested', edit : 'edit#nested'
    })
    const [loadingBtn,setLoadingBtn] = useState(false);
    const [type,setType] = useState('')
    const [form] = Form.useForm()
    const [data,setData] = useState({
        title : '',
        description : '',
        status : 'Active',
        parent_id : '',
        _id : '',
    })  
    const [params , setParams] = useState({})
    const [dataTree, setDataTree] = useState([]);
    const [loadingSwitch , setLoadingSwitch] = useState(false); 



    const fetchDataTree = async() => {
      try {
        const response = await CategoriesAPI.fetchDataTreeCate()
        .then(res => {
           if(res.status == HttpStatusCode.Ok) {
             setDataTree(res.data)
           }
        })
      } catch (error) {
        console.log(error);
        showMessage('Có lỗi xảy ra','error');
        return;
      }
    }

    const fetchDataDetail = async(_id) => {
      try {
        const response = await CategoriesAPI.fetchGetDetailResource(_id)
        .then(res => {
           if(res.status == HttpStatusCode.Ok) {
             setData(res.data)
           }
        })
      } catch (error) {
        console.log(error);
        showMessage('Có lỗi xảy ra','error');
        return;
      }
    }
  

    useEffect(() => {
      fetchDataTree()
    },[])

    const handleChangeStatus = async(_id,value) => {
      setLoadingSwitch(true)
   
      try {
        const response = await CategoriesAPI.fetchChangeStatus(_id,value)
        .then(res => {
          if(res?.status == HttpStatusCode.Ok) {
            showMessage(res?.message,'success')
            fetchDataTree();
          }
        })
        
      } catch (error) {
        console.log(error,'Error');
      }
      setLoadingSwitch(false)
    }

    const columns = [
        {
          title: 'Tiêu đề',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Slug',
          dataIndex: 'slug',
          key: 'slug',
        },
        {
          title: 'Trạng thái',
          // dataIndex: 'status',
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
          title: 'Action',
          key: 'operation',
          render: (record) =>  
           (
            <Space size="middle">
                <Button color='default' onClick={() => handleOpenModalOption(typeAction.edit,record?.value)} type="primary">Chỉnh sửa</Button>
                <Button color='default' onClick={() => showPromiseConfirm(record)} danger type="primary">Xóa</Button>
            </Space>
           )
          ,
        },
    ];
    const handleOpenModalOption = (type, id = null) => {
        handleCategoriesResource(id,type);
    }

    const handleCloseModal = () => {
        form.resetFields();
        setOpenModal(false);
    }

    
    const handleCategoriesResource = (id = null, type = null)  => {
        setOpenModal(true)  
        if(type == typeAction.create) {
            form.resetFields()
            setType(typeAction?.create)
            setTitle('Tạo thông tin danh mục')
        }
        if(type == typeAction.edit) {
            setType(typeAction?.edit)
            setTitle('Chỉnh sửa thông tin danh mục')
            fetchDataDetail(id);
        }
    }

    const handleSubmit = async(data,type) => {
        setLoadingBtn(true)
        try {
           if(type == typeAction.create) {
              const response = await CategoriesAPI.storeCategoriesData(data)
              .then(res => {
                if(res?.status == HttpStatusCode.Ok) {
                  showMessage(res.message,'success');
                }      
              })
           }
           fetchDataTree()
           handleCloseModal()
        } catch (error) {
            console.log(error)
            showMessage(error.message,'error');
        }
        setLoadingBtn(false);
        
    }

    const showPromiseConfirm = (record) => {
      confirm({
        title: 'Bạn có muốn xóa danh mục ' + record?.title,
        icon: <ExclamationCircleFilled />,
        async onOk() {
           try {
            const response = await CategoriesAPI.fetchRemoveResource(record?.value)
            .then(res => {
              console.log(res)
              if(res.status == HttpStatusCode.Ok) {
                showMessage(res.message,'success');
                fetchDataTree();
              }
            })
           } catch (error) {
            showMessage(error.message,'error');
            console.log(error);
           }
        },
        onCancel() {

        },
      });
    };



    return  (
        <div className="">
            <div className="mt-3 grid  gap-5">
                <div className="text-right">
                    <Button type='primary'  icon={<PlusOutlined /> } onClick={() => handleOpenModalOption(typeAction?.create)} danger>
                        Thêm mới
                    </Button>
                </div>
                <Table
                    rowKey={(record) => record.value}
                    columns={columns}
                    pagination={false}
                    dataSource={dataTree ?? []}
                    size="middle"
                />
                {/* <Pagination 
                    pageSize={3}
                    defaultCurrent={optionsFilter?.totalPages}
                    total={optionsFilter?.totalItems}
                    onChange={(page, size) => {
                        setParams({
                            page : page
                        })
                    }}
                    style={{ marginTop: "20px", justifyContent: "right" }}
                /> */}
            </div>
        <Modal
            title={title}
            open={openModal}
            confirmLoading={loadingModal}
            footer={null}
            onCancel={() => {
                setOpenModal(!openModal)
            }}
        >
            <FormResourceCategories 
                form={form}
                dataTree={dataTree}
                type={type}
                data={data}
                actionType={typeAction}
                setData={setData}
                handleSubmit={handleSubmit}
                handleCloseModal={handleCloseModal}
                loadingBtn={loadingBtn}
            />
        </Modal>
        </div>
    )

}


export default CategoriesPages