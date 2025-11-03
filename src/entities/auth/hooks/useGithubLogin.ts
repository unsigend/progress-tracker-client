/**
 * Hook for the github login
 * @returns useMutation for the github login
 */
export const useGithubLogin = () => {
    // no actual mutation, just keep API consistent
    return {
        mutate: () => {
            window.location.href = `${
                import.meta.env.VITE_BACKEND_API_URL
            }/api/v1/auth/login/github`;
        },
    };
};
