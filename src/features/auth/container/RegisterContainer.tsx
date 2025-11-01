import { useState } from "react";
import { AuthTemplateLayout } from "@/features/auth/components/AuthTemplateLayout";
import {
    RegisterForm,
    type RegisterFormData,
} from "@/features/auth/components/register/RegisterForm";
import { RegisterChart } from "@/features/auth/components/register/RegisterChart";

/**
 * RegisterContainer - Container component for register page with all logic
 * @returns RegisterContainer component
 */
export const RegisterContainer = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState<RegisterFormData>({
        email: "",
        password: "",
        username: "",
        theme: "light",
    });

    // TODO: Add register hooks when available
    // const { mutate: emailCheck } = useEmailCheck();
    // const { mutate: register } = useRegister();
    // const googleLogin = useGoogleLogin();
    // const githubLogin = useGithubLogin();

    const handleEmailChange = (email: string) => {
        setFormData((prev) => ({ ...prev, email }));
    };

    const handlePasswordChange = (password: string) => {
        setFormData((prev) => ({ ...prev, password }));
    };

    const handleUsernameChange = (username: string) => {
        setFormData((prev) => ({ ...prev, username }));
    };

    const handleThemeChange = (theme: "light" | "dark") => {
        setFormData((prev) => ({ ...prev, theme }));
    };

    const handleNext = () => {
        // TODO: Add validation and email check logic
        // if (currentStep === 1) {
        //     // Validate email and check if exists
        //     emailCheck(formData.email, {
        //         onSuccess: (exists: boolean) => {
        //             if (!exists) {
        //                 setCurrentStep(currentStep + 1);
        //             }
        //         },
        //     });
        // } else if (currentStep === 2) {
        //     // Validate password
        //     setCurrentStep(currentStep + 1);
        // }
        setCurrentStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = () => {
        // TODO: Add validation and register logic
        // if (currentStep === 3) {
        //     // Validate username and register
        //     register(formData);
        // }
        console.log("Register submitted:", formData);
    };

    const handleGoogleLogin = () => {
        // TODO: Implement Google login logic
        // googleLogin();
        console.log("Google login clicked");
    };

    const handleGithubLogin = () => {
        // TODO: Implement GitHub login logic
        // githubLogin();
        console.log("GitHub login clicked");
    };

    // TODO: Get actual loading state from hooks
    const isLoading = false;

    return (
        <AuthTemplateLayout
            left={<RegisterChart stepIndex={currentStep - 1} />}
            right={
                <RegisterForm
                    currentStep={currentStep}
                    formData={formData}
                    onEmailChange={handleEmailChange}
                    onPasswordChange={handlePasswordChange}
                    onUsernameChange={handleUsernameChange}
                    onThemeChange={handleThemeChange}
                    onNext={handleNext}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    onGoogleLogin={handleGoogleLogin}
                    onGithubLogin={handleGithubLogin}
                    isLoading={isLoading}
                />
            }
        />
    );
};
