import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./assets/styles/global.scss";
import { AuthProvider } from "./utils/AuthContext.jsx";
import { ModalProvider } from "./hooks/useModalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ModalProvider>
                    <App />
                </ModalProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
