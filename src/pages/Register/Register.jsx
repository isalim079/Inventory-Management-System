/* eslint-disable no-useless-escape */
import { TextField } from "@mui/material";
import registerImage from "/registerIllustration.png";
import "./Register.css";
import SocialLogin from "../../shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../router/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet-async";

const Register = () => {
    const { registerWithEmailPass } = useContext(AuthContext);

    const location = useLocation();

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const name = form.get("name");
        const image = form.get("image");
        const email = form.get("email");
        const password = form.get("password");
        // console.log(image, name, email, password);

        const imsUsers = { image, name, email, password };

        const uppercaseRegex = /[A-Z]/;
        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

        if (!specialCharRegex.test(password)) {
            toast.error("Password should have one special character included", {
                position: "top-center",
            });
            return;
        }

        if (!uppercaseRegex.test(password)) {
            toast.error("Password should have one capital character included", {
                position: "top-center",
            });
            return;
        }

        if (password.length < 0) {
            toast.error("Password should be 6 character or more", {
                position: "top-center",
            });
            return;
        }

        fetch("https://assignment-12-server-nu-seven.vercel.app/imsUsersDB", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                const existingEmail = data.find(
                    (user) => user?.email === email
                );

                if (existingEmail) {
                    toast.error("An account with this email already exist");
                    return;
                }

                registerWithEmailPass(email, password)
                    .then((result) => {
                        console.log(result.user);

                        toast.success(
                            "You have successfully created your account"
                        );

                        updateProfile(result.user, {
                            displayName: name,
                            photoURL: image,
                        });
                    })
                    .catch((error) => {
                        console.log(error.code);
                        console.log(error.message);
                    });

                fetch("https://assignment-12-server-nu-seven.vercel.app/imsUsersDB", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(imsUsers),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.insertedId) {
                            toast.success(
                                "Successfully added user to database"
                            );
                        }

                        navigate(
                            location?.state ? location.state : "/create-shop"
                        );

                        // form.reset();
                    });
            });
    };

    return (
        <div>
            <Helmet><title>IMS || Register</title></Helmet>
            <div className="flex justify-center items-center h-[620px]">
                <div className="flex items-center justify-around w-full">
                    <div className="">
                        <img src={registerImage} alt="" />
                    </div>
                    <form onSubmit={handleRegister}>
                        <h1 className="text-center mb-5 text-3xl font-semibold text-siteDefault">
                            IMS Register
                        </h1>
                        <div className="flex flex-col space-y-5 w-[420px]">
                            <TextField
                                id="outlined-basic"
                                label="Full Name"
                                name="name"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: "#B93B5E" },
                                }}
                            />
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
                                label="Profile Picture URL"
                                variant="outlined"
                                name="image"
                                InputLabelProps={{
                                    style: { color: "#B93B5E" },
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                type="password"
                                label="Password"
                                name="password"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: "#B93B5E" },
                                }}
                            />
                            <div className="form-control md:mt-6">
                                <button className="px-4 py-3 text-lg w-full bg-siteDefault text-white rounded-md">
                                    REGISTER
                                </button>
                            </div>
                        </div>

                        <p className="text-center mt-2 text-sm ">
                            Already have an account?{" "}
                            <Link
                                className="ml-5 underline text-base text-siteDefault"
                                to="/login"
                            >
                                Login Now!!
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

export default Register;
