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
import { date, mixed, number, object, string } from "yup";
import { addExpence, deleteExpence, getExpence, updateExpence } from "../../../redux/slice/expence.slice";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useState } from "react";
import { getBranch } from "../../../redux/slice/branch.slice";

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
function Expence(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
  };

  const [update, setUpdate] = useState(false)
  console.log(update);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpence());
    dispatch(getBranch());
  }, []);

  const expence = useSelector(state => state.expence);
  console.log(expence);

  const branch = useSelector((state) => state.branch);

  console.log(branch.branch);

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
    expence_img: mixed().required("Please Select image"),

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
      expence_img: "",
    },

    validationSchema: userschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);

      if (update) {
        console.log("update data")
        dispatch(updateExpence(values))
      } else {
        dispatch(addExpence(values));
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
    {
      field: "branch_id", headerName: "Branch", width: 130,
      renderCell: (params) => {
        const d = branch.branch?.find(v => v.id == params.row.branch_id)?.name

        console.log(branch.branch_id, params.row.id, d);

        return d
      }
    },
    { field: "payment_id", headerName: "Payment", width: 130 },
    { field: "paymenttype_id", headerName: "Paymenttype", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "amount", headerName: "Amount ", width: 130 },
    { field: "date", headerName: "Date ", width: 130 },
    {
      field: "expence_img",
      headerName: "expence_img",
      width: 130,
      renderCell: (params) => (
        <img
          src={"http://localhost:3000/" + params.row.expence_img}
          width={"50px"}
          height={"50px"}
        />
      ),
    },
    {
      field: "action",
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
                {branch.branch.map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.name}
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
              <br />

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload expence image
                <VisuallyHiddenInput
                  type="file"
                  name="expence_img"
                  // onChange={(event) => console.log(event.target.files)}
                  multiple
                  onChange={(event) =>
                    formik.setFieldValue("expence_img", event.target.files[0])
                  }
                  onBlur={formik.handleBlur}
                // value={formik.values.expence_img}
                ></VisuallyHiddenInput>
              </Button>
              <img
                src={
                  typeof formik.values.expence_img === "string"
                    ? "http://localhost:3000/" + formik.values.expence_img
                    : URL.createObjectURL(formik.values.expence_img)
                }
                width={"50px"}
                height={"50px"}
              />

              <br />
              {formik.errors.expence_img && formik.errors.expence_img ? (
                <span className="error">please select expence image</span>
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
