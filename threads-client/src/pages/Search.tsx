import { Input } from "@/components/ui/input";
import { ProfileAvatar } from "@/components";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Search = () => {
  const arr = [1,2,3,4,5,3,4,5,2,5,7,8,10]
    return (
        <div className="full flex flex-col justify-center items-center mt-6 w-full">
            <Input
                placeholder="Search..."
                className="w-9/12 p-3 h-14 shadow-md shadow-black"
            />

            <div className="my-4 w-9/12  ">
                {
                  arr.map((item)=>(
                    <ProfileCard />
                  ))
                }
                
            </div>
        </div>
    );
};

export default Search;

const ProfileCard = () => {
    return (
        <div className="flex w-full justify-between items-center  my-2 px-10 shadow shadow-gray-400 rounded-md ">
            <div className="flex my-auto">
               <div className="my-auto">
                  <ProfileAvatar
                      ProfileImageUrl={"https://github.com/shadcn.png"}
                  />
               </div>

                <div className="ml-10">
                    <Label htmlFor="search">Name of the user</Label>
                    <p>Bio * dob</p>
                    <p>4 followers</p>
                </div>
            </div>

            <div>
                <Button>follow</Button>
            </div>
        </div>
    );
};
