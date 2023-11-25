
import logo from '/logo150.png'


const Footer = () => {
    return (
        <div className='bg-siteDefault'>
            <div className='flex  items-center justify-around w-full'>
                <div >
                    <img className='w-[150px]'  src={logo} alt="" />
                </div>
                <div>
                    <ul className='flex space-x-8 text-white'>
                        <li>About Us</li>
                        <li>License</li>
                        <li>Community</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
            </div>
            <div  className='border border-gray-300 w-full my-8 max-w-6xl mx-auto'></div>
            <p className='text-center text-white text-sm pb-8'>Copyright © 2023 - All right reserved by IMS (Inventory Management System)</p>
        </div>
    );
};

export default Footer;