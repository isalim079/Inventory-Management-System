import { FaCaretRight } from "react-icons/fa6";

const SubscriptionPlan = () => {
    return (
        <div className="max-w-screen-xl mx-auto mb-36 ">
            <div className="mb-20 flex justify-center">
                <h1 className="text-center text-4xl font-semibold uppercase text-siteDefaultSecond border-b-2 border-siteDefaultSecond w-[420px] border-r-2 border-l-2 pb-2">Subscription Plan</h1>
            </div>
            <div className="md:flex space-x-16">
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
                        <p className="text-8xl font-bold">29$</p>
                        <p className="font-semibold">/month</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-justify mt-4">
                            Ideal for small businesses or startups looking to
                            streamline inventory management. The Starter plan
                            offers essential features like real-time tracking
                            and automated reordering, catering to businesses
                            with up to 500 products/items. Easily scale up your
                            inventory capacity with affordable add-on options.
                        </p>
                    </div>
                    <div className="mt-4">
                        <ul className="space-y-2 font-semibold text-gray-500 text-justify">
                            <li className="flex items-center">
                                <FaCaretRight className="text-green-600 text-xl mr-4" />{" "}
                                Increase to 700: Additional $10/month
                            </li>
                            <li className="flex items-center">
                                <FaCaretRight className="text-green-600 text-xl mr-4" />{" "}
                                Increase to 950: Additional $20/month
                            </li>
                            <li className="flex items-center">
                                <FaCaretRight className="text-green-600 text-xl mr-4" />{" "}
                                Increase to 1500: Additional $50/month
                            </li>
                        </ul>
                    </div>
                    <div className="mt-10">
                        <button className="w-full bg-siteDefault py-2 text-white rounded-md hover:bg-[#8F2D49]">Purchase</button>
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
                        <p className="text-8xl font-bold">59$</p>
                        <p className="font-semibold">/month</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-justify mt-4">
                        Designed for growing businesses with moderate inventory needs. The Business plan provides advanced analytics, multi-platform integration, and customization options for up to 2000 products/items. Scale further by incrementally increasing inventory capacity with affordable add-on choices.
                        </p>
                    </div>
                    <div className="mt-4">
                        <ul className="space-y-2 font-semibold text-gray-500 text-justify ">
                            <li className="flex items-center">
                                <FaCaretRight className="text-green-600 text-xl mr-4" />{" "}
                                Increase to 2200: Additional $10/month
                            </li>
                            <li className="flex items-center">
                                <FaCaretRight className="text-green-600 text-xl mr-4" />{" "}
                                Increase to 2450: Additional $20/month
                            </li>
                            <li className="flex items-center">
                                <FaCaretRight className="text-green-600 text-xl mr-4" />{" "}
                                Increase to 3000: Additional $50/month
                            </li>
                        </ul>
                    </div>
                    <div className="mt-10">
                        <button className="w-full bg-siteDefault py-2 text-white rounded-md hover:bg-[#8F2D49]">Purchase</button>
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
                        <p className="text-8xl font-bold">99$</p>
                        <p className="font-semibold">/month</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-justify mt-4">
                        Tailored for established enterprises or businesses with extensive inventory requirements. The Enterprise plan offers unlimited products/items, dedicated support, advanced security, API access for custom integrations, and round-the-clock assistance. Perfect for scaling without worrying about capacity limitations.
                        </p>
                    </div>
                    <div className="mt-4">
                        <ul className="space-y-2 font-semibold text-gray-500">
                            <li className="flex items-center text-justify">
                                <FaCaretRight className="text-green-600 text-xl mr-4" />{" "}
                                Unlimited Users
                            </li>
                            <li className="flex items-center text-justify">
                                <FaCaretRight className="text-green-600 text-xl mr-4" />{" "}
                                Dedicated Account Manager
                            </li>
                            <li className="flex items-center text-justify">
                                <FaCaretRight className="text-green-600 text-xl mr-4" />{" "}
                                API Access for Custom Integrations
                            </li>
                            <li className="flex items-center text-justify">
                                <FaCaretRight className="text-green-600 text-xl mr-4" />{" "}
                                Advanced Security Features
                            </li>
                        </ul>
                    </div>
                    <div className="mt-14">
                        <button className="w-full bg-siteDefault py-2 text-white rounded-md hover:bg-[#8F2D49]">Purchase</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPlan;
