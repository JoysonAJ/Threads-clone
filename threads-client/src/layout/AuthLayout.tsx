import React, { ReactNode } from "react"; // Importing React and ReactNode type
import { Outlet } from "react-router"; // Importing Outlet for rendering nested routes

// Main AuthLayout component
const AuthLayout = () => {
  return (
    <BackgroundImage> {/* Wrapping the Outlet in the BackgroundImage component */}
      <Outlet /> {/* Renders the matched child route */}
    </BackgroundImage>
  );
};

export default AuthLayout; // Exporting the AuthLayout component

// BackgroundImage component to display a background image
function BackgroundImage({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center">
      {/* Container for the background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center h-80 w-screen object-contain max-sm:hidden" 
        style={{ 
          backgroundImage: `url('/public/register-bg.webp')` // Setting the background image
        }}
      />
      {/* Container for the content, ensuring it is above the background image */}
      <div className="container mx-auto rounded-lg flex justify-center z-40 h-screen overflow-hidden">
        {children} {/* Rendering the children passed to BackgroundImage */}
      </div>
    </div>
  );
}