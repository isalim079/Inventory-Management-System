import { FaCaretRight } from "react-icons/fa6";
import Package1 from "./Package1";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Package3 from "./Package3";
import Package2 from "./Package2";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Subscription = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-10 pr-24 mt-20">
            <Helmet><title>IMS || Subscription</title></Helmet>
            <div className=" mb-10 flex justify-center">
                <h1 className="text-center text-4xl font-semibold uppercase text-siteDefaultSecond border-b-2 border-siteDefaultSecond w-[420px] border-r-2 border-l-2 pb-2">
                    Subscription Plan
                </h1>
            </div>

            <div className="grid grid-cols-3 gap-20">
                {/* 1st plan */}
                <div className="w-96 text-center bg-gray-100 p-10 rounded-3xl border-b-4 border-siteDefaultSecond">
                    <div>
                        <h1 className="text-siteDefaultSecond text-2xl font-semibold">
                            Starter
                        </h1>
                        <div className="flex justify-center">
                            <div className="border-2 border-siteDefaultSecond my-4 w-80"></div>
                        </div>
                    </div>
                    <div className="flex items-end text-siteDefault justify-center">
                        <p className="text-6xl font-bold">10$</p>
                        <p className="font-semibold">/month</p>
                    </div>

                    <div className="mt-4">
                        <ul className="space-y-2 font-semibold text-gray-500 text-justify">
                            <li className="flex items-center">
                                <FaCaretRight className="text-green-600 text-xl mr-4" />{" "}
                                You have to pay 10 dollars to increase the limit
                                to 200
                            </li>
                        </ul>
                    </div>
                    <div className="mt-10">
                        <Elements stripe={stripePromise}>
                            <Package1></Package1>
                        </Elements>
                    </div>
                </div>
                {/* 2nd plan */}
                <div className="w-96 text-center bg-gray-100 p-10 rounded-3xl border-b-4 border-siteDefaultSecond">
                    <div>
                        <h1 className="text-siteDefaultSecond text-2xl font-semibold">
                            Business
                        </h1>
                        <div className="flex justify-center">
                            <div className="border-2 border-siteDefaultSecond my-4 w-80"></div>
                        </div>
                    </div>
                    <div className="flex items-end text-siteDefault justify-center">
                        <p className="text-6xl font-bold">20$</p>
                        <p className="font-semibold">/month</p>
                    </div>

                    <div className="mt-4">
                        <ul className="space-y-2 font-semibold text-gray-500 text-justify ">
                            <li className="flex items-center">
                                <FaCaretRight className="text-green-600 text-xl mr-4" />{" "}
                                You have to pay 20 dollars to increase the limit
                                to 450
                            </li>
                        </ul>
                    </div>
                    <div className="mt-10">
                        <Elements stripe={stripePromise}>
                            <Package2></Package2>
                        </Elements>
                    </div>
                </div>
                {/* 3rd plan */}
                <div className="w-96 text-center bg-gray-100 p-10 rounded-3xl border-b-4 border-siteDefaultSecond">
                    <div>
                        <h1 className="text-siteDefaultSecond text-2xl font-semibold">
                            Enterprise
                        </h1>
                        <div className="flex justify-center">
                            <div className="border-2 border-siteDefaultSecond my-4 w-80"></div>
                        </div>
                    </div>
                    <div className="flex items-end text-siteDefault justify-center">
                        <p className="text-6xl font-bold">50$</p>
                        <p className="font-semibold">/month</p>
                    </div>

                    <div className="mt-4">
                        <ul className="space-y-2 font-semibold text-gray-500">
                            <li className="flex items-center text-justify">
                                <FaCaretRight className="text-green-600 text-xl mr-4" />{" "}
                                You have to pay 50 dollars to increase the limit
                                to 1500
                            </li>
                        </ul>
                    </div>
                    <div className="mt-14">
                        <Elements stripe={stripePromise}>
                            <Package3></Package3>
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
