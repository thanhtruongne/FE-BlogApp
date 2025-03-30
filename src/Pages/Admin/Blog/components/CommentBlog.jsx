
import { CheckCircleFilled, CloseCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import { Select, Table } from 'antd';
import { HttpStatusCode } from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import GeneralApi from '../../../../apis/General.api';
import PopupConfirm from '../../../../components/Generals/PopupConfirm';
import showMessage from '../../../../Helpers/showMessage';
import useStyle from '../../../../hook/useStyles';


const CommentBlog = ({dataComment}) => {
    const [loadingComment,setLoadingComment] = useState(false)
    const { styles } = useStyle();

    const optionsSelect = [
        {
            value: 'Active',
            label:  (
                <span>
                    Active
                    <CheckCircleFilled   style={{ color : "green",marginLeft : 9 }} />
                </span>
            ),
        },
        {
            value: 'Pending',
            label:  (
                <span>
                    Pending
                    <InfoCircleFilled style={{marginLeft : 9,color : 'yellow' }} />
                </span>
            ),
        },
        {
            value: 'Block',
            label:  (
                <span>
                    Block
                    <CloseCircleFilled style={{marginLeft : 9,color : 'red' }} />
                </span>
            ),
        }
    ]


    const handleDeleteComment = async(id) => {
        try {
            await GeneralApi.removeCommentBlog(id)
            .then(res => {
                if(res.status == HttpStatusCode.Ok){
                    showMessage(res.message,'success')
                }
            })
        } catch (error) {
            showMessage(error.message,'error')
        }
    }


    const handleChangeStatus = async(id,value) => {
        try {
            await GeneralApi.changeStatusComment(id,{status : value})
            .then(res => {
                if (res.status === HttpStatusCode.Ok) {
                    showMessage(res.message, 'success');
                }
            })
            .catch(error => showMessage(error?.message || 'Có lỗi xảy ra', 'error'))
        } catch (error) {
            console.log(error)
        }
    }




    const columns = [
          {
            title: 'Biệt danh',
            render : (record) => record.full_name   
          },
          {
            title: 'Nội dung',
            dataIndex: 'content',
          },
          {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            render : (record) => {
                return moment(record).format('DD/MM/YYYY HH:mm:ss')
            }
          },
          {
            title : 'Trạng thái',
            key: 'status',
            render : (record) => {       
              return(
                <Select
                    defaultValue={record?.status}
                    style={{
                        width: 120,
                    }}
                    onChange={(values) => handleChangeStatus(record?._id,values)}
                    options={optionsSelect}
                />


              )
            }
          },
          {
            title : 'Action',
            key: 'Action',
            render : (record) => {       
              return(
                <PopupConfirm 
                    title="Bạn có chắc chắn muốn xóa bình luận này không?" 
                    content="Bình luận sẽ bị xóa vĩnh viễn và không thể khôi phục." 
                    fetchAction={() => handleDeleteComment(record._id)} 
                />
              )
            }
          }
    ]



    return  (
       <div className="">
            <div className="p-4">
                <Table
                    className={styles.customTable}
                    columns={columns}
                    dataSource={dataComment}
                    pagination={{
                        pageSize: 10,
                    }}
                    loading={loadingComment}
                />
            </div>
       </div>
      
    )

}


export default CommentBlog