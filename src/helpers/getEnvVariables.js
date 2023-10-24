export const getEnvVariables = () => {
  const { VITE_API_URL, VITE_GOOGLE_API_KEY } = import.meta.env;
  const { VITE_CLOUDINARY_URL } = import.meta.env;

  return { VITE_API_URL, VITE_GOOGLE_API_KEY, VITE_CLOUDINARY_URL };
};
