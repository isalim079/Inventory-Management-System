import { FaFacebookF, FaGoogle, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import logo from "/logo150.png";

const Footer = () => {
    return (
        <div className="bg-siteDefault p-8 md:p-0">
            <div className="md:flex  items-center justify-around w-full">
                <div  className="flex justify-center flex-col items-center">
                <div>
                    <img className="w-[150px]" src={logo} alt="" />
                    
                </div>
                <div>
                <p className="text-gray-200 -mt-12">Inventory Management System</p>
                </div>
                </div>
               <div>
               <div className="flex justify-center md:flex-none">
                    <ul className="flex flex-wrap text-xs md:text-base gap-4 text-white ">
                        <li>About Us</li>
                        <li>License</li>
                        <li>Community</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div>
                <ul className="flex justify-center md:text-2xl text-xl mt-5 md:space-x-8 space-x-4 text-white ">
                        <li><FaFacebookF /></li>
                        <li><FaXTwitter /></li>
                        <li><FaGoogle /></li>
                        <li><FaLinkedin /></li>
                    </ul>
                </div>
               </div>
            </div>
            <div className="border border-gray-300 w-full my-8 max-w-6xl mx-auto"></div>
            <p className="text-center text-white text-sm pb-8">
                Copyright © 2023 - All right reserved by IMS (Inventory
                Management System)
            </p>
        </div>
    );
};

export default Footer;
