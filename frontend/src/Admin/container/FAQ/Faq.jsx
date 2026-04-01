import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IconButton from "@mui/material/IconButton";
import { useFormik } from "formik";
import { object, string } from "yup";

import { useDispatch, useSelector } from "react-redux";
import { addFAQ, deleteFAQ, getFAQ, updateFAQ } from "../../../redux/slice/FAQ.slice";
// import {
//   addFAQ,
//   getFAQ,
//   updateFAQ,
//   deleteFAQ,
// } from "../../../redux/slice/faq.slice";

function FAQ() {
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
    dispatch(getFAQ());
  }, []);

  const faq = useSelector((state) => state.faq);

  const handleEdit = (values) => {
    handleClose();
    console.log(values);
    formik.setValues(values);
    handleClickOpen();
    setUpdate(true);
  };

  // VALIDATION
  const schema = object({
    question: string().required("Enter question"),
    answer: string().required("Enter answer"),
  });

  const formik = useFormik({
    initialValues: {
      question: "",
      answer: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
         console.log(values);
   
         if (update) {
           console.log("update data");
           dispatch(updateFAQ(values));
         } else {
           dispatch(addFAQ(values));
         }
         handleClose();
         resetForm();
       },
     });

  console.log(formik.errors, formik.touched);
  const columns = [
    { field: "question", headerName: "Question", width: 250 },
    { field: "answer", headerName: "Answer", width: 350 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={() => dispatch(deleteFAQ(params.row.id))}>
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
        <h1>FAQ</h1>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Add FAQ
        </Button>
      </Box>

      {/* FORM */}
      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <form onSubmit={formik.handleSubmit} id="faq-form">
              <TextField
                fullWidth
                margin="dense"
                type="text"
                name="question"
                label="Question"
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.question}
                error={formik.touched.question && formik.errors.question}
                helperText={formik.touched.question && formik.errors.question}
              />

              <TextField
                fullWidth
                margin="dense"
                name="answer"
                type="text"
                label="Answer"
                multiline
                rows={4}
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.answer}
                error={formik.touched.answer && formik.errors.answer}
                helperText={formik.touched.answer && formik.errors.answer}
              />
            </form>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="faq-form">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      {/* TABLE */}
      <DataGrid
        rows={faq.faq}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default FAQ;
