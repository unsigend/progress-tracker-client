import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

/**
 * QuickActionsCardProps - Interface for QuickActionsCard component props
 */
interface QuickActionsCardProps {
    /** URL for the primary action button */
    primaryActionUrl: string;
    /** Label for the primary action button */
    primaryActionLabel: string;
    /** Icon for the primary action button */
    primaryActionIcon: LucideIcon;
    /** URL for the secondary action button */
    secondaryActionUrl: string;
    /** Label for the secondary action button */
    secondaryActionLabel: string;
    /** Icon for the secondary action button */
    secondaryActionIcon: LucideIcon;
}

/**
 * QuickActionsCard - Reusable UI component for displaying quick action buttons
 * @param props - The props for the QuickActionsCard component
 * @returns QuickActionsCard component
 */
export const QuickActionsCard = ({
    primaryActionUrl,
    primaryActionLabel,
    primaryActionIcon: PrimaryIcon,
    secondaryActionUrl,
    secondaryActionLabel,
    secondaryActionIcon: SecondaryIcon,
}: QuickActionsCardProps) => {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
                <CardTitle className="text-xl font-semibold text-foreground">
                    Quick Actions
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
                <div className="flex flex-col gap-4 items-center w-full max-w-xs">
                    {/* Primary Action Button */}
                    <Link to={primaryActionUrl} className="w-full">
                        <Button
                            className="w-full h-12 text-base font-medium shadow-lg hover:shadow-xl 
                            transition-all duration-200 hover:scale-[1.02] rounded-lg"
                            size="lg"
                        >
                            <PrimaryIcon className="mr-2 h-5 w-5" />
                            {primaryActionLabel}
                        </Button>
                    </Link>

                    {/* Secondary Action Button */}
                    <Link to={secondaryActionUrl} className="w-full">
                        <Button
                            variant="outline"
                            className="w-full h-12 text-base font-medium border-2 
                            hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02] rounded-lg"
                            size="lg"
                        >
                            <SecondaryIcon className="mr-2 h-5 w-5" />
                            {secondaryActionLabel}
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};
