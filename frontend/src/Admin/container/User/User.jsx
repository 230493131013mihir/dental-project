import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { Formik, useFormik } from "formik";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { styled } from "@mui/material/styles";
import { date, mixed, number, object, string } from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  getUser,
  updateUser,
  deleteUser,
} from "../../../redux/slice/user.slice";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { getBranch } from "../../../redux/slice/branch.slice";
import { getDepartment } from "../../../redux/slice/department.slice";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function User(props) {
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
    dispatch(getUser());
    dispatch(getBranch());
    dispatch(getDepartment());
  }, []);

  const user = useSelector((state) => state.user);
  console.log(user);

    const branch = useSelector((state) => state.branch);
       
         console.log(branch.branch);
  
          const department = useSelector((state) => state.department);
         
           console.log(department.department);

  const handleEdit = (values) => {
    handleClose();
    console.log(values);
    formik.setValues(values);
    handleClickOpen();
    setUpdate(true);
  };

  let userschema = object({
    branch_id: string().required("Please enter branch_id"),
    role_id: string().required("Please select role"),
    department_id: string().required("Please enter department_id"),
    name: string().required("Please Select name"),
    address: string().required("Please Select address"),
    qualification: string().required("Please Select qualification"),
    dob: date().required("Please Select date"),
    email: string().required("Please Select type"),
    user_img: mixed().required("Please Select image"),
  });

  const formik = useFormik({
    initialValues: {
      branch_id: "",
      role_id: "",
      department_id: "",
      name: "",
      address: "",
      qualification: "",
      dob: "",
      email: "",
      user_img: "",
    },

    validationSchema: userschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);

      if (update) {
        console.log("update data");
        dispatch(updateUser(values));
      } else {
        dispatch(addUser(values));
      }
      handleClose();
      resetForm();
    },
  });

    console.log(branch.branch, department.department,  formik.values.branch_id);


  const columns = [
    { field: "branch_id", headerName: "Branch", width: 130 },
    { field: "department_id", headerName: "Department", width: 130 },
    { field: "role_id", headerName: "Role", width: 130 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "dob", headerName: "DOB", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "qualification", headerName: "Qualification", width: 130 },
    { field: "address", headerName: "Address", width: 130 },

    {
      field: "user_img",
      headerName: "user_img",
      width: 130,
      renderCell: (params) => (
        <img
          src={"http://localhost:3000/" + params.row.user_img}
          width={"50px"}
          height={"50px"}
        />
      ),
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
          <IconButton onClick={() => dispatch(deleteUser(params.row.id))}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const branch_id = [
    {
      value: "",
      label: "-- Select Branch --",
    },
    {
      value: "0",
      label: "Branch 1",
    },
    {
      value: "1",
      label: "Branch 2",
    },
    {
      value: "2",
      label: "Branch 3",
    },
  ];

  const role_id = [
    {
      value: "",
      label: "-- Select role --",
    },
    {
      value: "0",
      label: "role 1",
    },
    {
      value: "1",
      label: "role 2",
    },
    {
      value: "2",
      label: "role 3",
    },
  ];

  const department_id = [
    {
      value: "",
      label: "-- Select Department --",
    },
    {
      value: "0",
      label: "Department 1",
    },
    {
      value: "1",
      label: "Department 2",
    },
    {
      value: "2",
      label: "Department 3",
    },
  ];

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>User</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add User
        </Button>
      </Box>
      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <form onSubmit={formik.handleSubmit} id="subscription-form">
              <TextField
                error={formik.errors.branch_id && formik.touched.branch_id}
                id="branch_id"
                name="branch_id"
                select
                label="Branch"
                fullWidth
                variant="standard"
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
                error={formik.errors.role_id && formik.touched.role_id}
                id="role_id"
                name="role_id"
                select
                label="role_id"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role_id}
                helperText={
                  formik.errors.role_id && formik.touched.role_id
                    ? formik.errors.role_id
                    : ""
                }
              >
                {role_id.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={
                  formik.errors.department_id && formik.touched.department_id
                }
                id="department_id"
                name="department_id"
                select
                label="Department"
                fullWidth
                variant="standard"
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
                error={formik.errors.email && formik.touched.email}
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
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
                error={
                  formik.errors.qualification && formik.touched.qualification
                }
                margin="dense"
                id="qualification"
                name="qualification"
                label="qualification"
                type="qualification"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.qualification}
                helperText={
                  formik.errors.qualification && formik.touched.qualification
                    ? formik.errors.qualification
                    : ""
                }
              />
              <TextField
                error={formik.errors.dob && formik.touched.dob}
                margin="dense"
                id="dob"
                name="dob"
                label="dob"
                placeholder="dob"
                type="date"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dob}
                helperText={
                  formik.errors.dob && formik.touched.dob
                    ? formik.errors.dob
                    : ""
                }
              />
              <TextField
                error={formik.errors.address && formik.touched.address}
                margin="dense"
                id="address"
                name="address"
                label="address"
                multiline
                rows={4}
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                helperText={
                  formik.errors.address && formik.touched.address
                    ? formik.errors.address
                    : ""
                }
              />

              <br />

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload User image
                <VisuallyHiddenInput
                  type="file"
                  name="user_img"
                  multiple
                  onChange={(event) =>
                    formik.setFieldValue("user_img", event.target.files[0])
                  }
                  onBlur={formik.handleBlur}
                ></VisuallyHiddenInput>
              </Button>

              <img
  src={
    formik.values.user_img instanceof File
      ? URL.createObjectURL(formik.values.user_img)
      : typeof formik.values.user_img === "string"
      ? "http://localhost:3000/" + formik.values.user_img
      : ""
  }
  width={"50px"}
  height={"50px"}
/>

              <br />

              {formik.errors.user_img && formik.errors.user_img ? (
                <span className="error">please select User image</span>
              ) : (
                ""
              )}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="subscription-form">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <DataGrid
        rows={user.user}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default User;
