import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import BikeProvider from "./context/BikeContext.tsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BikeProvider>
          <App />
        </BikeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
