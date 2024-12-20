import { Outlet } from "react-router";
import { Profile } from "@/pages";

const ProfileLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center border-4">
     <div className="shadow-sm shadow-gray-500 w-8/12">
        <Profile />
        <Outlet />
     </div>
    </div>
  );
};

export default ProfileLayout;
