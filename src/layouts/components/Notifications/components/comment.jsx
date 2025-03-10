import EmptyIcon from "./emptyIcon"


const CommentComponent = ({isAuthenticated}) => { 

    return (
        <div className="px-[20px] w-full mb-6">
           {isAuthenticated ? 'text' : <EmptyIcon />}
        </div> 
    )  
}


export default CommentComponent