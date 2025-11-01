import { StepIndicator } from "@/features/auth/components/register/StepIndicator";
import { EmailStep } from "@/features/auth/components/register/steps/EmailStep";
import { PasswordStep } from "@/features/auth/components/register/steps/PasswordStep";
import { UsernameStep } from "@/features/auth/components/register/steps/UsernameStep";
import { ThemePreferenceStep } from "@/features/auth/components/register/steps/ThemePreferenceStep";
import {
    RegisterStep,
    type RegisterStepType,
} from "@/features/auth/constants/register-step.enum";
import type { IRegisterForm } from "@/entities/auth/models/model";

const TOTAL_STEPS = 4;

/**
 * RegisterFormProps - Interface for RegisterForm component props
 */
interface RegisterFormProps {
    currentStep: RegisterStepType;
    formData: IRegisterForm;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onUsernameChange: (username: string) => void;
    onNext: () => void;
    onBack: () => void;
    onThemeSubmit: () => void;
    onGoogleLogin: () => void;
    onGithubLogin: () => void;
    isLoading?: boolean;
}

/**
 * RegisterForm - Component for displaying the registration form with steps
 * @param props - The props for the RegisterForm component
 * @param props.currentStep - The current step
 * @param props.formData - The form data object
 * @param props.onEmailChange - Handler for email input change
 * @param props.onPasswordChange - Handler for password input change
 * @param props.onUsernameChange - Handler for username input change
 * @param props.onNext - Handler for next button click
 * @param props.onBack - Handler for back button click
 * @param props.onThemeSubmit - Handler for theme submission (when Start button is clicked)
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
    onNext,
    onBack,
    onThemeSubmit,
    onGoogleLogin,
    onGithubLogin,
    isLoading = false,
}: RegisterFormProps) => {
    return (
        <>
            <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

            {currentStep === RegisterStep.EMAIL && (
                <EmailStep
                    email={formData.email}
                    onEmailChange={onEmailChange}
                    onSubmit={onNext}
                    onGoogleLogin={onGoogleLogin}
                    onGithubLogin={onGithubLogin}
                    isLoading={isLoading}
                />
            )}

            {currentStep === RegisterStep.PASSWORD && (
                <PasswordStep
                    password={formData.password}
                    onPasswordChange={onPasswordChange}
                    onSubmit={onNext}
                    onBack={onBack}
                    isLoading={isLoading}
                />
            )}

            {currentStep === RegisterStep.USERNAME && (
                <UsernameStep
                    username={formData.username}
                    onUsernameChange={onUsernameChange}
                    onSubmit={onNext}
                    onBack={onBack}
                    isLoading={isLoading}
                />
            )}

            {currentStep === RegisterStep.THEME && (
                <ThemePreferenceStep
                    onThemeSubmit={onThemeSubmit}
                    isLoading={isLoading}
                />
            )}
        </>
    );
};
