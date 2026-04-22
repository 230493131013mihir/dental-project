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
import { QRCodeCanvas } from "qrcode.react";

function Medical(props) {
  const [open, setOpen] = React.useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [update, setUpdate] = useState(false);
  console.log(update);

  const dispatch = useDispatch();
  const upiId = "yourupiid@okaxis"; // 🔴 change this

const getUpiLink = () => {
  return `upi://pay?pa=${upiId}&pn=Clinic&am=${formik.values.medicine_amount}&cu=INR`;
};

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
    },

    validationSchema: userschema,

onSubmit: async (values, { resetForm }) => {
  console.log(values);

  // 🔥 ADD THIS AT TOP
  if (!values.payment_status) {
    alert("Please complete payment first");
    return;
  }

  // ✅ YOUR EXISTING CODE (NO CHANGE)
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
  const handlePayment = async () => {
  const amount = formik.values.medicine_amount;

  if (!amount) {
    alert("Enter amount first");
    return;
  }

  const options = {
    key: "YOUR_RAZORPAY_KEY", // 🔴 replace with your key
    amount: amount * 100,
    currency: "INR",
    name: "Clinic Payment",
    description: "Medicine Payment",
    handler: function (response) {
      console.log("Payment Success:", response);

      formik.setFieldValue("payment_status", "paid");

      alert("Payment Successful ✅");
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
                    <b>Amount/pill:</b> ₹{selectedMedicine.price}
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
  <Button
  variant="contained"
  color="success"
  onClick={() => setPaymentOpen(true)}
>
  PAY VIA UPI
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
>
  Pay via UPI
</Button>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="medical-form">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <Dialog open={paymentOpen} onClose={() => setPaymentOpen(false)}>
  <DialogContent style={{ textAlign: "center" }}>
    <h3>Scan & Pay</h3>

    <QRCodeCanvas
      value={getUpiLink()}
      size={200}
    />

    <p>Amount: ₹{formik.values.medicine_amount}</p>
    <p>UPI ID: {upiId}</p>

    <Button
      variant="contained"
      color="success"
      sx={{ mt: 2 }}
      onClick={() => {
        formik.setFieldValue("payment_status", "paid");
        setPaymentOpen(false);
        alert("Payment marked as Paid ✅");
      }}
    >
      I Have Paid
    </Button>
  </DialogContent>
</Dialog>

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
