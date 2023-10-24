export const getEnvVariables = () => {
  const { VITE_API_URL, VITE_CLOUDINARY_URL  } = import.meta.env;

  return { VITE_API_URL, VITE_CLOUDINARY_URL };
};
