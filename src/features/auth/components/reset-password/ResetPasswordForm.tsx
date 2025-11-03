import { Card, CardContent } from "@/components/ui/card";
import { ResetPasswordEmailStep } from "@/features/auth/components/reset-password/steps/ResetPasswordEmailStep";
import { ResetPasswordOtpStep } from "@/features/auth/components/reset-password/steps/ResetPasswordOtpStep";
import { ResetPasswordPasswordStep } from "@/features/auth/components/reset-password/steps/ResetPasswordPasswordStep";

/**
 * ResetPasswordFormData - Interface for reset password form data
 */
export interface ResetPasswordFormData {
    email: string;
    resetToken: string;
    code: string;
    newPassword: string;
}

/**
 * ResetPasswordStep - Type for reset password steps
 */
export type ResetPasswordStep = "email" | "otp" | "password";

/**
 * ResetPasswordFormProps - Interface for ResetPasswordForm component props
 */
interface ResetPasswordFormProps {
    currentStep: ResetPasswordStep;
    formData: ResetPasswordFormData;
    onEmailChange: (email: string) => void;
    onCodeChange: (code: string) => void;
    onPasswordChange: (password: string) => void;
    onEmailSubmit: () => void;
    onOtpSubmit: () => void;
    onPasswordSubmit: () => void;
    onBack: () => void;
    error?: string;
    onClearError: () => void;
    isLoading?: boolean;
}

/**
 * ResetPasswordForm - Component for displaying the reset password form with steps
 * @param props - The props for the ResetPasswordForm component
 * @param props.currentStep - The current step
 * @param props.formData - The form data object
 * @param props.onEmailChange - Handler for email input change
 * @param props.onCodeChange - Handler for code input change
 * @param props.onPasswordChange - Handler for password input change
 * @param props.onEmailSubmit - Handler for email form submission
 * @param props.onOtpSubmit - Handler for OTP form submission
 * @param props.onPasswordSubmit - Handler for password form submission
 * @param props.onBack - Handler for back button click
 * @param props.error - Error message to display
 * @param props.onClearError - Handler to clear error
 * @param props.isLoading - Loading state
 * @returns ResetPasswordForm component
 */
export const ResetPasswordForm = ({
    currentStep,
    formData,
    onEmailChange,
    onCodeChange,
    onPasswordChange,
    onEmailSubmit,
    onOtpSubmit,
    onPasswordSubmit,
    onBack,
    error,
    onClearError,
    isLoading = false,
}: ResetPasswordFormProps) => {
    return (
        <Card className="max-w-2xl w-full min-h-[450px]">
            <CardContent className="px-8 pb-8 flex items-center justify-center min-h-[450px]">
                {currentStep === "email" && (
                    <ResetPasswordEmailStep
                        email={formData.email}
                        onEmailChange={onEmailChange}
                        onSubmit={onEmailSubmit}
                        error={error}
                        onClearError={onClearError}
                        isLoading={isLoading}
                    />
                )}

                {currentStep === "otp" && (
                    <ResetPasswordOtpStep
                        code={formData.code}
                        onCodeChange={onCodeChange}
                        onSubmit={onOtpSubmit}
                        onBack={onBack}
                        error={error}
                        onClearError={onClearError}
                        isLoading={isLoading}
                    />
                )}

                {currentStep === "password" && (
                    <ResetPasswordPasswordStep
                        newPassword={formData.newPassword}
                        onPasswordChange={onPasswordChange}
                        onSubmit={onPasswordSubmit}
                        onBack={onBack}
                        error={error}
                        onClearError={onClearError}
                        isLoading={isLoading}
                    />
                )}
            </CardContent>
        </Card>
    );
};
