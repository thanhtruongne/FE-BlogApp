import { Link } from "react-router-dom"


const ScientiestLayout = ({data}) => {
    const {result,slug,name} = data
    return (
        <section className="mt-[20px] w-full text-bg-compose" style={{ padding : '20px 15px'}}>
            <div className="">
                <div className="title_head mb-[15px]">
                   <div className="flex items-center">
                    {name && name?.length > 0 && name.map((item,index) => {
                        if(index != 0) {
                            return <Link to={slug[index]} className="title_cate_a mr-[8px]">{item}</Link>
                            
                        }
                        return (
                            <h2 className="title_he_data mr-[12px]" style={{ font : 'bold 45px "Merriweather",serif' }}>{item}</h2>
                        )
                    })}
                       
                       {/* <div className="gap-[12px] ml-[20px] flex items-center">
                            
                             <Link to="" className="title_cate_a">Đổi mới sáng tạo</Link>
                             <Link to="" className="title_cate_a">Đổi mới sáng tạo</Link>
                       </div> */}
                   </div>
            
                </div>  

                <div className="flex flex-wrap w-full">
                    <div className="w-[49%] pr-[40px] relative">
                        <article className="w-full mb-0 pb-0">
                            <div className="thumb_art w-full mb-[10px]">
                                <Link to={result[0].slug} className="block pb-[60%] overflow-hidden h-0 relative w-full bg-[#f4f4f4]">
                                        <img 
                                         style={{ 
                                            top: 0,
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                          }}
                                        className="absolute w-full h-full object-fit-cover"  
                                        src={result[0].imageURL} 
                                        alt="" />
                                </Link>
                            </div>
                            <h4 className="text-[24px]">
                                <Link>
                                    {result[0].title}
                                </Link>
                            </h4>
                            <p className="text-[14px]" style={{ lineHeight : '140%' }}>     
                                    {result[0].description}
                             </p>
                        </article>
                    </div>



                    <div className="w-[26%] pr-[40px] relative">
                        <article className="w-full pb-[15px] mb-[15px]" style={{ borderBottom : '1px solid #E5E5E5' }}>
                            <div className="thumb_art w-full mb-[10px]">
                                <Link  to={result[1].slug} className="block pb-[60%] overflow-hidden h-0 relative w-full bg-[#f4f4f4]">
                                        <img 
                                         style={{ 
                                            top: 0,
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                          }}
                                        className="absolute w-full h-full object-fit-cover"  
                                        src={result[1].imageURL} 
                                        alt="" />
                                </Link>
                            </div>
                            <h4 className="text-[15px] font-bold">
                                <Link>
                                     {result[1].title}
                                </Link>
                            </h4>
                        </article>
                        <article className="w-full pb-[15px] mb-[15px]" style={{ borderBottom : '1px solid #E5E5E5' }}>
                            <div className="thumb_art w-full mb-[10px]">
                                <Link  to={result[2].slug} className="block pb-[60%] overflow-hidden h-0 relative w-full bg-[#f4f4f4]">
                                        <img 
                                         style={{ 
                                            top: 0,
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                          }}
                                        className="absolute w-full h-full object-fit-cover"  
                                        src={result[2].imageURL} 
                                        alt="" />
                                </Link>
                            </div>
                            <h4 className="text-[15px] font-bold">
                                <Link>
                                     {result[2].title}
                                </Link>
                            </h4>
                        </article>
                    </div>

                    <div className="w-[25%] overflow-y">
                        {result && result?.length > 0 && result.map((item,index) => {
                            if(index != 1 && index != 2 && index != 0) {
                                return  (
                                    <article className="w-full pb-[15px] mb-[15px] flex" style={{ borderBottom : '1px solid #E5E5E5' }}>
                                    <h4 className="text-[15px] font-bold">
                                        <Link to={item.slug}>
                                            {item.title}
                                        </Link>
                                    </h4>
                                    <div className="w-[200px] ml-[15px] relative">
                                        <Link to={item.slug} className="block pb-[60%] overflow-hidden h-0 relative w-full bg-[#f4f4f4]">
                                                <img 
                                                 style={{ 
                                                    top: 0,
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                  }}
                                                className="absolute h-full object-cover w-[200px]"  
                                                src={item.imageURL} 
                                                alt="" />
                                        </Link>
                                    </div>
                                </article>
                                )

                            }
                        })}
                    </div>
                </div>              
            </div>
        </section>
    )
}


export default ScientiestLayout