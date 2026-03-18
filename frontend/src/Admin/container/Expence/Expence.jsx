import React, { useEffect } from "react";
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
import { date, number, object, string } from "yup";
import { deleteExpence, getExpence } from "../../../redux/slice/expence.slice";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';

function Expence(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpence());
  }, []);

  const expence = useSelector(state => state.expence);
    console.log(expence);

  let userschema = object({
    branch: string().required("Please enter name"),
    payment: number().required("Please enter amount"),
    paymenttype: number().required("Please select paymenttype"),
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

  const paymenttype = [
    {
      value: "",
      label: "select payment-type",
    },
    {
      value: "0",
      label: "online-payment ",
    },
    {
      value: "1",
      label: "offline-payment",
    },
  ];

  const columns = [
    { field: "branch", headerName: "Branch", width: 130 },
    { field: "payment", headerName: "Payment", width: 130 },
    { field: "paymenttype", headerName: "Paymenttype", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "amount", headerName: "Amount ", width: 130 },
    { field: "date", headerName: "Date ", width: 130 },
     { field: "action", 
      headerName: "Action ",
       width: 130,
       renderCell: (params) => (
        <IconButton aria-label="delete" onClick={() => dispatch(deleteExpence(params.row.id))}> 
        <DeleteIcon />  
        </IconButton> 
        )

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
          mt: 2,
        }}
      >
        <h1>Expence</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Expence
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
                fullWidth
                select
                variant="standard"
                label="Select Branch"
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
                id="paymenttype"
                name="paymenttype"
                fullWidth
                select
                variant="standard"
                label="Select paymenttype"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.paymenttype}
                helperText={
                  formik.errors.paymenttype && formik.touched.paymenttype
                    ? formik.errors.paymenttype
                    : ""
                }
              >
                {paymenttype.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                error={formik.errors.type && formik.touched.type}
                margin="dense"
                id="type"
                name="type"
                label="Type"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
                helperText={
                  formik.errors.type && formik.touched.type
                    ? formik.errors.type
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

              <TextField
                error={formik.errors.date && formik.touched.date}
                margin="dense"
                id="date"
                name="date"
                label=""
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
        rows={expence.expence}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default Expence;
