import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../router/AuthProvider";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment/moment";
import jsPDF from "jspdf";

const CheckoutCart = () => {
    
    const [currentTime, setCurrentTime] = useState(
        moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    // console.log(currentTime);

    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const [findDesireUser, setFindDesireUser] = useState([]);


    useEffect(() => {
        axiosPublic.get("/checkoutProductsDB").then((res) => {
            setFindDesireUser(res.data);
        });
    }, [axiosPublic]);

  

    // console.log((findDesireUser));

    const findShopOwner = findDesireUser.filter(
        (users) => users?.productsInfo?.userEmail === user?.email
    );

    // console.log(findShopOwner);

    const handleGetPaid = (productsInfo) => {

      
        const {productName, discount, sellingPrice, shopName, _id} = productsInfo

        const salesData = {
            shopName: shopName,
            productId: _id,
            productName,
            sellingPrice,
            discount,
            
            currentTime
        };

        console.log(productsInfo._id);

        axiosPublic.post(`/salesCollectionsDB/${productsInfo?._id}`, salesData )
        .then(res => {
            console.log(res.data.salesResult.modifiedCount);
            if (res.data.salesResult.modifiedCount > 0) {
                toast.success("Successfully checked out this product", {
                    position: "top-center",
                });

                const doc = new jsPDF()
                // doc.text(JSON.stringify(salesData), 10, 10)
                doc.text(`Invoice: ${_id}`, 14, 20)
                doc.text(`Shop Name: ${shopName}`, 14, 30)
                doc.text(`Product Name: ${productName}`, 14, 40)
                doc.text(`Discount: ${discount}`, 14, 50)
                doc.text(`Product Price: ${sellingPrice}`, 14, 60)
                doc.text(`Purchase Time: ${currentTime}`, 14, 70)
                doc.save("SalesDetails.pdf")

                axiosPublic.delete(`/checkoutProductsDB/${productsInfo?._id}`)
                .then(res => {
                    if(res.data.deletedCount > 0){
                        setFindDesireUser(findDesireUser.filter(findProduct => findProduct?.productsId !== productsInfo?._id))
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                
            }
        })
        .catch(error => {
            console.log(error);
        })
    };

    return (
        <div className="p-10 mt-8">
            <div>
                <h1 className="text-center text-3xl mb-10 border-b-2 border-siteDefaultSecond text-siteDefaultSecond pb-2">
                    Check-out Section
                </h1>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell align="">Product Image</TableCell> */}
                            <TableCell align="center">Product Name</TableCell>
                            {/* <TableCell align="">Product Description</TableCell> */}
                            {/* <TableCell align="center">
                            Product Quantity
                        </TableCell> */}
                            <TableCell align="center">Discount</TableCell>
                            <TableCell align="center">Selling Price</TableCell>
                            <TableCell align="center">Get Paid</TableCell>
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
                                {/* <TableCell align="" component="th" scope="row">
                                <img
                                    className="w-14 h-14"
                                    src={productsInfo?.productsInfo?.productImage}
                                    alt=""
                                />
                            </TableCell> */}

                                <TableCell align="center">
                                    {productsInfo?.productsInfo?.productName}
                                </TableCell>
                                {/* <TableCell align="left">
                                {productsInfo?.productsInfo?.productDescription}
                            </TableCell> */}
                                {/* <TableCell align="center">
                                {productsInfo?.productsInfo?.productQuantity}
                            </TableCell> */}
                                <TableCell align="center">
                                    {productsInfo?.productsInfo?.discount}%
                                </TableCell>
                                <TableCell align="center">
                                    $ {productsInfo?.productsInfo?.sellingPrice}
                                </TableCell>

                                <TableCell align="center">
                                    <div>
                                        <button
                                            onClick={() =>
                                                handleGetPaid(productsInfo?.productsInfo)
                                            }
                                            className="text-white bg-siteDefault px-2 py-1 hover:bg-[#8F2D49]"
                                        >
                                            Get paid
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default CheckoutCart;
