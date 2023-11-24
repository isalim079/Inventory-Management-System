import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Root from "./router/Root";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import "./index.css";
const theme = createTheme({
    typography: {
        fontFamily: ["Poppins"].join(","),
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Typography>
                <RouterProvider router={Root}></RouterProvider>
            </Typography>
        </ThemeProvider>
    </React.StrictMode>
);
