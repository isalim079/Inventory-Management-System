import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    const navLinks = (
        <>
            <div className="space-y-5">
                <li>
                    <NavLink to="/">Shop Logo</NavLink>
                </li>
                <li>
                    <NavLink to="/">Menus</NavLink>
                </li>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/">Logout</NavLink>
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
