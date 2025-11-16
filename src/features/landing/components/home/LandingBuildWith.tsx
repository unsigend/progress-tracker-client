import { buildWithLogos } from "@/features/landing/constants/build-with-logos";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import LogoLoop from "@/components/third-party/LogoLoop/LogoLoop";
import { useTheme } from "@/hooks/use-theme";

/**
 * LandingBuildWith - Component for displaying the technology stack logos
 * @returns LandingBuildWith component
 */
export const LandingBuildWith = () => {
    const { theme } = useTheme();

    const logoData = buildWithLogos.map((logo) => ({
        src: logo.url,
        alt: logo.name,
        title: logo.name,
        href: undefined,
    }));

    const fadeOutColor =
        theme === "dark"
            ? "#0b0b0b"
            : theme === "light"
            ? "#ffffff"
            : undefined;

    return (
        <div className="mb-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-8">
                    <p className="text-xl text-muted-foreground font-medium">
                        Built with modern technologies
                    </p>
                </div>
                <div className="relative overflow-hidden">
                    <LogoLoop
                        logos={logoData}
                        speed={50}
                        direction="left"
                        logoHeight={65}
                        gap={48}
                        pauseOnHover={true}
                        scaleOnHover={true}
                        fadeOut={true}
                        fadeOutColor={fadeOutColor}
                        ariaLabel="Technology stack logos"
                        className={`py-4 ${
                            theme === "dark" ? "dark-mode-logos" : ""
                        }`}
                    />
                </div>
            </div>
        </div>
    );
};
