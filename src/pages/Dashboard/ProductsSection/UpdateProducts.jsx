import { useLoaderData, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm } from "react-hook-form";


import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";


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


const UpdateProducts = () => {

    const navigate = useNavigate()

    const axiosPublic = useAxiosPublic();

    const loadProductsData = useLoaderData()
    // console.log(loadProductsData);
    const {productName, productQuantity, productLocation, productionCost, profitMargin, discount, productDescription, _id} = loadProductsData

    const {
        register,
        handleSubmit,
       
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const imageFile = { image: data.productImage[0] };

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });

        if(res.data.success){
            const buyingPrice = parseFloat(data.productionCost);
            const tax = 0.075;
            const profit = parseFloat(data.profitMargin);
            const sellingPrice = parseFloat(
                buyingPrice + tax + profit / 100
            ).toFixed(3);

            const addProductsDetails = {
                productName: data.productName,
                productImage: res.data.data.display_url,
                productQuantity: data.productQuantity,
                productLocation: data.productLocation,
                productionCost: data.productionCost,
                profitMargin: data.profitMargin,
                discount: data.discount,
                productDescription: data.productDescription,
                sellingPrice,
            };

            await axiosPublic.patch(`/addProductsDB/${_id}`, addProductsDetails)
            .then(res => {
                console.log(res.data);
                if(res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "product has been updated successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    navigate("/dashboard/productsSection")
                }
            })
            .catch(error => {
                console.log(error);
            })

        }

    }

    return (
        <div className=" h-screen flex justify-center items-center p-20">
        <div>
            <div>
                <h1 className="text-center mb-10 border-b-2 pb-2 border-siteDefaultSecond text-3xl text-siteDefaultSecond">
                    Update your product to the inventory
                </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-[720px] ">
                        <TextField
                            id="outlined-basic"
                            label="Product Name"
                            name="productName"
                            {...register("productName")}
                            variant="outlined"
                            defaultValue={productName}
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
                            defaultValue={productQuantity}
                            name="productQuantity"
                            {...register("productQuantity")}
                            variant="outlined"
                            InputLabelProps={{
                                style: { color: "#B93B5E" },
                            }}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Product Location"
                            name="productLocation"
                            defaultValue={productLocation}
                            {...register("productLocation", )}
                            variant="outlined"
                            InputLabelProps={{
                                style: { color: "#B93B5E" },
                            }}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Production Cost"
                            name="productionCost"
                            defaultValue={productionCost}
                            {...register("productionCost", )}
                            variant="outlined"
                            type="number"
                            InputLabelProps={{
                                style: { color: "#B93B5E" },
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Profit Margin (%)"
                            defaultValue={profitMargin}
                            name="profitMargin"
                            {...register("profitMargin")}
                            variant="outlined"
                            type="number"
                            InputLabelProps={{
                                style: { color: "#B93B5E" },
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Discount (%)"
                            defaultValue={discount}
                            name="discount"
                            {...register("discount")}
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
                            defaultValue={productDescription}
                            {...register("productDescription", )}
                            variant="outlined"
                            InputLabelProps={{
                                style: { color: "#B93B5E" },
                            }}
                        />
                    </div>
                    <div>
                        <button className="mt-7 bg-siteDefault text-white w-full py-3 border-b-4 rounded-md border-siteDefaultSecond hover:bg-[#8F2D49]">
                            Update product
                        </button>
                    </div>
                    {errors.productImage && (
                        <div className="text-red-600 text-center mt-4 border-b-2 pb-2">
                            ** Please upload image to update data **
                        </div>
                    )}
                </div>
            </form>
        </div>

    </div>
    );
};

export default UpdateProducts;