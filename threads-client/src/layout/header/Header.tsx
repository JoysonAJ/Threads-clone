import {
  HomePageRoute,
  ProfilePageRoute,
  SearchPageRoute,
} from "@/routes/route.path";
import { NavLink } from "react-router";
import { routeIcon, routeDisplayName } from "@/types/route";
import ThreadsLogoBlack from "../../../public/Threads-logo-black-bg.webp";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

import { MenuIcon } from "@/routes/routes.icons";

const Header = () => {
  return (
    <header>
      <Navbar />
    </header>
  );
};

export default Header;

function Navbar() {
  return (
    <nav className="shadow-sm shadow-gray-500">
      <div className="container mx-auto px-4 py-1 flex justify-between items-center">
        <NavAppIcon />
        <NavListItems />
        <NavToggleMenu />
      </div>
    </nav>
  );
}

function NavAppIcon() {
  return (
    <NavLink
      to={HomePageRoute.navigateTo}
      className="max-sm:hidden flex items-center"
    >
      <img
        src={ThreadsLogoBlack}
        alt="no image found"
        className="max-sm:h-9 max-sm:w-9 h-12 w-12"
      />
    </NavLink>
  );
}

function NavListItems() {
  const navItemsArr = [HomePageRoute, ProfilePageRoute, SearchPageRoute];
  return (
    <div className="flex flex-row items-center space-x-4 bg-gray-100 px-10 rounded-sm">
      {navItemsArr.map((navItem, index) => (
        <NavLink
          to={`${navItem.navigateTo}`}
          className=" capitalize"
          key={index}
        >
          <NavIcons displayName={navItem.displayName} Icon={navItem.icon} />
        </NavLink>
      ))}
    </div>
  );

  type NavIconProps = {
    displayName: routeDisplayName;
    Icon?: routeIcon;
  };

  function NavIcons({ Icon, displayName }: NavIconProps) {
    if (Icon) {
      return <Icon className="h-14 w-10 mx-2" />;
    }
    return <span>{displayName}</span>;
  }
}

function NavToggleMenu() {
  return (
    <div className="max-sm:hidden">
      <MenuIcon className="h-8 w-8 mr-10" />
    </div>
  );
}
