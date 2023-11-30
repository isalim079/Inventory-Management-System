import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const LastBanner = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000,
        });
    }, []);

    return (
        <div>
            <div className="">
                <div className="bg-[url('https://i.ibb.co/0s88w0D/last-Banner.jpg')] h-screen bg-cover">
                    <div className="flex flex-col md:flex-row justify-around items-center bg-black/70 h-screen p-6 md:p-0">
                        <div className=" text-white">
                            <div data-aos="fade-up">
                                <h1 className="md:text-6xl text-3xl uppercase underline mb-4 text-center">
                                    About Us
                                </h1>
                            </div>
                            <div>
                                <p
                                    className="md:w-[720px] text-xs md:text-base"
                                    data-aos="fade-up"
                                >
                                    At IMS, we believe that seamless inventory
                                    control is the cornerstone of a successful
                                    business. Our journey began with a simple
                                    yet powerful vision: to empower businesses
                                    of all sizes to streamline their operations,
                                    optimize their inventory, and drive growth.
                                </p>
                            </div>
                            <div className="flex justify-around mt-5">
                                <button
                                    className="text-white bg-siteDefault md:px-3 md:py-2 text-xs md:text-base px-2 py-1"
                                    data-aos="fade-up"
                                >
                                    Join Us
                                </button>
                                <button
                                    className="text-white bg-siteDefault md:px-3 md:py-2 text-xs md:text-base px-2 py-1"
                                    data-aos="fade-up"
                                >
                                    Know more
                                </button>
                            </div>
                        </div>
                        <div>
                            <img
                                data-aos="flip-right"
                                src="https://i.ibb.co/w7K50R0/last-Banner.png"
                                alt=""
                                className="w-52 md:w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LastBanner;
