import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addMedical,
  getMedical,
  updateMedical,
} from "../../../redux/slice/medical.slice";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { getTreatment } from "../../../redux/slice/treatment.slice";
import { getMedicine } from "../../../redux/slice/medicine.slice";

import { getAppointment } from "../../../redux/slice/appointment.slice";

import { getUser } from "../../../redux/slice/user.slice";
import { getTimeslot } from "../../../redux/slice/timeslot.slice";
import { object, string } from "yup";
import { useFormik } from "formik";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";

function Medical(props) {
  const [open, setOpen] = React.useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [update, setUpdate] = useState(false);
  console.log(update);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMedical());
    // dispatch(getAppointmentEdit())
    dispatch(getTreatment());
    dispatch(getMedicine());
    dispatch(getUser());
    dispatch(getTimeslot());
    dispatch(getAppointment());
  }, []);

  const medical = useSelector((state) => state.medical);
  console.log(medical.medical);
  const user = useSelector((state) => state.user);
  console.log(user);

  const timeslot = useSelector((state) => state.timeslot);
  console.log(timeslot);

  const medicine = useSelector((state) => state.medicine);
  console.log(medicine);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
  };

  const handleEdit = (values) => {
    handleClose();
    console.log(values);
    formik.setValues(values);
    handleClickOpen();
    setUpdate(true);
  };

  let userschema = object({
    name: string().required("Please enter name"),
    phone: string()
      .required("Please enter mobile number")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    date: string().required("Please Select date"),
    medicine_id: string().required("Please Select medicine_id"),
    medicine_quantity: string().required("Please Select medicine_quantity"),
    medicine_amount: string().required("Please enter medicine_amount"),
    status: string().required("Please Select status"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      date: "",
      medicine_id: "",
      medicine_quantity: "",
      medicine_amount: "",
      status: "",
      payment_status: "",
      payment_method: "razorpay",
      razorpay_order_id: "",
      razorpay_payment_id: "",
    },

    validationSchema: userschema,

onSubmit: async (values, { resetForm }) => {
  console.log(values);

  // ?? ADD THIS AT TOP
  if (!values.payment_status) {
    alert("Please complete payment first");
    return;
  }

  // ? YOUR EXISTING CODE (NO CHANGE)
  if (update) {
    console.log("update data");
    await dispatch(updateMedical(values));
  } else {
    await dispatch(addMedical(values));
  }

  dispatch(getMedicine());

  handleClose();
  resetForm();

  window.location.reload();
},
  });

  console.log(formik.errors, formik.touched);

  console.log("qqqqq", formik.errors);
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const buildReceipt = (payment) => ({
    receiptNo: payment.receipt || payment.razorpay_order_id,
    paymentId: payment.razorpay_payment_id,
    patientName: formik.values.name,
    phone: formik.values.phone,
    amount: formik.values.medicine_amount,
    method:
      formik.values.payment_method === "cash"
        ? "Cash"
        : "Online - Razorpay",
    date: new Date().toLocaleString(),
    medicine:
      medicine.medicine?.find((item) => item.id == formik.values.medicine_id)
        ?.name || "",
    quantity: formik.values.medicine_quantity,
  });

  const downloadReceipt = () => {
    if (!receipt) return;

    const receiptHtml = `
      <html>
        <head>
          <title>Payment Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; color: #111827; }
            .receipt { max-width: 560px; margin: 0 auto; border: 1px solid #d1d5db; padding: 24px; border-radius: 8px; }
            h1 { margin: 0 0 8px; font-size: 24px; }
            .muted { color: #6b7280; margin-bottom: 24px; }
            .row { display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding: 10px 0; }
            .total { font-size: 20px; font-weight: 700; }
            .thanks { margin-top: 24px; font-weight: 700; color: #047857; }
          </style>
        </head>
        <body>
          <div class="receipt">
            <h1>Dental Clinic</h1>
            <div class="muted">Payment Receipt</div>
            <div class="row"><span>Receipt No</span><strong>${receipt.receiptNo}</strong></div>
            <div class="row"><span>Payment ID</span><strong>${receipt.paymentId}</strong></div>
            <div class="row"><span>Patient</span><strong>${receipt.patientName}</strong></div>
            <div class="row"><span>Phone</span><strong>${receipt.phone}</strong></div>
            <div class="row"><span>Medicine</span><strong>${receipt.medicine}</strong></div>
            <div class="row"><span>Quantity</span><strong>${receipt.quantity}</strong></div>
            <div class="row"><span>Method</span><strong>${receipt.method}</strong></div>
            <div class="row"><span>Date</span><strong>${receipt.date}</strong></div>
            <div class="row total"><span>Total Paid</span><strong>₹${receipt.amount}</strong></div>
            <div class="thanks">Thank you for your payment.</div>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([receiptHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt-${receipt.receiptNo}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePayment = async () => {
    const amount = Number(formik.values.medicine_amount);

    if (!amount) {
      alert("Enter amount first");
      return;
    }

    setPaymentLoading(true);
    setPaymentMessage("");

    try {
      if (formik.values.payment_method === "cash") {
        const offlineRes = await axios.post("http://localhost:3000/payment/offline", {
          amount,
          name: formik.values.name,
          phone: formik.values.phone,
          purpose: "Medicine payment",
          method: "Cash",
        });

        const payment = offlineRes.data.data;
        formik.setFieldValue("payment_status", "paid");
        formik.setFieldValue("razorpay_order_id", payment.razorpay_order_id);
        formik.setFieldValue("razorpay_payment_id", payment.razorpay_payment_id);
        setReceipt(buildReceipt(payment));
        setPaymentMessage("Thank you. Cash payment recorded successfully.");
        return;
      }

      const isLoaded = await loadRazorpayScript();

      if (!isLoaded) {
        alert("Razorpay checkout failed to load. Please try again.");
        return;
      }

      const orderRes = await axios.post("http://localhost:3000/payment/createOrder", {
        amount,
        name: formik.values.name,
        phone: formik.values.phone,
        purpose: "Medicine payment",
      });

      const { key_id, order } = orderRes.data.data;

      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: "Dental Clinic",
        description: "Medicine Payment",
        order_id: order.id,
        handler: async (response) => {
          const verifyRes = await axios.post(
            "http://localhost:3000/payment/verify",
            response,
          );

          if (verifyRes.data.success) {
            const payment = verifyRes.data.data;
            formik.setFieldValue("payment_status", "paid");
            formik.setFieldValue("razorpay_order_id", response.razorpay_order_id);
            formik.setFieldValue("razorpay_payment_id", response.razorpay_payment_id);
            setReceipt(buildReceipt(payment));
            setPaymentMessage("Thank you. Payment verified successfully.");
          }
        },
        prefill: {
          name: formik.values.name,
          contact: formik.values.phone,
        },
        theme: {
          color: "#1976d2",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert(error.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };
  const columns = [
    {
      field: "appointment_id",
      headerName: "Appointment ID",
      width: 100,
    },
    {
      field: "treatment_id",
      headerName: "Treatment ID",
      width: 100,
    },
    { field: "name", headerName: "Name", width: 130 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "date", headerName: "Date", width: 130 },
    // {
    //   field: "time",
    //   headerName: "Time",
    //   width: 130,
    //   renderCell: (params) => {
    //     const d = timeslot.timeslot?.find((v) => v.id == params.row.time);

    //     console.log(timeslot.time, params.row.id, d);

    //     if (d) {
    //       return d?.starttime + "-" + d?.endtime;
    //     } else {
    //       return params.row.time
    //     }

    //   },
    // },
    {
      field: "doctor_id",
      headerName: "Doctor ID",
      width: 130,
      renderCell: (params) => {
        const d = user.user?.find((v) => v.id == params.row.doctor_id)?.name;

        console.log(user.doctor_id, params.row.id, d);

        return d;
      },
    },
    {
      field: "medicine_id",
      headerName: "Medicine ID",
      width: 130,
      renderCell: (params) => {
        const d = medicine.medicine?.find(
          (v) => v.id == params.row.medicine_id,
        )?.name;

        console.log(medicine.medicine, params.row.medicine_id, d);

        return d;
      },
    },
    {
      field: "medicine_quantity",
      headerName: "Qty",
      width: 130,
    },
    { field: "medicine_amount", headerName: "Amount", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <ModeEditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const status = [
    {
      value: "",
      label: "Select Status",
    },
    {
      value: "pending",
      label: "pending",
    },
    {
      value: "deliver",
      label: "Deliver",
    },
    {
      value: "reject",
      label: "Reject",
    },
  ];

  const selectedMedicine = medicine?.medicine?.find(
    (m) => m.id === formik.values.medicine_id,
  );

  const filteredRows = medical.medical?.filter((row) => {
    const search = searchText.toLowerCase();

    const doctorName =
      user.user?.find((u) => u.id == row.doctor_id)?.name || "";

    const medicineName =
      medicine.medicine?.find((m) => m.id == row.medicine_id)?.name || "";

    return (
      row.name?.toLowerCase().includes(search) ||
      row.phone?.toLowerCase().includes(search) ||
      doctorName.toLowerCase().includes(search) ||
      medicineName.toLowerCase().includes(search) ||
      row.status?.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Medical</h1>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Add Medicine
        </Button> */}
      </Box>

      <TextField
        label="Search..."
        variant="outlined"
        size="small"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <form onSubmit={formik.handleSubmit} id="medical-form">
              <TextField
                error={formik.errors.name && formik.touched.name}
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                helperText={
                  formik.errors.name && formik.touched.name
                    ? formik.errors.name
                    : ""
                }
              />

              <TextField
                error={formik.errors.phone && formik.touched.phone}
                margin="dense"
                id="phone"
                name="phone"
                label="Mobile Number"
                type="phone"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                helperText={
                  formik.errors.phone && formik.touched.phone
                    ? formik.errors.phone
                    : ""
                }
              />
              <TextField
                error={formik.errors.date && formik.touched.date}
                margin="dense"
                id="date"
                name="date"
                type="date"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={
                  new Date(formik.values.date).getFullYear() +
                  "-" +
                  "0" +
                  (new Date(formik.values.date).getMonth() + 1) +
                  "-" +
                  (new Date(formik.values.date).getDate() - 1)
                }
                // value={new Date(formik.values.date).getFullYear() + "-" + (new Date(formik.values.date).getMonth()+1) + "-" + new Date(formik.values.date).getDate()}
                helperText={
                  formik.errors.date && formik.touched.date
                    ? formik.errors.date
                    : ""
                }
              />

              {/* <TextField
                error={formik.errors.time && formik.touched.time}
                margin="dense"
                id="time"
                name="time"
                label="Time"
                type="time"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.time}
                helperText={
                  formik.errors.time && formik.touched.time
                    ? formik.errors.time
                    : ""
                }
              >
                 {timeslot.timeslot.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.starttime} - {v.endtime}
                      </option>
                    ))}
                </TextField> */}

              <TextField
                error={formik.errors.medicine_id && formik.touched.medicine_id}
                margin="dense"
                id="medicine_id"
                name="medicine_id"
                label="Medicines"
                type="medicine_id"
                fullWidth
                select
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.medicine_id}
                helperText={
                  formik.errors.medicine_id && formik.touched.medicine_id
                    ? formik.errors.medicine_id
                    : ""
                }
              >
                {medicine.medicine.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              {selectedMedicine && (
                <div style={{ marginTop: "10px" }}>
                  <p>
                    <b>Stock:</b>{" "}
                    {selectedMedicine.stock - selectedMedicine.sell_qty}
                  </p>
                  <p>
                    <b>Amount/pill:</b> ?{selectedMedicine.price}
                  </p>
                </div>
              )}
              <TextField
                error={
                  formik.errors.medicine_quantity &&
                  formik.touched.medicine_quantity
                }
                margin="dense"
                id="medicine_quantity"
                name="medicine_quantity"
                label="Medicine_quantity"
                type="medicine_quantity"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.medicine_quantity}
                helperText={
                  formik.errors.medicine_quantity &&
                  formik.touched.medicine_quantity
                    ? formik.errors.medicine_quantity
                    : ""
                }
              />

              <TextField
                error={
                  formik.errors.medicine_amount &&
                  formik.touched.medicine_amount
                }
                id="medicine_amount"
                name="medicine_amount"
                fullWidth
                variant="standard"
                label="Amount"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.medicine_amount}
                helperText={
                  formik.errors.medicine_amount &&
                  formik.touched.medicine_amount
                    ? formik.errors.medicine_amount
                    : ""
                }
              />
              {paymentMessage && (
                <Alert severity="success" style={{ marginTop: "12px" }}>
                  {paymentMessage}
                </Alert>
              )}
              <TextField
                id="payment_method"
                name="payment_method"
                fullWidth
                select
                variant="standard"
                label="Payment Method"
                value={formik.values.payment_method}
                onChange={formik.handleChange}
                style={{ marginTop: "12px" }}
              >
                <MenuItem value="razorpay">
                  Online: Card / UPI / Netbanking / Wallet
                </MenuItem>
                <MenuItem value="cash">Cash at counter</MenuItem>
              </TextField>
  <Button
  variant="contained"
  color="success"
  onClick={handlePayment} disabled={paymentLoading || formik.values.payment_status === "paid"}
>
  {formik.values.payment_method === "cash" ? "Record Cash Payment" : "Pay Online"}
</Button>
              <TextField
                error={formik.errors.status && formik.touched.status}
                margin="dense"
                id="status"
                name="status"
                label="Status"
                type="status"
                fullWidth
                select
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
                helperText={
                  formik.errors.status && formik.touched.status
                    ? formik.errors.status
                    : ""
                }
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
  variant="contained"
  color="success"
  onClick={handlePayment}
  disabled={paymentLoading || formik.values.payment_status === "paid"}
>
  {formik.values.payment_status === "paid" ? "Payment Done" : "Pay with Razorpay"}
</Button>
            {receipt && (
              <Button variant="outlined" onClick={downloadReceipt}>
                Download Receipt
              </Button>
            )}
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="medical-form">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default Medical;
