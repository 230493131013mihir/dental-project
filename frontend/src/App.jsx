import React from "react";
import { Route, Routes } from "react-router-dom";
import Userroute from "./routes/Userroute";
import AdminRoute from "./routes/AdminRoute";

import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<Userroute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>
    </Provider>
  );
}

export default App;
