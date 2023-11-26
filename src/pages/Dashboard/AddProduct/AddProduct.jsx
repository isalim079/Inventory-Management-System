import { Link } from "react-router-dom";



const AddProduct = () => {

    

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex items-center">
                <div>
                    <h1 className=" border-2 border-siteDefaultSecond w-96 pl-4 py-3 text-siteDefaultSecond">Product items</h1>
                </div>
                <div>
                   <Link to="/dashboard/addProduct">
                   <button className="border-2 border-siteDefaultSecond px-2 py-3 font-medium text-white bg-siteDefaultSecond">
                        Add Product
                    </button>
                   </Link>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;