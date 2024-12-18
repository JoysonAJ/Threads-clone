import {
  routePathType,
  routeDisplayName,
  routeIcon,
  routeNavigationPath,
} from "@/types/route";

export function routePathSetter(
  navigateTo: routeNavigationPath,
  displayName: routeDisplayName,
  icon?: routeIcon
): routePathType {
  return {
    navigateTo,
    displayName,
    icon,
  };
}



