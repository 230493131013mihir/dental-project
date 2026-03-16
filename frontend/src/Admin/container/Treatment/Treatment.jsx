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
import { date, number, object, string } from "yup";

function Treatment(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let userschema = object({
        appointmentid: number().required("Please Select id"),
        date4: date().required("Please Select date"),
        amount: number().required("Please Select startdate"),
        prescription: string().required("Please Select prescription"),
        disease: string().required("Please Select disease"),

    });
    // console.log(userschema)

    const formik = useFormik({
        initialValues: {
            appointmentid: "",
            amount: "",
            prescription: "",
            disease: "",
            date4: "",
        },

        validationSchema: userschema,

        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            console.log(values);
        },
    });

    console.log(formik.errors, formik.touched);

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
                <h1>Timeslot</h1>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Timeslot
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
                                label=""
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
                                label=""
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

export default Treatment;
