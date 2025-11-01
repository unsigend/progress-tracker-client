import { Menu, X } from "lucide-react";

/**
 * HamburgerButtonProps - Interface for HamburgerButton component props
 */
interface HamburgerButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

/**
 * HamburgerButton - Component for displaying a hamburger menu button
 * @param props - The props for the HamburgerButton component
 * @param props.isOpen - Boolean to check if the button is open
 * @param props.onClick - Function to handle the click event
 * @returns HamburgerButton component
 */
export const HamburgerButton = ({ isOpen, onClick }: HamburgerButtonProps) => {
    return isOpen ? (
        <X className="size-6 cursor-pointer" onClick={onClick} />
    ) : (
        <Menu className="size-6 cursor-pointer" onClick={onClick} />
    );
};
