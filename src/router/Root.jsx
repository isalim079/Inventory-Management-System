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
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import AddProductForm from "../pages/Dashboard/AddProduct/AddProductForm";
import Subscription from "../pages/Dashboard/Subscription/Subscription";
import ProductsSection from "../pages/Dashboard/ProductsSection/ProductsSection";
import UpdateProducts from "../pages/Dashboard/ProductsSection/UpdateProducts";

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
                element: <Dashboard></Dashboard>,
                children: [
                    {
                        path: '/dashboard',
                        element: <AddProduct></AddProduct>
                    },
                    {
                        path: '/dashboard/addProduct',
                        element: <AddProductForm></AddProductForm>
                    },
                    {
                        path: '/dashboard/subscription',
                        element: <Subscription></Subscription>
                    },
                    {
                        path: '/dashboard/productsSection',
                        element: <ProductsSection></ProductsSection>
                    },
                    {
                        path: '/dashboard/updateProducts/:id',
                        element: <UpdateProducts></UpdateProducts>,
                        loader: ({params}) => fetch(`http://localhost:2800/addProductsDB/${params.id}`),
                    },
                ]
            },
        ],
    },
]);

export default Root;
