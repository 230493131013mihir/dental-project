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


import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";



import { getAppointment } from "../../../redux/slice/appointment.slice";
import { getBranch } from "../../../redux/slice/branch.slice";
import { getDepartment } from "../../../redux/slice/department.slice";
import { getUser } from "../../../redux/slice/user.slice";
import IconButton from "@mui/material/IconButton";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";

function Appointment(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const [update, setUpdate] = useState(false);
  console.log(update);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppointment());
    dispatch(getBranch());
    dispatch(getDepartment());
    dispatch(getUser());
  }, []);

  const appointment = useSelector((state) => state.appointment);
  //console.log(error);
  console.log(appointment.appointment);

  const branch = useSelector((state) => state.branch);

  console.log(branch.branch);

  const department = useSelector((state) => state.department);

  console.log(department.department);

   const user = useSelector((state) => state.user);

  console.log(user.user);

  const handleEdit = (values) => {
    handleClose();
    console.log(values);
    formik.setValues(values);
    handleClickOpen();
    setUpdate(true);
  };

  let userschema = object({
    branch_id: number().required("Please select branch"),
    department_id: number().required("Please enter department"),
     user_id: number().required("Please select user"),
    name: string().required("Please Select name"),
    phone: string()
      .required("Please enter mobile number")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
      email: string().required("Please Select email"),
    date: string().required("Please Select date"),
    time: string().required("Please Select time"),
  });
  // console.log(userschema)

  const formik = useFormik({
    initialValues: {
      branch_id: "",
      department_id: "",
      user_id: "",
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

  // console.log(formik.errors, formik.touched);
   console.log(branch.branch, department.department, formik.values.branch_id);

  const navigate = useNavigate();

  const columns = [
    {
      field: "branch_id",
      headerName: "branch",
      width: 130,
      renderCell: (params) => {
        const d = branch.branch?.find(v => v.id == params.row.branch_id)?.name

        console.log(branch.branch_id, params.row.id, d);

        return d
      }


    },
    {
      field: "department_id",
      headerName: "department",
      width: 130,
      renderCell: (params) => {
        const d = department.department?.find(v => v.id == params.row.department_id)?.name

        console.log(department.department_id, params.row.id, d);

        return d
        
      }
    },
     { field: "user_id", headerName: "user", width: 130,
      renderCell: (params) => {
        const d = user.user?.find(v => v.id == params.row.user_id)?.name
         console.log(user.user_id, params.row.id, d);
        return d
        
      }
      },
    { field: "name", headerName: "name", width: 130 },
    { field: "phone", headerName: "phone", width: 130 },
    { field: "date", headerName: "date", width: 130 },
    { field: "time", headerName: "time", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton aria-label="Edit" onClick={() => navigate("/admin/appointmentedit", {state: {appointment_id: params.row.id}})}>
            <ModeEditIcon />
          </IconButton>
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
      { <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <form onSubmit={formik.handleSubmit} id="subscription-form">
              <TextField
                error={formik.errors.branch_id && formik.touched.branch_id}
                id="branch_id"
                name="branch_id"
                fullWidth
                select
                variant="standard"
                label="Select Branch"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.branch_id}
                helperText={
                  formik.errors.branch_id && formik.touched.branch_id
                    ? formik.errors.branch_id
                    : ""
                }
                
              >
                  {branch.branch.map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={formik.errors.department_id && formik.touched.department_id}
                id="department_id"
                name="department_id"
                fullWidth
                select
                variant="standard"
                label="Select Branch"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.department_id}
                helperText={
                  formik.errors.department_id && formik.touched.department_id
                    ? formik.errors.department_id
                    : ""
                }
              >
                {department.department?.filter(v1 => v1.branch_id == formik.values.branch_id)?.map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.name}
                  </MenuItem>
                ))}
              </TextField>
               <TextField
                error={formik.errors.user_id && formik.touched.user_id}
                id="user_id"
                name="user_id"
                fullWidth
                select
                variant="standard"
                label="Select Branch"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.user_id}
                helperText={
                  formik.errors.user_id && formik.touched.user_id
                    ? formik.errors.user_id
                    : ""
                }
              >
                {user.user?.filter(v1 => v1.branch_id == formik.values.branch_id)?.map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.name}
                  </MenuItem>
                ))}
              </TextField>
               

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
      </React.Fragment> }

      <DataGrid
        rows={appointment.appointment}
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
