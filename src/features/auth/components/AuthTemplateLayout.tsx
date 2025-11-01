/**
 * AuthTemplateLayoutProps - Interface for AuthTemplateLayout component props
 */
interface AuthTemplateLayoutProps {
    left: React.ReactNode;
    right: React.ReactNode;
}

/**
 * AuthTemplateLayout - Component for displaying auth pages with left and right sections
 * @param props - The props for the AuthTemplateLayout component
 * @param props.left - The left content to render
 * @param props.right - The right content to render
 * @returns AuthTemplateLayout component
 */
export const AuthTemplateLayout = ({
    left,
    right,
}: AuthTemplateLayoutProps) => {
    return (
        <div className="relative grid md:grid-cols-2 min-h-[600px]">
            <div className="bg-muted/50 p-8 flex items-center justify-center">
                <div className="w-full max-w-sm">{left}</div>
            </div>
            <div className="p-8 flex items-center justify-center">
                <div className="w-full max-w-sm">{right}</div>
            </div>
        </div>
    );
};

