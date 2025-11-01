import { useState } from "react";
import {
    ResetPasswordForm,
    type ResetPasswordFormData,
    type ResetPasswordStep,
} from "@/features/auth/components/reset-password/ResetPasswordForm";

/**
 * ResetPasswordContainer - Container component for reset password page with all logic
 * @returns ResetPasswordContainer component
 */
export const ResetPasswordContainer = () => {
    const [currentStep, setCurrentStep] = useState<ResetPasswordStep>("email");
    const [formData, setFormData] = useState<ResetPasswordFormData>({
        email: "",
        resetToken: "",
        code: "",
        newPassword: "",
    });
    const [error, setError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    // TODO: Add reset password hooks when available
    // const { mutate: emailCheck } = useEmailCheck();
    // const { mutate: sendVerifyCode } = useSendVerifyCode();
    // const { mutate: resetPassword } = useResetPassword();
    // const navigate = useNavigate();

    const handleEmailChange = (email: string) => {
        setFormData((prev) => ({ ...prev, email }));
    };

    const handleCodeChange = (code: string) => {
        setFormData((prev) => ({ ...prev, code }));
    };

    const handlePasswordChange = (password: string) => {
        setFormData((prev) => ({ ...prev, newPassword: password }));
    };

    const handleEmailSubmit = () => {
        // TODO: Implement email check and send verification code logic
        // setIsLoading(true);
        // setError(undefined);
        // emailCheck(formData.email, {
        //     onSuccess: (exists: boolean) => {
        //         if (!exists) {
        //             setError("Email does not exist");
        //             setIsLoading(false);
        //             return;
        //         }
        //         sendVerifyCode(formData.email, {
        //             onSuccess: (response) => {
        //                 setFormData((prev) => ({
        //                     ...prev,
        //                     resetToken: response.resetToken,
        //                 }));
        //                 setCurrentStep("otp");
        //                 setIsLoading(false);
        //             },
        //             onError: (error) => {
        //                 setError(errorUtils.extractErrorMessage(error));
        //                 setIsLoading(false);
        //             },
        //         });
        //     },
        //     onError: (error) => {
        //         setError(errorUtils.extractErrorMessage(error));
        //         setIsLoading(false);
        //     },
        // });
        console.log("Email submit:", formData.email);
        // Temporary: move to next step for testing
        setCurrentStep("otp");
    };

    const handleOtpSubmit = () => {
        // TODO: Implement OTP verification logic
        // if (formData.code.length !== 6) {
        //     setError("Please enter the complete 6-digit code");
        //     return;
        // }
        // setIsLoading(true);
        // setError(undefined);
        // resetPassword(formData, {
        //     onSuccess: (response) => {
        //         if (!response.valid) {
        //             setError(response.message);
        //             setIsLoading(false);
        //             return;
        //         }
        //         setCurrentStep("password");
        //         setIsLoading(false);
        //     },
        //     onError: (error) => {
        //         setError(errorUtils.extractErrorMessage(error));
        //         setIsLoading(false);
        //     },
        // });
        console.log("OTP submit:", formData.code);
        // Temporary: move to next step for testing
        setCurrentStep("password");
    };

    const handlePasswordSubmit = () => {
        // TODO: Implement password reset logic
        // if (!formData.newPassword) {
        //     setError("Please enter a new password");
        //     return;
        // }
        // setIsLoading(true);
        // setError(undefined);
        // resetPassword(formData, {
        //     onSuccess: (response) => {
        //         if (response.reset_success && response.valid) {
        //             toast.success("Password reset successfully");
        //             navigate(ROUTES_CONSTANTS.AUTH().LOGIN());
        //         } else {
        //             setError(response.message);
        //             setIsLoading(false);
        //         }
        //     },
        //     onError: (error) => {
        //         setError(errorUtils.extractErrorMessage(error));
        //         setIsLoading(false);
        //     },
        // });
        console.log("Password reset submit:", formData);
    };

    const handleBack = () => {
        setError(undefined);
        switch (currentStep) {
            case "otp":
                setCurrentStep("email");
                setFormData((prev) => ({ ...prev, code: "" }));
                break;
            case "password":
                setCurrentStep("otp");
                setFormData((prev) => ({ ...prev, newPassword: "" }));
                break;
        }
    };

    const handleClearError = () => {
        setError(undefined);
    };

    return (
        <section className="container mx-auto min-h-screen flex items-center justify-center p-6">
            <ResetPasswordForm
                currentStep={currentStep}
                formData={formData}
                onEmailChange={handleEmailChange}
                onCodeChange={handleCodeChange}
                onPasswordChange={handlePasswordChange}
                onEmailSubmit={handleEmailSubmit}
                onOtpSubmit={handleOtpSubmit}
                onPasswordSubmit={handlePasswordSubmit}
                onBack={handleBack}
                error={error}
                onClearError={handleClearError}
                isLoading={isLoading}
            />
        </section>
    );
};
