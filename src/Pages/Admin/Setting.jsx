import { Button, Form } from 'antd';
import { HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react';
import GeneralApi from '../../apis/admin/General';
import showMessage from '../../Helpers/showMessage';
import UploadAvatarResource from './components/UploadAvatarResource';

const SettingPages = () => {
   const [form] = Form.useForm();
   const [data,setData] = useState([]);
   const [loadingBtn,setLoadingBtn] = useState(false)
   const handleSubmitData = async() => {
      try {
        const values = await form.getFieldsValue();
        if(values) {
           await GeneralApi.storeDataSetting(values)
           .then(res => {
              if(res.status == HttpStatusCode.Ok) {
                showMessage(res.message,'success')
                setData(res.data[0]) // reload lại component
              }
           })
        }
      } catch (error) {
        
      }
   }

   const fetchGetDataSetting = async() => {
      try {
        await GeneralApi.getDataSetting()
          .then(res => {
            if(res.status == HttpStatusCode.Ok) {
              form.setFieldsValue(res.data[0])
                setData(res.data[0]) // reload lại component
            }
        })
      } catch (error) {
        console.log(error,'Error')
        showMessage(error.message,'error');
      }
   }

   useEffect(() => {
      fetchGetDataSetting()
   },[])

    return  (
        <div>
        <div className="mt-3 grid  gap-5">
            <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none w-full h-full p-4">       
                <Form
                    form={form}
                    autoComplete='off'
                    layout="vertical"
                    className='py-[40px] m-6'
                    onFinish={handleSubmitData}
                >

                    <Form.Item
                       name="logo"
                       label="Logo"
                       rules={[{message: 'Logo không được bỏ trống', required : true}]}
                    >
                        <UploadAvatarResource
                          name={'logo'}
                          data={data}
                          form={form}
                          setData={setData}
                        />

                    </Form.Item>
                    <Form.Item 
                      className='pt-8'
                    >
                        <Button  loading={loadingBtn} type="primary" htmlType="submit">
                            Tạo dữ liệu
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>

      </div>
    )

}


export default SettingPages