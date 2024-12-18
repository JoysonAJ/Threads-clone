import { Footer, Header } from "@/layout";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
