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

function Salary(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let userschema = object({
    user: string().required("Please select user"),
    payment: number().required("Please enter amount"),
    paymenttype: number().required("Please select paymenttype"),
    status: string().required("Please Select status"),
    amount: number()
      .required("Enter amount")
      .positive("Amount must be greater than 0"),
    workingdays: string().required("Please Select workingdays"),
  });
  // console.log(userschema)

  const formik = useFormik({
    initialValues: {
      user: "",
      payment: "",
      paymenttype: "",
      status: "",
      amount: "",
      workingdays: "",

    },

    validationSchema: userschema,

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
  });

  console.log(formik.errors, formik.touched);

  const user = [
    {
      value: "",
      label: "--select user--",
    },
    {
      value: "0",
      label: "user1",
    },
    {
      value: "1",
      label: "user2",
    },
    {
      value: "2",
      label: "user3",
    },
  ];

  const payment = [
    {
      value: "",
      label: "select payment",
    },
    {
      value: "0",
      label: "payment",
    },
    {
      value: "1",
      label: "payment1",
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
        <h1>Salary</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Salary
        </Button>
      </Box>
      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <form onSubmit={Formik.handleSubmit} id="subscription-form">
              <TextField
                error={formik.errors.user && formik.touched.user}
                id="user"
                name="user"
                fullWidth
                select
                variant="standard"
                label="Select user"
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
                error={formik.errors.payment && formik.touched.payment}
                id="payment"
                name="payment"
                fullWidth
                select
                variant="standard"
                label="Select payment"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.payment}
                helperText={
                  formik.errors.payment && formik.touched.payment
                    ? formik.errors.payment
                    : ""
                }
              >
                {payment.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                error={formik.errors.paymenttype && formik.touched.paymenttype}
                margin="dense"
                id="paymenttype"
                name="paymenttype"
                label="paymenttype"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.paymenttype}
                helperText={
                  formik.errors.paymenttype && formik.touched.paymenttype
                    ? formik.errors.paymenttype
                    : ""
                }
              />
              <TextField
                error={formik.errors.status && formik.touched.status}
                margin="dense"
                id="status"
                name="status"
                label="status"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
                helperText={
                  formik.errors.status && formik.touched.status
                    ? formik.errors.status
                    : ""
                }
              />
              <TextField
                error={formik.errors.workingdays && formik.touched.workingdays}
                margin="dense"
                id="workingdays"
                name="workingdays"
                label="workingdays"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.workingdays}
                helperText={
                  formik.errors.workingdays && formik.touched.workingdays
                    ? formik.errors.workingdays
                    : ""
                }
              />
              <TextField
                error={formik.errors.amount && formik.touched.amount}
                margin="dense"
                id="amount"
                name="amount"
                label="Amount"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
                helperText={
                  formik.errors.amount && formik.touched.amount
                    ? formik.errors.amount
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

export default Salary;
