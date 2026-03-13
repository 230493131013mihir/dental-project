import React from "react";
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
import { object } from "yup";


function Branch(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  let userschema = object({
    name: string().required("Please enter name"),
    description: string().required("please enter description"),
    email: string().required("Please Select type"),
    mobile: string()
  .required("Please enter mobile number")
  .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    address: string().required("Please Select address"),

  });
  // console.log(userschema)

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      mobile: "",
      email: "",
      address: "",
    },

    validationSchema: userschema,

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
  });

  console.log(formik.errors, formik.touched);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }} >
        <h1>Branch</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Branch
        </Button>
      </Box>

      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>

          <DialogContent>
            <form onSubmit={handleSubmit} id="subscription-form">
              <TextField
                error={formik.errors.name && formik.touched.name}
                margin="dense"
                id="name"
                name="Name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                helperText={
                  formik.errors.name && formik.errors.name
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
                formik.errors.description && formik.errors.description
                  ? formik.errors.description
                  : ""
              }
              />

              <TextField
              error={formik.errors.email && formik.touched.email}
                margin="dense"
                id="name"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              helperText={
                formik.errors.email && formik.errors.email
                  ? formik.errors.email
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
                formik.errors.mobile && formik.errors.mobile
                  ? formik.errors.mobile
                  : ""
              }
              />
              <TextField
              error={formik.errors.address && formik.touched.address}
                id="address"
                label="address"
                type="text"
                multiline
                maxRows={4}
                fullWidth
                onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              helperText={
                formik.errors.address && formik.errors.address
                  ? formik.errors.address
                  : ""
              }
              />
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

export default Branch;
