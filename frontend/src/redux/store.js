import { configureStore } from '@reduxjs/toolkit'
import  branchSlice  from './slice/branch.slice'
import  departmentSlice  from './slice/department.slice'

export const store = configureStore({
  reducer: {
    branch: branchSlice,
    department: departmentSlice,
  },
})
