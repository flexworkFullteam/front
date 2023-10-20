export const getEnvVariables = () => {
  const { VITE_API_URL } = import.meta.env;

  return { VITE_API_URL };
};
