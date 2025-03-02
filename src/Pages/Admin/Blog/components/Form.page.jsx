
import { Button, Checkbox, Form, Input } from 'antd';
import { HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoriesAPI from '../../../../apis/admin/Categories/CategoriesAPI';
import PostAPI from '../../../../apis/admin/Post/PostAPI';
import { StatusSelect, TreeSelect } from '../../../../components/Customs/Select';
import showMessage from '../../../../Helpers/showMessage';
import AdminPaths from '../../../../Routes/RoutePaths/AdminPaths';
import constants from '../../../../utils/constants';
import CkEditorComponent from './CkEditor';
import UploadThumbData from './Upload';
import UploadMultiple from './UploadMultiple';

const FormBlogPage = () => {
    const [form] = Form.useForm();
    const [data,setData] = useState({})
    const [dataForm,setDataForm] = useState({});
    const [treeData,setTreeData] = useState([]);
    const [loadingBtn,setLoadingBtn] = useState(false)
    const [isTrending, setIsTrending] = useState(dataForm?.isTrending ?? false);
    
    const [opentAvatar,setAvatar] = useState(false);


    const navigate = useNavigate();
    const {id} = useParams();
  
      const fetchDataTree = async() => {
        try {
           await CategoriesAPI.fetchDataTreeCate()
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

    const fetchDetailResouce = async(id) => {
      try {
           await PostAPI.fetchGetDataDetail(id)
           .then(res => {
              if(res.status == HttpStatusCode.Ok) {
                setDataForm(res.data)
                setIsTrending(res.data.isTrending)
                form.setFieldsValue(res.data)
              }
           })
      } catch (error) {
        showMessage('Có lỗi xảy ra','error');
        return;
      }
    }
      
    useEffect(() => {
      console.log("fetchDataTree running");
      fetchDataTree();
    },[])

    useEffect(() => {
      if(id) {
        fetchDetailResouce(id)
      }
     
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
      setLoadingBtn(true)
      try {
        if(id) {
          await PostAPI.fetchUpdateDataResource(id,payload)
          .then(res => {
            if(res.status == HttpStatusCode.Ok) {
                window.location.reload();
                showMessage(res.message,'success');
            }
          })
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
        showMessage('Có lỗi xảy ra','error');
      }
      setLoadingBtn(false)
    }

    const handleChangeCheckbox = (e) => {
      setIsTrending(e.target.checked);
      console.log(e.target.checked);
      setData((prev) => ({...prev,isTrending : e.target.checked}))
    }


    const handleSubmit = async() => {
       try {  
            const value = await form.validateFields()
            if(value) {
              value.content = data?.content
              value.isTrending = data.isTrending ?? false
              const formData = new FormData();
              Object.keys(value).forEach((key) => {
                formData.append(key, value[key]);
              });
              const images = data?.images || [];
              console.log(images,data);
              images.forEach((image) => {
                formData.append('images', image);
              });
             
              console.log(formData.entries(),value)
              // fetchDataResource(formData,id)
            }    
        } catch (error) {
            console.log('Error',error)
            showMessage(error.message,'error') 
        }   
      
    };

    const handleOnChangeTreeSelect = (data) => {
        if(typeof data == 'string' && data.includes(constants.GOC_NHIN_SLUG)) {
          setAvatar(true);
        }
    }
      
    return  (
      <div className="">
        <div className="mt-4 h-full bg-white pt-[40px]">
            <Form
                {...formItemLayout}
                form={form}
                // name='form-upsert-blog-data'
                className='w-full'
                onFinish={handleSubmit}
                  // layout="vertical" 
                autoComplete="off"
                scrollToFirstError
            >
          <div className="flex">
            <div className="w-[50%]">
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
            </div>

            <div className="w-[50%]">
                  {/* Upload */}
                  <Form.Item
                    name="thumb"
                    label="Thumbnail"
                    className='pr-3'
                    rules={[
                      {
                          required: true,
                          message: 'Thumbnail thiệu không được bỏ trống',
                      },
                      ]}
                  >
                    <UploadThumbData 
                        name="thumb"
                        data={data}
                        label={"Thumbnail"}
                        setData={setData}
                        form={form}
                        dataForm={dataForm}
                        setDataForm={setDataForm}
                    />

                  </Form.Item>

                  <Form.Item
                    name="images"
                    label="Hình ảnh"
                    // rules={[{required : true, message : "Hình ảnh không được bỏ trống"}]}
                  >
                    <UploadMultiple 
                        name="images"
                        data={data}
                        setData={setData}
                        form={form}
                        dataForm={dataForm}
                        setDataForm={setDataForm}
                    />

                  </Form.Item>

                  {/* Categories */}
                  <TreeSelect 
                      name="categories_id"
                      value={dataForm?.categories_id}
                      placeHolder='Chọn danh mục'
                      data={treeData}
                      label={"Danh mục"}
                      className="mt-8"
                      handleOnChange={handleOnChangeTreeSelect}
                  />
                  {/* status */}
                  <StatusSelect
                     name="status"
                     label="Trạng thái"
                     value={dataForm?.status}
                     className="mt-8"

                  />

                  <Form.Item
                     className='pl-3'
                     label="Tin xu hướng"
                     name='isTrending'
                  > 
                    <Checkbox 
                        onChange={handleChangeCheckbox}
                        // name='isTrending'
                        checked={isTrending}
                    />
                  </Form.Item>


            </div>  
           

          </div>
          <div className="w-full mt-5"> 
              <CkEditorComponent 
                content={dataForm?.content} 
                name="content"
                data={data}
                setData={setData}
              />
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