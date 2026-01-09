import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { universityLogos } from "@/features/courses/constants/university-logos";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

/**
 * UniversityList - Component for displaying university avatars in a static grid
 * @returns UniversityList component
 */
export const UniversityList = () => {
    const navigate = useNavigate();

    const handleUniversityClick = (universityValue: string) => {
        const url = `${ROUTES_CONSTANTS.DASHBOARD()
            .COURSES()
            .LIST()
            .HOME()}?value=${encodeURIComponent(universityValue)}&page=1`;
        navigate(url);
    };

    return (
        <Card className="h-full flex flex-col min-h-0">
            <CardHeader className="flex-shrink-0">
                <CardTitle className="text-xl font-semibold text-foreground">
                    Browse By University
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 flex items-center justify-center p-4 sm:p-6">
                <div
                    className={cn(
                        "grid gap-3 sm:gap-4 w-full h-full",
                        "grid-cols-2",
                        "sm:grid-cols-3",
                        "lg:grid-cols-6",
                        "auto-rows-fr"
                    )}
                >
                    {universityLogos.map((university) => (
                        <button
                            key={university.value}
                            onClick={() =>
                                handleUniversityClick(university.value)
                            }
                            className={cn(
                                "group flex flex-col items-center justify-center gap-3",
                                "transition-all duration-300",
                                "hover:scale-105",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg",
                                "cursor-pointer"
                            )}
                            aria-label={`Browse ${university.name} courses`}
                        >
                            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-border/50 group-hover:border-border transition-colors duration-300 overflow-hidden">
                                <AvatarImage
                                    src={university.url}
                                    alt={university.name}
                                    className="object-contain p-0"
                                />
                                <AvatarFallback className="text-xs font-medium">
                                    {university.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <span
                                className={cn(
                                    "text-xs sm:text-sm font-medium text-muted-foreground text-center",
                                    "transition-colors duration-300",
                                    "group-hover:text-foreground"
                                )}
                            >
                                {university.name}
                            </span>
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
