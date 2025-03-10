import { Skeleton } from "antd";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GeneralApi from "../../../../apis/General.api";

const Notifications = (props) => {
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchDataNew = async() => {
    try {
      setLoading(true)
      await GeneralApi.getDataPostNew({sort : '-createdAt'})
      .then(res => {
        if(res.status == HttpStatusCode.Ok) {
          setData(res.data)
        }
      })
    } catch (error) {
      console.log(error,'Error')
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchDataNew()
  },[])

   return (
      <div className="px-[20px] w-full mb-6">
         {loading ? 
           (
             Array(4).fill(null).map((item,key) => {
                return  <Skeleton active  paragraph={{rows: 2}}></Skeleton>
             })
           )
         : (
           <>
             {data && data?.length > 0 && data.map((val,key) => {
                 return (
                    <div className="w-full relative mb-[20px]">
                        <Link to={import.meta.env.VITE_APP_FRONTEND + val?.slug}>
                             <div className="text-[12px] mb-[6px] flex justify-between" style={{ color :'#9F9F9F', }}>
                                 <span className="folder">{val.categories_id?.title}</span>
                                 <span className="time-data">{val.timeMoment}</span>
                             </div>
                             <span className="font-text">{val?.title}</span>
                        </Link>
                    </div>
                 )
             })}
           </>
         )}
         
      </div>

      
   )
}



export default Notifications