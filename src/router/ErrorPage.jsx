import { Link } from "react-router-dom";
import image from "./404Error.gif";

const ErrorPage = () => {
    return (
        <div className="border border-black">
            <div className="flex flex-col justify-center items-center h-screen p-16 md:p-0 border border-black ">
                <img style={{ width: "300px" }} src={image} alt="" />
                <div className="mt-10">
                    <Link to="/">
                        <button className="md:px-3 md:py-2 px-2 py-1 bg-[#B93B5E] text-white md:text-base">
                            Go Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
