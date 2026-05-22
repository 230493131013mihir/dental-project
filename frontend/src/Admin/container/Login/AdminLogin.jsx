import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { staffLogin } from "../../../redux/slice/authenthication.slice";

function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: object({
      email: string().required("Please enter email"),
      password: string().required("Please enter password"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const result = await dispatch(staffLogin(values));

      if (result.payload) {
        navigate("/admin/");
      } else {
        alert("Invalid staff email or password.");
      }

      resetForm();
    },
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f7fb",
        padding: "24px",
      }}
    >
      <Paper
        elevation={4}
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "32px",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h5" fontWeight={700} marginBottom={3}>
          Staff Login
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ marginTop: "20px", padding: "10px" }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default AdminLogin;
