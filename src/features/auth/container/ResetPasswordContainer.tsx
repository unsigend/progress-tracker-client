import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
    ResetPasswordForm,
    type ResetPasswordFormData,
    type ResetPasswordStep,
} from "@/features/auth/components/reset-password/ResetPasswordForm";
import { useSendCode } from "@/entities/auth/hooks/useSendCode";
import type { IResetToken } from "@/entities/auth/models/model";
import { useVerifyCode } from "@/entities/auth/hooks/useVerifyCode";
import { validatePassword } from "@/entities/auth/validation/password";
import { useResetPassword } from "@/entities/auth/hooks/useResetPassword";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type { IErrorResponse } from "@/entities/common/models/error";
import { AxiosError } from "axios";

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
    const navigate = useNavigate();
    const [error, setError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: sendCode } = useSendCode();
    const { mutate: verifyCode } = useVerifyCode();
    const { mutate: resetPassword } = useResetPassword();

    const handleEmailChange = (email: string) => {
        setFormData((prev) => ({ ...prev, email }));
    };

    const handleCodeChange = (code: string) => {
        setFormData((prev) => ({ ...prev, code }));
    };

    const handlePasswordChange = (password: string) => {
        setFormData((prev) => ({ ...prev, newPassword: password }));
    };

    /**
     * handleEmailSubmit - Handle email submit
     * @description Send code to user's email
     */
    const handleEmailSubmit = () => {
        setIsLoading(true);
        sendCode(formData.email, {
            onSuccess: (resetToken: IResetToken) => {
                setFormData((prev) => ({
                    ...prev,
                    resetToken: resetToken.resetToken,
                }));
                setCurrentStep("otp");
                setIsLoading(false);
            },
            onError: (error: unknown) => {
                if (error instanceof AxiosError) {
                    const errorModel: IErrorResponse = error.response
                        ?.data as IErrorResponse;
                    setError(errorModel.message);
                }
                setIsLoading(false);
            },
        });
    };

    /**
     * handleOtpSubmit - Handle OTP submit
     * @description Verify the code
     */
    const handleOtpSubmit = () => {
        setIsLoading(true);
        verifyCode(
            {
                code: formData.code,
                resetToken: formData.resetToken,
            },
            {
                onSuccess: (isValid: boolean) => {
                    if (!isValid) {
                        setError("Verification code is invalid or expired");
                        setIsLoading(false);
                        return;
                    }
                    setCurrentStep("password");
                    setIsLoading(false);
                },
            }
        );
    };

    /**
     * handlePasswordSubmit - Handle password submit
     * @description Reset the password
     */
    const handlePasswordSubmit = () => {
        // validate the password
        const { isValid, error } = validatePassword(formData.newPassword);
        if (!isValid) {
            setError(error || "Invalid password format");
            setIsLoading(false);
            return;
        }
        // reset the password
        setIsLoading(true);
        resetPassword(
            {
                newPassword: formData.newPassword,
                code: formData.code,
                resetToken: formData.resetToken,
            },
            {
                onSuccess: () => {
                    toast.success("Password reset successfully");
                    navigate(ROUTES_CONSTANTS.AUTH().LOGIN());
                },
                onError: (error: unknown) => {
                    if (error instanceof AxiosError) {
                        const errorModel: IErrorResponse = error.response
                            ?.data as IErrorResponse;
                        setError(errorModel.message);
                    }
                    setIsLoading(false);
                },
            }
        );
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
