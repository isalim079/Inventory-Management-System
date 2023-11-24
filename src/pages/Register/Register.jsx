import { TextField } from "@mui/material";
import registerImage from "/registerIllustration.png";
import "./Register.css";


const Register = () => {
    return (
        <div>
            <div className="flex justify-center items-center h-[620px]">
                <div className="flex items-center justify-around w-full">
                    <div className="">
                        <img src={registerImage} alt="" />
                    </div>
                    <form>
                        <h1 className="text-center mb-5 text-3xl font-semibold text-siteDefault">
                            IMS Register
                        </h1>
                        <div className="flex flex-col space-y-5 w-[420px]">
                            <TextField
                                id="outlined-basic"
                                label="Full Name"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: "#B93B5E" },
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Your Email"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: "#B93B5E" },
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Profile Picture URL"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: "#B93B5E" },
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Password"
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
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
