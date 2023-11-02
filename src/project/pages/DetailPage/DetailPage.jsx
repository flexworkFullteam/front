import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import styles from "./DetailPage.module.css";
import { useProjectStore } from "../../../hooks/useProjectStore";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { onSetActiveEvent } from "../../../store/project/projectSlice";
import { applyCandidate } from "../../../helpers/candidatesAsync";
import { getProjectById } from "../../../helpers/projectsAsync";

export const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { status, user } = useAuthStore();
  const { activeEvent } = useProjectStore();
  const [detail, setDetail] = useState(activeEvent);

  const handleApply = () => {
    applyCandidate(user.professional_id, id);
  };

  const callProject = async () => {
    const projectData = await getProjectById(id);
    setDetail(projectData);
    console.log(detail);
  };

  useEffect(() => {
    const detail = JSON.parse(localStorage.getItem("detail"));
    callProject();
  }, []);
  // if (detail) console.log(detail);
  return (
    <Grid container>
      <Grid className={styles.infoCompany} item display='flex' justifyContent='space-between' sx={{}}>
        <Box display='flex' sx={{ ml: "2% ", flexDirection: "row" }}>
          {detail?.image && <img className={styles.companyLogo} src={detail?.image} alt={detail?.id_company} />}
          <div className={styles.titleCompanyContainer}>
            <Typography fontFamily='Barlow Condensed' fontWeight='600' color='persianBlue.main' fontSize='1.25rem'>
              {detail?.title}
            </Typography>
            <Link>
              <Typography fontFamily='Nunito Sans' fontWeight='400' color='persianBlue.main' fontSize='1rem' sx={{ textTransform: "lowercase" }}>
                {detail?.id_company}
              </Typography>
            </Link>
          </div>
        </Box>

        <Box display='flex' sx={{ boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)", mr: "2% " }}>
          {status === "authenticated" && (

            <Button variant='contained' color='pear' onClick={handleApply} disabled={!user.typevalid && user.data}>
              <Typography fontFamily='Nunito Sans' fontWeight='400' color='persianBlue.main'>
                Postularme
              </Typography>
            </Button>
          )}
        </Box>
      </Grid>
      <div className={styles.infoContainer}>
        <Card sx={{ width: "100%", height: "100%", mb: -50 }}>
          <CardContent display='flex' sx={{ width: "90%", m: "0 auto" }}>
            <Typography color='textSecondary' fontFamily='Nunito Sans' fontWeight='400'>
              Ubicación: {detail?.nation_id}
              {detail?.province_id && `, ${detail.province_id}`} - Duración: {detail?.lapse} dias - Salario: ${detail?.salary}
            </Typography>
            <Typography variant='body2' component='p' sx={{ mt: "2%" }} fontFamily='Nunito Sans' fontWeight='400'>
              {detail?.description}
            </Typography>
            <div className={styles.cardBottom}>
              <Typography variant='body2' component='p' sx={{ mt: "2%" }} fontFamily='Nunito Sans' fontWeight='600'>
                Experiencia: {detail?.exp_req}
              </Typography>

              <Typography variant='body2' component='p' sx={{ mt: "2%" }} fontFamily='Nunito Sans' fontWeight='600'>
                Campo: {detail?.field}
              </Typography>

              <Typography variant='body2' component='p' sx={{ mt: "2%" }} fontFamily='Nunito Sans' fontWeight='600'>
                Tipo: {detail?.type}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </Grid>
  );
};
