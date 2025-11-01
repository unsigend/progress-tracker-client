import { StepIndicator } from "@/features/auth/components/register/StepIndicator";
import { EmailStep } from "@/features/auth/components/register/steps/EmailStep";
import { PasswordStep } from "@/features/auth/components/register/steps/PasswordStep";
import { UsernameStep } from "@/features/auth/components/register/steps/UsernameStep";
import { ThemePreferenceStep } from "@/features/auth/components/register/steps/ThemePreferenceStep";

const TOTAL_STEPS = 4;

/**
 * RegisterFormData - Interface for register form data
 */
export interface RegisterFormData {
    email: string;
    password: string;
    username: string;
    theme: "light" | "dark";
}

/**
 * RegisterFormProps - Interface for RegisterForm component props
 */
interface RegisterFormProps {
    currentStep: number;
    formData: RegisterFormData;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onUsernameChange: (username: string) => void;
    onThemeChange: (theme: "light" | "dark") => void;
    onNext: () => void;
    onBack: () => void;
    onSubmit: () => void;
    onGoogleLogin: () => void;
    onGithubLogin: () => void;
    isLoading?: boolean;
}

/**
 * RegisterForm - Component for displaying the registration form with steps
 * @param props - The props for the RegisterForm component
 * @param props.currentStep - The current step number (1-based)
 * @param props.formData - The form data object
 * @param props.onEmailChange - Handler for email input change
 * @param props.onPasswordChange - Handler for password input change
 * @param props.onUsernameChange - Handler for username input change
 * @param props.onThemeChange - Handler for theme selection change
 * @param props.onNext - Handler for next button click
 * @param props.onBack - Handler for back button click
 * @param props.onSubmit - Handler for form submission
 * @param props.onGoogleLogin - Handler for Google login button click
 * @param props.onGithubLogin - Handler for GitHub login button click
 * @param props.isLoading - Loading state
 * @returns RegisterForm component
 */
export const RegisterForm = ({
    currentStep,
    formData,
    onEmailChange,
    onPasswordChange,
    onUsernameChange,
    onThemeChange,
    onNext,
    onBack,
    onSubmit,
    onGoogleLogin,
    onGithubLogin,
    isLoading = false,
}: RegisterFormProps) => {
    return (
        <>
            <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

            {currentStep === 1 && (
                <EmailStep
                    email={formData.email}
                    onEmailChange={onEmailChange}
                    onNext={onNext}
                    onGoogleLogin={onGoogleLogin}
                    onGithubLogin={onGithubLogin}
                    isLoading={isLoading}
                />
            )}

            {currentStep === 2 && (
                <PasswordStep
                    password={formData.password}
                    onPasswordChange={onPasswordChange}
                    onNext={onNext}
                    onBack={onBack}
                    isLoading={isLoading}
                />
            )}

            {currentStep === 3 && (
                <UsernameStep
                    username={formData.username}
                    onUsernameChange={onUsernameChange}
                    onSubmit={onNext}
                    onBack={onBack}
                    isLoading={isLoading}
                />
            )}

            {currentStep === 4 && (
                <ThemePreferenceStep
                    theme={formData.theme}
                    onThemeChange={onThemeChange}
                    onStart={onSubmit}
                    onBack={onBack}
                    isLoading={isLoading}
                />
            )}
        </>
    );
};
