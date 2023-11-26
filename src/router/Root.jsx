import { createBrowserRouter } from "react-router-dom";
import Router from "./Router";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CreateShop from "../pages/CreateShop/CreateShop";
import ErrorPage from "./ErrorPage";
import WatchDemo from "../pages/WatchDemo/WatchDemo";
import Dashboard from "../pages/Dashboard/Dashboard";

const Root = createBrowserRouter([
    {
        path: "/",
        element: <Router></Router>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/create-shop",
                element: <CreateShop></CreateShop>,
            },

            {
                path: "/watch-demo",
                element: <WatchDemo></WatchDemo>
            },
            {
                path: "/dashboard",
                element: <Dashboard></Dashboard>
            },
            
        ],
    },
]);

export default Root;
