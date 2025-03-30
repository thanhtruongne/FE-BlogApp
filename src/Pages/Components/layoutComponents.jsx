import { Skeleton } from 'antd';
import constants from '../../utils/constants';
import ScientiestLayout from './layoutComponents/ScientiestLayout';
import VideoLayout from './layoutComponents/VideoLayout';

const LayoutComponents = ({dataContent,loadingContent}) => {
   return (

     <div className="w-full">
         <div className="w-full"> 
            {loadingContent ? Array(dataContent?.response.length).fill(null).map((item) => {
               return <Skeleton active className="mt-3" />
            }) : (
               dataContent && dataContent?.response?.length > 0 && dataContent?.response.map(val => {
                  if(val?.slug[0] == constants.KHOA_HOC_SLUG) {
                     return <ScientiestLayout data={val} />
                  }  
                  if(val?.slug[0] == constants.VIDEO_SLUG) {
                     return <VideoLayout data={val} />
                  } 
               })
            )}
      </div>
     </div>
   )
}


export default LayoutComponents