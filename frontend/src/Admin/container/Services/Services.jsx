import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import MenuItem from '@mui/material/MenuItem';
import { Formik, useFormik } from "formik";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { styled } from "@mui/material/styles";
import { mixed, number, object, string } from "yup";
import User from "../User/User";

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
  };

  let userschema = object({
    branch: string().required("Please enter branch"),
    User: string().required("Please enter vendor"),
    department: string().required("Please enter department"),
    name: string().required("Please Select name"),
    description: string().required("Please Select description"),
    servimg: mixed().required("Please Select image"),


  });
  // console.log(userschema)

  const formik = useFormik({
    initialValues: {
      branch: "",
      user: "",
      department: "",
      name: "",
      description: "",
      servimg: "",
    },

    validationSchema: userschema,

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
  });

  console.log(formik.errors, formik.touched);

  const branch = [
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

  const user = [
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

  const department = [
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
                error={formik.errors.branch && formik.touched.branch}
                id="branch"
                name="branch"
                select
                label="Branch"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.branch}
                helperText={
                  formik.errors.branch && formik.touched.branch
                    ? formik.errors.branch
                    : ""
                }
              >
                {branch.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={formik.errors.user && formik.touched.user}
                id="user"
                name="user"
                select
                label="user"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.user}
                helperText={
                  formik.errors.user && formik.touched.user
                    ? formik.errors.user
                    : ""
                }
              >
                {user.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={formik.errors.department && formik.touched.department}
                id="department"
                name="department"
                select
                label="Department"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.department}
                helperText={
                  formik.errors.department && formik.touched.department
                    ? formik.errors.department
                    : ""
                }
              >
                {department.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
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
                  name="servimg"
                  // onChange={(event) => console.log(event.target.files)}
                  multiple
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.servimg}
                ></VisuallyHiddenInput>
              </Button>

              <br />
              {formik.errors.servimg && formik.errors.servimg ? (
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
    </div>
  );
}

export default Services;
