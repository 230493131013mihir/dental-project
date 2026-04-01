import React from "react";
import { useEffect } from "react";
import { getMyAppointment } from "../../redux/slice/appointment.slice";
import { useDispatch, useSelector } from "react-redux";

function MyAppointment(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyAppointment());
  }, []);

  const myApt = useSelector((state) => state.appointment);

  console.log(myApt.myAppointment);
  return (
    <div>
      <h2>My Appointment</h2>

      {myApt.myAppointment?.map((v) => (
        <>
          <p>{v.name}</p>
          <p>{v.phone}</p>
        </>
      ))}
    </div>
  );
}

export default MyAppointment;
