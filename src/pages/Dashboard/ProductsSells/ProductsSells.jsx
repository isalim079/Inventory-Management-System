import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../router/AuthProvider";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductsSells = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const [searchData, setSearchData] = useState("");

    const [findProducts, setFindProducts] = useState([]);

    useEffect(() => {
        axiosPublic.get("/addProductsDB").then((res) => {
            const findProductsOwner = res.data.filter(
                (users) => users?.userEmail === user?.email
            );
            setFindProducts(findProductsOwner);
        });
    }, [axiosPublic, user?.email]);

    // console.log(findProducts);

    const handleSearch = () => {
        // console.log(searchData);

        const searchDataById = findProducts.filter(
            (findId) => findId?._id === searchData
        );
        setFindProducts(searchDataById);
        // console.log(searchDataById);
    };

    return (
        <div className="flex justify-center">
            <div className=" p-10 mt-10">
                <div>
                    <h1 className="text-center mb-10 text-3xl border-b-2 border-siteDefaultSecond pb-4">
                        Total products: {findProducts.length}
                    </h1>
                </div>
                <div className="flex justify-center items-center mb-10">
                    <input
                        onChange={(e) => setSearchData(e.target.value)}
                        type="search"
                        name="search"
                        placeholder="search by id"
                        id=""
                        className="border-2 p-3 border-siteDefault"
                    />
                    <span>
                        <button
                            onClick={handleSearch}
                            className="bg-siteDefault text-white py-3 border-2 border-siteDefault px-4"
                        >
                            Search
                        </button>
                    </span>
                </div>
                <div className="flex">
                    {findProducts.map((allProducts) => (
                        <div key={allProducts._id} className="pr-24">
                            <div>
                                <Card sx={{ width: 280 }}>
                                    <CardMedia
                                        sx={{ height: 220 }}
                                        image={allProducts?.productImage}
                                        title="Real-Time Inventory Insights"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            {allProducts?.productName}
                                        </Typography>
                                    </CardContent>
                                    <Link to="/dashboard/productsSection">
                                        <CardActions>
                                            <button className="text-sm bg-siteDefault text-white w-full py-2 hover:bg-[#8F2D49]">
                                                Manage Products
                                            </button>
                                        </CardActions>
                                    </Link>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsSells;
