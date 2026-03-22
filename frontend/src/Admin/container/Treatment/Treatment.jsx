import React, { useState } from "react";
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
import { date, number, object, string,mixed } from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTreatment,
  deleteTreatment,
  getTreatment,
  updateTreatment,
} from "../../../redux/slice/treatment.slice";
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


function Treatment(props) {
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
    dispatch(getTreatment());
  }, []);

  const treatment = useSelector((state) => state.treatment);
  console.log(treatment);

  const handleEdit = (values) => {
    handleClose();
    console.log(values);
    formik.setValues(values);
    handleClickOpen();
    setUpdate(true);
  };





    let userschema = object({
        appointmentid: number().required("Please Select id"),
        date4: date().required("Please Select date"),
        amount: number().required("Please Select startdate"),
        prescription: string().required("Please Select prescription"),
        disease: string().required("Please Select disease"),
        Treatment_img: mixed().required("Please Select image"),

    });
    // console.log(userschema)

    const formik = useFormik({
        initialValues: {
            appointmentid: "",
            amount: "",
            prescription: "",
            disease: "",
            date4: "",
            Treatment_img: "",
        },

        validationSchema: userschema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      if (update) {
        console.log("update data");
        dispatch(updateTreatment(values));
      } else {
        dispatch(addTreatment(values));
      }
      handleClose();
      resetForm();
    },
  });

    console.log(formik.errors, formik.touched);

    const columns = [
  { field: "appointment_id", headerName: "Appointment", width: 130 },
  { field: "disease", headerName: "Disease", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "prescription", headerName: "Prescription", width: 130 },
  { field: "amount", headerName: "Amount", width: 130 },

  {
    field: "treatment_img",
    headerName: "treatment_img",
    width: 130,
    renderCell: (params) => (
      <img
        src={"http://localhost:3000/" + params.row.treatment_img}
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
          onClick={() => dispatch(deleteTreatment(params.row.id))}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };


    const date4 = [
        {
            value: "",
            label: "--select date--",
        },
        {
            value: "0",
            label: "date1",
        },
        {
            value: "1",
            label: "date4",
        },
        {
            value: "2",
            label: "date3",
        },
    ];

    const disease = [
        {
            value: "",
            label: "-- Select disease --",
        },
        {
            value: "0",
            label: "disease 1",
        },
        {
            value: "1",
            label: "disease 2",
        },
        {
            value: "2",
            label: "disease 3",
        },
    ];

    const appointmentid = [
        {
            value: "",
            label: "-- Select appointmentid --",
        },
        {
            value: "0",
            label: "appointmentid 1",
        },
        {
            value: "1",
            label: "appointmentid 2",
        },
        {
            value: "2",
            label: "appointmentid 3",
        },
    ];

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
                <h1>Treatment</h1>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Treatment
                </Button>
            </Box>
            <React.Fragment>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <form onSubmit={formik.handleSubmit} id="subscription-form">
                            <TextField
                                error={formik.errors.appointmentid && formik.touched.appointmentid}
                                id="appointmentid"
                                name="appointmentid"
                                fullWidth
                                select
                                variant="standard"
                                label="appointmentid"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.appointmentid}
                                helperText={
                                    formik.errors.appointmentid && formik.touched.appointmentid
                                        ? formik.errors.appointmentid
                                        : ""
                                }
                            >
                                {appointmentid.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                error={formik.errors.disease && formik.touched.disease}
                                id="disease"
                                name="disease"
                                fullWidth
                                select
                                variant="standard"
                                label="disease"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.disease}
                                helperText={
                                    formik.errors.disease && formik.touched.disease
                                        ? formik.errors.disease
                                        : ""
                                }
                            >
                                {disease.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                error={formik.errors.date && formik.touched.date}
                                id="date"
                                name="date4"
                                fullWidth
                                select
                                variant="standard"
                                label="Select date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.date}
                                helperText={
                                    formik.errors.date && formik.touched.date
                                        ? formik.errors.date
                                        : ""
                                }
                            >
                                {date4.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                error={formik.errors.prescription && formik.touched.prescription}
                                margin="dense"
                                id="prescription"
                                name="prescription"
                                label="prescription"
                                type="text"
                                fullWidth

                                multiline
                                variant="standard"
                                rows={4}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.prescription}
                                helperText={
                                    formik.errors.prescription && formik.touched.prescription
                                        ? formik.errors.prescription
                                        : ""
                                }
                            />
                            <TextField
                                error={formik.errors.amount && formik.touched.amount}
                                margin="dense"
                                id="amount"
                                name="amount"
                                label="amount"
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

                            <br />

<Button
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<CloudUploadIcon />}
>
  Upload Treatment image
  <VisuallyHiddenInput
    type="file"
    name="treatment_img"
    multiple
    onChange={(event) =>
      formik.setFieldValue("treatment_img", event.target.files[0])
    }
    onBlur={formik.handleBlur}
  ></VisuallyHiddenInput>
</Button>

<img
  src={
    typeof formik.values.treatment_img === "string"
      ? "http://localhost:3000/" + formik.values.treatment_img
      : URL.createObjectURL(formik.values.treatment_img)
  }
  width={"50px"}
  height={"50px"}
/>

<br />

{formik.errors.treatment_img && formik.errors.treatment_img ? (
  <span className="error">please select Treatment image</span>
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
  rows={treatment.treatment}
  columns={columns}
  initialState={{ pagination: { paginationModel } }}
  pageSizeOptions={[5, 10]}
  checkboxSelection
  sx={{ border: 0 }}
/>



        </div>
    );
}

export default Treatment;
