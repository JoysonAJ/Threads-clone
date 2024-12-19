import { OutlineHeartIcon,FilledHeartIcon,CommentIcon,ReTweetIcon,SendIcon } from "@/helpers/icons";

const PostFooter = () => {
  return (
    <div>
      <PostIcons/> 
    </div>
  )
}

export default PostFooter

const PostIcons=()=>{
  return(
    <div className="flex gap-3">
        <OutlineHeartIcon className="mx-4 cursor-pointer " size={20}/>
        <CommentIcon className="mx-4 cursor-pointer" size={20}/>
        <ReTweetIcon className="mx-4 cursor-pointer" size={20}/>
        <SendIcon className="mx-4 cursor-pointer" size={20}/>
    </div>
  )
}