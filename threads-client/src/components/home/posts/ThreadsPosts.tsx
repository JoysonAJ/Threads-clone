import {
    PostDescription,
    PostFooter,
    PostHeader,
} from "@/components/home/index";

type Props = {};

const ThreadsPosts = (props: Props) => {
    return (
        <div className="w-full flex flex-col  p-6 shadow-md shadow-gray-400">
            <PostHeader />
            <PostDescription />
            <PostFooter />
        </div>
    );
};

export default ThreadsPosts;
