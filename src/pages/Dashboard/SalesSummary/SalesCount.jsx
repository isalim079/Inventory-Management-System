import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../router/AuthProvider";

const SalesCount = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [findUserSales, setFindUserSales] = useState([]);

    useEffect(() => {
        axiosPublic.get("/salesCollectionsDB").then((res) => {
            setFindUserSales(res.data);
        });
    }, [axiosPublic]);

    const findShopOwner = findUserSales.filter(
        (users) => users?.userEmail === user?.email
    );

    const totalSale = findShopOwner.reduce(
        (total, item) => total + (item?.sellingPrice || 0),
        0
    );
    const totalInvest = findShopOwner.reduce(
        (total, item) => total + (item?.productionCost || 0),
        0
    );
    const totalProfit = totalSale - totalInvest;
    // console.log(totalSale);

    return (
        <div className="">
            <div className="flex justify-center">
                <h1 className="text-center mt-24 mb-10 text-4xl border-b-2 pb-2 border-siteDefault w-96">Sales Count</h1>
            </div>
            <div className="flex justify-center items-center space-x-10">
                <div className="bg-siteDefault text-white px-10 py-20 text-3xl">
                    <p>Total Sale: <div className="font-bold text-center mt-3 border border-white py-2">{totalSale} $</div></p>
                </div>
                <div className="bg-siteDefaultSecond text-white px-10 py-20 text-3xl">
                    <p>Total Invest: <div className="font-bold text-center mt-3 border border-white py-2">{totalInvest} $</div></p>
                </div>
                <div className="bg-green-600 text-white px-10 py-20 text-3xl">
                    <p>Total Profit: <div className="font-bold text-center mt-3 border border-white py-2">{totalProfit.toFixed(3)} $</div></p>
                </div>
            </div>
        </div>
    );
};

export default SalesCount;
