/* eslint-disable react-hooks/rules-of-hooks */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

import * as React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../router/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function ProductsSection() {
    const axiosPublic = useAxiosPublic();
    const { user } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const [findShopManager, setFindShopManager] = React.useState([]);

    React.useEffect(() => {
        axiosPublic.get("/addProductsDB").then((res) => {
            setFindShopManager(res.data);
        });
    }, [axiosPublic]);
    // console.log(findShopManager);

    const findShopOwner = findShopManager.filter(
        (users) => users?.userEmail === user?.email
    );
    // console.log(findShopOwner);

    const handleAddToCart = (productsInfo) => {
        const productsDetails = {
            productsId: productsInfo?._id,
            productsInfo,
        };

        console.log(productsInfo);
        if (user?.email) {
            axiosPublic
                .post("/checkoutProductsDB", productsDetails)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Added to the checkout cart",
                            text: "You can show it on checkout Product section",
                            icon: "success",
                            showCancelButton: true,
                            confirmButtonColor: "#B93B5E",
                            cancelButtonColor: "#B93B5E",
                            confirmButtonText: "Checkout Cart",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate("/dashboard/check-outCart");
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="p-10 mt-8">
            <Helmet><title>IMS || Checkout Product</title></Helmet>
            <div>
                <h1 className="text-center text-3xl mb-10 border-b-2 border-siteDefaultSecond text-siteDefaultSecond pb-2">
                    Products Section
                </h1>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="">Product Image</TableCell>
                            <TableCell align="">Product Id</TableCell>
                            <TableCell align="center">Product Name</TableCell>
                            <TableCell align="center">
                                Product Quantity
                            </TableCell>
                            <TableCell align="center">Discount</TableCell>
                            <TableCell align="center">Selling Price</TableCell>
                            <TableCell align="center">Check-out</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {findShopOwner.map((productsInfo) => (
                            <TableRow
                                key={productsInfo?._id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell align="" component="th" scope="row">
                                    <img
                                        className="w-14 h-14"
                                        src={productsInfo?.productImage}
                                        alt=""
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    {productsInfo?._id}
                                </TableCell>
                                <TableCell align="center">
                                    {productsInfo?.productName}
                                </TableCell>
                                <TableCell align="center">
                                    {productsInfo?.productQuantity}
                                </TableCell>
                                <TableCell align="center">
                                    {productsInfo?.discount}%
                                </TableCell>
                                <TableCell align="center">
                                    $ {productsInfo?.sellingPrice}
                                </TableCell>

                                <TableCell align="center">
                                    <div>
                                        <button
                                            onClick={() =>
                                                handleAddToCart(productsInfo)
                                            }
                                        >
                                            <MdOutlineShoppingCartCheckout className="text-3xl border-2 text-siteDefault border-siteDefault p-[2px]" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
