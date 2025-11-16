import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import {
    ResetPasswordForm,
    type ResetPasswordFormData,
    type ResetPasswordStep,
} from "@/features/auth/components/reset-password/ResetPasswordForm";
import { useSendCode } from "@/entities/auth/hooks/useSendCode";
import { useVerifyCode } from "@/entities/auth/hooks/useVerifyCode";
import { useResetPassword } from "@/entities/auth/hooks/useResetPassword";
import { validatePassword } from "@/entities/auth/validation/password";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type { ResetToken } from "@/entities/auth/models/model";
import type { IErrorResponse } from "@/entities/common/models/error";

/**
 * ResetPassword - Smart component for reset password page
 * Handles multi-step password reset logic and form state
 * @returns ResetPassword component
 */
export const ResetPassword = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<ResetPasswordStep>("email");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [formData, setFormData] = useState<ResetPasswordFormData>({
        email: "",
        resetToken: "",
        code: "",
        newPassword: "",
    });

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

    const handleEmailSubmit = () => {
        setIsLoading(true);
        sendCode(formData.email, {
            onSuccess: (resetToken: ResetToken) => {
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

    const handlePasswordSubmit = () => {
        const { isValid, error } = validatePassword(formData.newPassword);
        if (!isValid) {
            setError(error || "Invalid password format");
            setIsLoading(false);
            return;
        }

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

