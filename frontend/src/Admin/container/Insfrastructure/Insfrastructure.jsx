import React, { useEffect } from "react";
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
import { number, object, string } from "yup";
import { addInsfrastructure, deleteInsfrastructure, getInsfrastructure } from "../../../redux/slice/insfrastructure.slice";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from "@mui/icons-material/ModeEdit";

function Insfrastructure(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInsfrastructure());
  }, []);

  const insfrastructure = useSelector(state => state.insfrastructure);
    console.log(insfrastructure);

    const handleEdit = (values) => {
    handleClose();
    console.log(values);
    formik.setValues(values);
    handleClickOpen();
    setUpdate(true);
  };

  let userschema = object({
    branch: string().required("Please enter branch"),
    vendor: string().required("Please enter vendor"),
    department: string().required("Please enter department"),
    name: string().required("Please Select name"),
    description: string().required("Please Select description"),
    price: number()
      .required("Enter amount")
      .positive("Amount must be greater than 0"),
    type: string().required("Please Select type")

  });

  const formik = useFormik({
    initialValues: {
      branch: "",
      vendor: "",
      department: "",
      name: "",
      description: "",
      price: "",
      type: "",
      
    },

    validationSchema: userschema,
onSubmit: (values, { resetForm }) => {
        console.log(values);
       
        if (update){
          console.log("update data")
          dispatch(updateInsfrastructure(values))
        }else{
        dispatch(updateInsfrastructure(values));
        }
       handleClose();
       resetForm();
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

  const vendor = [
    {
      value: "",
      label: "-- Select Vendor --",
    },
    {
      value: "0",
      label: "Vendor 1",
    },
    {
      value: "1",
      label: "Vendor 2",
    },
    {
      value: "2",
      label: "Vendor 3",
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

  const type = [
    {
      value: "",
      label: "-- Select type --",
    },
    {
      value: "0",
      label: "type 1",
    },
    {
      value: "1",
      label: "type 2",
    },
    {
      value: "2",
      label: "type 3",
    },
  ];
const columns = [
    { field: "branch", headerName: "Branch", width: 130 },
    { field: "vendor", headerName: "Vendor", width: 130 },
    { field: "department", headerName: "Department", width: 130 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "description", headerName: "Description ", width: 130 },
    { field: "price", headerName: "Price ", width: 130 },
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
            onClick={() => dispatch(deleteInsfrastructure(params.row.id))}
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
        }}
      >
        <h1>Insfrastructure</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Insfrastructure
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
                error={formik.errors.vendor && formik.touched.vendor}
                id="vendor"
                name="vendor"
                select
                label="Vendor"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.vendor}
                helperText={
                  formik.errors.vendor && formik.touched.vendor
                    ? formik.errors.vendor
                    : ""
                }
              >
                {vendor.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={formik.errors.type && formik.touched.type}
                id="type"
                name="type"
                select
                label="type"
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
              >
                {type.map((option) => (
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
              <TextField
                error={formik.errors.price && formik.touched.price}
                margin="dense"
                id="price"
                name="price"
                label="Price"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                helperText={
                  formik.errors.price && formik.touched.price
                    ? formik.errors.price
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
              rows={insfrastructure.insfrastructure}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
    </div>
  );
}

export default Insfrastructure;
