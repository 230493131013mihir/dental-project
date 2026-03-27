import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import { object, string, number, mixed } from "yup";
import MenuItem from "@mui/material/MenuItem";
import { Formik, useFormik } from "formik";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { styled } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { getBranch } from "../../../redux/slice/branch.slice";
// import { getAppointment } from "../../../../../backend/src/controller/appointment.controller";
// import { getBranch } from "../../../redux/slice/branch.slice";
import { getAppointment } from "../../../redux/slice/appointment.slice";


function Appointment(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
  };

 const [update, setUpdate] = useState(false);
  console.log(update);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppointment());
  }, []);

  const appointment = useSelector((state) => state.appointment.appointment);
  //console.log(error);

  const handleEdit = (values) => {
    handleClose();
    console.log(values);
    formik.setValues(values);
    handleClickOpen();
    setUpdate(true);
  };

  let userschema = object({
    branch: string().required("Please select branch"),
    department: string().required("Please enter department"),
    name: string().required("Please Select name"),
    phone: string()
      .required("Please enter mobile number")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    date: string().required("Please Select date"),
    time: string().required("Please Select time"),
  });
  // console.log(userschema)

  const formik = useFormik({
    initialValues: {
      branch: "",
      department: "",
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
    },

    validationSchema: userschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  console.log(formik.errors, formik.touched);

  const columns = [
    { field: "branch", headerName: "branch", width: 130 },
    { field: "department", headerName: "department", width: 130 },
    { field: "name", headerName: "name", width: 130 },
    { field: "phone", headerName: "phone", width: 130 },
    { field: "email", headerName: "email", width: 130 },
    { field: "date", headerName: "date", width: 130 },
    { field: "time", headerName: "time", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <>
          {/* <IconButton aria-label="Edit" onClick={() => handleEdit(params.row)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => dispatch(deleteAppointment(params.row.id))}
          >
            <DeleteIcon />
          </IconButton> */}
        </>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Appointment</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Appointment
        </Button>
      </Box>
      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <form onSubmit={formik.handleSubmit} id="subscription-form">
              <TextField
                error={formik.errors.branch && formik.touched.branch}
                id="branch"
                name="branch"
                fullWidth
                select
                variant="standard"
                label="Select Branch"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.branch}
                helperText={
                  formik.errors.branch && formik.touched.branch
                    ? formik.errors.branch
                    : ""
                }
              />
              <TextField
                error={formik.errors.department && formik.touched.department}
                id="department"
                name="department"
                fullWidth
                select
                variant="standard"
                label="Select Branch"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.department}
                helperText={
                  formik.errors.department && formik.touched.department
                    ? formik.errors.department
                    : ""
                }
              />

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
                id="phone"
                name="phone"
                label="phone"
                multiline
                rows={4}
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
                error={formik.errors.email && formik.touched.email}
                margin="dense"
                id="email"
                name="email"
                label="phone"
                type="phone"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                helperText={
                  formik.errors.email && formik.touched.email
                    ? formik.errors.email
                    : ""
                }
              />
              <TextField
                error={formik.errors.date && formik.touched.date}
                margin="dense"
                id="date"
                name="date"
                label="Email"
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
                label="time"
                type="text"
                name="time"
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
             
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="Appointment-form">
              Book Appointment
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <DataGrid
        rows={appointment || []}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default Appointment;
