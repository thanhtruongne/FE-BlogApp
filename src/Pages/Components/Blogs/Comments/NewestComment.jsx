import { Skeleton } from "antd";
import { memo } from "react";

import CommentShow from "./components/CommentShow";

const NewestComment = ({ data, loading }) => {
    return (
        <div className="w-full">
            <div className="m-0 list_commentData">
                <div className="comment-container pb-3">
                    {data && data?.length > 0 ? (
                        loading ? Array(4).fill(null).map((item, index) => <Skeleton className="mt-2" active key={index} />) : (
                            data && data?.length && data.map((item, key) => {
                                return (
                                    <CommentShow item={item} key={key} />
                                )
                            })
                        )
                    ) : 'Chưa có bình luận nào.'}
                </div>
            </div>
        </div>
    )
}

export default memo(NewestComment);
