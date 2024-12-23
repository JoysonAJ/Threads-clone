import { NewPostThread,ThreadsPosts } from "@/components";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div  className="w-10/12 shadow-sm shadow-gray-200 rounded-md">
        <NewPostThread />
        <ThreadsPosts />
        <ThreadsPosts />
        <ThreadsPosts />
        <ThreadsPosts />
        <ThreadsPosts />
      </div>
      
    </div>
  )
}

export default Home