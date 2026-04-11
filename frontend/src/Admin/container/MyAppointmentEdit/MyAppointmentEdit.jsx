// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { date, object, string, array } from "yup";
// import { getMedicine } from "../../../redux/slice/medicine.slice";
// import { useLocation } from "react-router-dom";
// import { addTreatment } from "../../../redux/slice/appointment.slice";
// import { getTreatment } from "../../../redux/slice/treatment.slice";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import Button from "@mui/material/Button";

// pdfMake.vfs = pdfFonts.vfs;

// function MyAppointmentEdit(props) {
//   const location = useLocation();
//   const appointment_id = location?.state?.appointment_id;

//   console.log("appointment_id:", appointment_id);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getMedicine());
//     dispatch(getTreatment());
//   }, []);

//   const medicineData = useSelector((state) => state.medicine);
//   const treData = useSelector((state) => state.treatment);

//   console.log("treData.treatment", treData.treatment, medicineData);

//   const fTreData = Array.isArray(treData.treatment)
//     ? treData.treatment.filter((v) => v.appointment_id == appointment_id)
//     : [];

//   console.log("fTreData", fTreData);

//   const groupedData = Object.values(
//     fTreData.reduce((acc, item) => {
//       const { medicine_id, medicine_amount, medicine_quantity, ...rest } = item;

//       if (!acc[item.id]) {
//         acc[item.id] = {
//           ...rest,
//           medicines: [],
//         };
//       }

//       acc[item.id].medicines.push({
//         medicine_id,
//         medicine_amount: Number(medicine_amount || 0),
//         medicine_quantity,
//       });

//       return acc;
//     }, {}),
//   ).map((group) => {
//     const total_medicine_amount = group.medicines.reduce(
//       (sum, m) => sum + Number(m.medicine_amount || 0),
//       0,
//     );
//     const generatePDF = () => {
//       const tableBody = [];

//       // Header
//       tableBody.push([
//         "Date",
//         "Prescription",
//         "Amount",
//         "Medicine",
//         "Qty",
//         "Med Amount",
//         "Total",
//       ]);

//       // Data
//       groupedData.forEach((v) => {
//         v.medicines.forEach((m, index) => {
//           tableBody.push([
//             index === 0 ? v.date : "",
//             index === 0 ? v.prescription : "",
//             index === 0 ? v.treatement_amount : "",
//             medicineData.medicine?.find((med) => med.id == m.medicine_id)
//               ?.name || "",
//             m.medicine_quantity,
//             m.medicine_amount,
//             index === 0
//               ? Number(v.treatement_amount) + v.total_medicine_amount
//               : "",
//           ]);
//         });
//       });

//       // Grand Total
//       const grandTotal = groupedData.reduce(
//         (sum, v) =>
//           sum + Number(v.treatement_amount || 0) + v.total_medicine_amount,
//         0,
//       );

//       tableBody.push([
//         { text: "Grand Total", colSpan: 6, alignment: "right", bold: true },
//         {},
//         {},
//         {},
//         {},
//         {},
//         { text: grandTotal.toFixed(2), bold: true },
//       ]);

//       const docDefinition = {
//         content: [
//           { text: "Medical Report", style: "header" },
//           {
//             table: {
//               headerRows: 1,
//               widths: ["*", "*", "*", "*", "*", "*", "*"],
//               body: tableBody,
//             },
//           },
//         ],
//         styles: {
//           header: {
//             fontSize: 18,
//             bold: true,
//             margin: [0, 0, 0, 10],
//           },
//         },
//       };

//       pdfMake.createPdf(docDefinition).open();
//     };

//     return {
//       ...group,
//       total_medicine_amount,
//     };
//   });

//   const grandTotal = groupedData.reduce(
//     (sum, v) =>
//       sum + Number(v.treatement_amount || 0) + v.total_medicine_amount,
//     0,
//   );

