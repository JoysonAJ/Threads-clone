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

// Main Header component
const Header = () => {
  return (
    <header>
      <Navbar /> {/* Rendering the Navbar component */}
    </header>
  );
};

export default Header; // Exporting the Header component

// Navbar component for the navigation bar
function Navbar() {
  return (
    <nav className="shadow-sm shadow-gray-500"> {/* Navigation bar with shadow */}
      <div className="container mx-auto px-4 py-1 flex justify-between items-center">
        <NavAppIcon /> {/* Application logo */}
        <NavListItems /> {/* Navigation list items */}
        <NavToggleMenu /> {/* Menu toggle icon for mobile view */}
      </div>
    </nav>
  );
}

// Component for the application logo
function NavAppIcon() {
  return (
    <NavLink
      to={HomePageRoute.navigateTo} // Link to the home page
      className="max-sm:hidden flex items-center" // Hide on small screens
    >
      <img
        src={ThreadsLogoBlack} // Logo image source
        alt="no image found" // Alt text for the image
        className="max-sm:h-9 max-sm:w-9 h-12 w-12" // Responsive sizing for the logo
      />
    </NavLink>
  );
}

// Component for the navigation list items
function NavListItems() {
  const navItemsArr = [HomePageRoute, ProfilePageRoute, SearchPageRoute]; // Array of navigation items
  return (
    <div className="flex flex-row items-center space-x-4 bg-gray-100 px-10 rounded-sm">
      {navItemsArr.map((navItem, index) => (
        <NavLink
          to={`${navItem.navigateTo}`} // Link to the respective route
          className="capitalize" // Capitalize the text
          key={index} // Unique key for each item
        >
          <NavIcons displayName={navItem.displayName} Icon={navItem.icon} /> {/* Render navigation icons */}
        </NavLink>
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
      return <Icon className="h-14 w-10 mx-2" />; // Render the icon if it exists
    }
    return <span>{displayName}</span>; // Otherwise, render the display name
  }
}

// Component for the menu toggle icon (for mobile view)
function NavToggleMenu() {
  return (
    <div className="max-sm:hidden"> {/* Hide on small screens */}
      <MenuIcon className="h-8 w-8 mr-10" /> {/* Render the menu icon */}
    </div>
  );
}