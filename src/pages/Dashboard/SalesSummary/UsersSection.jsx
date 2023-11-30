import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
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
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet-async";

const UsersSection = () => {
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        axiosPublic
            .get("/imsUsersDB")
            .then((res) => {
                setAllUsers(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [axiosPublic]);

    const withoutAdmin = allUsers.filter(
        (usersWithoutAdmin) => usersWithoutAdmin?.role !== "admin"
    );
    const withAdmin = allUsers.find(
        (usersWithoutAdmin) => usersWithoutAdmin?.role === "admin"
    );

    console.log(withAdmin?.role);

    const handleSend = () => {
        console.log("clicked");
        if (withAdmin?.role === "admin") {
            Swal.fire({
                title: "Write your notice",
                html:
                    '<input id="email" class="swal2-input" placeholder="Manager email" type="email">' +
                    '<input id="subject" class="swal2-input" placeholder="Subject" type="text">' +
                    '<input id="message" class="swal2-input" placeholder="Your notice" type="text">',
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Send!",
            }).then((result) => {
                if (result.isConfirmed) {
                    const email = document.getElementById("email").value;
                    const subject = document.getElementById("subject").value;
                    const message = document.getElementById("message").value;

                    emailjs
                        .send(
                            "service_95hipyr",
                            "template_ndfql8v",
                            {
                                to_email: email,
                                from_name: "admin",
                                subject: subject,
                                message: message,
                            },
                            "op_pyxepaT9cSnw_o"
                        )
                        .then((res) => {
                            console.log("email sent", res.status, res.text);
                            Swal.fire({
                                title: "sent!",
                                text: "Your notice has been sent.",
                                icon: "success",
                            });
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
            <Helmet>
                <title>IMS || User Section</title>
            </Helmet>
            <div>
                {withAdmin?.role === "admin" ? (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        User Name
                                    </TableCell>

                                    <TableCell align="center">
                                        User Email
                                    </TableCell>
                                    <TableCell align="center">
                                        Shop Name
                                    </TableCell>
                                    <TableCell align="center">Role</TableCell>
                                    <TableCell align="center">
                                        Promotion
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {withoutAdmin.map((productsInfo) => (
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
                                            {productsInfo?.name}
                                        </TableCell>

                                        <TableCell align="center">
                                            {productsInfo?.email}
                                        </TableCell>
                                        <TableCell align="center">
                                            {productsInfo?.shopName ? (
                                                productsInfo?.shopName
                                            ) : (
                                                <p>N/A</p>
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            {productsInfo?.role ? (
                                                productsInfo?.role
                                            ) : (
                                                <p>N/A</p>
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            {productsInfo?.shopName ? (
                                                <p>N/A</p>
                                            ) : (
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
                                            )}
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

export default UsersSection;
