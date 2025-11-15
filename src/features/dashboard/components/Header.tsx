import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HamburgerButton } from "@/components/common/HamburgerButton";
import { ThemeToggleButton } from "@/components/ui/theme-toggle-button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown, Settings, LogOut } from "lucide-react";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type { User } from "@/entities/users/models/model";

/**
 * HeaderProps - Interface for Header component props
 */
interface HeaderProps {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
    user: User | null;
    isLoading: boolean;
    onLogout: () => void;
}

/**
 * Header - Component for displaying the dashboard header
 * @param props - The props for the Header component
 * @param props.isSidebarOpen - Boolean to check if the sidebar is open
 * @param props.onToggleSidebar - Handler for toggling sidebar
 * @param props.user - The current user data
 * @param props.isLoading - Loading state for user data
 * @param props.onLogout - Handler for logout action
 * @returns Header component
 */
export const Header = ({
    isSidebarOpen,
    onToggleSidebar,
    user,
    isLoading,
    onLogout,
}: HeaderProps) => {
    /**
     * Get user avatar fallback (first letter of username)
     */
    const getAvatarFallback = (): string => {
        if (!user?.username) return "U";
        return user.username.charAt(0).toUpperCase();
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-4 shadow-sm sm:px-6 lg:px-8">
            {/* Left side - Hamburger button on mobile */}
            <div className="flex items-center">
                <div className="lg:hidden">
                    <HamburgerButton
                        isOpen={isSidebarOpen}
                        onClick={onToggleSidebar}
                    />
                </div>
            </div>

            {/* Right side - User actions */}
            <div className="flex items-center gap-x-4">
                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-foreground"
                >
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">View notifications</span>
                </Button>

                {/* Theme Toggle */}
                <ThemeToggleButton />

                {/* User Menu */}
                {isLoading ? (
                    <div className="flex items-center gap-x-2 px-2 py-1.5">
                        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                        <div className="hidden sm:block text-left">
                            <div className="h-4 w-20 bg-muted rounded animate-pulse mb-1" />
                            <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                        </div>
                    </div>
                ) : user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center gap-x-2 px-2 py-1.5 h-auto"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={user.avatarUrl || undefined}
                                        alt={`${user.username} avatar`}
                                    />
                                    <AvatarFallback className="text-xs font-medium">
                                        {getAvatarFallback()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden sm:block text-left">
                                    <p className="text-sm font-medium text-foreground">
                                        {user.username}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="flex items-center gap-x-2 p-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={user.avatarUrl || undefined}
                                        alt={`${user.username} avatar`}
                                    />
                                    <AvatarFallback className="text-xs font-medium">
                                        {getAvatarFallback()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">
                                        {user.username}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link
                                    to={ROUTES_CONSTANTS.DASHBOARD().SETTINGS()}
                                    className="flex items-center gap-x-2 cursor-pointer"
                                >
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={onLogout}
                                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : null}
            </div>
        </header>
    );
};
