import React, { useState } from "react";
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
import { number, object, string, mixed } from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addVendor,
  deleteVendor,
  getVendor,
  updateVendor,
} from "../../../redux/slice/vendor.slice";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

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


function Vendor(props) {
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
    dispatch(getVendor());
  }, []);

  const vendor = useSelector((state) => state.vendor);
  console.log(vendor);


  const handleEdit = (values) => {
    handleClose();
    console.log(values);
    formik.setValues(values);
    handleClickOpen();
    setUpdate(true);
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
    vendor_img: mixed().required("Please Select image"),


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
      vendor_img: "",
    },

    validationSchema: userschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);

      if (update) {
        console.log("update data");
        dispatch(updateVendor(values));
      } else {
        dispatch(addVendor(values));
      }
      handleClose();
      resetForm();
    },
  });

  console.log(formik.errors, formik.touched);

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
    { field: "companyname", headerName: "Company", width: 130 },
    { field: "mobile", headerName: "Mobile", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "gstno", headerName: "GST No", width: 130 },

    {
      field: "vendor_img",
      headerName: "vendor_img",
      width: 130,
      renderCell: (params) => (
        <img
          src={"http://localhost:3000/" + params.row.vendor_img}
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
          <IconButton onClick={() => dispatch(deleteVendor(params.row.id))}>
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

              <br />

<Button
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<CloudUploadIcon />}
>
  Upload Vendor image
  <VisuallyHiddenInput
    type="file"
    name="vendor_img"
    multiple
    onChange={(event) =>
      formik.setFieldValue("vendor_img", event.target.files[0])
    }
    onBlur={formik.handleBlur}
  ></VisuallyHiddenInput>
</Button>

<img
  src={
    typeof formik.values.vendor_img === "string"
      ? "http://localhost:3000/" + formik.values.vendor_img
      : URL.createObjectURL(formik.values.vendor_img)
  }
  width={"50px"}
  height={"50px"}
/>

<br />

{formik.errors.vendor_img && formik.errors.vendor_img ? (
  <span className="error">please select Vendor image</span>
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
        rows={vendor.vendor}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default Vendor;
