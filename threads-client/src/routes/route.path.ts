import { routePathSetter } from "@/helpers/route.helper";
import {
  EditIcon,
  HeartIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
  ProfileIcon
} from "@/routes/routes.icons";

export const HomePageRoute = routePathSetter("/", "home",HomeIcon);
export const ProfilePageRoute = routePathSetter("/profile", "profile",ProfileIcon);
export const SearchPageRoute = routePathSetter("/search", "search",SearchIcon);


export const MenuPageRoute = routePathSetter('/menu','menu',MenuIcon) 

// authRoutes
export const LoginPageRoute = routePathSetter('/login','login')
export const registerRoute = routePathSetter('/register','register')

export const threadsRoute = routePathSetter('threads','threads')
export const repliesRoute = routePathSetter('replies','replies')
export const repostRoute = routePathSetter('repost','repost')


export const SinglePostRoute = routePathSetter('/post','single-post')
