import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
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
  const [demoPayment, setDemoPayment] = useState(null);
  const [demoOtp, setDemoOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");
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
    setDemoPayment(null);
    setDemoOtp("");
    setEnteredOtp("");
    setOtpError("");
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
      payment_method: "demo_upi",
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
  const buildReceipt = (payment) => ({
    receiptNo: payment.receipt || payment.razorpay_order_id,
    paymentId: payment.razorpay_payment_id,
    patientName: formik.values.name,
    phone: formik.values.phone,
    amount: formik.values.medicine_amount,
    method:
      formik.values.payment_method === "demo_cash" ? "Demo Cash" : "Demo UPI",
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

    const timestamp = Date.now();
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const orderId = `DEMO-MED-ORDER-${timestamp}`;
    const paymentId = `DEMO-MED-PAY-${timestamp}`;

    setDemoOtp(otp);
    setEnteredOtp("");
    setOtpError("");
    setDemoPayment({
      amount,
      receipt: orderId,
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
    });
    setPaymentMessage("");
  };

  const verifyDemoPayment = () => {
    if (enteredOtp !== demoOtp) {
      setOtpError("Invalid demo OTP. Please enter the OTP shown above.");
      return;
    }

    setPaymentLoading(true);
    formik.setFieldValue("payment_status", "paid");
    formik.setFieldValue("razorpay_order_id", demoPayment.razorpay_order_id);
    formik.setFieldValue("razorpay_payment_id", demoPayment.razorpay_payment_id);
    setReceipt(buildReceipt(demoPayment));
    setPaymentMessage("Thank you. Demo medicine payment verified successfully.");
    setDemoPayment(null);
    setPaymentLoading(false);
  };

  const buildSmsMessage = () => {
    const medicineName =
      medicine.medicine?.find((item) => item.id == formik.values.medicine_id)
        ?.name || "your medicine";

    return `Good day ${formik.values.name}. Your medicine payment of Rs. ${formik.values.medicine_amount} for ${medicineName} has been verified successfully. Thank you for visiting Dental Clinic. We wish you a healthy smile.`;
  };

  const openSmsComposer = () => {
    if (!formik.values.phone) {
      alert("Patient phone number is missing.");
      return;
    }

    window.location.href = `sms:${formik.values.phone}?body=${encodeURIComponent(
      buildSmsMessage()
    )}`;
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
        <Dialog open={open} onClose={handleClose} disableEnforceFocus>
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
              {formik.values.payment_status === "paid" && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={openSmsComposer}
                  style={{ marginTop: "12px", marginRight: "10px" }}
                >
                  Send Good Day SMS
                </Button>
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
                <MenuItem value="demo_upi">Demo UPI payment</MenuItem>
                <MenuItem value="demo_cash">Demo cash payment</MenuItem>
              </TextField>
  <Button
  variant="contained"
  color="success"
  onClick={handlePayment} disabled={paymentLoading || formik.values.payment_status === "paid"}
>
  {formik.values.payment_status === "paid" ? "Payment Done" : "Demo Pay"}
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
  {formik.values.payment_status === "paid" ? "Payment Done" : "Verify Demo Payment"}
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
      {demoPayment && (
        <div style={modalBackdropStyle}>
          <div style={modalStyle}>
            <div style={demoBadgeStyle}>Demo only</div>
            <h3 style={modalTitleStyle}>Verify Medical Payment</h3>
            <p style={modalTextStyle}>
              This is a fake medicine payment flow. No real money is charged
              and no payment details are collected.
            </p>

            <div style={summaryStyle}>
              <span>Medicine amount</span>
              <strong>Rs. {demoPayment.amount}</strong>
            </div>
            <div style={summaryStyle}>
              <span>Method</span>
              <strong>
                {formik.values.payment_method === "demo_cash"
                  ? "Demo Cash"
                  : "Demo UPI"}
              </strong>
            </div>
            <div style={otpBoxStyle}>
              <span>Demo OTP</span>
              <strong>{demoOtp}</strong>
            </div>

            <input
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="Enter OTP"
              autoFocus
              value={enteredOtp}
              onChange={(e) => {
                setEnteredOtp(e.target.value.replace(/\D/g, ""));
                setOtpError("");
              }}
              style={otpInputStyle}
            />
            {otpError && <span style={otpErrorStyle}>{otpError}</span>}

            <div style={modalActionsStyle}>
              <button
                type="button"
                onClick={() => {
                  setDemoPayment(null);
                  setDemoOtp("");
                  setEnteredOtp("");
                  setOtpError("");
                }}
                style={cancelButtonStyle}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={paymentLoading}
                onClick={verifyDemoPayment}
                style={{
                  ...verifyButtonStyle,
                  opacity: paymentLoading ? 0.75 : 1,
                }}
              >
                {paymentLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const modalBackdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(15, 23, 42, 0.62)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  zIndex: 9999,
};

const modalStyle = {
  width: "min(100%, 460px)",
  background: "#ffffff",
  borderRadius: "16px",
  padding: "28px",
  boxShadow: "0 24px 70px rgba(15, 23, 42, 0.28)",
};

const demoBadgeStyle = {
  display: "inline-flex",
  padding: "6px 12px",
  borderRadius: "999px",
  background: "#dcfce7",
  color: "#166534",
  fontSize: "13px",
  fontWeight: 700,
  marginBottom: "14px",
};

const modalTitleStyle = {
  margin: "0 0 10px",
  color: "#0f172a",
  fontSize: "26px",
};

const modalTextStyle = {
  margin: "0 0 18px",
  color: "#475569",
  lineHeight: 1.6,
};

const summaryStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #e2e8f0",
  color: "#334155",
};

const otpBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "18px 0 14px",
  padding: "14px",
  borderRadius: "12px",
  background: "#eff6ff",
  color: "#1e3a8a",
};

const otpInputStyle = {
  width: "100%",
  padding: "13px 14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "18px",
  letterSpacing: "4px",
  textAlign: "center",
  outline: "none",
};

const otpErrorStyle = {
  marginTop: "8px",
  color: "#dc2626",
  fontSize: "13px",
};

const modalActionsStyle = {
  display: "flex",
  gap: "12px",
  marginTop: "22px",
};

const cancelButtonStyle = {
  flex: 1,
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  background: "#ffffff",
  color: "#334155",
  fontWeight: 700,
};

const verifyButtonStyle = {
  flex: 2,
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
  color: "#ffffff",
  fontWeight: 800,
};

export default Medical;
