import ModalsIndex from "@/components/modals/ModalsIndex";
import { Footer, Header } from "@/layout";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="mt-20">
        <ModalsIndex />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
