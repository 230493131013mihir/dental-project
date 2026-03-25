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
import { useDispatch, useSelector } from "react-redux";
import {
  addSalary,
  deleteSalary,
  getSalary,
  updateSalary,
} from "../../../redux/slice/salary.slice";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUser } from "../../../redux/slice/user.slice";
// import { addBranch, updateBranch } from "../../../redux/slice/branch.slice";

function Salary(props) {
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
    dispatch(getSalary());
    dispatch(getUser());
  }, []);

  const salary = useSelector((state) => state.salary);
  const user = useSelector((state) => state.user);

  console.log(user.user);

  const handleEdit = (values) => {
    handleClose();
    formik.setValues(values);
    handleClickOpen();
    setUpdate(true);
  };

  let userschema = object({
    user_id: string().required("Please select user"),
    payment_id: number().required("Please enter amount"),
    transaction_id: number().required("Please select transaction_id"),
    status: string().required("Please Select status"),
    amount: number()
      .required("Enter amount")
      .positive("Amount must be greater than 0"),
    workingdays: string().required("Please Select workingdays"),
  });
  // console.log(userschema)

  const formik = useFormik({
    initialValues: {
      user_id: "",
      payment_id: "",
      transaction_id: "",
      status: "",
      amount: "",
      workingdays: "",
    },

    validationSchema: userschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);

      if (update) {
        console.log("update data");
        dispatch(updateSalary(values));
      } else {
        dispatch(addSalary(values));
      }
      handleClose();
      resetForm();
    },
  });

  console.log(formik.errors, formik.touched);

  const columns = [
    { field: "user_id", headerName: "user_id", width: 130 },
    { field: "payment_id", headerName: "Payment", width: 130 },
    { field: "transaction_id", headerName: "Payment Type", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "workingdays", headerName: "Working Days", width: 130 },
    { field: "amount", headerName: "Amount", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={() => dispatch(deleteSalary(params.row.id))}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  const user_id = [
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
      label: "ONLINE",
    },
    {
      value: "1",
      label: "OFFLINE",
    },
  ];

  const status = [
    {
      value: "",
      label: "select status",
    },
    {
      value: "0",
      label: "Complete",
    },
    {
      value: "1",
      label: "Reject",
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
            <form onSubmit={formik.handleSubmit} id="subscription-form">
              <TextField
                error={formik.errors.user_id && formik.touched.user_id}
                id="user_id"
                name="user_id"
                fullWidth
                select
                variant="standard"
                label="Select User"
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
                error={
                  formik.errors.transaction_id && formik.touched.transaction_id
                }
                margin="dense"
                id="transaction_id"
                name="transaction_id"
                label="transaction_id"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.transaction_id}
                helperText={
                  formik.errors.transaction_id && formik.touched.transaction_id
                    ? formik.errors.transaction_id
                    : ""
                }
              />

              <TextField
                error={formik.errors.status && formik.touched.status}
                id="status"
                name="status"
                fullWidth
                select
                variant="standard"
                label="Select status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
                helperText={
                  formik.errors.status && formik.touched.status
                    ? formik.errors.status
                    : ""
                }
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                error={
                  formik.errors.transaction_id && formik.touched.transaction_id
                }
                margin="dense"
                id="transaction_id"
                name="transaction_id"
                label="transaction_id"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.transaction_id}
                helperText={
                  formik.errors.transaction_id && formik.touched.transaction_id
                    ? formik.errors.transaction_id
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

      <DataGrid
        rows={salary.salary}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default Salary;
