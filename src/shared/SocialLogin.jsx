import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../router/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Divider } from "@mui/material";

const SocialLogin = () => {
    const { handleGoogleLogin, handleGithubLogin } = useContext(AuthContext);

    const [imsUsers, setImsUsers] = useState([]);

    useEffect(() => {
        axios
            .get("https://assignment-12-server-nu-seven.vercel.app/imsUsersDB")
            .then((res) => {
                setImsUsers(res.data);
            })
            .catch((error) => {
                console.log(error, "social login user fetching error");
            });
    }, []);

    const location = useLocation();

    const navigate = useNavigate();

    const handleSocialLogin = (media) => {
        media()
            .then((res) => {
                if (res?.user) {
                    const userData = {
                        image: res?.user?.photoURL,
                        name: res?.user?.displayName,
                        email: res?.user?.email,
                    };

                    const userExists = imsUsers.some(
                        (imsUser) => imsUser.email === userData.email
                    );
                    const userPath = imsUsers.find(
                        (imsUser) => imsUser.email === userData.email
                    );

                    if (!userExists) {
                        fetch(
                            "https://assignment-12-server-nu-seven.vercel.app/imsUsersDB",
                            {
                                method: "POST",
                                headers: {
                                    "content-type": "application/json",
                                },
                                body: JSON.stringify(userData),
                            }
                        )
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data);
                                if (data.insertedId) {
                                    console.log(
                                        "Successfully added user to database"
                                    );
                                }
                            });
                        }
                        if(userPath?.shopId){
                            navigate(location?.state ? location.state : "/dashboard");
                        }
                        else{
                            navigate(location?.state ? location.state : "/create-shop");
                        }

                    
                }

              

                console.log(res);
               
            })
            .catch((error) => {
                console.log(error.code);
            });
    };

    return (
        <div>
            <div className="  text-sm md:text-base mt-4">
                <Divider>continue with</Divider>
            </div>
            <div className="flex justify-center mt-4">
                <div>
                    <button
                        onClick={() => handleSocialLogin(handleGoogleLogin)}
                        className=" rounded-md  px-5 justify-center py-2 text-sm md:text-base bg-darkBrownShade   flex items-center gap-2 transition duration-300 ease-in-out transform hover:scale-105 border-2"
                    >
                        <FcGoogle className="text-xl"></FcGoogle>
                        Google
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => handleSocialLogin(handleGithubLogin)}
                        className=" rounded-md  px-5 justify-center py-2 text-sm md:text-base  bg-darkBrownShade   flex items-center gap-2 ml-16 transition duration-300 ease-in-out transform hover:scale-105 border-2"
                    >
                        {" "}
                        <AiFillGithub className="text-xl"></AiFillGithub>
                        Github
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;
