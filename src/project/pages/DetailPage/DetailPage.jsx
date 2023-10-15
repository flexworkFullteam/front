import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";

export const DetailPage = () => {

  const {id} = useParams();
  const {status} = useSelector((state) => state.auth);
  const dispacth = useDispatch();

  useEffect(() => {
    // dispacth(getProjectById(id)) //! falta crear la accion
  }, [])
  
  

  return (
    <Grid container>
      <Grid item xs={12} display='flex' justifyContent='space-between' sx={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)' }} >
          <Box display='flex' sx={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)' }}>
            <img src="" alt="" /> 
            <Typography variant='h4'>Nombre del proyecto</Typography>
            <Link >
              <Typography variant='h6'>Empresa</Typography>
            </Link>
          </Box>

          <Box display='flex' sx={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)' }}>
           {
              status === 'authenticated' && <Button variant='contained' color='primary'>Postularme</Button>
           } 

          </Box>
      </Grid>
      <Grid item xs={8}>
       
      </Grid>
      <Grid item xs={4}>
       
      </Grid>
    </Grid>
  )
}
