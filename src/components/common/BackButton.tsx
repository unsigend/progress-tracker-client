import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

/**
 * BackButtonProps - Interface for BackButton component props
 */
interface BackButtonProps {
    to?: string;
    onClick?: () => void;
}

/**
 * BackButton - Component for displaying a back button or link
 * @param props - The props for the BackButton component
 * @param props.to - The link to navigate to (used if onClick is not provided)
 * @param props.onClick - The function to call when the button is clicked (if provided, renders as button)
 * @returns BackButton component
 */
export const BackButton = ({ to = "", onClick }: BackButtonProps) => {
    const buttonClassName =
        "p-2 rounded-full hover:bg-accent transition-colors duration-200";

    if (onClick) {
        return (
            <button onClick={onClick} className={buttonClassName}>
                <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
        );
    }

    return (
        <Link to={to} className={buttonClassName}>
            <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
    );
};
