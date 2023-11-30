import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Root from "./router/Root";

import { ThemeProvider, Typography, createTheme } from "@mui/material";
import "./index.css";
import AuthProvider from "./router/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
const theme = createTheme({
    typography: {
        fontFamily: ["Poppins"].join(","),
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Typography>
                <AuthProvider>
                    <HelmetProvider>
                        <RouterProvider router={Root}></RouterProvider>
                    </HelmetProvider>
                </AuthProvider>
            </Typography>
        </ThemeProvider>
    </React.StrictMode>
);
