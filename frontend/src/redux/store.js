import { configureStore } from '@reduxjs/toolkit'
import  branchSlice  from './slice/branch.slice'
import  departmentSlice  from './slice/department.slice'
import  expenceSlice  from './slice/expence.slice'
import  insfrastructureSlice  from './slice/insfrastructure.slice'
import  medicineSlice  from './slice/medicine.slice'
import  salarySlice  from './slice/salary.slice'
import vendorSlice  from './slice/vendor.slice'
import  userSlice  from './slice/user.slice'
import treatmentSlice  from './slice/treatment.slice'
import servicesSlice  from './slice/services.slice'
import  timeslotSlice  from './slice/timeslot.slice'
import  authenthicationSlice  from './slice/authenthication.slice'
import  appointmentSlice  from './slice/appointment.slice'

export const store = configureStore({
  reducer: {
    branch: branchSlice,
    department: departmentSlice,
    expence: expenceSlice,
    insfrastructure: insfrastructureSlice,
    medicine: medicineSlice,
    salary: salarySlice,
    timeslot: timeslotSlice,
     treatment: treatmentSlice,
    user: userSlice,
    vendor: vendorSlice,
    services: servicesSlice,
    authenthication: authenthicationSlice,
    appointment: appointmentSlice
  },
})
