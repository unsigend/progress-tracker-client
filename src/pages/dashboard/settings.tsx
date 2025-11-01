import { SettingsContainer } from "@/features/dashboard/container/SettingsContainer";

/**
 * DashboardSettingsPage - The page for dashboard settings
 * @returns DashboardSettingsPage component
 */
export const DashboardSettingsPage = () => {
    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto space-y-6">
                    <SettingsContainer />
                </div>
            </div>
        </div>
    );
};
