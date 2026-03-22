import React from "react";
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
import { mixed, number, object, string } from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  
  addServices,
  getServices,
  updateServices,
  deleteServices,
} from "../../../redux/slice/services.slice";
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



function Services(props) {
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
      dispatch(getServices());
    }, []);
  
    const services = useSelector((state) => state.services);
    console.log(services);

    const branch = useSelector((state) => state.branch);
    
      console.log(branch.branch);
  
    const handleEdit = (values) => {
      handleClose();
      console.log(values);
      formik.setValues(values);
      handleClickOpen();
      setUpdate(true);
    };
  const columns = [
  { field: "branch_id", headerName: "Branch", width: 130 },
  { field: "department_id", headerName: "Department", width: 130 },
  { field: "user_id", headerName: "User", width: 130 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "description", headerName: "Description", width: 130 },

  {
    field: "services_img",
    headerName: "services_img",
    width: 130,
    renderCell: (params) => (
      <img
        src={"http://localhost:3000/" + params.row.services_img}
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
        <IconButton aria-label="Edit" onClick={() => handleEdit(params.row)}>
          <ModeEditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => dispatch(deleteServices(params.row.id))}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

  let userschema = object({
    branch_id: string().required("Please enter branch_id"),
    User: string().required("Please enter vendor"),
    department_id: string().required("Please enter department_id"),
    name: string().required("Please Select name"),
    description: string().required("Please Select description"),
    services_img: mixed().required("Please Select image"),


  });
  // console.log(userschema)

  const formik = useFormik({
    initialValues: {
      branch_id: "",
      user: "",
      department_id: "",
      name: "",
      description: "",
      services_img: "",
    },

    validationSchema: userschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);

      if (update) {
        console.log("update data");
        dispatch(updateServices(values));
      } else {
        dispatch(addServices(values));
      }
      handleClose();
      resetForm();
    },
  });
  console.log(formik.errors, formik.touched);

  const branch_id = [
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

  const user = [  
    {
      value: "",
      label: "-- Select user --",
    },
    {
      value: "0",
      label: "user 1",
    },
    {
      value: "1",
      label: "user 2",
    },
    {
      value: "2",
      label: "user 3",
    },
  ];

  const department_id = [
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



  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Services</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add services
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
                select
                label="Branch"
                fullWidth
                variant="standard"
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
                error={formik.errors.user && formik.touched.user}
                id="user"
                name="user"
                select
                label="user"
                fullWidth
                variant="standard"
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
                error={formik.errors.department_id && formik.touched.department_id}
                id="department_id"
                name="department_id"
                select
                label="Department"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.department_id}
                helperText={
                  formik.errors.department_id && formik.touched.department_id
                    ? formik.errors.department_id
                    : ""
                }
              >
                {department_id.map((option) => (
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

              <br />

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload service image
                <VisuallyHiddenInput
                  type="file"
                  name="servimg"
                  // onChange={(event) => console.log(event.target.files)}
                  multiple
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.servimg}
                ></VisuallyHiddenInput>
              </Button>

              <br />
              {formik.errors.servimg && formik.errors.servimg ? (
                <span className="error">please select service image</span>
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
    </div>
  );
}

export default Services;
