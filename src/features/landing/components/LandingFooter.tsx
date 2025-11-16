import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { APP_CONSTANTS } from "@/constants/app.constant";
import { Github, Mail } from "lucide-react";

const FOOTER_LINK_STYLE =
    "text-muted-foreground hover:text-foreground transition-colors";

/**
 * LandingFooter - Component for displaying the footer section
 * @returns LandingFooter component
 */
export const LandingFooter = () => {
    return (
        <footer className="bg-background text-foreground w-full">
            <div className="px-4 py-12">
                <div className="max-w-7xl mx-auto">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
                        {/* Brand Section */}
                        <div className="space-y-4 col-span-2 lg:col-span-1">
                            <h3 className="text-xl font-bold">
                                Progress Tracker
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Track your progress across multiple domains with
                                seamless integrations and modern analytics.
                            </p>
                        </div>

                        {/* Product Links */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">
                                Product
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="#features"
                                        className={FOOTER_LINK_STYLE}
                                    >
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#pricing"
                                        className={FOOTER_LINK_STYLE}
                                    >
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#integrations"
                                        className={FOOTER_LINK_STYLE}
                                    >
                                        Integrations
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#api"
                                        className={FOOTER_LINK_STYLE}
                                    >
                                        API
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">
                                Company
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href={ROUTES_CONSTANTS.LANDING().ABOUT()}
                                        className={FOOTER_LINK_STYLE}
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#blog"
                                        className={FOOTER_LINK_STYLE}
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#careers"
                                        className={FOOTER_LINK_STYLE}
                                    >
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#contact"
                                        className={FOOTER_LINK_STYLE}
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Resources Links */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">
                                Resources
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="#docs"
                                        className={FOOTER_LINK_STYLE}
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#help"
                                        className={FOOTER_LINK_STYLE}
                                    >
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#community"
                                        className={FOOTER_LINK_STYLE}
                                    >
                                        Community
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#status"
                                        className={FOOTER_LINK_STYLE}
                                    >
                                        Status
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-border pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            {/* Copyright */}
                            <p className="text-muted-foreground text-sm">
                                © 2025 Progress Tracker. All rights reserved.
                            </p>

                            {/* Social Links */}
                            <div className="flex items-center gap-4">
                                <a
                                    href={APP_CONSTANTS.APP_GITHUB_URL}
                                    className={FOOTER_LINK_STYLE}
                                    aria-label="GitHub"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href={`mailto:${APP_CONSTANTS.APP_AUTHOR_EMAIL}`}
                                    className={FOOTER_LINK_STYLE}
                                    aria-label="Email"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

