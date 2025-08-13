import { CommentOutlined } from '@ant-design/icons';
import { Layout, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
const { Sider} = Layout;

const SidebarContent = ({data,loadingContent}) => {
    return (
        <div className="w-full side_part">
            {loadingContent ? Array(8).fill(null).map((data, key) => {
                return (
                    <Skeleton active  className='mt-2'/>
                )
            }) :
               (data && data?.length > 0 && data.map((item,index) => {
                  return (
                    <article className="w-full border_side" style={{ paddingBottom : 0, marginBottom : 0, }}>
                        <Link to={item.slug}>
                            <h3 className="text-[15px] font-[700] mb-[4px]">
                                {item.title}
                            </h3>
        
                            <div className="flex w-full">
        
                                <div className="thumb_image w-[145px]  mr-3 mt-2 relative">
                                    <img 
                                    className="h-[90px] w-full object-cover" 
                                    src={item.imageURL} alt="" />
                                </div>
        
                            
                                <div className="text-[#4f4f4f] w-full" style={{ lineHeight : '140%',maxWidth : '220px' }}>
                                    <p className="inline-block w-full" style={{ wordWrap: 'break-word' }}>
                                        {item.description}
                                        <span className="inline-block ml-[5px] text-[#757575] text-[12px] font-[400]">
                                            <CommentOutlined className="w-[12px] h-[12px] mr-[1px] fill-[#bdbdbd]" />
                                            <span className="text-[12px] text-[#076db6] font-bold ml-1">21</span>
                                        </span>
                                    </p>
                                
                                </div>
                                
                            </div>
                        </Link>
                    </article>
                  )
               }))
            }
        </div>
    )
}


export default SidebarContent