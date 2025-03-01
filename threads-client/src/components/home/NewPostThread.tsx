import {ProfileAvatar} from "@/components";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/store";
import { addPostModal } from "@/redux/service.slice";


const NewPostThread = () => {
    const dispatch = useAppDispatch()
    return (
        <div className="border-b-2 border-black shadow-md my-2 flex flex-row justify-between py-2 px-4 w-full">
           
           <div className="flex gap-2 ">
                <ProfileAvatar ProfileImageUrl={'https://github.com/shadcn.png'} />
                <div className="text-center ml-4 my-auto border" onClick={onPressPostThread}>
                    <Label htmlFor="new-thread-post"
                    className="text-gray-600 text-lg"
                    >
                        Start a thread........
                    </Label>
                </div>
           </div>
             <div>
                <Button className="uppercase bg-gray-600 px-8 h-10">
                    post
                </Button>
             </div>
        </div>
    );
    function onPressPostThread(){
        dispatch(addPostModal(true))
    }
};

export default NewPostThread;
