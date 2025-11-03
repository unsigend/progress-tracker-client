/**
 * Hook for the google login
 * @returns useMutation for the google login
 */
export const useGoogleLogin = () => {
    // no actual mutation, just keep API consistent
    return {
        mutate: () => {
            window.location.href = `${
                import.meta.env.VITE_BACKEND_API_URL
            }/api/v1/auth/login/google`;
        },
    };
};
