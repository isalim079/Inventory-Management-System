import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../router/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProductForm = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const currentDate = date + "-" + month + "-" + year;
    // console.log(currentDate);

    const navigate = useNavigate();

    const axiosPublic = useAxiosPublic();

    const { user } = useContext(AuthContext);
    // console.log(user);

    const [shopOwner, setShopOwner] = useState([]);

    useEffect(() => {
        axiosPublic
            .get("/imsUsersDB")
            .then((res) => {
                const findOwnerEmail = res.data.find(
                    (users) => users?.email === user?.email
                );
                setShopOwner(findOwnerEmail);
            })
            .catch((error) => {
                console.log("fetching error ", error);
            });
    }, [axiosPublic, user?.email]);
    // console.log(shopOwner);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // console.log(data);

        const imageFile = { image: data.productImage[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
        // console.log(res.data);
        if (res.data.success) {
            const buyingPrice = parseFloat(data.productionCost);
            const tax = 0.075;
            const profit = parseFloat(data.profitMargin);
            const sellingPrice = parseFloat(
                buyingPrice + tax + profit / 100
            ).toFixed(3);

            const addProductsDetails = {
                productName: data.productName,
                productImage: res.data.data.display_url,
                productQuantity: parseInt(data.productQuantity),
                productLocation: data.productLocation,
                productionCost: data.productionCost,
                profitMargin: data.profitMargin,
                discount: data.discount,
                productDescription: data.productDescription,
                shopId: shopOwner.shopId,
                shopName: shopOwner.shopName,
                userEmail: shopOwner.email,
                sellingPrice,
                productAddedDate: currentDate,
                saleCount: 0,
            };

            await axiosPublic
                .post("/addProductsDB", addProductsDetails)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        toast.success("Your product successfully added", {
                            position: "top-center",
                        });
                        reset();
                    }
                })
                .catch((error) => {
                    console.log(error);

                    Swal.fire({
                        title: "You have reached your product limit",
                        text: "Basic products limit 3",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#B93B5E",
                        cancelButtonColor: "#B93B5E",
                        confirmButtonText: "Go for subscription",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/dashboard/subscription");
                        }
                    });
                });
        }
    };

    return (
        <div className=" h-screen flex justify-center items-center p-20">
            <div>
                <div>
                    <h1 className="text-center mb-10 border-b-2 pb-2 border-siteDefaultSecond text-3xl text-siteDefaultSecond">
                        Add your product to the inventory
                    </h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-[720px] ">
                            <TextField
                                id="outlined-basic"
                                label="Product Name"
                                name="productName"
                                {...register("productName", { require: true })}
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: "#B93B5E" },
                                }}
                            />
                            <Button
                                component="label"
                                variant="contained"
                                name="productImage"
                                startIcon={<CloudUploadIcon />}
                                sx={{
                                    backgroundColor: "#B93B5E",
                                    "&:hover": {
                                        backgroundColor: "#8F2D49 !important",
                                    },
                                }}
                            >
                                Upload Image
                                <VisuallyHiddenInput
                                    {...register("productImage", {
                                        require: true,
                                    })}
                                    type="file"
                                />
                            </Button>
                            <TextField
                                id="outlined-basic"
                                label="Product Quantity"
                                type="number"
                                name="productQuantity"
                                {...register("productQuantity", {
                                    require: true,
                                })}
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: "#B93B5E" },
                                }}
                            />

                            <TextField
                                id="outlined-basic"
                                label="Product Location"
                                name="productLocation"
                                {...register("productLocation", {
                                    require: true,
                                })}
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: "#B93B5E" },
                                }}
                            />

                            <TextField
                                id="outlined-basic"
                                label="Production Cost"
                                name="productionCost"
                                {...register("productionCost", {
                                    require: true,
                                })}
                                variant="outlined"
                                type="number"
                                InputLabelProps={{
                                    style: { color: "#B93B5E" },
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Profit Margin (%)"
                                name="profitMargin"
                                {...register("profitMargin", { require: true })}
                                variant="outlined"
                                type="number"
                                InputLabelProps={{
                                    style: { color: "#B93B5E" },
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Discount (%)"
                                name="discount"
                                {...register("discount", { require: true })}
                                variant="outlined"
                                type="number"
                                InputLabelProps={{
                                    style: { color: "#B93B5E" },
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Product Description"
                                name="productDescription"
                                {...register("productDescription", {
                                    require: true,
                                })}
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: "#B93B5E" },
                                }}
                            />
                        </div>
                        <div>
                            <button className="mt-7 bg-siteDefault text-white w-full py-3 border-b-4 rounded-md border-siteDefaultSecond hover:bg-[#8F2D49]">
                                Add product
                            </button>
                        </div>
                        {errors.productImage && (
                            <div className="text-red-600 text-center mt-4 border-b-2 pb-2">
                                ** Please fill all the data **
                            </div>
                        )}
                    </div>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default AddProductForm;
