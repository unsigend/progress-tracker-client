import { useState } from "react";
import { LoginForm } from "@/features/auth/components/login/LoginForm";
import { LoginChart } from "@/features/auth/components/login/LoginChart";
import { AuthTemplateLayout } from "@/features/auth/components/AuthTemplateLayout";
import type { LoginFormData } from "@/entities/auth/models/model";
import { useLogin } from "@/entities/auth/hooks/useLogin";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useNavigate } from "react-router";
import { useGoogleLogin } from "@/entities/auth/hooks/useGoogleLogin";
import { useGithubLogin } from "@/entities/auth/hooks/useGithubLogin";

/**
 * LoginContainer - Container component for login page with all logic
 * @returns LoginContainer component
 */
export const LoginContainer = () => {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState<LoginFormData>({
        email: "",
        password: "",
    });
    const { mutate: login, isPending } = useLogin();
    const { mutate: googleLogin } = useGoogleLogin();
    const { mutate: githubLogin } = useGithubLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(loginForm, {
            onSuccess: () => {
                navigate(ROUTES_CONSTANTS.DASHBOARD().HOME());
            },
        });
    };

    const handleEmailChange = (email: string) => {
        setLoginForm((prev) => ({ ...prev, email }));
    };

    const handlePasswordChange = (password: string) => {
        setLoginForm((prev) => ({ ...prev, password }));
    };

    return (
        <AuthTemplateLayout
            left={<LoginChart />}
            right={
                <LoginForm
                    formData={loginForm}
                    onEmailChange={handleEmailChange}
                    onPasswordChange={handlePasswordChange}
                    onSubmit={handleSubmit}
                    onGoogleLogin={googleLogin}
                    onGithubLogin={githubLogin}
                    isLoading={isPending}
                />
            }
        />
    );
};
