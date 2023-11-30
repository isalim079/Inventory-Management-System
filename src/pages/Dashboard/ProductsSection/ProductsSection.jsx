/* eslint-disable react-hooks/rules-of-hooks */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import * as React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../router/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

export default function ProductsSection() {
    const axiosPublic = useAxiosPublic();
    const { user } = React.useContext(AuthContext);

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

    const handleDeleteItem = (productsInfo) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#B93B5E",
            cancelButtonColor: "#B93B5E",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(
                    `/addProductsDB/${productsInfo?._id}`
                );
                if (res.data.deletedCount > 0) {
                    setFindShopManager((previousProducts) =>
                        previousProducts.filter(
                            (updatedProducts) =>
                                updatedProducts._id !== productsInfo?._id
                        )
                    );

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your product has been deleted.",
                        icon: "success",
                    });
                }
            }
        });
    };

    return (
        <div className="p-10 mt-8">
            <Helmet><title>IMS || Products Section</title></Helmet>
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
                            <TableCell align="center">Product Name</TableCell>
                            <TableCell align="center">
                                Product Quantity
                            </TableCell>
                            <TableCell align="center">Sale Count</TableCell>
                            <TableCell align="center">Update</TableCell>
                            <TableCell align="center">Delete</TableCell>
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
                                <TableCell align="center">
                                    {productsInfo?.productName}
                                </TableCell>
                                <TableCell align="center">
                                    {productsInfo?.productQuantity}
                                </TableCell>
                                <TableCell align="center">
                                    {productsInfo?.saleCount}
                                </TableCell>
                                <TableCell align="center">
                                    <div className="flex justify-center">
                                        <Link
                                            to={`/dashboard/updateProducts/${productsInfo._id}`}
                                        >
                                            <button>
                                                <BiSolidEdit className="border border-siteDefaultSecond text-2xl p-[2px] text-siteDefaultSecond " />
                                            </button>
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() =>
                                                handleDeleteItem(productsInfo)
                                            }
                                        >
                                            <RiDeleteBinLine className="border border-siteDefault p-[2px] text-2xl text-siteDefault " />
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
