import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../router/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ManageShop = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [shopOwner, setShopOwner] = useState([]);
    const [shopCollections, setShopCollections] = useState([]);

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

    useEffect(() => {
        axiosPublic
            .get("/shopCollectionsDB")
            .then((res) => {
                setShopCollections(res.data);
            })
            .catch((error) => {
                console.log("fetching error ", error);
            });
    }, [axiosPublic]);

    const handleSend = () => {
        if (shopOwner?.role === "admin") {
            Swal.fire({
                title: "Write your notice",
                html:
                    '<input id="email" class="swal2-input" placeholder="Manager email">' +
                    '<input id="notice" class="swal2-input" placeholder="Your notice" type="email">',
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Send!",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "sent!",
                        text: "Your notice has been sent.",
                        icon: "success",
                    });
                }
            });
        } else {
            toast.error("You are not Admin", {
                position: "top-center",
            });

            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    };

    return (
        <div>
            <div>
                {shopOwner?.role === "admin" ? (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        Shop Name
                                    </TableCell>

                                    <TableCell align="left">
                                        Shop Logo
                                    </TableCell>
                                    <TableCell align="center">
                                        Product Limit
                                    </TableCell>
                                    <TableCell align="center">
                                        Shop Description
                                    </TableCell>
                                    <TableCell align="center">
                                        Send Notice
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {shopCollections.map((productsInfo) => (
                                    <TableRow
                                        key={productsInfo?._id}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell align="center">
                                            {productsInfo?.shopName}
                                        </TableCell>

                                        <TableCell align="center">
                                            <img
                                                className="w-10 h-10  rounded-full"
                                                src={productsInfo?.shopLogo}
                                                alt=""
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            {productsInfo?.productsLimit}
                                        </TableCell>
                                        <TableCell align="center">
                                            {productsInfo?.productsLimit}
                                        </TableCell>
                                        <TableCell align="center">
                                            <button
                                                onClick={() => {
                                                    handleSend(
                                                        productsInfo?._id
                                                    );
                                                }}
                                                className="bg-siteDefault text-white px-2 text-sm py-1"
                                            >
                                                Send
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <p className="text-4xl text-center h-screen flex justify-center items-center text-siteDefault ">
                        You are not Admin
                    </p>
                )}
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default ManageShop;
