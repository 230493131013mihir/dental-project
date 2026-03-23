import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { Formik, useFormik } from "formik";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { styled } from "@mui/material/styles";
import { mixed, number, object, string } from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addServices,
  getServices,
  updateServices,
  deleteServices,
} from "../../../redux/slice/services.slice";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { getUser } from "../../../redux/slice/user.slice";
import { getDepartment } from "../../../redux/slice/department.slice";
import { getBranch } from "../../../redux/slice/branch.slice";
import { useState } from "react";

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

function Services(props) {
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
    dispatch(getServices());
    dispatch(getBranch());
    dispatch(getDepartment());
    dispatch(getUser());
  }, []);

  const services = useSelector((state) => state.services);
  console.log(services);

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
  const columns = [
    { field: "branch_id", headerName: "branch_id", width: 130 },
    { field: "department_id", headerName: "department_id", width: 130 },
    { field: "user_id", headerName: "user_id", width: 130 },
    { field: "name", headerName: "name", width: 130 },
    { field: "description", headerName: "Description", width: 130 },

    {
      field: "services_img",
      headerName: "services_img",
      width: 130,
      renderCell: (params) => (
        <img
          src={"http://localhost:3000/" + params.row.services_img}
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
          <IconButton aria-label="Edit" onClick={() => handleEdit(params.row)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => dispatch(deleteServices(params.row.id))}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  let userschema = object({
    branch_id: string().required("Please enter branch_id"),
    user_id: string().required("Please enter vendor"),
    department_id: string().required("Please enter department_id"),
    name: string().required("Please Select name"),
    description: string().required("Please Select description"),
    services_img: mixed().required("Please Select image"),
  });
  // console.log(userschema)

  const formik = useFormik({
    initialValues: {
      branch_id: "",
      user_id: "",
      department_id: "",
      name: "",
      description: "",
      services_img: "",
    },

    validationSchema: userschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);

      if (update) {
        console.log("update data");
        dispatch(updateServices(values));
      } else {
        dispatch(addServices(values));
      }
      handleClose();
      resetForm();
    },
  });
  console.log(branch.branch, department.department, formik.values.branch_id);

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

  const user_id = [
    {
      value: "",
      label: "-- Select user --",
    },
    {
      value: "0",
      label: "user 1",
    },
    {
      value: "1",
      label: "user 2",
    },
    {
      value: "2",
      label: "user 3",
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
        <h1>Services</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add services
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
                error={formik.errors.user_id && formik.touched.user_id}
                id="user_id"
                name="user_id"
                select
                label="user_id"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.user_id}
                helperText={
                  formik.errors.user_id && formik.touched.user_id
                    ? formik.errors.user_id
                    : ""
                }
              >
                {user.user.map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.name}
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
                {department.department
                  ?.filter((v1) => v1.branch_id == formik.values.branch_id)
                  ?.map((v) => (
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
                error={formik.errors.description && formik.touched.description}
                margin="dense"
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                helperText={
                  formik.errors.description && formik.touched.description
                    ? formik.errors.description
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
                Upload service image
                <VisuallyHiddenInput
                  type="file"
                  name="services_img"
                  // onChange={(event) => console.log(event.target.files)}
                  // multiple
                  onChange={(event) =>
                    formik.setFieldValue("services_img", event.target.files[0])
                  }
                  onBlur={formik.handleBlur}
                ></VisuallyHiddenInput>
              </Button>
              <img
                src={
                  formik.values.services_img instanceof File
                    ? URL.createObjectURL(formik.values.services_img)
                    : typeof formik.values.services_img === "string"
                      ? "http://localhost:3000/" + formik.values.services_img
                      : ""
                }
                width={"50px"}
                height={"50px"}
              />
              <br />
              {formik.errors.services_img && formik.errors.services_img ? (
                <span className="error">please select service image</span>
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
              rows={services.services}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
    </div>
  );
}

export default Services;
