import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../router/AuthProvider";


const SalesView = () => {

    const {user} = useContext(AuthContext)

    const axiosPublic = useAxiosPublic()

    const [totalProducts, setTotalProducts] = useState([])

    useEffect(() => {
        axiosPublic
            .get("/imsUsersDB")
            .then((res) => {
                setTotalProducts(res.data)
            })
            .catch((error) => {
                console.log("fetching error ", error);
            });
    }, [axiosPublic]);

    return (
        <div>
            
        </div>
    );
};

export default SalesView;