
import ContentWrapper from "../Components/ContentWrap";
import SidebarContent from "../Components/SidebarContent";

const ContentPage = ({dataContent,loadingContent}) => {
    return (
        <section className="mt-[20px] w-full flex">
             <div className="w-[400px] relative left_side pr-[20px]">
                <SidebarContent 
                   data={dataContent?.sidebar}
                   loadingContent={loadingContent}
                />
             </div>
             <div className="w-[700px] pl-[20px]">
                <ContentWrapper 
                    dataContent={dataContent?.response} 
                    loadingContent={loadingContent}
                />
             </div>
        </section>
    )
}


export default ContentPage