import { Link } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { cn } from "@/lib/utils";

/**
 * Logo Component
 * @className - Class name for the logo
 * @returns - Logo component
 */
export const Logo = ({ className }: { className?: string }) => {
    return (
        <Link to={ROUTES_CONSTANTS().LANDING().HOME()}>
            <div className={cn("font-bold text-2xl", className)}>
                <span className="text-foreground">Progress</span>
                <span className="text-muted-foreground">Tracker</span>
            </div>
        </Link>
    );
};
