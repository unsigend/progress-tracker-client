import { Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { APP_CONSTANTS } from "@/constants/app.constant";
import { useTheme } from "@/hooks/use-theme";
import { useNavigate } from "react-router";

/**
 * HeroSection - Component for displaying the hero section
 * @returns HeroSection component
 */
export const HeroSection = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const heroImage =
        theme === "dark"
            ? "/images/landing/hero-dark.png"
            : "/images/landing/hero-light.png";

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 lg:gap-8 items-center">
                <div className="space-y-6 text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                        Progress Tracker
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                        Progress Tracker is a website to integrate all sorts of
                        progress tracking features into one place. Built with
                        modern technologies for seamless progress monitoring.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 lg:justify-start md:gap-6">
                        <Button
                            className="w-full sm:w-auto cursor-pointer"
                            onClick={() => {
                                navigate(ROUTES_CONSTANTS.AUTH().REGISTER());
                            }}
                        >
                            <ArrowRight className="size-4 mr-2" />
                            Quick Start
                        </Button>
                        <a
                            href={APP_CONSTANTS.APP_GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto cursor-pointer"
                            >
                                <Github className="size-4 mr-2" />
                                GitHub Repo
                            </Button>
                        </a>
                    </div>
                </div>
                <div className="flex justify-center lg:justify-end">
                    <img
                        src={heroImage}
                        alt="Progress Tracker Hero Illustration"
                        className="w-full max-w-md lg:max-w-sm xl:max-w-md h-auto"
                    />
                </div>
            </div>
        </div>
    );
};
