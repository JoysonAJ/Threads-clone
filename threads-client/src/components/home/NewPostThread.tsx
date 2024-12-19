import {ProfileAvatar} from "@/components";

const NewPostThread = () => {
    return (
        <div className="border-b-2 border-black shadow-md my-2 flex flex-row justify-between py-2 px-4">
           
            <ProfileAvatar ProfileImageUrl={'https://github.com/shadcn.png'} />
            <div>input</div>
             <div>post button</div>
        </div>
    );
};

export default NewPostThread;
