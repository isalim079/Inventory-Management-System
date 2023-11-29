import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../router/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
    const axiosPublic = useAxiosPublic();

    const { user } = useContext(AuthContext);
    // console.log(user);

    const [shopOwner, setShopOwner] = useState([]);

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

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex items-center">
                <div>
                    <h1 className=" border-2 border-siteDefaultSecond w-96 pl-4 py-3 text-siteDefaultSecond">
                        Product items
                    </h1>
                </div>
                <div>
                    {shopOwner?.role === "manager" || shopOwner?.role === "admin" ? (
                        <Link to="/dashboard/addProduct">
                            <button className="border-2 border-siteDefaultSecond px-2 py-3 font-medium text-white bg-siteDefaultSecond">
                                Add Product
                            </button>
                        </Link>
                    ) : (
                        <button
                            onClick={() => toast.error("you are not a manager")}
                            className="border-2 border-siteDefaultSecond px-2 py-3 font-medium text-white bg-siteDefaultSecond"
                        >
                            Add Product
                        </button>
                    )}
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default AddProduct;
