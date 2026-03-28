import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React from "react";
import { number, object, string } from "yup";

function AppointmentEdit(props) {
  //      const handleEdit = (values) => {

  //     console.log(values);
  //    formik.setValues(values);
  //  };

  let userschema = object({
    prescription: string().required("Please add prescription"),
    treatamt: number().required("Please enter Amount"),
    medicine: string().required("Please select medicine"),
    Amount: number().required("Please enter Amount"),
    quantity: string().required("Please Select quantity"),
  });

  const formik = useFormik({
    initialValues: {
      prescription: "",
      treatamt: "",
      medicine: "",
      Amount: "",
      quantity: "",
    },

    validationSchema: userschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  // const dispatch = useDispatch(values);

  console.log(formik.errors, formik.touched);
  const medicine = [
    {
      value: "",
      label: "",
    },
    {
      value: "1",
      label: "antibiotics",
    },
    {
      value: "2",
      label: "painkillers   ",
    },
    {
      value: "3",
      label: "Antifungals",
    },
  ];
  const quantity = [
    {
      value: "",
      label: "",
    },
    {
      value: "1",
      label: "5",
    },
    {
      value: "2",
      label: "10   ",
    },
    {
      value: "3",
      label: "15",
    },
  ];

  return (
    <div>
      <h2>Treatment</h2>

      <form onSubmit={formik.handleSubmit} id="prescription-form">
        <div className="row">
          <div className="col-6">
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
              error={formik.errors.treatamt && formik.touched.treatamt}
              id="Amount"
              label="Treatment-Amount"
              variant="standard"
              name="treatamt"
              style={{ width: "100%" }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.treatamt}
                helperText={
                  formik.errors.treatamt && formik.touched.treatamt
                    ? formik.errors.treatamt
                    : ""
                }
            />

            <TextField
             error={formik.errors.medicine && formik.touched.medicine}
              id="Medicine"
              select
              label="Medicine"
              name="medicine"
              slotProps={{
                select: {
                  native: true,
                },
              }}
              variant="standard"
              style={{ width: "100%" }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.medicine}
                helperText={
                  formik.errors.medicine && formik.touched.medicine
                    ? formik.errors.medicine
                    : ""
                }
            >
              {medicine.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              error={formik.errors.Amount && formik.touched.Amount}
              id="Amount"
              label="Medicine-Amount"
              variant="standard"
              name="quantity"
              style={{ width: "100%" }}
              onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Amount}
                helperText={
                  formik.errors.Amount && formik.touched.Amount
                    ? formik.errors.Amount
                    : ""
                }
            />

            <TextField
             error={formik.errors.quantity && formik.touched.quantity}
              id="quantity"
              select
              label="Medicine Qty"
              name="quantity"
              slotProps={{
                select: {
                  native: true,
                },
              }}
              variant="standard"
              style={{ width: "100%" }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.quantity}
                helperText={
                  formik.errors.quantity && formik.touched.quantity
                    ? formik.errors.quantity
                    : ""
                }
            >
              {quantity.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </div>

          <div className="col-6"></div>
        </div>
        <Button type="submit" form="subscription-form">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AppointmentEdit;
<h2>Edit</h2>;
