import React from "react";
import { Route, Routes } from "react-router-dom";
import Userroute from "./routes/Userroute";
import AdminRoute from "./routes/AdminRoute";
import AdminPrivateRoute from "./routes/AdminPrivateRoute";
import AdminLogin from "./Admin/container/Login/AdminLogin";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import store, { persister } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/*" element={<Userroute />} />
          <Route
            path="/admin/*"
            element={
              <AdminPrivateRoute>
                <AdminRoute />
              </AdminPrivateRoute>
            }
          />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
