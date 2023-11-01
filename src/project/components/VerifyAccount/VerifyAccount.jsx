import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { projectAPI } from "../../../api/projectAPI";
import { Box, Typography } from "@mui/material";


export const VerifyAccount = () => {
    const { id, token } = useParams();

    const verifyAccount = async () => {
        await projectAPI.post(`/user/verifyemail`, {id, token});
    }

    useEffect(() => {
        verifyAccount();
    }, [])

  return (
    <Box sx={{ textAlign: 'center', mt:20, mb:20}}>
        <Typography variant="h3" >Cuenta Verificada, muchas gracias!!</Typography>
    </Box>
  )
}
