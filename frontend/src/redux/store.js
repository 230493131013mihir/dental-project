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
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import patientSlice  from './slice/patient.slice'
import  medicalSlice  from './slice/medical.slice'

// import patientdataSlice  from './slice/patientdata.slice'
import dashboardSlice from './slice/dashboard.slice';

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
    testimonial: testimonialSlice,
    patient: patientSlice,
    medical: medicalSlice,
    dashboard:dashboardSlice,
    
})


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authenthication']
}

const persistedReducer = persistReducer(persistConfig,reducers);

const store = configureStore(
  {
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),

  }
)


export let persister = persistStore(store)

export default store;


