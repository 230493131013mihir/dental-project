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
import {
  addDepartment,
  deleteDepartment,
  getDepartment,
  updateDepartment,
} from "../../../redux/slice/department.slice";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import { getBranch } from "../../../redux/slice/branch.slice";

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

function Department(props) {
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
    dispatch(getDepartment());
    dispatch(getBranch());
  }, []);

  const department = useSelector((state) => state.department);

  const branch = useSelector((state) => state.branch);

  console.log(branch.branch);
  //console.log(error);

  const handleEdit = (values) => {
    handleClose();
    console.log(values);
    formik.setValues(values);
    handleClickOpen();
    setUpdate(true);
  };

  let userschema = object({
    branch_id: string().required("Please select branch_id"),
    name: string().required("Please enter name"),
    description: string().required("please enter description"),
    email: string().required("Please Select type"),
    mobile: string()
      .required("Please enter mobile number")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    address: string().required("Please Select address"),
    department_img: mixed().required("Please Select image"),
  });
  // console.log(userschema)

  const formik = useFormik({
    initialValues: {
      branch_id: "",
      name: "",
      description: "",
      mobile: "",
      email: "",
      address: "",
      department_img: "",
    },

    validationSchema: userschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);

      if (update) {
        console.log("update data");
        dispatch(updateDepartment(values));
      } else {
        dispatch(addDepartment(values));
      }
      handleClose();
      resetForm();
    },
  });

  console.log(formik.errors, formik.touched);

  const branch_id = [
    {
      value: "1",
      label: "branch2",
    },
    {
      value: "2",
      label: "branch3",
    },
  ];

  const columns = [
    { field: "branch_id", headerName: "branch_id", width: 130 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
    { field: "mobile", headerName: "Mobile no", width: 130 },
    {
      field: "department_img",
      headerName: "department_img",
      width: 130,
      renderCell: (params) => (
        <img
          src={"http://localhost:3000/" + params.row.department_img}
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
            onClick={() => dispatch(deleteDepartment(params.row.id))}
          >
            <DeleteIcon />
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
        <h1>Department</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Department
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
                id="Description"
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
              <TextField
                error={formik.errors.mobile && formik.touched.mobile}
                margin="dense"
                id="mobile"
                name="mobile"
                label="Mobile Number"
                type="phone"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
                helperText={
                  formik.errors.mobile && formik.touched.mobile
                    ? formik.errors.mobile
                    : ""
                }
              />
              <TextField
                error={formik.errors.email && formik.touched.email}
                margin="dense"
                id="email"
                name="email"
                label="Email"
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
                error={formik.errors.address && formik.touched.address}
                margin="dense"
                id="address"
                label="address"
                type="text"
                name="address"
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
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload department image
                <VisuallyHiddenInput
                  type="file"
                  name="department_img"
                  // onChange={(event) => console.log(event.target.files)}
                  multiple
                  onChange={(event) =>
                    formik.setFieldValue("department_img", event.target.files[0])
                  }
                  onBlur={formik.handleBlur}
                //  value={formik.values.department_img}
                ></VisuallyHiddenInput>
              </Button>
              {/* <img
                src={
                  typeof formik.values.department_img === "string"
                    ? "http://localhost:3000/" + formik.values.department_img
                    : URL.createObjectURL(formik.values.department_img)
                }
//                 src={
//   formik.values.department_img instanceof File
//     ? URL.createObjectURL(formik.values.department_img)
//     : typeof formik.values.department_img === "string"
//     ? "http://localhost:3000/" + formik.values.department_img
//     : ""
// }
                width={"50px"}
                height={"50px"}
              /> */}
<img
  src={
    formik.values.department_img instanceof File
      ? URL.createObjectURL(formik.values.department_img)
      : typeof formik.values.department_img === "string"
      ? "http://localhost:3000/" + formik.values.department_img
      : ""
  }
  width={"50px"}
  height={"50px"}
/>
              <br />
              {formik.errors.department_img && formik.errors.department_img ? (
                <span className="error">please select department image</span>
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
        rows={department.department}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default Department;
