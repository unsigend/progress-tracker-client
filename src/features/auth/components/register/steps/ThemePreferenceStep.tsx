import { Sun, Moon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * ThemePreferenceStepProps - Interface for ThemePreferenceStep component props
 */
interface ThemePreferenceStepProps {
    theme: "light" | "dark";
    onThemeChange: (theme: "light" | "dark") => void;
    onStart: () => void;
    onBack: () => void;
    isLoading?: boolean;
}

/**
 * ThemePreferenceStep - Component for the theme preference step in registration
 * @param props - The props for the ThemePreferenceStep component
 * @param props.theme - The selected theme value
 * @param props.onThemeChange - Handler for theme selection change
 * @param props.onStart - Handler for start button click
 * @param props.onBack - Handler for back button click
 * @param props.isLoading - Loading state
 * @returns ThemePreferenceStep component
 */
export const ThemePreferenceStep = ({
    theme,
    onThemeChange,
    onStart,
    onBack,
    isLoading = false,
}: ThemePreferenceStepProps) => {
    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-center space-y-3">
                <h1 className="text-3xl font-bold text-foreground transition-all duration-300">
                    Choose your theme
                </h1>
                <p className="text-sm text-muted-foreground transition-all duration-300 text-left">
                    Select your preferred theme to personalize your experience
                </p>
            </div>

            <form
                className="space-y-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    onStart();
                }}
            >
                <div className="grid grid-cols-2 gap-3">
                    <Card
                        className={cn(
                            "cursor-pointer transition-all duration-200 hover:shadow-md",
                            theme === "light"
                                ? "border-primary ring-2 ring-primary ring-offset-2"
                                : "border-border hover:border-primary/50"
                        )}
                        onClick={() => onThemeChange("light")}
                    >
                        <CardContent className="p-3 flex flex-col items-center justify-center space-y-1.5">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                                    theme === "light"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                )}
                            >
                                <Sun className="w-5 h-5" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-sm text-foreground">
                                    Light
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Clean and bright
                                </p>
                            </div>
                            {theme === "light" && (
                                <Check className="w-3.5 h-3.5 text-primary" />
                            )}
                        </CardContent>
                    </Card>

                    <Card
                        className={cn(
                            "cursor-pointer transition-all duration-200 hover:shadow-md",
                            theme === "dark"
                                ? "border-primary ring-2 ring-primary ring-offset-2"
                                : "border-border hover:border-primary/50"
                        )}
                        onClick={() => onThemeChange("dark")}
                    >
                        <CardContent className="p-3 flex flex-col items-center justify-center space-y-1.5">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                                    theme === "dark"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                )}
                            >
                                <Moon className="w-5 h-5" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-sm text-foreground">
                                    Dark
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Easy on the eyes
                                </p>
                            </div>
                            {theme === "dark" && (
                                <Check className="w-3.5 h-3.5 text-primary" />
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="flex gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onBack}
                        className="flex-1 transition-all duration-200 cursor-pointer"
                    >
                        Back
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 transition-all duration-200 cursor-pointer"
                        disabled={isLoading}
                    >
                        Start
                    </Button>
                </div>
            </form>
        </div>
    );
};
