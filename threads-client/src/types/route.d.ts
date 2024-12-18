import { IconType } from "react-icons"

export type routeNavigationPath = string
export type routeDisplayName= string
export type routeIcon = IconType

export type routePathType ={
    navigateTo:routeNavigationPath,
    displayName:string,
    icon?:routeIcon

}