
import { Button, Form, Input } from 'antd';
import { HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoriesAPI from '../../../../apis/admin/Categories/CategoriesAPI';
import PostAPI from '../../../../apis/admin/Post/PostAPI';
import { StatusSelect, TreeSelect } from '../../../../components/Customs/Select';
import showMessage from '../../../../Helpers/showMessage';
import AdminPaths from '../../../../Routes/RoutePaths/AdminPaths';
import CkEditorComponent from './CkEditor';
import UploadThumbData from './Upload';

const FormBlogPage = () => {
    const [form] = Form.useForm();
    const [data,setData] = useState({})
    const [treeData,setTreeData] = useState([]);
    const [loadingBtn,setLoadingBtn] = useState(false)
    const navigate = useNavigate();
    const {id} = useParams();
  
      const fetchDataTree = async() => {
        try {
          const response = await CategoriesAPI.fetchDataTreeCate()
          .then(res => {
             if(res.status == HttpStatusCode.Ok) {
              setTreeData(res.data)
             }
          })
        } catch (error) {
          console.log(error);
          showMessage('Có lỗi xảy ra','error');
          return;
        }
      }

    useEffect(() => {
      fetchDataTree();
    },[])

    useEffect(() => {
          console.log(id)
    },[id])

    const { TextArea } = Input;
    const formItemLayout = {
        labelCol: {
          xs: {
            span: 12,
          },
          sm: {
            span: 4,
          },
        },
        wrapperCol: {
          xs: {
            span: 54,
          },
          sm: {
            span: 16,
          },
        },
      };
    const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 2,
          },
        },
    };

    const fetchDataResource = async(payload,id = null) => {
      try {
        if(id) {
        
        } 
        else {
           await PostAPI.fetchStoreResourceData(payload)
            .then(res => {
              if(res.status == HttpStatusCode.Ok) {
                  navigate(AdminPaths.MANAGER_POST);
              }
            })
        }
      } catch (error) {
        console.log(error);
        showMessage('Có lỗi xảy ra','error');
        return;
      }
       
    }
    const handleSubmit = async() => {
       setLoadingBtn(true)
       try {
            const value = await form.validateFields()
            if(value) {
              value.content = data?.content
              value.thumb = data?.thumb
              fetchDataResource(value,id)
            }
               
                   
        } catch (error) {
            console.log('Error',error)
            showMessage(error.message,'error') 
        }   
        setLoadingBtn(false)
    };
    const normFile = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };
      
    return  (
      <div className="">
        <div className="mt-4 h-full bg-white pt-[40px]">
            <Form
                {...formItemLayout}
                form={form}
                name='form-upsert-blog-data'
                className='w-full'
                onFinish={handleSubmit}
                initialValues={{
                    // residence: ['zhejiang', 'hangzhou', 'xihu'],
                    // prefix: '86',
                }}
                // style={{
                //     maxWidth: 600,
                // }}
                scrollToFirstError
            >
          <div className="flex">
            <div className="w-[60%]">
                  <Form.Item
                      name="title"
                      label="Tiêu đề"
                      className='mt-2'
                      rules={[
                      {
                          required: true,
                          message: 'Tiêu đề không được bỏ trống',
                      },
                      ]}
                  >
                      <Input
                        type='text'
                        name="title"
                        maxLength={190}
                      />
                  </Form.Item>

                  <Form.Item
                      name="description"
                      label="Giới thiệu"
                      className='mt-2'
                      rules={[
                      {
                          required: true,
                          message: 'Phần giới thiệu không được bỏ trống',
                      },
                      ]}
                  >
                      <TextArea rows={4} />
                  </Form.Item>

                    <CkEditorComponent 
                      content={data?.content} 
                      name="content"
                      setData={setData}
                    />


                
            
            </div>

            <div className="w-[40%]">
                  {/* Upload */}
                  <UploadThumbData 
                      name="thumb"
                      data={data}
                      label={"Hình ảnh"}
                      setData={setData}
                   />

                  {/* Categories */}
                  <TreeSelect 
                      name="categories_id"
                      value={data?.categories_id}
                      placeHolder='Chọn danh mục'
                      data={treeData}
                      label={"Danh mục"}
                      className="mt-8"
                  />
                  {/* status */}
                  <StatusSelect
                     name="status"
                     label="Trạng thái"
                     value={data?.status}
                     className="mt-8"

                  />


            </div>  

          </div>
                <Form.Item {...tailFormItemLayout} className='py-[40px]'>
                  <Button  loading={loadingBtn} type="primary" className='ml-6' htmlType="submit">
                      Tạo dữ liệu
                  </Button>
                </Form.Item>
              </Form>
        </div>
      </div>
      
    )

}


export default FormBlogPage