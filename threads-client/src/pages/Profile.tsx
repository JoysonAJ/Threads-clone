import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/helpers/icons";
import { NavLink } from "react-router";

import { threadsRoute, repliesRoute, repostRoute } from "@/routes/route.path";

const Profile = () => {
  return (
    <div className="flex flex-col shadow-md shadow-gray-400 w-8/12 mx-auto">
      <ProfileData />
      <ProfileNavigation />
    </div>
  );
};

export default Profile;

function ProfileData() {
  return (
    <div className="w-full py-4 ">
      <ProfileNameAvatar />
      <p className="text-center">Good day</p>
      <ProfileBioFollowers />
      <EditProfile />
    </div>
  );
}

function ProfileNameAvatar() {
  return (
    <div className="flex justify-around">
      <div>
        <h1>Joyson D Souza</h1>
        <h4>@JoysonAJ</h4>{" "}
        <span className="text-gray-500 inline">threads.net</span>
      </div>

      <div className="my-auto">
        <Avatar className="h-24 w-24 ">
          <AvatarImage src="https://github.com/shadcn.png" className="" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

function ProfileBioFollowers() {
  return (
    <div className="flex justify-around">
      <div>
        <span>avatrs</span>
        <span> 4 followers</span>
      </div>
      <InstagramIcon size={27} className="cursor-pointer" />
    </div>
  );
}

function EditProfile() {
  return (
    <div className="flex  w-full mt-6">
      <Button
        variant={"outline"}
        className=" mx-auto w-8/12 border border-gray-500"
      >
        Edit Profile
      </Button>
    </div>
  );
}

function ProfileNavigation() {
  const id = "id";
  return (
    <div className="flex flex-row justify-around">
      <NavLink to={`${threadsRoute.navigateTo}/${id}`} className={({isActive})=>`capitalize   w-1/3 text-center py-2 ${isActive && 'border-b-2 border-gray-500 '} `}>
        {threadsRoute.displayName}
      </NavLink>
      <NavLink to={`${repliesRoute.navigateTo}/${id}`} className={({isActive})=>`capitalize   w-1/3 text-center py-2 ${isActive && 'border-b-2 border-gray-500 '} `}>
        {repliesRoute.displayName}
      </NavLink>
      <NavLink to={`${repostRoute.navigateTo}/${id}`} className={({isActive})=>`capitalize   w-1/3 text-center py-2 ${isActive && 'border-b-2 border-gray-500 '} `}>
        {repostRoute.displayName}
      </NavLink>
    </div>
  );
}
