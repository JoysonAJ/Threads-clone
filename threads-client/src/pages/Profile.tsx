import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InstagramIcon } from "@/helpers/icons";
const Profile = () => {
  return (
    <div className="flex flex-col shadow-md w-full mt-4">
      <ProfileNameAvatar />
      <p className="text-center">
        Good day
      </p>
      <ProfileBioFollowers />
      <div>edit button</div>
    </div>
  );
};

export default Profile;

function ProfileNameAvatar() {
  return (
    <div className="flex justify-around">
      <div>
        <h1>Joyson D Souza</h1>
        <h4>@JoysonAJ</h4> <span className="text-gray-500 inline">threads.net</span>
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

function ProfileBioFollowers(){
  return(
    <div className="flex justify-around">
        <div>
          <span>
            avatrs
          </span>
          <span> 4 followers</span>
        </div>
        <InstagramIcon size={27}  className="cursor-pointer"/>
      </div>
  )
}
