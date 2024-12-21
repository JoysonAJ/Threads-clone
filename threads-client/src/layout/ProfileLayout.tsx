import { Outlet } from "react-router";
import { Profile } from "@/pages";

const ProfileLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center border-4">
      <Profile />
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
