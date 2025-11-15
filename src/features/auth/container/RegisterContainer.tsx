import { useState } from "react";
import { toast } from "sonner";
import { AuthTemplateLayout } from "@/features/auth/components/AuthTemplateLayout";
import { RegisterForm } from "@/features/auth/components/register/RegisterForm";
import { RegisterChart } from "@/features/auth/components/register/RegisterChart";
import {
    RegisterStep,
    type RegisterStepType,
} from "@/features/auth/constants/register-step.enum";
import type { RegisterFormData } from "@/entities/auth/models/model";
import { useRegister } from "@/entities/auth/hooks/useRegister";
import { useEmailCheck } from "@/entities/auth/hooks/useEmailCheck";
import { validateEmail } from "@/entities/auth/validation/email";
import { validatePassword } from "@/entities/auth/validation/password";
import { validateUsername } from "@/entities/auth/validation/username";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useNavigate } from "react-router";
import { useGoogleLogin } from "@/entities/auth/hooks/useGoogleLogin";
import { useGithubLogin } from "@/entities/auth/hooks/useGithubLogin";

/**
 * RegisterContainer - Container component for register page with all logic
 * @returns RegisterContainer component
 */
export const RegisterContainer = () => {
    const [currentStep, setCurrentStep] = useState<RegisterStepType>(
        RegisterStep.EMAIL
    );
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<RegisterFormData>({
        email: "",
        password: "",
        username: "",
    });

    const { mutate: emailCheck } = useEmailCheck();
    const { mutate: register } = useRegister();
    const { mutate: googleLogin } = useGoogleLogin();
    const { mutate: githubLogin } = useGithubLogin();

    const handleEmailChange = (email: string) => {
        setFormData((prev) => ({ ...prev, email }));
    };

    const handlePasswordChange = (password: string) => {
        setFormData((prev) => ({ ...prev, password }));
    };

    const handleUsernameChange = (username: string) => {
        setFormData((prev) => ({ ...prev, username }));
    };

    const handleNext = () => {
        setIsLoading(true);

        // email validation
        if (currentStep === RegisterStep.EMAIL) {
            const { isValid, error } = validateEmail(formData.email);
            if (!isValid) {
                toast.error(error);
                setIsLoading(false);
                return;
            }
            emailCheck(formData.email, {
                onSuccess: (isAvailable: boolean) => {
                    if (!isAvailable) {
                        toast.error("Email already in use");
                        setIsLoading(false);
                        return;
                    }
                    setCurrentStep(RegisterStep.PASSWORD);
                    setIsLoading(false);
                },
            });
        }

        // password validation
        else if (currentStep === RegisterStep.PASSWORD) {
            const { isValid, error } = validatePassword(formData.password);
            if (!isValid) {
                toast.error(error);
                setIsLoading(false);
                return;
            }
            setCurrentStep(RegisterStep.USERNAME);
            setIsLoading(false);
        }

        // username validation
        else if (currentStep === RegisterStep.USERNAME) {
            const { isValid, error } = validateUsername(formData.username);
            if (!isValid) {
                toast.error(error);
                setIsLoading(false);
                return;
            }
            // submit the form
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep === RegisterStep.PASSWORD) {
            setCurrentStep(RegisterStep.EMAIL);
        } else if (currentStep === RegisterStep.USERNAME) {
            setCurrentStep(RegisterStep.PASSWORD);
        }
    };

    const handleSubmit = () => {
        register(formData, {
            onSuccess: () => {
                setCurrentStep(RegisterStep.THEME);
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            },
        });
    };

    const handleThemeSubmit = () => {
        navigate(ROUTES_CONSTANTS.DASHBOARD().HOME());
    };

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
                    onNext={handleNext}
                    onBack={handleBack}
                    onThemeSubmit={handleThemeSubmit}
                    onGoogleLogin={googleLogin}
                    onGithubLogin={githubLogin}
                    isLoading={isLoading}
                />
            }
        />
    );
};
