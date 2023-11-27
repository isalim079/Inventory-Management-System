import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";

const Router = () => {
    const location = useLocation();
    const noHeaderFooter =
        location.pathname.includes("/login") ||
        location.pathname.includes("/register");
    const noHeader = location.pathname.includes("/dashboard");

    return (
        <div>
            <div>
                {noHeaderFooter || noHeader || (
                    <div>
                        <Navbar />
                    </div>
                )}
                <Outlet></Outlet>
                {noHeaderFooter || (
                    <div>
                        <Footer />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Router;
