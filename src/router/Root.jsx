import { createBrowserRouter } from "react-router-dom";
import Router from "./Router";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CreateShop from "../pages/CreateShop/CreateShop";
import ErrorPage from "./ErrorPage";
import WatchDemo from "../pages/WatchDemo/WatchDemo";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AmiS from "./AmiS";


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
                element: (
                    <PrivateRoute>
                        <CreateShop></CreateShop>
                    </PrivateRoute>
                ),
            },

            {
                path: "/watch-demo",
                element: <WatchDemo></WatchDemo>,
            },
            {
                path: "/dashboard",
                element: (
                    <PrivateRoute>
                        <Dashboard></Dashboard>
                    </PrivateRoute>
                ),
            },
            {
                path: "/amis",
                element: (
                    <PrivateRoute>
                        <AmiS></AmiS>
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

export default Root;
