// import React, { useEffect, useState } from "react";
// import { Button, Box, IconButton } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";

// import { useDispatch, useSelector } from "react-redux";

// import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import { getmedical } from "../../../redux/slice/medical.slice";

// function Medical(props) {
//   const [open, setOpen] = React.useState(false);

//   const [update, setUpdate] = useState(false);
//   console.log(update);


//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getmedical());
//   });

//   const medical = useSelector((state) => state.medical);
//   console.log(medical.medical);

//   const handleClickOpen = () => setOpen(true);

//   const handleClose = () => {
//     setOpen(false);
//     setUpdate(false);
//   };

//  const handleEdit = (values) => {
//     console.log(values);
    
//   };

//   const columns = [
//     { field: "appointment_id", headerName: "ID", width: 100 },
//     { field: "name", headerName: "Name", width: 130 },
//     { field: "phone", headerName: "Phone", width: 130 },
//     { field: "date", headerName: "Date", width: 130 },
//     { field: "time", headerName: "Time", width: 130 },
//     { field: "doctor_id", headerName: "Doctor ID", width: 130 },
//     { field: "medicine_id", headerName: 
//       "Medicine ID", width: 130 },
//     {
//       field: "medicine_quantity",
//       headerName: "Qty",
//       width: 130,
//     },
//     {
//       field: "action",
//       headerName: "Action",
//       width: 130,
//       renderCell: (params) => (
//         <>
//           <IconButton onClick={() => handleEdit(params.row)}>
//             <ModeEditIcon />
//           </IconButton>
//         </>
//       ),
//     },
//   ];

//   const paginationModel = { page: 0, pageSize: 5 };

//   return (
//     <div>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <h1>Medical</h1>
//         <Button variant="outlined" onClick={handleClickOpen}>
//           Add Medical
//         </Button>
//       </Box>

//       {/* DataGrid */}
//       <DataGrid
//         rows={medical.medical}
//         columns={columns}
//         initialState={{ pagination: { paginationModel } }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//         sx={{ border: 0 }}
//       />
//     </div>
//   );
// }

// export default Medical;

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Medical(props) {
  const [open, setOpen] = React.useState(false);

  const [update, setUpdate] = useState(false);
  console.log(update);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMedical());
  });

  const medical = useSelector((state) => state.medical);
  console.log(medical.medical);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
  };

 const handleEdit = (values) => {
    console.log(values);
    
  };

  const columns = [
    { field: "appointment_id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "time", headerName: "Time", width: 130 },
    { field: "doctor_id", headerName: "Doctor ID", width: 130 },
    { field: "medicine_id", headerName: 
      "Medicine ID", width: 130 },
    {
      field: "medicine_quantity",
      headerName: "Qty",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <ModeEditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <div>
       {/* Header */}
    <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Medical</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Medical
        </Button>
      </Box>

     
    </div>
  
  );
}

export default Medical;