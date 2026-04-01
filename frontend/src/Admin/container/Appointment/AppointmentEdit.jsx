import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { date, number, object, string } from "yup";
import { getMedicine } from "../../../redux/slice/medicine.slice";
import { useLocation } from "react-router-dom";
import {
  addTreatment,
  getAppointment,
} from "../../../redux/slice/appointment.slice";
import { getTreatment } from "../../../redux/slice/treatment.slice";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function AppointmentEdit(props) {
  const { state } = useLocation();
  const { appointment_id } = state;

  console.log(appointment_id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMedicine());
    dispatch(getTreatment());
  }, []);

  const medicineData = useSelector((state) => state.medicine);
  const treData = useSelector((state) => state.treatment);

  console.log(medicineData.medicine);

  const fTreData = treData.treatment.filter(
    (v) => v.appointment_id == appointment_id,
  );

  console.log(fTreData);

  //      const handleEdit = (values) => {

  //     console.log(values);
  //    formik.setValues(values);
  //  };

  let userschema = object({
    date: date().required(),
    prescription: string().required("Please add prescription"),
    treatement_amount: string().required("Please enter Amount"),
    medicine_id: string().required("Please select medicine"),
    medicine_amount: string().required("Please enter Amount"),
    medicine_quantity: string().required("Please Select quantity"),
  });

  const formik = useFormik({
    initialValues: {
      date: "",
      prescription: "",
      treatement_amount: "",
      medicine_id: "",
      medicine_amount: "",
      medicine_quantity: "",
    },

    validationSchema: userschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      console.log({
        ...values,
        appointment_id: appointment_id,
        medicine_id: parseInt(values.medicine_id),
      });
      dispatch(
        addTreatment({
          ...values,
          appointment_id: appointment_id,
          medicine_id: parseInt(values.medicine_id),
        }),
      );
      resetForm();
    },
  });

  // const dispatch = useDispatch(values);

  console.log(formik.errors, formik.touched);

  return (
    <div>
      <h2>Treatment</h2>

      <form onSubmit={formik.handleSubmit} id="prescription-form">
        <div className="row">
          <div className="col-6">
            <TextField
              error={formik.errors.date && formik.touched.date}
              name="date"
              type="date"
              id=""
              variant="standard"
              style={{ width: "100%" }}
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
              error={formik.errors.prescription && formik.touched.prescription}
              name="prescription"
              id=""
              label="Treatment Prescription"
              multiline
              rows={8}
              //   defaultValue="Treatment Prescription"
              variant="standard"
              style={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.prescription}
              helperText={
                formik.errors.prescription && formik.touched.prescription
                  ? formik.errors.prescription
                  : ""
              }
            />
          </div>

          <div className="col-6">
            <TextField
              error={
                formik.errors.treatement_amount &&
                formik.touched.treatement_amount
              }
              id="Treatment-Amount"
              label="Treatment-Amount"
              variant="standard"
              name="treatement_amount"
              type="number"
              style={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.treatement_amount}
              helperText={
                formik.errors.treatement_amount &&
                formik.touched.treatement_amount
                  ? formik.errors.treatement_amount
                  : ""
              }
            />

            <TextField
              error={formik.errors.medicine_id && formik.touched.medicine_id}
              id="Medicine"
              select
              name="medicine_id"
              slotProps={{
                select: {
                  native: true,
                },
              }}
              variant="standard"
              style={{ width: "100%", marginTop: '20px' }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.medicine_id}
              helperText={
                formik.errors.medicine_id && formik.touched.medicine_id
                  ? formik.errors.medicine_id
                  : ""
              }
            >
              <option value="">--Select Medicine--</option>
              {medicineData.medicine.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </TextField>
            <TextField
              error={
                formik.errors.medicine_amount && formik.touched.medicine_amount
              }
              id="medicine_amount"
              label="Medicine-medicine_amount"
              variant="standard"
              type="number"
              name="medicine_amount"
              style={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.medicine_amount}
              helperText={
                formik.errors.medicine_amount && formik.touched.medicine_amount
                  ? formik.errors.medicine_amount
                  : ""
              }
            />

            <TextField
              error={
                formik.errors.medicine_quantity &&
                formik.touched.medicine_quantity
              }
              id="medicine_quantity"
              label="Medicine-medicine_quantity"
              variant="standard"
              name="medicine_quantity"
              type="number"
              style={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.medicine_quantity}
              helperText={
                formik.errors.medicine_quantity &&
                formik.touched.medicine_quantity
                  ? formik.errors.medicine_quantity
                  : ""
              }
            />
          </div>

          <div className="col-6"></div>
        </div>
        <Button type="submit" form="prescription-form">
          Submit
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>prescription</TableCell>
              <TableCell>treatement_amount</TableCell>
              <TableCell>medicine_id</TableCell>
              <TableCell>medicine_amount</TableCell>
              <TableCell>medicine_quantity</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {fTreData.map((v) => (
              <TableRow
                key={v.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{v.date}</TableCell>
                <TableCell>{v.prescription}</TableCell>
                <TableCell>{v.treatement_amount}</TableCell>
                <TableCell>{medicineData.medicine?.find(v1 => v1.id == v.medicine_id)?.name }</TableCell>
                <TableCell>{v.medicine_amount}</TableCell>
                <TableCell>{v.medicine_quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AppointmentEdit;
<h2>Edit</h2>;
