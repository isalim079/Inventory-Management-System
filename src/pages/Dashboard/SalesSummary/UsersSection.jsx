import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


const UsersSection = () => {

    const axiosPublic = useAxiosPublic()
  
    const navigate = useNavigate();

    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        axiosPublic.get("/imsUsersDB")
        .then(res => {
            setAllUsers(res.data)
        })
        .catch(error => {
            console.log(error);
        })
    }, [axiosPublic])

    const withoutAdmin = allUsers.filter(usersWithoutAdmin => usersWithoutAdmin?.role !== "admin")
    const withAdmin = allUsers.filter(usersWithoutAdmin => usersWithoutAdmin?.role === "admin")

    console.log(allUsers);

    return (
        <div>
            <div>
                {withAdmin ? (
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
                                    <TableCell align="center">
                                        Role
                                    </TableCell>
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
                                            {
                                                productsInfo?.shopName ? productsInfo?.shopName : <p>N/A</p>
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                        {
                                                productsInfo?.role? productsInfo?.role : <p>N/A</p>
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                        {
                                                productsInfo?.shopName ? <p>N/A</p> :  <button
                                                // onClick={() => {
                                                //     handleSend(
                                                //         productsInfo?._id
                                                //     );
                                                // }}
                                                className="bg-siteDefault text-white px-2 text-sm py-1"
                                            >
                                                Send
                                            </button>
                                            }
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