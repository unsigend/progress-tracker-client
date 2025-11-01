import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

/**
 * LogoProps - Interface for Logo component props
 */
interface LogoProps {
    fontSize?: string;
    className?: string;
}

/**
 * Logo - Component for displaying the application logo
 * @param props - The props for the Logo component
 * @param props.fontSize - The font size of the logo
 * @param props.className - The class name of the logo
 * @returns Logo component
 */
export const Logo = ({ fontSize = "text-2xl", className }: LogoProps) => {
    return (
        <Link to={ROUTES_CONSTANTS.LANDING().HOME()}>
            <div className={cn("font-bold", fontSize, className)}>
                <span className="text-foreground">Progress</span>
                <span className="text-muted-foreground">tracker</span>
            </div>
        </Link>
    );
};
