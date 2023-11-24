import { createBrowserRouter } from "react-router-dom";
import Router from "./Router";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";



const Root = createBrowserRouter([
    {
        path: '/',
        element: <Router></Router>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    }
])

export default Root;