import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import MenuItem from '@mui/material/MenuItem';
import { Formik, useFormik } from "formik";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { styled } from "@mui/material/styles";
import { object } from "yup";



function Expence(props) {
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
    branch: string().required("Please enter name"),
    payment: number().required("Please enter amount"),
    paymenttype: number().required("Please enter amount"),
    email: string().required("Please Select email"),
    type: string().required("Please Select type"),
    amount: number()
      .required("Enter amount")
      .positive("Amount must be greater than 0"),
    date: date().required("Please Select date"),

  });
  // console.log(userschema)

  const formik = useFormik({
    initialValues: {
      branch: "",
      payment: "",
      paymenttype: "",
      email: "",
      type: "",
      amount: "",
      date: "",
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
      label: "--select branch--",
    },
    {
      value: "0",
      label: "branch1",
    },
    {
      value: "1",
      label: "branch2",
    },
    {
      value: "2",
      label: "branch3",
    },
  ];

  const payment = [
    {
      value: '',
      label: 'select payment',
    },
    {
      value: '0',
      label: 'payment',
    },
    {
      value: '1',
      label: 'payment1',
    },

  ];

  const paymenttype = [
    {
      value: '',
      label: 'select payment',
    },
    {
      value: '0',
      label: 'payment type',
    },
    {
      value: '1',
      label: 'payment type1',
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
        <h1>expence</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add expence
        </Button>
      </Box>
      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <form onSubmit={handleSubmit} id="subscription-form">

              <TextField
                error={formik.errors.branch && formik.touched.branch}
                id="branch"
                select
                label=""
                slotProps={{
                  select: {
                    native: true,
                  },
                }}
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.branch}
                helperText={
                  formik.errors.branch && formik.errors.branch
                    ? formik.errors.branch
                    : ""
                }
              >
                {branch.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>

              <TextField
                error={formik.errors.payment && formik.touched.payment}
                id="payment"
                select
                label=""
                slotProps={{
                  select: {
                    native: true,
                  },
                }}
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.payment}
                helperText={
                  formik.errors.payment && formik.errors.payment
                    ? formik.errors.payment
                    : ""
                }
              >
                {payment.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>

              <TextField
                error={formik.errors.paymenttype && formik.touched.paymenttype}
                id="paymenttype"
                select
                label=""
                slotProps={{
                  select: {
                    native: true,
                  },
                }}
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.paymenttype}
                helperText={
                  formik.errors.paymenttype && formik.errors.paymenttype
                    ? formik.errors.paymenttype
                    : ""
                }
              >
                {paymenttype.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                error={formik.errors.type && formik.touched.type}
                margin="dense"
                id="type"
                name="type"
                label="type"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                error={formik.errors.amount && formik.touched.amount}
                margin="dense"
                id="amount"
                name="amount"
                label="amount"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                error={formik.errors.date && formik.touched.date}
                margin="dense"
                id="date"
                name="date"
                label="date"
                type="text"
                fullWidth
                variant="standard"
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

export default Expence;
