import { CommentOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import VideoComponent from "../VideoComponent";
const VideoLayout = ({data}) => {
    const { result , name, slug } = data
   
    console.log(data,'video',slug)

    return (
        <section className="mt-[20px] w-full" style={{ padding : '20px 15px'}}>
            <div className="">
                <div className="relative flex text-[18px] mb-[12px] text-[#222] font-bold w-full" style={{ lineHeight : '1.6' }}>
                    {name && name?.length > 0 && name.map((item,index) => {
                        if(index != 0) {
                            return (
                                <span className="ml-[16px] text-[13px] text-[#4f4f4f] font-[400] mt-[8px]" style={{ lineHeight : "1.15" }}>
                                    <Link to={slug[index]} className="relative inline-block">{item}</Link>
                                </span>
                            )
                        }
                        return (
                            <h2>
                                <Link to={slug[index]} className="relative inline-block title-box">{item}</Link>
                            </h2>
                        )
                    })}
                </div>

                <div className="relative w-full">
                   <div className="w-[720px]">
                        <div className="w-full h-0 pb-[52%] mb-0 relative overflow-hidden thumb-video">
                            <VideoComponent url={result[0].videoURL} />
                        </div>
                        <div className="">
                            <h4 className="text-[24px] font-bold">
                                <Link>
                                    {result[0].title}
                                </Link>
                            </h4>
                        </div>
                   </div>

                   <div className="pl-[20px] pr-[15px] h-full absolute top-0 right-0" style={{ width : 'calc(100% - 720px)',scrollBehavior : 'smooth' }}>
                      <div className="ss-scroll">
                          <div className="relative overflow-auto p-0 h-full" style={{ width: 'calc(100% + 17px)' }}>
                                {result && result?.length > 0 && result.map((val,key) => {
                                    if(key != 0) {
                                        console.log(val)
                                        return (
                                            <article className="w-full mb-2 flex">
                                                <div className="w-[120px] mr-[10px] mt-[4px] relative">
                                                    <div className="w-[120px] overflow-hidden relative bg-[#f4f4f4] custom_heght"> 
                                                        <img src={val.imageURL} alt="" />
                                                    <span className="duration-video">02:49</span>
                                                    </div>
                                                </div>
                                                <div className="">
                                                <h3 className="text-[15px] font-bold">
                                                    <Link>{val.title}</Link>
                                                </h3>
                                                <p className="text-[#757575] text-[12px] font-[400]" >
                                                    <Link className="mr-3">
                                                        {val.description}
                                                    </Link>
                                                    <CommentOutlined className="w-[12px] h-[12px] mr-[1px] fill-[#bdbdbd]" />
                                                </p>
                                                </div>
                                      
                                            </article>
                                        )
                                    }
                                })}
                          </div>
                      </div>
                   </div>
                </div>              
            </div>
        </section>
    )
}


export default VideoLayout