//   return (
//     <div className="container" style={{ marginTop: "120px" }}>
//       <TableContainer
//         component={Paper}
//         style={{
//           marginTop: "30px",
//           borderRadius: "12px",
//           overflow: "hidden",
//           boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
//         }}
//       >
//         <Button
//           variant="contained"
//           style={{ marginBottom: "20px" }}
//           onClick={generatePDF}
//         >
//           Download PDF
//         </Button>
//         <Table>
//           <TableHead style={{ background: "#f5f7fa" }}>
//             <TableRow>
//               <TableCell>Date</TableCell>
//               <TableCell>Prescription</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Medicine</TableCell>
//               <TableCell>Quantity</TableCell>
//               <TableCell>Med Amount</TableCell>
//               <TableCell>Total</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {groupedData.map((v) => (
//               <>
//                 {v.medicines.map((m, index) => (
//                   <TableRow key={`${v.id}-${index}`}>
//                     {index === 0 && (
//                       <>
//                         <TableCell rowSpan={v.medicines.length}>
//                           {v.date}
//                         </TableCell>

//                         <TableCell rowSpan={v.medicines.length}>
//                           {v.prescription}
//                         </TableCell>

//                         <TableCell rowSpan={v.medicines.length}>
//                           {v.treatement_amount}
//                         </TableCell>
//                       </>
//                     )}

//                     <TableCell>
//                       {
//                         medicineData.medicine?.find(
//                           (med) => med.id == m.medicine_id,
//                         )?.name
//                       }
//                     </TableCell>
//                     <TableCell>{m.medicine_quantity}</TableCell>

//                     <TableCell>{m.medicine_amount}</TableCell>
//                     {/* ✅ NEW TOTAL COLUMN */}
//                     {index === 0 && (
//                       <TableCell rowSpan={v.medicines.length}>
//                         {Number(v.treatement_amount) + v.total_medicine_amount}
//                       </TableCell>
//                     )}
//                   </TableRow>
//                 ))}
//               </>
//             ))}
//             <TableRow>
//               <TableCell
//                 colSpan={6}
//                 style={{ fontWeight: "bold", textAlign: "right" }}
//               >
//                 Grand Total
//               </TableCell>
//               <TableCell style={{ fontWeight: "bold" }}>{grandTotal}</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

// export default MyAppointmentEdit;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMedicine } from "../../../redux/slice/medicine.slice";
import { useLocation } from "react-router-dom";
import { getTreatment } from "../../../redux/slice/treatment.slice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

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
  }, []);

  const medicineData = useSelector((state) => state.medicine);
  const treData = useSelector((state) => state.treatment);

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

  // ✅ PDF FUNCTION (CORRECT POSITION)
  const generatePDF = () => {
    const tableBody = [];

    // Header
    tableBody.push([
      "Date",
      "Prescription",
      "Amount",
      "Medicine",
      "Qty",
      "Med Amount",
      "Total",
    ]);

    // Data
    groupedData.forEach((v) => {
      v.medicines.forEach((m, index) => {
        tableBody.push([
          index === 0 ? v.date : "",
          index === 0 ? v.prescription : "",
          index === 0 ? v.treatement_amount : "",
          medicineData.medicine?.find(
            (med) => med.id == m.medicine_id
          )?.name || "",
          m.medicine_quantity,
          m.medicine_amount,
          index === 0
            ? Number(v.treatement_amount) + v.total_medicine_amount
            : "",
        ]);
      });
    });

    // Grand Total Row
    tableBody.push([
      { text: "Grand Total", colSpan: 6, alignment: "right", bold: true },
      {}, {}, {}, {}, {},
      { text: grandTotal.toFixed(2), bold: true },
    ]);

    const docDefinition = {
      content: [
        { text: "Medical Report", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*", "*"],
            body: tableBody,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download("Medical_Report.pdf");
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
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

        <Table>
          <TableHead style={{ background: "#f5f7fa" }}>
            <TableRow>
              <TableCell>Date</TableCell>
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
                          {v.date}
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