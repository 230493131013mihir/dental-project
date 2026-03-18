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
import { object, string } from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBranch, deleteBranch, getBranch } from "../../../redux/slice/branch.slice";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';

function Branch(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBranch());
  }, []);

  const branch = useSelector((state) => state.branch);
  console.log(branch);

  let userschema = object({
    name: string().required("Please enter name"),
    description: string().required("please enter description"),
    email: string().required("Please Select type"),
    mobile_no: string()
      .required("Please enter mobile_no number")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    address: string().required("Please Select address"),
    city: string().required("Please Select city"),
    state: string().required("Please Select state"),
  });
  // console.log(userschema)

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      mobile_no: "",
      email: "",
      address: "",
      city: "",
      state: "",
    },

    validationSchema: userschema,

    onSubmit: (values,{resetForm}) => {
      console.log(values);
      handleClose()
      resetForm()
      dispatch(addBranch(values));
    },
  });

  // const dispatch = useDispatch(values);

  console.log(formik.errors, formik.touched);

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
    { field: "city", headerName: "City", width: 130 },
    { field: "state", headerName: "State", width: 130 },
     { field: "action",
       headerName: "Action", 
        width: 130,

        renderCell: (params) => (
        <IconButton aria-label="delete" onClick={() => dispatch(deleteBranch(params.row.id))}> 
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
        }}
      >
        <h1>Branch</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Branch
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
                  formik.errors.description && formik.touched.description
                    ? formik.errors.description
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
                error={formik.errors.mobile_no && formik.touched.mobile_no}
                margin="dense"
                id="mobile_no"
                name="mobile_no"
                label="Mobile Number"
                type="phone"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile_no}
                helperText={
                  formik.errors.mobile_no && formik.touched.mobile_no
                    ? formik.errors.mobile_no
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
                error={formik.errors.city && formik.touched.city}
                margin="dense"
                id="city"
                name="city"
                label="City"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                helperText={
                  formik.errors.city && formik.touched.city
                    ? formik.errors.city
                    : ""
                }
              />
              <TextField
                error={formik.errors.state && formik.touched.state}
                margin="dense"
                id="state"
                name="state"
                label="state"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
                helperText={
                  formik.errors.state && formik.touched.state
                    ? formik.errors.state
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
        rows={branch.branch}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default Branch;
