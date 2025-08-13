import { CommentOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


const CategoriesPageCompose = ({data}) => {
    const {name , result , slug} = data;
    return (
        <div className="pb-[15px] mb-[15px] w-full" style={{ borderBottom : '1px solid #e5e5e5' }}>
            {/* nav */}
            <div className="relative flex text-[18px] mb-[12px] text-[#222] font-bold w-full" style={{ lineHeight : '1.6' }}>
                {name && name.length > 0 && name.map((item,index) => {
                     if(index != 0) {
                          return (
                            <span className="ml-[16px] text-[13px] text-[#4f4f4f] font-[400] mt-[8px]" style={{ lineHeight : "1.15" }}>
                                <Link to={'/'} className="relative inline-block">{item}</Link>
                            </span>
                          )
                     }
                     return (
                        <h2>
                            <Link to={'/'} className="relative inline-block title-box"> {item} </Link>
                        </h2>
                     )
                })}
            </div>

            <div className="flex-wrap flex w-full">
                <div className="w-[67.648%] pb-0 mb-0">
                    <Link to={result[0].slug}>
                        <div className="flex">
                            <div className=" h-[135px] m-0 pt-[4px]">
                                <img 
                                    className="w-full h-full object-cover" 
                                    src={result[0].imageURL} 
                                    alt="" 
                                />
                            </div>

                            <div className="w-[51.086%]">
                                <h3 className="pr-[20px] pl-[15px] text-[15px] font-[700]">
                                    {result[0].title}
                                </h3>
                                <p className="pr-[20px] pl-[15px] text-[14px]" style={{ lineHeight : '140%' }}>     
                                    {result[0].description}		
                                    <span className="inline-block ml-[5px] text-[#757575] text-[12px] font-[400]">
                                        <CommentOutlined className="w-[12px] h-[12px] mr-[1px] fill-[#bdbdbd]" />
                                        <span className="text-[12px] text-[#076db6] font-bold ml-1">222</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Link>  
                </div>
              
             


                <div className="article_sub">
                    <Link to={result[1].slug}>
                        <h3 className="pr-[20px] pl-[15px] text-[15px] font-[700]">
                            {result[1].title}		
                        </h3>
                        <p className="pr-[20px] pl-[15px] text-[14px]" style={{ lineHeight : '140%' }}>     
                            {result[1].description}		
                            <span className="inline-block ml-[5px] text-[#757575] text-[12px] font-[400]">
                                <CommentOutlined className="w-[12px] h-[12px] mr-[1px] fill-[#bdbdbd]" />
                                <span className="text-[12px] text-[#076db6] font-bold ml-1">222</span>
                            </span>
                        </p>
                    </Link>
       
                </div>


                {/* sub news */}
                <div className="w-full relative flex pl-0 sub_top_side">
                {result && result.length > 0 && result.map((val,key) => {
                  
                        if(key != 0 && key != 1 && key <= 4) {
                            return (
                                <article className="pt-[15px] mt-[15px] mr-[12px] relative mb-0 pb-0 pl-[15px] w-full" style={{ maxWidth : 200, }}>
                                    <h3 className="relative font-bold test-[14px] mb-0 title_side" style={{ lineHeight : '160%' }}>
                                        <Link to={val.slug}>
                                           {val.description}
                                        </Link>
                                        <span className="inline-block ml-[5px] text-[#757575] text-[12px] font-[400]">
                                            <CommentOutlined className="w-[12px] h-[12px] mr-[1px] fill-[#bdbdbd]" />
                                            <span className="text-[12px] text-[#076db6] font-bold ml-1">222</span>
                                        </span>
                                    </h3>
                                </article>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )

}



export default CategoriesPageCompose