import { combineReducers, configureStore } from '@reduxjs/toolkit'
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
import  blogSlice  from './slice/blog.slice'
import  faqSlice  from './slice/FAQ.slice'
import testimonialSlice from './slice/testimonial.slice'

export const store = configureStore({
  reducer: {

  },
})


const reducers = combineReducers({
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
    appointment: appointmentSlice,
    blog: blogSlice,
    faq: faqSlice,
    testimonial: testimonialSlice
})


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

const persistReducer = persistReducer(persistConfig,reducers);

const store = configureStore(
  {
    reducer: persistReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

  }
)


export let persister = persisterStore(store)

export default store;


