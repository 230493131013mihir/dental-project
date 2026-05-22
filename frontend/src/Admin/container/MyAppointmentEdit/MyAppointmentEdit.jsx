

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMedicine } from "../../../redux/slice/medicine.slice";
import { useLocation } from "react-router-dom";
import { getTreatment } from "../../../redux/slice/treatment.slice";
import { getMyAppointment } from "../../../redux/slice/appointment.slice";
import { getTimeslot } from "../../../redux/slice/timeslot.slice";
import { getUser } from "../../../redux/slice/user.slice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import BadgeIcon from "@mui/icons-material/Badge";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;

function MyAppointmentEdit(props) {
  const location = useLocation();
  const appointment_id = location?.state?.appointment_id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMedicine());
    dispatch(getTreatment());
    dispatch(getMyAppointment());
    dispatch(getTimeslot());
    dispatch(getUser());
  }, []);

  const medicineData = useSelector((state) => state.medicine);
  const treData = useSelector((state) => state.treatment);
  const appointmentData = useSelector((state) => state.appointment);
  const timeslotData = useSelector((state) => state.timeslot);
  const userData = useSelector((state) => state.user);

  const fTreData = Array.isArray(treData.treatment)
    ? treData.treatment.filter((v) => v.appointment_id == appointment_id)
    : [];

  // ✅ GROUP DATA
  const groupedData = Object.values(
    fTreData.reduce((acc, item) => {
      const { medicine_id, medicine_amount, medicine_quantity, ...rest } = item;

      if (!acc[item.id]) {
        acc[item.id] = {
          ...rest,
          medicines: [],
        };
      }

      acc[item.id].medicines.push({
        medicine_id,
        medicine_amount: Number(medicine_amount || 0),
        medicine_quantity,
      });

      return acc;
    }, {})
  ).map((group) => {
    const total_medicine_amount = group.medicines.reduce(
      (sum, m) => sum + Number(m.medicine_amount || 0),
      0
    );

    return {
      ...group,
      total_medicine_amount,
    };
  });

  // ✅ GRAND TOTAL
  const grandTotal = groupedData.reduce(
    (sum, v) =>
      sum + Number(v.treatement_amount || 0) + v.total_medicine_amount,
    0
  );

  const appointmentDetails = appointmentData.myAppointment?.find(
    (appointment) => appointment.id == appointment_id
  );

  const appointmentSlot = timeslotData.timeslot?.find(
    (slot) => slot.id == appointmentDetails?.time
  );
  const assignedDoctor = userData.user?.find(
    (user) => user.id == appointmentDetails?.doctor_id
  );
  const doctorName = assignedDoctor?.name || "Assigned Doctor";

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  };

  const formatDateTime = (date) => {
    const appointmentTime = appointmentSlot
      ? `${appointmentSlot.starttime}-${appointmentSlot.endtime}`
      : "";

    return [formatDate(date), appointmentTime].filter(Boolean).join(" ");
  };

  // ✅ PDF FUNCTION (CORRECT POSITION)
  const generatePDF = () => {
    const tableBody = [];

    // Header
    // tableBody.push([
    //   "Date",
    //   "Prescription",
    //   "Amount",
    //   "Medicine",
    //   "Qty",
    //   "Med Amount",
    //   "Total",
    // ]);

//     tableBody.push([
//   { text: "Date", bold: true },
//   { text: "Prescription", bold: true },
//   { text: "Amount", bold: true },
//   { text: "Medicine", bold: true },
//   { text: "Qty", bold: true },
//   { text: "Med Amount", bold: true },
//   { text: "Total", bold: true },
// ]);

tableBody.push([
  { text: "Date & Time", style: "tableHeader" },
  { text: "Prescription", style: "tableHeader" },
  { text: "Amount", style: "tableHeader" },
  { text: "Medicine", style: "tableHeader" },
  { text: "Qty", style: "tableHeader" },
  { text: "Med Amount", style: "tableHeader" },
  { text: "Total", style: "tableHeader" },
]);

    // Data
    // groupedData.forEach((v) => {
    //   v.medicines.forEach((m, index) => {
    //     tableBody.push([
    //       index === 0 ? v.date : "",
    //       index === 0 ? v.prescription : "",
    //       index === 0 ? v.treatement_amount : "",
    //       medicineData.medicine?.find(
    //         (med) => med.id == m.medicine_id
    //       )?.name || "",
    //       m.medicine_quantity,
    //       m.medicine_amount,
    //       index === 0
    //         ? Number(v.treatement_amount) + v.total_medicine_amount
    //         : "",
    //     ]);
    //   });
    // });


    groupedData.forEach((v) => {
  v.medicines.forEach((m) => {
    tableBody.push([
      formatDateTime(v.date),
      v.prescription,
      v.treatement_amount,
      medicineData.medicine?.find(
        (med) => med.id == m.medicine_id
      )?.name || "",
      m.medicine_quantity,
      m.medicine_amount,
      Number(v.treatement_amount) + v.total_medicine_amount,
    ]);
  });
});

    // Grand Total Row
    tableBody.push([
      { text: "Grand Total", colSpan: 6, alignment: "right", bold: true },
      {}, {}, {}, {}, {},
      { text: grandTotal.toFixed(2), bold: true },
    ]);

    // const docDefinition = {
    //   pageOrientation: "landscape",
    //   content: [
    //     { text: "Medical Report", style: "header" },
    //     {
    //       table: {
    //         headerRows: 1,
    //         // widths: ["*", "*", "*", "*", "*", "*", "*"],
    //         // widths: [80, 120, 60, 100, 40, 70, 70],
    //         widths: ["auto", "*", "auto", "*", "auto", "auto", "auto"],
            
    //         body: tableBody,
    //       },
    //       layout: 'grid',
    //     },
    //   ],
    //   styles: {
    //     header: {
    //       fontSize: 18,
    //       bold: true,
    //       margin: [0, 0, 0, 10],
    //     },
    //   },
    // };
 

    const docDefinition = {
  pageOrientation: "landscape",

  content: [
    {
      text: "MEDICAL PRESCRIPTION",
      style: "title",
    },

    {
      text: `Clinic Name - ${doctorName}`,
      style: "subTitle",
      margin: [0, 0, 0, 10],
    },

    {
      table: {
        headerRows: 1,
        widths: ["auto", "*", "auto", "*", "auto", "auto", "auto"],
        body: tableBody,
      },
      layout: {
        fillColor: function (rowIndex) {
          return rowIndex === 0 ? "#2c3e50" : null; // dark header
        },
        hLineColor: () => "#ccc",
        vLineColor: () => "#ccc",
      },
      
    },
  ],

  styles: {
    title: {
      fontSize: 20,
      bold: true,
      alignment: "center",
      margin: [0, 0, 0, 5],
    },

    subTitle: {
      fontSize: 10,
      alignment: "center",
      color: "gray",
    },

    tableHeader: {
      bold: true,
      fontSize: 11,
      color: "white",
      alignment: "center",
    },

    tableCell: {
      fontSize: 10,
      margin: [0, 5, 0, 5],
    },
  },

  defaultStyle: {
    fontSize: 10,
  },
};
    pdfMake.createPdf(docDefinition).download("Medical_Report.pdf");
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "20px",
          color: "#0f172a",
          fontWeight: "700",
          fontSize: "18px",
        }}
      >
        <BadgeIcon sx={{ color: "#0ea5e9" }} />
        {doctorName}
      </div>

      <TableContainer
        component={Paper}
        style={{
          marginTop: "30px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        }}
      >
        {/* ✅ BUTTON */}
        <Button
          variant="contained"
          style={{ marginBottom: "20px" }}
          onClick={generatePDF}
        >
          Download PDF
        </Button>

        <Table >
          <TableHead style={{ background: "#f5f7fa" }}>
            <TableRow>
              <TableCell>Date & Time</TableCell>
              <TableCell>Prescription</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Medicine</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Med Amount</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {groupedData.map((v) => (
              <React.Fragment key={v.id}>
                {v.medicines.map((m, index) => (
                  <TableRow key={`${v.id}-${index}`}>
                    {index === 0 && (
                      <>
                        <TableCell rowSpan={v.medicines.length}>
                          {formatDateTime(v.date)}
                        </TableCell>

                        <TableCell rowSpan={v.medicines.length}>
                          {v.prescription}
                        </TableCell>

                        <TableCell rowSpan={v.medicines.length}>
                          {v.treatement_amount}
                        </TableCell>
                      </>
                    )}

                    <TableCell>
                      {
                        medicineData.medicine?.find(
                          (med) => med.id == m.medicine_id
                        )?.name
                      }
                    </TableCell>

                    <TableCell>{m.medicine_quantity}</TableCell>
                    <TableCell>{m.medicine_amount}</TableCell>

                    {index === 0 && (
                      <TableCell rowSpan={v.medicines.length}>
                        {(
                          Number(v.treatement_amount) +
                          v.total_medicine_amount
                        ).toFixed(2)}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}

            {/* ✅ GRAND TOTAL ROW */}
            <TableRow>
              <TableCell
                colSpan={6}
                style={{ fontWeight: "bold", textAlign: "right" }}
              >
                Grand Total
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                {grandTotal.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MyAppointmentEdit; 

