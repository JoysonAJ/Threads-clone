import { ProfileAvatar } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "@/helpers/icons";
import { useId } from "react";

const PostHeader = () => {
    return (
        <div className="w-full flex flex-row justify-between ">
            <PostByAvatar />
            <PostTimeLine />
        </div>
    );
};

function PostByAvatar() {
    const id = useId()
    return (
       <div className="flex ">
            <Badge
                className={`bg-transparent rounded-[100%] cursor-pointer border-4 h-16 flex items-center justify-center relative mr-4`}
                variant="outline"
            >
                <ProfileAvatar ProfileImageUrl={"https://github.com/shadcn.png"} />
    
                <PlusIcon
                    className={`absolute bottom-2 right-2 text-green-700 `} // Tailwind CSS classes
                    size={20}
                />
                
            </Badge>
           <div>
                <Label htmlFor={`Profile-name-${id}`} className="">
                    Name
                </Label>
           </div>
       </div>
    );
}

function PostTimeLine(){
    const id = useId()
    return(
        <div>
            <Label htmlFor={`Post-timing-${id}`}>
                10 d
            </Label>
        </div>
    )
}

export default PostHeader;
