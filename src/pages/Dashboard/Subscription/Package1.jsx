import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../router/AuthProvider";

const Package1 = () => {
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    //     console.log(clientSecret);
    const [transactionId, setTransactionId] = useState("");

    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    // const [findUser, setFindUser] = useState([]);

    // useEffect(() => {
    //     axiosPublic.get("/shopCollectionsDB").then((res) => {
    //         // console.log(res.data);
    //         //  const findUserData = res.data.find(users => users?.shopOwnerEmail === user?.email)
    //         setFindUser(res.data);
    //     });
    // }, [axiosPublic, user?.email]);

    // console.log(findUser);

    useEffect(() => {
        axiosPublic
            .post("/create-payment-intent", { price: 10 })
            .then((res) => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            });
    }, [axiosPublic]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });
        if (error) {
            console.log("payment error", error);
            setError(error.message);
        } else {
            console.log("payment method", paymentMethod);
            setError("");
        }

        // confirm payment
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "anonymous",
                        name: user?.displayName || "anonymous",
                    },
                },
            });
        if (confirmError) {
            console.log("confirm error");
        } else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
               
                // increase limit for shopUser
                let productsLimitIncrease = +200

                axiosPublic.patch(`/shopCollectionsDB/${user?.email}/increaseLimit`, {productsLimitIncrease: productsLimitIncrease})
                .then(res => {
                    console.log(res.data);

                    

                })
                .catch(error => {
                    console.log(error);
                })


                // increase income for admin
                
                let income = +10
                axiosPublic.patch(`/imsUsersDB`, {income: income})
                .then(res => {
                    console.log(res.data);
                })
                .catch(error => {
                    console.log(error);
                })


                toast.success("payment successful. your limit increased");

                console.log("transaction id", paymentIntent.id);
                setTransactionId(paymentIntent.id);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <button
                className="w-full bg-siteDefault py-2 mt-10 text-white rounded-md hover:bg-[#8F2D49]"
                type="submit"
                disabled={!stripe || !clientSecret}
            >
                purchase
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && (
                <p className="text-green-600">
                    Your transaction id: {transactionId}
                </p>
            )}
            <ToastContainer></ToastContainer>
        </form>
    );
};

export default Package1;
