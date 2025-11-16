import {
    BookOpen,
    GraduationCap,
    Home,
    type LucideIcon,
    Settings,
} from "lucide-react";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

/**
 * NavigationItem - Interface for navigation item data
 */
export interface NavigationItem {
    name: string;
    href: string;
    icon: LucideIcon;
}

/**
 * NAVIGATION_ITEMS - Navigation items for dashboard
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
    {
        name: "Home",
        href: ROUTES_CONSTANTS.DASHBOARD().HOME(),
        icon: Home,
    },
    {
        name: "Reading",
        href: ROUTES_CONSTANTS.DASHBOARD().READING().HOME(),
        icon: BookOpen,
    },
    {
        name: "Courses",
        href: ROUTES_CONSTANTS.DASHBOARD().COURSES().HOME(),
        icon: GraduationCap,
    },
    {
        name: "Settings",
        href: ROUTES_CONSTANTS.DASHBOARD().SETTINGS(),
        icon: Settings,
    },
];
