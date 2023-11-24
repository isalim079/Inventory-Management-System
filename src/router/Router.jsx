import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";

const Router = () => {
    return (
        <div>
            <Navbar />
            <Outlet></Outlet>
        </div>
    );
};

export default Router;
