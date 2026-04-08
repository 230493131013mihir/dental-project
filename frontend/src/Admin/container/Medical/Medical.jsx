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

function Medical(props) {
  const [open, setOpen] = React.useState(false);

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
  console.log(medical);
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
    time: string().required("Please Select time"),
    
    medicine_id: string().required("Please Select medicine_id"),
    medicine_quantity: string().required("Please Select medicine_quantity"),
     amount: string().required("Please enter amount"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      date: "",
      time: "",
      medicine_id: "",
      medicine_quantity: "",
      amount: "",
    },

    validationSchema: userschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);

      if (update) {
        console.log("update data");
        dispatch(updateMedical(values));
      } else {
        dispatch(addMedical(values));
      }
      handleClose();
      resetForm();
    },
  });

  console.log(formik.errors, formik.touched);

  const medicine_id = [
    {
      value: "",
      label: "select ",
    },
    {
      value: "Amoxicillin",
      label: "Amoxicillin",
    },
    {
      value: "Ibuprofen",
      label: "Ibuprofen",
    },
    {
      value: "Paracetamol",
      label: "Paracetamol",
    },
    {
      value: "Metronidazole",
      label: "Metronidazole",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Appointment ID",
      width: 100,
    },
    { field: "name", headerName: "Name", width: 130 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "date", headerName: "Date", width: 130 },
    {
      field: "time",
      headerName: "Time",
      width: 130,
      renderCell: (params) => {
        const d = timeslot.timeslot?.find((v) => v.id == params.row.time);

        console.log(timeslot.time, params.row.id, d);

        return d?.starttime + "-" + d?.endtime;
      },
    },
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

        console.log(medicine.medicine_id, params.row.id, d);

        return d;
      },
    },
    {
      field: "medicine_quantity",
      headerName: "Qty",
      width: 130,
    },
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
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Medical
        </Button>
      </Box>

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
                label="Date"
                type="date"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
                helperText={
                  formik.errors.date && formik.touched.date
                    ? formik.errors.date
                    : ""
                }
              />

              <TextField
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
              />

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
                {medicine_id.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={
                  formik.errors.medicine_quantity &&
                  formik.touched.medicine_quantity
                }
                margin="dense"
                id="medicine_quantity"
                name="medicine_quantity"
                label="medicine_quantity"
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
                error={formik.errors.amount && formik.touched.amount}
                id="amount"
                name="amount"
                fullWidth
                variant="standard"
                label="Amount"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
                helperText={
                  formik.errors.amount && formik.touched.amount
                    ? formik.errors.amount
                    : ""
                }
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="medical-form">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <DataGrid
        rows={medical.medical}
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
