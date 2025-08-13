
import { CheckCircleFilled, CloseCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import { Select, Table } from 'antd';
import { HttpStatusCode } from 'axios';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { default as General, default as GeneralApi } from '../../../../apis/admin/General';
import PopupConfirm from '../../../../components/Generals/PopupConfirm';
import { NotifyContext } from '../../../../contexts/NotifyContext';
import showMessage from '../../../../Helpers/showMessage';
import useStyle from '../../../../hook/useStyles';


const CommentBlog = (props) => {
    const { setDataComment, dataComment } = props;
    const [loadingComment, setLoadingComment] = useState(false)
    const { styles } = useStyle();
    const location = useLocation();
    const { setNotify } = useContext(NotifyContext) // set count notify




    const optionsSelect = [
        {
            value: 'Active',
            label: (
                <span>
                    Active
                    <CheckCircleFilled style={{ color: "green", marginLeft: 9 }} />
                </span>
            ),
        },
        {
            value: 'Pending',
            label: (
                <span>
                    Pending
                    <InfoCircleFilled style={{ marginLeft: 9, color: 'yellow' }} />
                </span>
            ),
        },
        {
            value: 'Block',
            label: (
                <span>
                    Block
                    <CloseCircleFilled style={{ marginLeft: 9, color: 'red' }} />
                </span>
            ),
        }
    ]


    const handleDeleteComment = async (id) => {
        try {
            await GeneralApi.removeCommentBlog(id)
                .then(res => {
                    if (res.status == HttpStatusCode.Ok) {
                        showMessage(res.message, 'success')
                        setDataComment(prev => prev.filter(comment => comment._id != id))
                    }
                })
        } catch (error) {
            showMessage(error.message, 'error')
        }
    }


    const handleChangeStatus = async (id, value) => {
        try {
            await GeneralApi.changeStatusComment(id, { status: value })
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

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const markARead = queryParams.get('markARead');
        if (markARead) {
            handleMarkAReadFromURL(markARead);
        }
    }, [location.hash])


    const handleMarkAReadFromURL = async (id) => {
        try {
            await General.markAReadNotify(id, 'single')
                .then(res => {
                    if (res.status == HttpStatusCode.Ok) {
                        console.log(res.data)
                        setNotify(res.data) // set giá trị current notify
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    const columns = [
        {
            title: 'Biệt danh',
            render: (record) => record.full_name
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            render: (record) => {
                return moment(record).format('DD/MM/YYYY HH:mm:ss')
            }
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (record) => {
                return (
                    <Select
                        defaultValue={record?.status}
                        style={{
                            width: 120,
                        }}
                        onChange={(values) => handleChangeStatus(record?._id, values)}
                        options={optionsSelect}
                    />


                )
            }
        },
        {
            title: 'Action',
            key: 'Action',
            render: (record) => {
                return (
                    <PopupConfirm
                        title="Bạn có chắc chắn muốn xóa bình luận này không?"
                        content="Bình luận sẽ bị xóa vĩnh viễn và không thể khôi phục."
                        fetchAction={() => handleDeleteComment(record._id)}
                    />
                )
            }
        }
    ]



    return (
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