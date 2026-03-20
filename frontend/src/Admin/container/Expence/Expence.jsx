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
import { addExpence, deleteExpence, getExpence } from "../../../redux/slice/expence.slice";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from "@mui/icons-material/ModeEdit";

function Expence(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [update,setUpdate] = useState(false)
    console.log(update);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpence());
  }, []);

  const expence = useSelector(state => state.expence);
    console.log(expence);

    const handleEdit = (values) => {
    handleClose();
    console.log(values);
    formik.setValues(values);
    handleClickOpen();
    setUpdate(true);
  };

  let userschema = object({
    branch_id: string().required("Please enter name"),
    payment_id: number().required("Please enter amount"),
    paymenttype_id: number().required("Please select paymenttype_id"),
    type: string().required("Please Select type"),
    amount: number()
      .required("Enter amount")
      .positive("Amount must be greater than 0"),
    date: date().required("Please Select date"),
  });
  // console.log(userschema)

  const formik = useFormik({
    initialValues: {
      branch_id: "",
      payment_id: "",
      paymenttype_id: "",
      email: "",
      type: "",
      amount: "",
      date: "",
    },

    validationSchema: userschema,

  onSubmit: (values, { resetForm }) => {
        console.log(values);
       
        if (update){
          console.log("update data")
          dispatch(updateExpence(values))
        }else{
        dispatch(updateExpence(values));
        }
       handleClose();
       resetForm();
      },
    });

  console.log(formik.errors, formik.touched);

  const branch_id = [
    {
      value: "",
      label: "--select branch_id--",
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

  const payment_id = [
    {
      value: "",
      label: "select payment_id",
    },
    {
      value: "0",
      label: "payment_id",
    },
    {
      value: "1",
      label: "payment1",
    },
  ];

  const paymenttype_id = [
    {
      value: "",
      label: "select payment_id-type",
    },
    {
      value: "0",
      label: "online-payment_id ",
    },
    {
      value: "1",
      label: "offline-payment_id",
    },
  ];

  const columns = [
    { field: "branch_id", headerName: "Branch", width: 130 },
    { field: "payment_id", headerName: "Payment", width: 130 },
    { field: "paymenttype_id", headerName: "Paymenttype", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "amount", headerName: "Amount ", width: 130 },
    { field: "date", headerName: "Date ", width: 130 },
     { field: "action", 
      headerName: "Action ",
       width: 130,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="Edit"
            onClick={() => handleEdit(params.row)}
          >
            <ModeEditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => dispatch(deleteExpence(params.row.id))}
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
                {branch_id.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                error={formik.errors.payment_id && formik.touched.payment_id}
                id="payment_id"
                name="payment_id"
                fullWidth
                select
                variant="standard"
                label="Select payment_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.payment_id}
                helperText={
                  formik.errors.payment_id && formik.touched.payment_id
                    ? formik.errors.payment_id
                    : ""
                }
              >
                {payment_id.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                error={formik.errors.paymenttype_id && formik.touched.paymenttype_id}
                id="paymenttype_id"
                name="paymenttype_id"
                fullWidth
                select
                variant="standard"
                label="Select paymenttype_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.paymenttype_id}
                helperText={
                  formik.errors.paymenttype_id && formik.touched.paymenttype_id
                    ? formik.errors.paymenttype_id
                    : ""
                }
              >
                {paymenttype_id.map((option) => (
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
