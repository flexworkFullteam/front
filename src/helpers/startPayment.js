

export const startPayment = async (paymentData) => {
  try {
    const { data } = await projectAPI.post("/solution/payment", paymentData);
    console.log("Pago realizado", data);
    alert("Pago realizado");
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

// {
//     "title": "pago por servicios",
//     "unit_price": 750,
//     "currency_id": "PEN",
//     "from": "1a621114-fde9-4504-80f1-6163d7d4c1de",
//     "to": "98d922b7-711f-4a7b-8e35-3d160339561c",
//     "project": "cc0a3a45-1332-44de-b1de-1ef17e1efaf9"
// }