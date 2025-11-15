import { Link, useLocation } from "react-router";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { NAVIGATION_ITEMS } from "@/features/dashboard/constants/navigation";
import type { User } from "@/entities/users/models/model";

/**
 * SideBarProps - Interface for SideBar component props
 */
interface SideBarProps {
    isOpen: boolean;
    onLinkClick: () => void;
    user: User | null;
    isLoading: boolean;
}

/**
 * SideBar - Component for displaying the dashboard sidebar
 * @param props - The props for the SideBar component
 * @param props.isOpen - Boolean to check if the sidebar is open
 * @param props.onLinkClick - Handler for link click (closes sidebar)
 * @param props.user - The current user data
 * @param props.isLoading - Loading state for user data
 * @returns SideBar component
 */
export const SideBar = ({
    isOpen,
    onLinkClick,
    user,
    isLoading,
}: SideBarProps) => {
    const location = useLocation();

    /**
     * Check if a route is active
     */
    const isActiveRoute = (href: string): boolean => {
        if (href === ROUTES_CONSTANTS.DASHBOARD().HOME()) {
            return location.pathname === ROUTES_CONSTANTS.DASHBOARD().HOME();
        }
        return location.pathname.startsWith(href);
    };

    /**
     * Get user avatar fallback (first letter of username)
     */
    const getAvatarFallback = (): string => {
        if (!user?.username) return "U";
        return user.username.charAt(0).toUpperCase();
    };

    return (
        <>
            {/* Mobile sidebar overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 lg:hidden"
                    onClick={onLinkClick}
                >
                    <div className="fixed inset-0 bg-black/20" />
                </div>
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out",
                    "lg:translate-x-0 lg:z-40",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-4">
                        <div className="mb-8">
                            <Logo fontSize="text-xl" />
                        </div>

                        {NAVIGATION_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const isActive = isActiveRoute(item.href);

                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={onLinkClick}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                                        isActive
                                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                            : "text-sidebar-foreground"
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Avatar Section */}
                    <div className="border-t border-sidebar-border p-4">
                        {isLoading ? (
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                                <div className="flex-1 min-w-0">
                                    <div className="h-4 w-20 bg-muted rounded animate-pulse mb-1" />
                                    <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                                </div>
                            </div>
                        ) : user ? (
                            <div className="flex items-center gap-3 relative">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={user.avatarUrl || undefined}
                                        alt={`${user.username} avatar`}
                                    />
                                    <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs font-medium">
                                        {getAvatarFallback()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                                        {user.username}
                                    </p>
                                    <p className="text-xs text-sidebar-foreground/70 truncate">
                                        {user.email}
                                    </p>
                                </div>
                                <Link
                                    to={ROUTES_CONSTANTS.DASHBOARD().SETTINGS()}
                                    onClick={onLinkClick}
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    >
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </div>
            </aside>
        </>
    );
};
