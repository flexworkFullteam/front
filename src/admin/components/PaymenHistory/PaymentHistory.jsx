import { useEffect, useState } from "react";
import { GetAllPayments } from "../../../helpers/getAllPayments";
import { Card, CardContent, Grid, Typography, Pagination, Button } from "@mui/material";
import styles from "./PaymentHistory.module.css";
import paymentData from "../../../utils/paymentHistory.json";

export const PaymentHistory = () => {
  const [payments, setPaymentsData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const callData = async () => {
    const paymentData = await GetAllPayments();
    setPaymentsData(paymentData);
  };

  useEffect(() => {
    callData();
  }, []);

  const handleDetail = (url) => {
    const newTab = window.open("", "_blank");
    newTab.location.href = url;
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className={styles.container}>
      {payments &&
        payments.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((payment) => (
          <Card key={payment.op_id} className={styles.card}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Typography variant='h5' component='div' sx={{ textTransform: "capitalize" }}>
                    {payment.project.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Monto de transacción: ${payment.transaction_amount}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Monto neto recibido: ${payment.net_received_amount}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {payment.description}
                  </Typography>
                </Grid>
                <Grid item xs={4} container flexDirection='column' justifyContent='flex-start' alignItems='flex-end'>
                  <Typography variant='body2' color='text.secondary'>
                    Fecha de pago: {payment.payment_date}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Fecha de aprobación: {payment.approved_date}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Estado: {payment.status}
                  </Typography>
                  <Button color='persianBlue' sx={{ textTransform: "none" }} onClick={() => handleDetail(`project/detail/${payment.project.id}`)}>
                    Ir al Proyecto
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      <Pagination className={styles.pagination} count={Math.ceil(payments.length / itemsPerPage)} page={page} onChange={handlePageChange} />
    </div>
  );
};
