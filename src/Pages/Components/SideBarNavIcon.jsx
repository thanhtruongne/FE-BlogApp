import { ArrowLeftOutlined, CommentOutlined, CopyFilled, CopyOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';

const SideBarNavIcon = (props) => {
    const { commentRef, dataPrev, handleSavePostData, handleCopyLink, iconSave, handleScrollToComment } = props
    const navigate = useNavigate();



    return (
        <div className="flex flex-col">
            <Tooltip placement="right" title={iconSave ? "Đã lưu bài viết" : "Lưu bài viết"} className='mt-4'>
                <Button
                    onClick={handleSavePostData} className={iconSave ? 'btn_icon_slug_save' : 'btn_icon_slug'} shape="circle" icon={iconSave ? <CopyFilled /> : <SaveOutlined />} />
            </Tooltip>

            <Tooltip placement="right" title="Copy đường dẫn" className='mt-4'>
                <Button onClick={handleCopyLink} className='btn_icon_slug' shape="circle" icon={<CopyOutlined />} />
            </Tooltip>

            <Tooltip placement="right" title="Bình luận" className='mt-4'>
                <Button className='btn_icon_slug' onClick={handleScrollToComment} shape="circle" icon={<CommentOutlined />} />
            </Tooltip>

            <Tooltip placement="right" title={'Trở lại ' + dataPrev?.title} className='mt-4'>
                <Button onClick={() => navigate(dataPrev?.slug)} className='btn_icon_slug' shape="circle" icon={<ArrowLeftOutlined />} />
            </Tooltip>
        </div >
    )
}



export default SideBarNavIcon