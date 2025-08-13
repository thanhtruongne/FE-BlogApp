
import { DownOutlined, PlusOutlined, StockOutlined } from '@ant-design/icons';
import { Button, Dropdown, Image, Space, Table, Tag } from 'antd';
import { HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorAPI from '../../../apis/admin/Authors/AuthorAPI';
import CategoriesAPI from '../../../apis/admin/Categories/CategoriesAPI';
import PostAPI from '../../../apis/admin/Categories/Post/PostAPI';
import showMessage from '../../../Helpers/showMessage';
import useStyle from '../../../hook/useStyles';
import AdminPaths from '../../../Routes/RoutePaths/AdminPaths';
import FormSearchingData from './components/FormSearchingData';
const BlogPage = () => {
    const navigate = useNavigate()
    const { styles } = useStyle();
    const [dataSource,setDataSource] = useState([]);
    const [dataForm,setDataForm] = useState({});
    const [option,setOption] = useState({});
    const [params,setParams] = useState(null);
    const [loadingTable, setloadingTable] = useState(false)
    const columns = [
        {
          title: 'Hình ảnh',
          dataIndex: 'imageURL',
          render : (record) =>{
            if (record && record != null) {
              return (
                  <Image
                  width={150}
                  src={record}
                /> 
              ) 
            }
            return null
          }
            
          
        },
        {
          title: 'Title',
          render : (record) => {
              if(record.type != 1) {
                return  <a onClick={() => navigate(AdminPaths.MANAGER_POST_FORM + '/' + record?._id)}>{record.author_id?.full_name} - {record.title}</a>} {record.isTrending && <StockOutlined style={{ fontSize : 25,color : 'green' }} />
              }
             return <a onClick={() => navigate(AdminPaths.MANAGER_POST_FORM + '/' + record?._id)}>{record.title} {record.isTrending && <StockOutlined style={{ fontSize : 25,color : 'green' }} />}</a> 
          }
        },
        {
          title: 'Danh mục',
          dataIndex: 'categories_id',
          render : (value) => value?.title
        },
        {
          title: 'Ngày đăng',
          dataIndex: 'timeMoment',
        },
        {
          title: 'Trạng thái',
          dataIndex: 'status',
          render : (record) => (
              <span>
                <Tag color={record == 'Active' ? '#87d068' : (record == "Pending" ? 'lime' : "#f50")} key={record}>
                    {record == 'Active' ? "Đã duyệt" : (record == 'Pending' ? "Chờ duyệt" : "Tạm khóa")}
                </Tag> 
               </span>
          )

          
        //   width: 150,
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
                <Button color='default' type="primary">Chỉnh sửa</Button>
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
    const [type,setType] = useState({
        create : "create#post",edit : 'edit#post'
    })

    const fetchDataBlog = async() => {
     try {

        await AuthorAPI.fetchGetAllData({select : '_id full_name'})
        .then(res => {
          if(res.status == HttpStatusCode.Ok) {
            setDataForm(prev => ({...prev,role_id : res.data}));
            setOption(res.options)
         }
        })

     } catch (error) {
      showMessage(error.message,'error');
      return
     }
    }

    const fetchSearchBlog = async() => {
       try {
        await CategoriesAPI.fetchDataTreeCate()
        .then(res => {
            if(res.status == HttpStatusCode.Ok) {
              setDataForm({...dataForm,category : res.data})
            }
        })
       } catch (error) {
         showMessage(error.message,'error');
         return
       }
    }

    const fetchingSearching = async(values) => {
      setloadingTable(true)
      try {
        console.log(values,'valuessss')
        await PostAPI.fetchGetAllData(values)
        .then(res => {
            if(res.status  == HttpStatusCode.Ok) {
              setDataSource(res.data);
               setOption(res.options)
            }
        })
      } catch (error) {
        showMessage(error.message,'error');
      }
      setloadingTable(false)
    }

    useEffect(() => {
      fetchDataBlog()
      fetchSearchBlog()
    },[])

    useEffect(() => {
      console.log(params,'params')
       if(params) {
          fetchingSearching(params)
       }
    },[params])

    const handleRedirectForm = (typeAction) => {
        if( typeAction == type.create) {
            navigate(AdminPaths.MANAGER_POST_FORM)
        }
    }

    const handleTableChange = async(pagination) => {
      setParams({page: pagination});
    }

    return  (
        <div className="">
            <div className="flex justify-between items-centers my-8">
                <div className="w-[60%]">
                  <FormSearchingData 
                      className=""
                      dataForm={dataForm}
                      setDataForm={setDataSource}
                      fetchData={fetchingSearching}
                  />
                </div>
                <div className="mt-3">
                    <Button type='primary' onClick={() => handleRedirectForm(type.create)}  icon={<PlusOutlined /> }>
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
                        current: option.page,
                        pageSize: option.itemsPerPage,
                        total: option.totalItems, 
                        onChange: handleTableChange
                    }}
                    loading={loadingTable}
                />
            </div>
        </div>
      
    )

}


export default BlogPage