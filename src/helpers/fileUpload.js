import axios from "axios";
import { getEnvVariables } from "./getEnvVariables";


const {VITE_CLOUDINARY_URL} = getEnvVariables();

export const fileUpload = async (file) => {
    const cloudUrl = VITE_CLOUDINARY_URL;
    
    const formData = new FormData();
    formData.append("upload_preset", "flexwork");
    formData.append("file", file);
    
    try {
        // const resp = await fetch(cloudUrl, {
        // method: "POST",
        // body: formData,
        // });
        const resp = await axios.post(cloudUrl, formData);
    
        if (!resp.ok) throw new Error("Failed to upload file");
        
        const cloudResp = await resp.json();

        return cloudResp.secure_url;
        
    } catch (error) {
        throw new Error(error.message);
    }
}