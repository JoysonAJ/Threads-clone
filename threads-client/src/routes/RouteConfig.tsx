// import { BrowserRouter } from "react-router-dom"
import Layout from "@/layout";
import { AuthLayout, ProfileLayout } from "@/layout";
import {
    Home,
    Profile,
    Search,
    Menu,
    Login,
    Register,
    Replies,
    Repost,
    Threads,
    SinglePost
} from "@/pages";
import { BrowserRouter, Routes, Route } from "react-router";
import {
    HomePageRoute,
    ProfilePageRoute,
    SearchPageRoute,
    MenuPageRoute,
    LoginPageRoute,
    registerRoute,
    repliesRoute,
    repostRoute,
    threadsRoute,
    SinglePostRoute
} from "@/routes/route.path";

const RouteConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Layout />}>
                    <Route path={HomePageRoute.navigateTo} element={<Home />} />
                    <Route
                        path={ProfilePageRoute.navigateTo}
                        element={<Profile />}
                    />
                    <Route
                        path={SearchPageRoute.navigateTo}
                        element={<Search />}
                    />

                    <Route path={`${SinglePostRoute.navigateTo}/:id`} 
                    element={<SinglePost />}
                    />

                    <Route path={MenuPageRoute.navigateTo} element={<Menu />} />
                </Route>
                <Route path="" element={<AuthLayout />}>
                    <Route
                        path={registerRoute.navigateTo}
                        element={<Register />}
                    />
                    <Route
                        path={LoginPageRoute.navigateTo}
                        element={<Login />}
                    />
                </Route>

                <Route path="" element={<ProfileLayout />}>
                    <Route
                        path={`${repliesRoute.navigateTo}/:id`}
                        element={<Replies />}
                    />
                    <Route
                        path={`${threadsRoute.navigateTo}/:id`}
                        element={<Threads />}
                    />
                    <Route
                        path={`${repostRoute.navigateTo}/:id`}
                        element={<Repost />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default RouteConfig;
