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
import { number, object, string } from "yup";


function Vendor(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let userschema = object({
    name: string().required("Please Select name"),
    companyname: string().required("Please Select companyname"),
    email: string().required("Please Select type"),
    mobile: string()
      .required("Please enter mobile number")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    address: string().required("Please Select address"),
    gstno: number().required("Please Select number"),

  });
  // console.log(userschema)

  const formik = useFormik({
    initialValues: {

      name: "",
      companyname: "",
      email: "",
      mobile: "",
      address: "",
      gstno: "",
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
        }}
      >
        <h1>Vendor</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Vendor
        </Button>
      </Box>
      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <form onSubmit={formik.handleSubmit} id="subscription-form">
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
                error={formik.errors.companyname && formik.touched.companyname}
                id="companyname"
                name="companyname"
                label="companyname"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.companyname}
                helperText={
                  formik.errors.companyname && formik.touched.companyname
                    ? formik.errors.companyname
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
                error={formik.errors.address && formik.touched.address}
                id="address"
                label="address"
                type="text"
                multiline
                variant="standard"
                rows={4}
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                helperText={
                  formik.errors.address && formik.touched.address
                    ? formik.errors.address
                    : ""
                }
              />
              <TextField
                error={formik.errors.gstno && formik.touched.gstno}
                margin="dense"
                id="gstno"
                name="gstno"
                label="gstno"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gstno}
                helperText={
                  formik.errors.gstno && formik.touched.gstno
                    ? formik.errors.gstno
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

export default Vendor;
