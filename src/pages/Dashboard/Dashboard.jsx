import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../router/AuthProvider";
import { BiCaretRight } from "react-icons/bi";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Dashboard = () => {
    const { logOut, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const [shopLogo, setShopLogo] = useState([]);

    useEffect(() => {
        axiosPublic.get("/imsUsersDB").then((res) => {
            const userShopLogo = res.data.find(
                (users) => users?.email === user?.email
            );
            setShopLogo(userShopLogo);
        });
    }, [axiosPublic, user?.email]);

    // console.log(shopLogo.role);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                console.log("you have logged out successfully");
                navigate("/");
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
    };

    const [menus, setMenus] = useState(false);

    const toggleMenus = () => {
        setMenus(!menus);
    };

    const navLinks = (
        <>
            <div className="space-y-5">
                <li>
                    <NavLink to="/">
                        <img
                            className="w-12 h-12 rounded-full"
                            src={shopLogo?.shopLogo}
                            alt=""
                        />
                    </NavLink>
                </li>

                <li>
                    <button onClick={toggleMenus} className="flex items-center">
                        <span>Menus</span>
                        <BiCaretRight className="text-lg" />
                    </button>
                    {menus && (
                        <ul className="ml-4 space-y-5 mt-2">
                            <li>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addProduct">
                                    Add Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/productsSection">
                                    Products Section(Manage)
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/productsSells">
                                    Products Sells
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/checkoutProduct">
                                    Checkout Product
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/subscription">
                                    Subscription
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/salesCount">
                                    Sales Count
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/salesHistory">
                                    Sales History
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </li>

                <li>
                    <NavLink to="/dashboard/check-outCart">Check-out Cart</NavLink>
                </li>
               {
                    shopLogo?.role === "admin" ?  <li>
                    <NavLink to="/dashboard/manageShop">Manage Shop</NavLink>
                </li> : ""
               }
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink onClick={handleSignOut}>Logout</NavLink>
                </li>
            </div>
        </>
    );

    return (
        <div>
            <div className="flex">
                <div className="w-64 h-screen p-10 bg-siteDefault text-white list-none flex justify-center ">
                    {navLinks}
                </div>
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
