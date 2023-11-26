import { Divider, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../../router/AuthProvider";
import { useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const CreateShop = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    const navigate = useNavigate();

    const axiosPublic = useAxiosPublic();

    const handleCreateShop = (e) => {
        e.preventDefault();
        const form = e.target;
        const shopName = form.shopName.value;
        const shopLogo = form.shopLogo.value;
        const shopDescription = form.shopDescription.value;
        const shopLocation = form.shopLocation.value;
        const shopOwnerName = user?.displayName;
        const shopOwnerEmail = user?.email;

        const addShopDetails = {
            shopName,
            shopLogo,
            shopDescription,
            shopLocation,
            shopOwnerName,
            shopOwnerEmail,
        };
        // console.log(addShopDetails);

        axiosPublic
            .post("/shopCollectionsDB", addShopDetails)
            .then((res) => {
                if (res.data.insertedId) {
                    console.log("shop data posted to database");
                    toast.success("Your shop successfully created");

                    const shopId = res.data.insertedId;

                    axiosPublic
                        .patch(`/imsUsersDB/${user?.email}`, {
                            role: "manager",
                            shopId,
                            shopName,
                            shopLogo,
                        })
                        .then((res) => {
                            console.log("usersDB role updated", res.data);

                            setTimeout(() => {
                                navigate(
                                    location?.state ? location?.state : "/home"
                                );
                            }, 3000);
                        })
                        .catch((error) => {
                            console.error("Error updating user role:", error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("you can not create more than one shop", {
                    position: "top-center",
                });
            });
    };

    return (
        <div className="my-28 max-w-screen-xl mx-auto">
            <div className="mb-7">
                <Divider>
                    <h1 className="text-center text-2xl font-semibold uppercase text-siteDefaultSecond">
                        Create Your Shop Inventory
                    </h1>
                </Divider>
            </div>
            <form onSubmit={handleCreateShop}>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        <TextField
                            id="outlined-basic"
                            label="Shop Name"
                            name="shopName"
                            variant="outlined"
                            InputLabelProps={{
                                style: { color: "#B93B5E" },
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Shop Logo URL"
                            name="shopLogo"
                            variant="outlined"
                            InputLabelProps={{
                                style: { color: "#B93B5E" },
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Shop Description"
                            name="shopDescription"
                            variant="outlined"
                            InputLabelProps={{
                                style: { color: "#B93B5E" },
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Shop Location"
                            name="shopLocation"
                            variant="outlined"
                            InputLabelProps={{
                                style: { color: "#B93B5E" },
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label={user?.email}
                            name="email"
                            disabled
                            variant="outlined"
                            InputLabelProps={{
                                style: { color: "#B0B0B0" },
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label={user?.displayName}
                            disabled
                            name="name"
                            variant="outlined"
                            InputLabelProps={{
                                style: { color: "#B0B0B0" },
                            }}
                        />
                    </div>
                    <div>
                        <button className="w-full bg-siteDefault text-white py-3 mt-7">
                            Create Shop
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default CreateShop;
