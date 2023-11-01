import { projectAPI } from "../api/projectAPI";

export const GetAllPayments = async () => {
  try {
    const { data } = await projectAPI.get(`/payments`);
    return data;
  } catch (error) {}
};
