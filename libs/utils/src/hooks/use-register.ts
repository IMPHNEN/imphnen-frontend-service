// Registration is handled through GitHub OAuth
// This hook is kept for backward compatibility but is not used
export const useRegister = () => {
  return {
    register: () => {
      console.warn('Registration is handled through GitHub OAuth');
    },
    isLoading: false,
  };
};
