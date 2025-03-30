import { Layout, Skeleton } from "antd";
import constants from "../../utils/constants";
import CategoriesPageCompose from './composer/CategoriesPageCompose';
const { Content } = Layout



const ContentWrapper = ({dataContent,loadingContent}) => {
   
    return (
      <div className="w-full"> 
      {loadingContent ? Array(8).fill(null).map((item) => {
        return <Skeleton active className="mt-3" />
      }) : (
        dataContent && dataContent.length > 0 && dataContent.map(val => {
            if(val?.slug[0] == constants.KHOA_HOC_SLUG || val?.slug[0] == constants.GOC_NHIN_SLUG || val?.slug[0] == constants.VIDEO_SLUG) {
                return;
            }
            return <CategoriesPageCompose data={val} />
        })
      )}
      </div>
    )
}

export default ContentWrapper 