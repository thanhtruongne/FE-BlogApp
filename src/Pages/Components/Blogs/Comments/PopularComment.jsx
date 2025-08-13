import { CommentOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import GeneralApi from "../../../../apis/General.api";
import CommentShow from "./components/CommentShow";
const PopularComment = (props) => {
    const { data, setData, loading, postId, hasMore, filter, sethasMore, setTotal, page, setPage, isSwitch, setSwitch } = props

    const [loadingBtn, setLoadingBtn] = useState(false)


    const loadComments = () => {
        if (hasMore && !loadingBtn) {
            setPage(item => item + 1);
            setLoadingBtn(true)

        }
    }


    const handleLoadComments = async (page) => {
        try {
            await GeneralApi.getCommentByQuery(postId, {
                page,
                limit: filter.limit
            })
                .then(res => {
                    if (res.status == HttpStatusCode.Ok) {
                        setData(prev => ([...prev, ...res.data]))
                        sethasMore(res.options.hasMore)
                        setTotal(prev => prev + (+res.options.totalComment))
                    }
                })

        } catch (error) {
            console.log(error)
        } finally {
            setLoadingBtn(false)
        }
    }
    useEffect(() => {
        if (page > 1) {
            handleLoadComments(page)
        }
    }, [page, postId])

    useEffect(() => {
        if (isSwitch) {
            setSwitch(false);
            setData(data)
        }
    }, [isSwitch])


    return (
        <div className="w-full">
            <div className="m-0 list_commentData">
                <div className="comment-container tree pb-3">
                    {data && data?.length > 0 ? (loading ? Array(6).fill(null).map((item, index) => <Skeleton className="mt-2" active key={index} />) : (
                        data && data?.length && data.map((item, key) => {
                            return (
                                <CommentShow item={item} postId={postId} key={key} />
                            )
                        })
                    )) : 'Chưa có bình luận nào.'}

                    {hasMore && (
                        <Button
                            loading={loadingBtn}
                            onClick={loadComments}
                            type="primary"
                            style={{ font: `700 14px/48px "Merriweather",serif` }}
                            className="relative text-center mt-3 h-[48px] w-full text-[#C14872] bg-[#FCE6EB] rounded-2">
                            Xem thêm ý kiến <CommentOutlined />
                        </Button>
                    )}


                </div>
            </div>
        </div>
    )
}

export default PopularComment;
