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
import { date, number, object, string } from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addTimeslot,
    deleteTimeslot,
    getTimeslot,
    updateTimeslot,
} from "../../../redux/slice/timeslot.slice";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { getUser } from "../../../redux/slice/user.slice";
// import { addTimeslot, getTimeslot, updateTimeslot } from "../../../../../backend/src/controller/timeslot.controller";

function Timeslot(props) {
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
        dispatch(getTimeslot());
         dispatch(getUser());
    }, []);

    const timeslot = useSelector((state) => state.timeslot);
    console.log(timeslot);

     const user = useSelector((state) => state.user);
         
           console.log(user.user);

    const handleEdit = (values) => {
        handleClose();
        console.log(values);
        formik.setValues(values);
        handleClickOpen();
        setUpdate(true);
    };

    let userschema = object({
        user_id: string().required("Please Select user"),
        date: date().required("Please Select date"),
        startdate: date().required("Please Select startdate"),
        enddate: date().required("Please Select enddate"),
    });
    // console.log(userschema)

    const formik = useFormik({
        initialValues: {
            user_id: "",
            startdate: "",
            enddate: "",
            date: "",
        },

        validationSchema: userschema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);

            if (update) {
                console.log("update data");
                dispatch(updateTimeslot(values));
            } else {
                dispatch(addTimeslot(values));
            }
            handleClose();
            resetForm();
        },
    });

    console.log(formik.errors, formik.touched);

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

    const columns = [
        { field: "user_id", headerName: "User", width: 130 },
        { field: "date", headerName: "Date", width: 130 },
        { field: "startdate", headerName: "Start Date", width: 130 },
        { field: "enddate", headerName: "End Date", width: 130 },

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
                        onClick={() => dispatch(deleteTimeslot(params.row.id))}
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
                                error={formik.errors.user_id && formik.touched.user_id}
                                id="user_id"
                                name="user_id"
                                fullWidth
                                select
                                variant="standard"
                                label="Select user_id"
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
                                error={formik.errors.date && formik.touched.date}
                                margin="dense"
                                id="date"
                                name="date"
                                label="date"
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
                            <TextField
                                error={formik.errors.startdate && formik.touched.startdate}
                                margin="dense"
                                id="startdate"
                                name="startdate"
                                label="startdate"
                                type="date"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.startdate}
                                helperText={
                                    formik.errors.startdate && formik.touched.startdate
                                        ? formik.errors.startdate
                                        : ""
                                }
                            />
                            <TextField
                                error={formik.errors.enddate && formik.touched.enddate}
                                margin="dense"
                                id="enddate"
                                name="enddate"
                                label="enddate"
                                type="date"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.enddate}
                                helperText={
                                    formik.errors.enddate && formik.touched.enddate
                                        ? formik.errors.enddate
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
                rows={timeslot.timeslot}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </div>
    );
}

export default Timeslot;
