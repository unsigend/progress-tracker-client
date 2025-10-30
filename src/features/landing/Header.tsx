import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { HamburgerButton } from "@/components/common/HamburgerButton";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { cn } from "@/lib/utils";

/**
 * Header Component for the Landing Page
 */
export const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsMobileMenuOpen(false);
            }
        };
        if (isMobileMenuOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { label: "Home", path: ROUTES_CONSTANTS().LANDING().HOME() },
        { label: "About", path: ROUTES_CONSTANTS().LANDING().ABOUT() },
        { label: "Contact", path: ROUTES_CONSTANTS().LANDING().CONTACT() },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Desktop Header */}
                <div className="hidden md:flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Logo className="text-xl" />
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "relative h-9 px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                        isActive(link.path) &&
                                            "bg-accent text-accent-foreground"
                                    )}
                                >
                                    {link.label}
                                    {isActive(link.path) && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                                    )}
                                </Button>
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Link to={ROUTES_CONSTANTS().AUTH().LOGIN()}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 px-4 text-sm font-medium"
                            >
                                Login
                            </Button>
                        </Link>
                        <Link to={ROUTES_CONSTANTS().AUTH().SIGNUP()}>
                            <Button
                                variant="default"
                                size="sm"
                                className="h-9 px-4 text-sm font-medium"
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="flex md:hidden h-16 items-center justify-between">
                    <Logo className="text-xl" />
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <HamburgerButton
                            isOpen={isMobileMenuOpen}
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
                    isMobileMenuOpen
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0"
                )}
            >
                <div className="container mx-auto px-4 pb-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link key={link.path} to={link.path}>
                            <Button
                                variant={
                                    isActive(link.path) ? "secondary" : "ghost"
                                }
                                className={cn(
                                    "w-full justify-start h-10 text-base font-medium transition-colors",
                                    isActive(link.path) &&
                                        "bg-secondary text-secondary-foreground"
                                )}
                            >
                                {link.label}
                            </Button>
                        </Link>
                    ))}
                    <div className="flex flex-col gap-2 pt-4 border-t border-border">
                        <Link to={ROUTES_CONSTANTS().AUTH().LOGIN()}>
                            <Button
                                variant="outline"
                                className="w-full justify-center h-10 text-base font-medium"
                            >
                                Login
                            </Button>
                        </Link>
                        <Link to={ROUTES_CONSTANTS().AUTH().SIGNUP()}>
                            <Button
                                variant="default"
                                className="w-full justify-center h-10 text-base font-medium"
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};
