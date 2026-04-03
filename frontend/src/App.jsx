import React from "react";
import { Route, Routes } from "react-router-dom";
import Userroute from "./routes/Userroute";
import AdminRoute from "./routes/AdminRoute";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import store, { persister } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <Routes>
          <Route path="/*" element={<Userroute />} />
          <Route path="/admin/*" element={<AdminRoute />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
