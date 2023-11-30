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
import ProductsSells from "../pages/Dashboard/ProductsSells/ProductsSells";
import CheckoutProductSection from "../pages/Dashboard/CheckoutProductSection/CheckoutProductSection";
import CheckoutCart from "../pages/Dashboard/CheckoutProductSection/CheckoutCart";
import SalesCount from "../pages/Dashboard/SalesSummary/SalesCount";
import SalesHistory from "../pages/Dashboard/SalesSummary/SalesHistory";
import ManageShop from "../pages/Dashboard/ManageShop/ManageShop";
import SalesView from "../pages/Dashboard/SalesSummary/SalesView";
import UsersSection from "../pages/Dashboard/SalesSummary/UsersSection";

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
                        path: "/dashboard",
                        element: (
                            <PrivateRoute>
                                <AddProduct></AddProduct>
                            </PrivateRoute>
                        ),
                    },
                    {
                        path: "/dashboard/addProduct",
                        element: (
                            <PrivateRoute>
                                <AddProductForm></AddProductForm>
                            </PrivateRoute>
                        ),
                    },
                    {
                        path: "/dashboard/subscription",
                        element: (
                            <PrivateRoute>
                                <Subscription></Subscription>
                            </PrivateRoute>
                        ),
                    },
                    {
                        path: "/dashboard/productsSection",
                        element: (
                            <PrivateRoute>
                                <ProductsSection></ProductsSection>
                            </PrivateRoute>
                        ),
                    },
                    {
                        path: "/dashboard/productsSells",
                        element: (
                            <PrivateRoute>
                                <ProductsSells></ProductsSells>
                            </PrivateRoute>
                        ),
                    },
                    {
                        path: "/dashboard/checkoutProduct",
                        element: (
                            <PrivateRoute>
                                <CheckoutProductSection></CheckoutProductSection>
                            </PrivateRoute>
                        ),
                    },
                    {
                        path: "/dashboard/check-outCart",
                        element: (
                            <PrivateRoute>
                                <CheckoutCart></CheckoutCart>
                            </PrivateRoute>
                        ),
                    },
                    {
                        path: "/dashboard/salesCount",
                        element: (
                            <PrivateRoute>
                                <SalesCount></SalesCount>
                            </PrivateRoute>
                        ),
                    },
                    {
                        path: "/dashboard/manageShop",
                        element: (
                            <PrivateRoute>
                                <ManageShop></ManageShop>
                            </PrivateRoute>
                        ),
                    },
                    {
                        path: "/dashboard/salesHistory",
                        element: (
                            <PrivateRoute>
                                <SalesHistory></SalesHistory>
                            </PrivateRoute>
                        ),
                    },
                    {
                        path: "/dashboard/salesView",
                        element: (
                            <PrivateRoute>
                                <SalesView></SalesView>
                            </PrivateRoute>
                        ),
                    },
                    {
                        path: "/dashboard/usersSection",
                        element: (
                            <PrivateRoute>
                                <UsersSection></UsersSection>
                            </PrivateRoute>
                        ),
                    },
                    {
                        path: "/dashboard/updateProducts/:id",
                        element: (
                            <PrivateRoute>
                                <UpdateProducts></UpdateProducts>
                            </PrivateRoute>
                        ),
                        loader: ({ params }) =>
                            fetch(
                                `https://assignment-12-server-nu-seven.vercel.app/addProductsDB/${params.id}`
                            ),
                    },
                ],
            },
        ],
    },
]);

export default Root;
