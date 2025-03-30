import { Skeleton } from "antd";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";

import GeneralApi from "../../../../apis/General.api";
import CommentShow from "./components/CommentShow";

const NewestComment = ({postId}) => {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false);


    const fetchData = async() => {
        setLoading(true)
        try {
            await GeneralApi.getCommentByQuery(postId,{
                limit: 4,
                sort : "-createdAt"
            }).then(res => {
                if(res.status == HttpStatusCode.Ok) {
                    setData(res.data)
                }
            })
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(() => {
        if(!data) {
            fetchData()
        }
    },[data])



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

export default NewestComment;
