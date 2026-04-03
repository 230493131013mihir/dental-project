import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import { addPatients, deletePatient, getPatients, updatePatient } from "../../../redux/slice/patient.slice";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IconButton from "@mui/material/IconButton";
import { object, string } from "yup";
import { useFormik } from "formik";

function Patientdata(props) {

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
        dispatch(getPatients());
        
      }, []);
    
  
     const patientdata = useSelector((state) => state.patient);


     console.log(patientdata.patient);
     
  
    const handleEdit = (values) => {
      handleClose();
      console.log(values);
      formik.setValues(values);
      setUpdate(true);
      handleClickOpen();
    };

    const schema = object({
        name: string().required("Enter name"),
        email: string().required("Enter email"),
        password: string().required("ADD password"),
        // phone: mixed().required("ADD phone NO"),
         phone: string()
              .required("Please enter mobile number")
              .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
      });
    
      //  Formik
      const formik = useFormik({
        initialValues: {
          name: "",
          email: "",
          password: "",
          phone: "",
        },
        validationSchema: schema,
    
    
       onSubmit: (values, { resetForm }) => {
            console.log(values);
      
            if (update) {
              console.log("update data");
              dispatch(updatePatient(values));
            } else {
              dispatch(addPatients(values));
            }
            handleClose();
            resetForm();
          },
        });
      
        console.log(formik.errors, formik.touched);

    const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "password", headerName: "Password", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton
            onClick={() => dispatch(deletePatient(params.row.id))}
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
        <h1>Patient</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Patient
        </Button>
      </Box>  

       {/* DIALOG FORM */}
      <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <form onSubmit={formik.handleSubmit} id="blog-form">
            {/* NAME */}
            <TextField
            
              fullWidth
              margin="dense"
              name="name"
              label="Name"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
            />

            {/* DESCRIPTION */}
            <TextField
              fullWidth
              margin="dense"
              name="email"
              label="email"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={
                formik.touched.email &&
                formik.errors.email
              }
              helperText={
                formik.touched.email &&
                formik.errors.email
              }
            />

            {/* DATE */}
            <TextField
              fullWidth
              margin="dense"
              name="password"
              type="password"
               label="password"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />

             <TextField
              fullWidth
              margin="dense"
              name="phone"
              type="phone"
              label="phone"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.phone}
              error={formik.touched.phone && formik.errors.phone}
              helperText={formik.touched.phone && formik.errors.phone}
            />

          
            
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="blog-form">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
  </React.Fragment>     

        <DataGrid
            rows={patientdata.patient}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                  />
      
        </div>
    );
}

export default Patientdata;