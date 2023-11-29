import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../router/AuthProvider";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import moment from "moment";

const SalesHistory = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [findUserSales, setFindUserSales] = useState([]);

    const [sortOrder, setSortOrder] = useState("desc");

    useEffect(() => {
        axiosPublic.get("/salesCollectionsDB").then((res) => {
            setFindUserSales(res.data);
        });
    }, [axiosPublic]);

    const sortByDate = () => {
        const sortedSales = [...findUserSales].sort((a, b) => {
            const dateA = moment(
                a.currentTime,
                "dddd, MMMM Do YYYY, h:mm:ss a"
            );
            const dateB = moment(
                b.currentTime,
                "dddd, MMMM Do YYYY, h:mm:ss a"
            );

            if (sortOrder === "asc") {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
        setFindUserSales(sortedSales);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const findShopOwner = findUserSales.filter(
        (users) => users?.userEmail === user?.email
    );

    return (
        <div className="">
            <div>
                <h1 className="mt-10 text-center mb-10 text-3xl underline text-siteDefault">
                    Sales History
                </h1>
            </div>
            <div>
                <button
                    onClick={sortByDate}
                    className="my-5 ml-10 bg-siteDefault px-3 text-white py-1"
                >
                    sort by date
                </button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Product Name</TableCell>

                            <TableCell align="center">Selling Date</TableCell>
                            <TableCell align="center">Profit</TableCell>
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
                                <TableCell align="center">
                                    {productsInfo?.productName}
                                </TableCell>

                                <TableCell align="center">
                                    {productsInfo?.currentTime}
                                </TableCell>
                                <TableCell align="center">
                                    ${" "}
                                    {(
                                        productsInfo?.sellingPrice -
                                        productsInfo?.productionCost
                                    ).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SalesHistory;
