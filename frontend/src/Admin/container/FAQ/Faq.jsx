import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { useFormik } from "formik";
import { object, string } from "yup";

import { useDispatch, useSelector } from "react-redux";
import {
  addFAQ,
  getFAQ,
  updateFAQ,
  deleteFAQ,
} from "../../../redux/slice/faq.slice";

function FAQ() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch();
  const faq = useSelector((state) => state.faq);

  useEffect(() => {
    dispatch(getFAQ());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    formik.resetForm();
  };

  const handleEdit = (values) => {
    setUpdate(true);
    setOpen(true);
    formik.setValues(values);
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
    onSubmit: (values) => {
      if (update) {
        dispatch(updateFAQ(values));
      } else {
        dispatch(addFAQ(values));
      }
      handleClose();
    },
  });

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
          <IconButton
            onClick={() => dispatch(deleteFAQ(params.row.id))}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
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
        <h1>FAQ</h1>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Add FAQ
        </Button>
      </Box>

      {/* FORM */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <form onSubmit={formik.handleSubmit} id="faq-form">
            <TextField
              fullWidth
              margin="dense"
              name="question"
              label="Question"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.question}
              error={formik.touched.question && formik.errors.question}
              helperText={
                formik.touched.question && formik.errors.question
              }
            />

            <TextField
              fullWidth
              margin="dense"
              name="answer"
              label="Answer"
              multiline
              rows={4}
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.answer}
              error={formik.touched.answer && formik.errors.answer}
              helperText={
                formik.touched.answer && formik.errors.answer
              }
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

      {/* TABLE */}
      <DataGrid
        rows={faq.faq}
        columns={columns}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default FAQ;