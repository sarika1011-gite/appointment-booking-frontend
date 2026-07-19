import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#708238",
            color: "#fff",
            borderRadius: "12px",
            padding: "16px",
          },
          success: {
            iconTheme: {
              primary: "#fff",
              secondary: "#708238",
            },
          },
          error: {
            style: {
              background: "#dc2626",
              color: "#fff",
            },
          },
        }}
      />
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
