
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
    ProfileImageUrl: string;
};

const ProfileAvatar = ({ProfileImageUrl}: Props) => {
    return (
        <>
            <Avatar>
                <AvatarImage src={ProfileImageUrl}  />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </>
    );
};

export default ProfileAvatar;
