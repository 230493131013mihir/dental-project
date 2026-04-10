import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik, Form, FieldArray } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { date, object, string, array } from "yup";
import { getMedicine } from "../../../redux/slice/medicine.slice";
import { useLocation } from "react-router-dom";
import { addTreatment } from "../../../redux/slice/appointment.slice";
import { getTreatment } from "../../../redux/slice/treatment.slice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function AppointmentEdit() {
  const { state } = useLocation();
  const { appointment_id } = state;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMedicine());
    dispatch(getTreatment());
  }, []);

  const medicineData = useSelector((state) => state.medicine);
  const treData = useSelector((state) => state.treatment);

  const fTreData = treData.treatment.filter(
    (v) => v.appointment_id == appointment_id
  );

  const userschema = object({
    date: date().required("Date is required"),
    prescription: string().required("Please add prescription"),
    treatement_amount: string().required("Please enter Amount"),
    medicines: array().of(
      object({
        medicine_id: string().required("Select medicine"),
        medicine_amount: string().required("Enter amount"),
        medicine_quantity: string().required("Enter quantity"),
      })
    ),
  });

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "30px auto",
        padding: "25px",
        borderRadius: "16px",
        background: "#ffffff",
        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          fontWeight: "600",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Treatment
      </h2>

      <Formik
        initialValues={{
          date: "",
          prescription: "",
          treatement_amount: "",
          medicines: [
            {
              medicine_id: "",
              medicine_amount: "",
              medicine_quantity: "",
            },
          ],
        }}
        validationSchema={userschema}
        onSubmit={(values, { resetForm }) => {
          const finalData = {
            ...values,
            appointment_id: appointment_id,
            medicines: values.medicines.map((m) => ({
              ...m,
              medicine_id: parseInt(m.medicine_id),
            })),
          };

          console.log("finalData", finalData);
          

          dispatch(addTreatment(finalData));
          resetForm();
          window.location.reload();
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <div
              style={{
                display: "flex",
                gap: "25px",
                flexWrap: "wrap",
              }}
            >
              {/* LEFT */}
              <div style={{ flex: 1, minWidth: "300px" }}>
                <TextField
                  type="date"
                  name="date"
                  variant="standard"
                  style={{
                    width: "100%",
                    marginBottom: "18px",
                    background: "#fafafa",
                    borderRadius: "8px",
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.date}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                />

                <TextField
                  name="prescription"
                  label="Treatment Prescription"
                  multiline
                  rows={6}
                  variant="standard"
                  style={{
                    width: "100%",
                    marginBottom: "18px",
                    background: "#fafafa",
                    borderRadius: "8px",
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.prescription}
                  error={
                    touched.prescription && Boolean(errors.prescription)
                  }
                  helperText={
                    touched.prescription && errors.prescription
                  }
                />
              </div>

              {/* RIGHT */}
              <div style={{ flex: 1, minWidth: "300px" }}>
                <TextField
                  name="treatement_amount"
                  label="Treatment Amount"
                  type="number"
                  variant="standard"
                  style={{
                    width: "100%",
                    marginBottom: "18px",
                    background: "#fafafa",
                    borderRadius: "8px",
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.treatement_amount}
                  error={
                    touched.treatement_amount &&
                    Boolean(errors.treatement_amount)
                  }
                  helperText={
                    touched.treatement_amount &&
                    errors.treatement_amount
                  }
                />

                {/* MEDICINES */}
                <FieldArray name="medicines">
                  {({ push, remove }) => (
                    <>
                      {values.medicines.map((med, index) => (
                        <div
                          key={index}
                          style={{
                            padding: "15px",
                            borderRadius: "12px",
                            background: "#f9fbfd",
                            boxShadow:
                              "0 2px 8px rgba(0,0,0,0.05)",
                            marginTop: "15px",
                            border: "1px solid #eee",
                          }}
                        >
                          <TextField
                            select
                            name={`medicines[${index}].medicine_id`}
                            value={med.medicine_id}
                            onChange={handleChange}
                            variant="standard"
                            style={{
                              width: "100%",
                              marginBottom: "12px",
                            }}
                            SelectProps
                            ={{ native: true }}
                          >
                            <option value="">
                              --Select Medicine--
                            </option>
                            {medicineData.medicine.map((option) => (
                              <option
                                key={option.id}
                                value={option.id}
                              >
                                {option.name}
                              </option>
                            ))}
                          </TextField>

                          <TextField
                            type="number"
                            label="Medicine Amount"
                            name={`medicines[${index}].medicine_amount`}
                            value={med.medicine_amount}
                            onChange={handleChange}
                            variant="standard"
                            style={{
                              width: "100%",
                              marginBottom: "12px",
                            }}
                          />

                          <TextField
                            type="number"
                            label="Medicine Quantity"
                            name={`medicines[${index}].medicine_quantity`}
                            value={med.medicine_quantity}
                            onChange={handleChange}
                            variant="standard"
                            style={{ width: "100%" }}
                          />

                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              marginTop: "10px",
                            }}
                          >
                            <Button
                              type="button"
                              onClick={() =>
                                push({
                                  medicine_id: "",
                                  medicine_amount: "",
                                  medicine_quantity: "",
                                })
                              }
                              style={{
                                minWidth: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                background: "#4CAF50",
                                color: "#fff",
                                fontSize: "18px",
                              }}
                            >
                              +
                            </Button>

                            {values.medicines.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => remove(index)}
                                style={{
                                  minWidth: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  background: "#f44336",
                                  color: "#fff",
                                  fontSize: "18px",
                                }}
                              >
                                -
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
              </div>
            </div>

            <Button
              type="submit"
              style={{
                marginTop: "20px",
                padding: "10px 25px",
                borderRadius: "8px",
                background: "#1976d2",
                color: "#fff",
                fontWeight: "600",
                textTransform: "none",
                boxShadow:
                  "0 4px 12px rgba(25,118,210,0.3)",
              }}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>

      {/* TABLE */}
      <TableContainer
        component={Paper}
        style={{
          marginTop: "30px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        }}
      >
        <Table>
          <TableHead style={{ background: "#f5f7fa" }}>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Prescription</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Medicine</TableCell>
              <TableCell>Med Amount</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {fTreData.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.date}</TableCell>
                <TableCell>{v.prescription}</TableCell>
                <TableCell>{v.treatement_amount}</TableCell>
                <TableCell>
                  {
                    medicineData.medicine?.find(
                      (m) => m.id == v.medicine_id
                    )?.name
                  }
                </TableCell>
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