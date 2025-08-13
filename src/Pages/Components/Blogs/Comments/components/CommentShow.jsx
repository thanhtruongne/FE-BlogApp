import { Spin } from "antd";
import { HttpStatusCode } from "axios";
import { useState } from "react";
import GeneralApi from "../../../../../apis/General.api";
import CommentItem from "./CommentItem";





const CommentShow = ({ item, postId }) => {
    const [loading, setLoading] = useState(false);
    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);

    const handleShowMoreReplyComment = async () => {
        if (showReplies) {
            setShowReplies(false);
            return;
        }
        try {
            setLoading(true);
            await GeneralApi.getMoreCommentReply(item._id)
                .then(res => {
                    if (res.status == HttpStatusCode.Ok) {
                        setReplies(res.data);
                        setShowReplies(true);
                    }
                })

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="comment_item_data">
            <CommentItem
                data={item}
                postId={postId}
                parentID={item?._id}
            />
            {
                item.replyCount >= 1 && (
                    <div className="reply pb-0 text-[#4f4f4f] w-full mt-3 ml-[50px]">
                        {loading ? (
                            <Spin size="small" className="ml-2" />
                        ) : !showReplies && (
                            <span className="view_all_reply cursor-pointer" onClick={handleShowMoreReplyComment}>
                                <span className="text-[14px] text-[#757575] mr-2">{item.replyCount}</span>
                                trả lời
                            </span>
                        )}
                    </div>
                )}
            {showReplies && replies.length > 0 && (
                <div className="replies-container ml-8">
                    {replies.map(reply => (
                        <CommentShow item={reply} postId={postId} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CommentShow;
