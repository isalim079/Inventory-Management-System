import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const TopBanner = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000,
        });
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto md:mt-36 p-8 md:p-0">
            <div className="md:flex items-center justify-between">
                <div className=" flex-1 mb-8 md:mb-0">
                    <div data-aos="fade-up">
                        <h1 className="text-4xl font-semibold leading-[45px] text-siteDefaultSecond mb-2">
                            Inventory Management Today
                        </h1>
                    </div>
                    <div data-aos="fade-up">
                        <p className="text-justify text-gray-500">
                            Streamline Your Inventory Management Today. Unlock
                            Efficiency, Visibility, and Growth with Our Powerful
                            Solutions. Empower Your Business with Precision
                            Inventory Tracking and Automated Optimization,
                            transforming Your Operations with Simplified
                            Inventory Control.{" "}
                        </p>
                    </div>
                </div>
                <div className="" data-aos="fade-up">
                    <img
                        src="https://i.ibb.co/q7Fk0wY/top-Banner-Section.png"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

export default TopBanner;
