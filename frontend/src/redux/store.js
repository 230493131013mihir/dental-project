import { configureStore } from '@reduxjs/toolkit'
import  branchSlice  from './slice/branch.slice'
import  departmentSlice  from './slice/department.slice'
import  expenceSlice  from './slice/expence.slice'
import  insfrastructureSlice  from './slice/insfrastructure.slice'
import  medicineSlice  from './slice/medicine.slice'
import  salarySlice  from './slice/salary.slice'
import vendorSlice  from './slice/vendor.slice'

export const store = configureStore({
  reducer: {
    branch: branchSlice,
    department: departmentSlice,
    expence: expenceSlice,
    insfrastructure: insfrastructureSlice,
    medicine: medicineSlice,
    salary: salarySlice,
    // timeslot: timeslotSlice,
    //  treatment: treatmentSlice,
    // user: userSlice,
    vendor: vendorSlice,
    // services: servicesSlice,

  },
})
