import {
  HomePageRoute,
  ProfilePageRoute,
  SearchPageRoute,
  wishListRoute,
} from "@/routes/route.path";
import { NavLink } from "react-router";
import { routeIcon, routeDisplayName } from "@/types/route";
import ThreadsLogoBlack from "../../../public/Threads-logo-black-bg.webp";

import { MenuIcon } from "@/routes/routes.icons";
import { WriteTweet } from "@/helpers/icons";
import { useAppDispatch } from "@/store";
import { addPostModal } from "@/redux/service.slice";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { useLogoutMeMutation } from "@/redux/api/service.api";
import { useEffect } from "react";

// Main Header component
const Header = () => {
  return (
    <header className="shadow-sm shadow-gray-500 w-full fixed top-0 z-50 bg-white block ">
      <Navbar /> {/* Rendering the Navbar component */}
    </header>
  );
};

export default Header; // Exporting the Header component

// Navbar component for the navigation bar
function Navbar() {
  return (
    <nav className="container mx-auto px-4 py-1 flex justify-between items-center max-sm:px-0">
      {/* Navigation bar with shadow */}
      <NavAppIcon />
      <NavListItems /> {/* Navigation list items */}
      <NavToggleMenu /> {/* Menu toggle icon for mobile view */}
    </nav>
  );
}

function NavAppIcon() {
  return (
    <NavLink
      to={HomePageRoute.navigateTo} // Link to the home page
      className="flex max-sm:hidden" // Hide on larger screens, show on small screens
    >
      <img
        src={ThreadsLogoBlack} // Logo image source
        alt="no image found" // Alt text for the image
        className="max-sm:h-9 max-sm:w-9 h-12 w-12 " // Responsive sizing for the logo
        // className="h-40 w-40 " // Responsive sizing for the logo
      />
    </NavLink>
  );
}

// Component for the navigation list items
function NavListItems() {
  const navItemsArr = [
    HomePageRoute,
    SearchPageRoute,
    wishListRoute,
    ProfilePageRoute,
  ]; // Array of navigation items
  return (
    <div className=" flex justify-between w-1/4 max-sm:w-full ">
      {navItemsArr.map((navItem, index) => (
        <>
          {index === 2 && <AddPostIcon />}
          <NavLink
            to={`${navItem.navigateTo}`} // Link to the respective route
            className="capitalize" // Capitalize the text
            key={index} // Unique key for each item
          >
            <NavIcons displayName={navItem.displayName} Icon={navItem.icon} />{" "}
            {/* Render navigation icons */}
          </NavLink>
        </>
      ))}
    </div>
  );

  // Type definition for NavIconProps
  type NavIconProps = {
    displayName: routeDisplayName; // Display name for the navigation item
    Icon?: routeIcon; // Optional icon for the navigation item
  };

  // Component for rendering navigation icons
  function NavIcons({ Icon, displayName }: NavIconProps) {
    if (Icon) {
      return <Icon className="h-14 w-10 mx-2 object-contain" />; // Render the icon if it exists
    }
    return <span>{displayName}</span>; // Otherwise, render the display name
  }
}

// Component for the menu toggle icon (for mobile view)
function NavToggleMenu() {

  const [logoutMe, logoutMeData] = useLogoutMeMutation();

  

  useEffect(() => {
    if (logoutMeData.isSuccess) {
      // toast.warning(logoutMeData.data.msg, {
      //   position: "top-center",
      //   autoClose: 2500,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   theme: "colored",
      //   transition: Bounce,
      // });
    }
    // if (logoutMeData.isError) {
    //   toast.error(logoutMeData.error.data.msg, {
    //     position: "top-center",
    //     autoClose: 2500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     theme: "colored",
    //     transition: Bounce,
    //   });
    // }
  }, [logoutMeData.isSuccess, logoutMeData.isError]);
  
  return (
    <Menubar className="border-none shadow-none ">
      <MenubarMenu>
        <MenubarTrigger className="border-none cursor-pointer ">
          <MenuIcon className="h-8 w-8 mr-10 flex max-sm:hidden" />
        </MenubarTrigger>

        <MenubarContent>
          <MenubarItem>Toggle Menu</MenubarItem>
          <MenubarItem>My Profile</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={onPressLogout}>Logout</MenubarItem>
          <MenubarSeparator />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );

  async function onPressLogout(){
      console.log('logout is clicked');
   try {
      await logoutMe({})
   } catch (error) {
      console.log('Error in logout',error);
   }
  
    
  }
}

function AddPostIcon() {
  const dispatch = useAppDispatch();
  return (
    <>
      <WriteTweet
        className="h-14 w-10 mx-2 object-contain cursor-pointer"
        onClick={onClickPostModal}
      />
    </>
  );
  function onClickPostModal() {
    dispatch(addPostModal(true));
  }
}
