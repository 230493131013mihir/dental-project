  import React, { useEffect, useState } from "react";
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

import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  addMedicine,
  deleteMedicine,
  getMedicine,
  updateMedicine,
} from "../../../redux/slice/medicine.slice";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
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

function Medicine(props) {
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
    dispatch(getMedicine());
    dispatch(getBranch());
    dispatch(getDepartment());
    dispatch(getVendor());
  }, []);

  const medicine = useSelector((state) => state.medicine);
  console.log(medicine);

  const branch = useSelector((state) => state.branch);

  console.log(branch.branch);

  const department = useSelector((state) => state.department);

  console.log(department.department);

  const vendor = useSelector((state) => state.vendor);

  console.log(vendor.vendor);

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
    expirydate: date().required("Please Select date"),
    stock: number().required("Please enter stock"),
    medicine_img: mixed().required("Please Select image"),
  });
  // console.log(userschema)

  const formik = useFormik({
    initialValues: {
      branch_id: "",
      vendor_id: "",
      department_id: "",
      name: "",
      description: "",
      price: "",
      stock: "",
      expirydate: "",
      medicine_img: "",
    },

    validationSchema: userschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      console.log(updateMedicine);

      if (update) {
        console.log("update data");
        dispatch(updateMedicine(values));
      } else {
        dispatch(addMedicine(values));
      }
      handleClose();
      resetForm();
    },
  });

  console.log(branch.branch, department.department,  formik.values.branch_id);


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

  const columns = [
    { field: "branch_id", headerName: "branch_id", width: 130 },
    { field: "vendor_id", headerName: "vendor_id", width: 130 },
    { field: "department_id", headerName: "department_id", width: 130 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "description", headerName: "Description ", width: 130 },
    { field: "price", headerName: "Price ", width: 130 },
    { field: "stock", headerName: "Stock ", width: 130 },
    { field: "expirydate", headerName: "Expirydate", width: 130 },
    {
      field: "medicine_img",
      headerName: "medicine_img",
      width: 130,
      renderCell: (params) => (
        <img
          src={"http://localhost:3000/" + params.row.medicine_img}
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
            onClick={() => dispatch(deleteMedicine(params.row.id))}
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
        <h1>Medicine</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Medicine
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
              <TextField
                error={formik.errors.stock && formik.touched.stock}
                margin="dense"
                id="stock"
                name="stock"
                label="Stock"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
                helperText={
                  formik.errors.stock && formik.touched.stock
                    ? formik.errors.stock
                    : ""
                }
              />
              <TextField
                error={formik.errors.expirydate && formik.touched.expirydate}
                margin="dense"
                id="expirydate"
                name="expirydate"
                label=""
                type="date"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.expirydate}
                helperText={
                  formik.errors.expirydate && formik.touched.expirydate
                    ? formik.errors.expirydate
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
                Upload medicine_img image
                <VisuallyHiddenInput
                  type="file"
                  name="medicine_img"
                  // onChange={(event) => console.log(event.target.files)}
                  multiple
                  onChange={(event) =>
                    formik.setFieldValue("medicine_img", event.target.files[0])
                  }
                  onBlur={formik.handleBlur}
                  //  value={formik.values.department_img}
                ></VisuallyHiddenInput>
              </Button>
              <img
                src={
                  formik.values.medicine_img instanceof File
                    ? URL.createObjectURL(formik.values.medicine_img)
                    : typeof formik.values.medicine_img === "string"
                      ? "http://localhost:3000/" + formik.values.medicine_img
                      : ""
                }
                width={"50px"}
                height={"50px"}
              />
              <br />
              {formik.errors.medicine_img && formik.errors.medicine_img ? (
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
        rows={medicine.medicine}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default Medicine;
