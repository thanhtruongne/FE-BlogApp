
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthorAPI from '../../../../apis/admin/Authors/AuthorAPI';
import CategoriesAPI from '../../../../apis/admin/Categories/CategoriesAPI';
import PostAPI from '../../../../apis/admin/Categories/Post/PostAPI';
import { StatusSelect, TreeSelect } from '../../../../components/Customs/Select';
import showMessage from '../../../../Helpers/showMessage';
import AdminPaths from '../../../../Routes/RoutePaths/AdminPaths';
import constants from '../../../../utils/constants';
import CkEditorComponent from './CkEditor';
import UploadThumbData from './Upload';
import UploadMultiple from './UploadMultiple';
import UploadVideos from './UploadVideo';


const FormBlogPage = ({ setDataComment }) => {
  const { Option } = Select
  const [form] = Form.useForm();
  const [data, setData] = useState({})
  const [dataForm, setDataForm] = useState({});
  const [treeData, setTreeData] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [isTrending, setIsTrending] = useState(dataForm?.isTrending ?? false);
  const [hidden, setHidden] = useState(false)
  const [hiddenVideo, sethiddenVideo] = useState(false)
  const [dataAuthor, setDataAuthor] = useState([]);
  const [type, setType] = useState(1);
  const [isDisabledSelect, setIsDisabledSelect] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchDataTree = async () => {
    try {
      await CategoriesAPI.fetchDataTreeCate()
        .then(res => {
          if (res.status == HttpStatusCode.Ok) {
            setTreeData(res.data)
          }
        })

      await AuthorAPI.fetchGetAllData({ select: "_id full_name" })
        .then(res => {
          console.log(res);
          if (res.status == HttpStatusCode.Ok) {
            let data = res.data;
            if (data.length > 0) {
              data = data.map(item => ({ ...item, label: item.full_name, value: item._id }))
            }
            setDataAuthor(data)
          }
        })

    } catch (error) {
      console.log(error);
      showMessage('Có lỗi xảy ra', 'error');
      return;
    }
  }

  const fetchDetailResouce = async (id) => {
    try {
      await PostAPI.fetchGetDataDetail(id)
        .then(res => {
          if (res.status == HttpStatusCode.Ok) {
            setDataComment(res.data.comments) //  set comment
            console.log(res.data.categories_id?._id, 'res,dats')
            setDataForm(res.data)
            setIsTrending(res.data.isTrending)
            setType(res.data.type)
            if (res.data.type == 2) {
              setHidden(true)
            }
            if (res.data?.media_type == 3) {
              sethiddenVideo(true);
              setIsDisabledSelect(!isDisabledSelect)
            }
            form.setFieldsValue(res.data)

          }
        })
    } catch (error) {
      showMessage('Có lỗi xảy ra', 'error');
      return;
    }
  }

  useEffect(() => {
    fetchDataTree();
  }, [])

  useEffect(() => {
    if (id) {
      fetchDetailResouce(id)
    }

  }, [id])

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

  const fetchDataResource = async (payload, id = null) => {
    setLoadingBtn(true)
    try {
      if (id) {
        await PostAPI.fetchUpdateDataResource(id, payload)
          .then(res => {
            if (res.status == HttpStatusCode.Ok) {
              showMessage(res.message, 'success');
              window.location.reload();
            }
          })
      }
      else {
        await PostAPI.fetchStoreResourceData(payload)
          .then(res => {
            if (res.status == HttpStatusCode.Ok) {
              navigate(AdminPaths.MANAGER_POST);
              showMessage(res.message, 'success');
            }
          })
      }
    } catch (error) {
      showMessage('Có lỗi xảy ra', 'error');
    }
    setLoadingBtn(false)
  }

  const handleChangeCheckbox = (e) => {
    setIsTrending(e.target.checked);
    console.log(e.target.checked);
    setData((prev) => ({ ...prev, isTrending: e.target.checked }))
  }


  const handleSubmit = async () => {
    try {
      const value = await form.validateFields()
      if (value) {
        value.content = data?.content
        value.isTrending = data.isTrending ? true : false
        const formData = new FormData();
        Object.keys(value).forEach((key) => {
          formData.append(key, value[key]);
        });
        formData.append('type', type);
        if (type == 1) {
          const images = data?.images || [];
          images.forEach((image) => {
            formData.append('images', image);
          });
        }


        fetchDataResource(formData, id)
      }
    } catch (error) {
      console.log('Error', error)
      showMessage(error.message, 'error')
    }

  };

  const handleOnChangeTreeSelect = (data) => {
    if (hidden && !data.includes(constants.GOC_NHIN_SLUG)) {
      setHidden(false); setType(1)
    }
    else if (typeof data == 'string' && data.includes(constants.GOC_NHIN_SLUG)) {
      setHidden(true);
      setType(2) // set theo bài post theo type
    }
    else if (typeof data == 'string' && data.includes(constants.VIDEO_SLUG)) {
      setHidden(true);
      setType(3) // set theo bài video
    }
  }


  const handleChangeMediaType = (value) => {
    if (value == 3) {
      sethiddenVideo(true)

    }
    else {
      sethiddenVideo(false)
    }
  }

  return (
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
                  }
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

              <Form.Item
                name="media_type"
                label="Thể loại"
                className='mt-2'
                rules={[
                  {
                    required: true,
                    message: 'Thể loại không được bỏ trống',
                  },
                ]}
              >
                <Select
                  allowClear
                  disabled={isDisabledSelect}
                  // defaultValue={1}
                  onChange={handleChangeMediaType}
                  showSearch
                  style={{ width: 200 }}
                  optionFilterProp="children" // Cho phép tìm kiếm theo label (nội dung hiển thị)
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  placeholder="Thể loại">
                  <Option value={1}>Bài viết</Option>
                  <Option value={2}>Ảnh</Option>
                  <Option value={3}>Video</Option>
                  <Option value={4} dis>Infogarphic</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="w-[50%]">
              {/* Upload */}
              <Form.Item
                name="thumb"
                label="Thumbnail"
                hidden={hidden}
                className='pr-3'
              // rules={!hidden ? [{required: true,message: 'Thumbnail thiệu không được bỏ trống'}] : null}
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
                name="videos"
                label="Video"
                hidden={!hiddenVideo}
                className='pr-3'
                rules={hiddenVideo ? [{ required: true, message: 'Video không được bỏ trống' }] : null}
              >
                <UploadVideos
                  name='videos'
                  form={form}
                  data={data}
                  setData={setData}
                  dataForm={dataForm}
                  setDataForm={setDataForm}
                />

              </Form.Item>


              <Form.Item
                name="images"
                label="Hình ảnh"
                hidden={hidden}
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

              <Form.Item
                name="author_id"
                label="Tác giả"
                hidden={!hidden}
                rules={hidden ? [{ required: true, message: "Tác giả không được bỏ trống" }] : null}
              >
                <Select
                  allowClear
                  options={dataAuthor}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? optionA?.title)?.toLowerCase().localeCompare((optionB?.label ?? optionB?.title)?.toLowerCase())
                  }
                  showSearch
                  placeholder="Tìm kiếm tác giả !"

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
            <Button loading={loadingBtn} type="primary" className='ml-6' htmlType="submit">
              Tạo dữ liệu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>

  )

}


export default FormBlogPage