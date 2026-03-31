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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { object, string, mixed } from "yup";

import { useDispatch, useSelector } from "react-redux";
import {
  addBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} from "../../../redux/slice/blog.slice";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

function Blog() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  const handleClickOpen = () => setOpen(true);

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

  // ✅ Validation
  const schema = object({
    name: string().required("Enter name"),
    description: string().required("Enter description"),
    date: string().required("Select date"),
    blog_img: mixed().required("Select image"),
  });

  // ✅ Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      date: "",
      blog_img: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (update) {
        dispatch(updateBlog(values));
      } else {
        dispatch(addBlog(values));
      }
      handleClose();
    },
  });

  // ✅ Table Columns
  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "blog_img",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <img
          src={"http://localhost:3000/" + params.row.blog_img}
          width="50"
          height="50"
          alt="blog"
        />
      ),
    },
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
            onClick={() => dispatch(deleteBlog(params.row.id))}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Blog</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Blog
        </Button>
      </Box>

      {/* DIALOG FORM */}
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
              name="description"
              label="Description"
              multiline
              rows={4}
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.description}
              error={
                formik.touched.description &&
                formik.errors.description
              }
              helperText={
                formik.touched.description &&
                formik.errors.description
              }
            />

            {/* DATE */}
            <TextField
              fullWidth
              margin="dense"
              name="date"
              type="date"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.date}
              error={formik.touched.date && formik.errors.date}
              helperText={formik.touched.date && formik.errors.date}
            />

            <br />

            {/* IMAGE UPLOAD */}
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload Image
              <VisuallyHiddenInput
                type="file"
                onChange={(e) =>
                  formik.setFieldValue(
                    "blog_img",
                    e.target.files[0]
                  )
                }
              />
            </Button>

            <br />

            {/* IMAGE PREVIEW */}
            <img
              src={
                formik.values.blog_img instanceof File
                  ? URL.createObjectURL(formik.values.blog_img)
                  : typeof formik.values.blog_img === "string"
                  ? "http://localhost:3000/" +
                    formik.values.blog_img
                  : ""
              }
              width="60"
              height="60"
              alt=""
            />

            <br />

            {formik.errors.blog_img && (
              <span style={{ color: "red" }}>
                {formik.errors.blog_img}
              </span>
            )}
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="blog-form">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* TABLE */}
      <DataGrid
        rows={blog.blog}
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

export default Blog;