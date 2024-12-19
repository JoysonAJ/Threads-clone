// import { BrowserRouter } from "react-router-dom"
import Layout from "@/layout";
import AuthLayout from "@/layout/AuthLayout";
import { Home, Profile, Search, Menu, Login, Register } from "@/pages";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  HomePageRoute,
  ProfilePageRoute,
  SearchPageRoute,
  MenuPageRoute,
  LoginPageRoute,
  registerRoute,
} from "@/routes/route.path";

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path={HomePageRoute.navigateTo} element={<Home />} />
          <Route path={ProfilePageRoute.navigateTo} element={<Profile />} />
          <Route path={SearchPageRoute.navigateTo} element={<Search />} />

          <Route path={MenuPageRoute.navigateTo} element={<Menu />} />

        </Route>
        <Route path="" element={<AuthLayout />}>
          <Route path={registerRoute.navigateTo} element={<Register />} />
          <Route path={LoginPageRoute.navigateTo} element={<Login />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;
