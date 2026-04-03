import React, { useEffect, useState } from "react";
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
import { mixed, number, object, string } from "yup";
import {
  addInsfrastructure,
  deleteInsfrastructure,
  getInsfrastructure,
  updateInsfrastructure,
} from "../../../redux/slice/insfrastructure.slice";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { getBranch } from "../../../redux/slice/branch.slice";
import { getDepartment } from "../../../redux/slice/department.slice";
import { getVendor } from "../../../redux/slice/vendor.slice";

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

function Insfrastructure(props) {
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
    dispatch(getInsfrastructure());
    dispatch(getBranch());
    dispatch(getDepartment());
    dispatch(getVendor());
  }, []);

  const insfrastructure = useSelector((state) => state.insfrastructure);
  console.log(insfrastructure);

  const branch = useSelector((state) => state.branch);

  console.log(branch.branch);

  const department = useSelector((state) => state.department);

  console.log(department.department);

  const vendor = useSelector((state) => state.vendor);

  console.log(vendor.vendor);
  // const branch = useSelector((state) => state.branch);

  // console.log(branch.branch);
  const handleEdit = (values) => {
    handleClose();
    console.log(values);
    formik.setValues(values);
    handleClickOpen();
    setUpdate(true);
  };

  let userschema = object({
    branch_id: string().required("Please enter branch_id"),
    vendor_id: string().required("Please enter vendor_id"),
    department_id: string().required("Please enter department_id"),
    name: string().required("Please Select name"),
    description: string().required("Please Select description"),
    price: number()
      .required("Enter amount")
      .positive("Amount must be greater than 0"),
    type_id: string().required("Please Select type"),
    insfrastructure_img: mixed().required("Please Select image"),
  });

  const formik = useFormik({
    initialValues: {
      branch_id: "",
      vendor_id: "",
      department_id: "",
      name: "",
      description: "",
      price: "",
      type_id: "",
      insfrastructure_img: "",
    },

    validationSchema: userschema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      if (update) {
        console.log("update data");
        dispatch(updateInsfrastructure(values));
      } else {
        dispatch(addInsfrastructure(values));
      }
      handleClose();
      resetForm();
    },
  });

  console.log(branch.branch, department.department, formik.values.branch_id);

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

  const vendor_id = [
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

  const type_id = [
    {
      value: "",
      label: "-- Select type --",
    },
    {
      value: "Dental",
      label: "Dental",
    },
    {
      value: "Furniture",
      label: "Furniture",
    },
    {
      value: "Electronics",
      label: "Electronics",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];
  const columns = [
    {
      field: "branch_id", headerName: "branch",
      width: 130,
      renderCell: (params) => {
        const d = branch.branch?.find(v => v.id == params.row.branch_id)?.name

        console.log(branch.branch_id, params.row.id, d);

        return d
      }
    },
    {
      field: "vendor_id", headerName: "vendor",
      width: 130,
      renderCell: (params) => {
        const d = vendor.vendor?.find(v => v.id == params.row.vendor_id)?.name

        console.log(vendor.vendor_id, params.row.id, d);

        return d
      }

    },
    {
      field: "department_id", headerName: "department",
      width: 130,
      renderCell: (params) => {
        const d = department.department?.find(v => v.id == params.row.department_id)?.name

        console.log(department.department_id, params.row.id, d);

        return d
      }
    },
    { field: "name", headerName: "Name", width: 130 },
    { field: "type_id", headerName: "type", width: 130 },
    { field: "description", headerName: "Description ", width: 130 },
    { field: "price", headerName: "Price ", width: 130 },
    {
      field: "insfrastructure_img",
      headerName: "insfrastructure_img",
      width: 130,
      renderCell: (params) => (
        <img
          src={"http://localhost:3000/" + params.row.insfrastructure_img}
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
          <IconButton aria-label="Edit" onClick={() => handleEdit(params.row)}>
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
                {branch.branch.map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={
                  formik.errors.department_id && formik.touched.department_id
                }
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
                {department.department?.filter(v1 => v1.branch_id == formik.values.branch_id)?.map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={formik.errors.vendor_id && formik.touched.vendor_id}
                id="vendor_id"
                name="vendor_id"
                select
                label="Vendor"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.vendor_id}
                helperText={
                  formik.errors.vendor_id && formik.touched.vendor_id
                    ? formik.errors.vendor_id
                    : ""
                }
              >
                {vendor.vendor.map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={formik.errors.type_id && formik.touched.type_id}
                id="type_id"
                name="type_id"
                select
                label="type_id"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type_id}
                helperText={
                  formik.errors.type_id && formik.touched.type_id
                    ? formik.errors.type_id
                    : ""
                }
              >
                {type_id.map((option) => (
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
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload insfrastructure image
                <VisuallyHiddenInput
                  type="file"
                  name="insfrastructure_img"
                  // onChange={(event) => console.log(event.target.files)}
                  multiple
                  onChange={(event) =>
                    formik.setFieldValue(
                      "insfrastructure_img",
                      event.target.files[0],
                    )
                  }
                  onBlur={formik.handleBlur}
                //  value={formik.values.department_img}
                ></VisuallyHiddenInput>
              </Button>

              <img
                src={
                  formik.values.insfrastructure_img instanceof File
                    ? URL.createObjectURL(formik.values.insfrastructure_img)
                    : typeof formik.values.insfrastructure_img === "string"
                      ? "http://localhost:3000/" +
                      formik.values.insfrastructure_img
                      : ""
                }
                width={"50px"}
                height={"50px"}
              />
              <br />
              {formik.errors.insfrastructure_img &&
                formik.errors.insfrastructure_img ? (
                <span className="error">
                  please select insfrastructure image
                </span>
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
