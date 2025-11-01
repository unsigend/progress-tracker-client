import { useState } from "react";
import { LoginForm } from "@/features/auth/components/login/LoginForm";
import { LoginChart } from "@/features/auth/components/login/LoginChart";
import { AuthTemplateLayout } from "@/features/auth/components/AuthTemplateLayout";

/**
 * LoginFormData - Interface for login form data
 */
interface LoginFormData {
    email: string;
    password: string;
}

/**
 * LoginContainer - Container component for login page with all logic
 * @returns LoginContainer component
 */
export const LoginContainer = () => {
    const [loginForm, setLoginForm] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    // TODO: Add login hooks when available
    // const { mutate: login, isPending } = useLogin();
    // const googleLogin = useGoogleLogin();
    // const githubLogin = useGithubLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement login logic
        // login(loginForm);
        console.log("Login submitted:", loginForm);
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

    const handleEmailChange = (email: string) => {
        setLoginForm((prev) => ({ ...prev, email }));
    };

    const handlePasswordChange = (password: string) => {
        setLoginForm((prev) => ({ ...prev, password }));
    };

    // TODO: Get actual loading state from hooks
    const isLoading = false;

    return (
        <AuthTemplateLayout
            left={<LoginChart />}
            right={
                <LoginForm
                    formData={loginForm}
                    onEmailChange={handleEmailChange}
                    onPasswordChange={handlePasswordChange}
                    onSubmit={handleSubmit}
                    onGoogleLogin={handleGoogleLogin}
                    onGithubLogin={handleGithubLogin}
                    isLoading={isLoading}
                />
            }
        />
    );
};
