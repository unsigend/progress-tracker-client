import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, Award } from "lucide-react";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { cn } from "@/lib/utils";

/**
 * FindNewCoursesCard - Card component for finding new courses
 * @returns FindNewCoursesCard component
 */
export const FindNewCoursesCard = () => {
    return (
        <Card
            className={cn(
                "h-full relative overflow-hidden group transition-all duration-300",
                "hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20",
                "hover:-translate-y-0.5 border-border/50 hover:border-border/80"
            )}
        >
            {/* Subtle decorative gradient overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    background:
                        "radial-gradient(ellipse at 80% 70%, currentColor 0%, transparent 50%)",
                }}
            />

            {/* Decorative course icons - very subtle */}
            <div className="absolute top-8 right-8 opacity-[0.02] dark:opacity-[0.04] group-hover:opacity-[0.03] dark:group-hover:opacity-[0.06] transition-opacity duration-300">
                <Award className="h-24 w-24 text-foreground" />
            </div>
            <div className="absolute bottom-12 left-4 opacity-[0.015] dark:opacity-[0.03] group-hover:opacity-[0.025] dark:group-hover:opacity-[0.05] transition-opacity duration-300">
                <GraduationCap className="h-16 w-16 text-foreground -rotate-12" />
            </div>

            <CardContent className="relative z-10 p-6 h-full flex flex-col">
                {/* Header Section */}
                <div className="flex-shrink-0 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-primary rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <GraduationCap className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-foreground leading-tight">
                                Find Your New
                            </h3>
                            <p className="text-sm font-medium text-muted-foreground mt-0.5">
                                Courses
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Explore a wide range of courses from top institutions.
                        Start learning and track your educational progress.
                    </p>
                </div>

                {/* Spacer to push button to bottom */}
                <div className="flex-1" />

                {/* Button - Bottom Right */}
                <div className="flex justify-end mt-auto">
                    <Link
                        to={ROUTES_CONSTANTS.DASHBOARD()
                            .COURSES()
                            .LIST()
                            .HOME()}
                    >
                        <Button
                            size="sm"
                            className="h-9 px-4 text-sm font-medium shadow-sm hover:shadow-md 
                            transition-all duration-200 hover:scale-105 rounded-lg cursor-pointer"
                        >
                            Explore Courses
                            <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};
