// import icons
import { Menu, X } from "lucide-react";

/**
 * Hamburger Button Component
 * @param isOpen - boolean to check if the button is open
 * @param onClick - function to handle the click event
 * @returns Hamburger Button Component
 */
export const HamburgerButton = ({
    isOpen,
    onClick,
}: {
    isOpen: boolean;
    onClick: () => void;
}) => {
    /**
     * If the isOpen is true, return the X icon
     * if the isOpen is false, return the Menu icon
     */
    return isOpen ? (
        <X className="size-6 cursor-pointer" onClick={onClick} />
    ) : (
        <Menu className="size-6 cursor-pointer" onClick={onClick} />
    );
};
