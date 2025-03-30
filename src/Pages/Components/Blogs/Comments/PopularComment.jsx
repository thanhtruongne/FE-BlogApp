import { Skeleton } from "antd";
import CommentShow from "./components/CommentShow";

const PopularComment = ({data,loading}) => {
    return (
        <div className="w-full">
            <div className="m-0 list_commentData">
                  <div className="comment-container pb-3">
                        {loading ? Array(4).fill(null).map((item,index) => <Skeleton className="mt-2" active key={index} />) : (
                            data && data?.length && data.map((item,key) => {
                                return (
                                    <CommentShow item={item} key={key} />
                                )
                            })
                        )}
                  </div>
            </div>
        </div>
    )
}

export default PopularComment;
