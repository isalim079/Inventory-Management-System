import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../router/AuthProvider";
import { BiCaretRight } from "react-icons/bi";

const Dashboard = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSignOut = () => {
        logOut()
            .then(() => {
                console.log("you have logged out successfully");
                navigate("/")
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
                    <NavLink to="/">Shop Logo</NavLink>
                </li>

                <li>
                    <button onClick={toggleMenus} className="flex items-center">
                        <span>Menus</span>
                        <BiCaretRight className="text-lg" />
                    </button>
                    {menus && (
                        <ul className="ml-4 space-y-2 mt-2">
                            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                            <li><NavLink to="/dashboard/productsSection">Products Section</NavLink></li>
                            <li>Coffee</li>
                        </ul>
                    )}
                </li>

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
