import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const SalesView = () => {
    const axiosPublic = useAxiosPublic();

    const [totalProducts, setTotalProducts] = useState([]);
    const [totalProductsList, setTotalProductsList] = useState([]);

    useEffect(() => {
        axiosPublic
            .get("/imsUsersDB")
            .then((res) => {
                setTotalProducts(res.data);
            })
            .catch((error) => {
                console.log("fetching error ", error);
            });
    }, [axiosPublic]);

    useEffect(() => {
        axiosPublic
            .get("/salesCollectionsDB")
            .then((res) => {
                setTotalProductsList(res.data);
            })
            .catch((error) => {
                console.log("fetching error ", error);
            });
    }, [axiosPublic]);

    const findAdmin = totalProducts.find(
        (userAdmin) => userAdmin?.role === "admin"
    );

    const totalSale = totalProductsList.reduce(
        (total, item) => total + (item?.sellingPrice || 0),
        0
    );

    return (
        <div className="">
            <Helmet><title>IMS || Sales View</title></Helmet>
            <div className="flex justify-center">
                <h1 className="text-center mt-24 mb-10 text-4xl border-b-2 pb-2 border-siteDefault w-96">
                    Sales View
                </h1>
            </div>
            <div className="flex justify-center items-center space-x-10">
                <div className="bg-siteDefault text-white px-10 py-20 text-3xl">
                    <p>
                        Total Income:{" "}
                        <div className="font-bold text-center mt-3 border border-white py-2">
                            {findAdmin?.income} $
                        </div>
                    </p>
                </div>
                <div className="bg-siteDefaultSecond text-white px-10 py-20 text-3xl">
                    <p>
                        Total Products:{" "}
                        <div className="font-bold text-center mt-3 border border-white py-2">
                            {totalProductsList?.length}
                        </div>
                    </p>
                </div>
                <div className="bg-green-600 text-white px-10 py-20 text-3xl">
                    <p>
                        Total Sale:{" "}
                        <div className="font-bold text-center mt-3 border border-white py-2">
                            {totalSale.toFixed(2)} $
                        </div>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SalesView;
