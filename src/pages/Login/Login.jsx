import { TextField } from "@mui/material";
import loginImage from "/loginIllustration.png";
import "./Login.css";
import SocialLogin from "../../shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../router/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
    const { loginWithEmailPass } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const location = useLocation();

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");

        loginWithEmailPass(email, password)
            .then((result) => {
                console.log(result.user.email);

                axiosPublic.get("/imsUsersDB").then((res) => {
                    // console.log(res.data);
                    const existingEmail = res.data.find(
                        (users) => users?.email === result?.user?.email
                    );
                    if (existingEmail?.shopId) {
                        navigate(
                            location?.state ? location.state : "/dashboard"
                        );
                    } else {
                        navigate(
                            location?.state ? location.state : "/create-shop"
                        );
                    }
                });
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);

                if (error.code === "auth/invalid-login-credentials") {
                    toast.error("Email and password doesn't match", {
                        position: "top-center",
                    });
                }
            });
    };

    return (
        <div>
            <div className="flex justify-center items-center h-[620px]">
                <div className="flex items-center justify-around w-full">
                    <div className="">
                        <img src={loginImage} alt="" />
                    </div>
                    <form onSubmit={handleLogin}>
                        <h1 className="text-center mb-5 text-3xl font-semibold text-siteDefault">
                            IMS Login
                        </h1>
                        <div className="flex flex-col space-y-5 w-[420px]">
                            <TextField
                                id="outlined-basic"
                                label="Your Email"
                                name="email"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: "#B93B5E" },
                                }}
                            />

                            <TextField
                                id="outlined-basic"
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: "#B93B5E" },
                                }}
                            />
                            <div className="form-control md:mt-6">
                                <button className="px-4 py-3 text-lg w-full bg-siteDefault text-white rounded-md">
                                    LOGIN
                                </button>
                            </div>
                        </div>
                        <p className="text-center mt-2 text-sm ">
                            New in IMS?{" "}
                            <Link
                                className="ml-5 underline text-base text-siteDefault"
                                to="/register"
                            >
                                Register Now!!
                            </Link>
                        </p>
                        <SocialLogin></SocialLogin>
                    </form>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;
