import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import Marquee from "react-fast-marquee";

const OurClients = () => {
    const axiosPublic = useAxiosPublic();

    const [demoShopLists, setDemoShopLists] = useState([]);

    useEffect(() => {
        axiosPublic
            .get("/demoShopDB")
            .then((res) => {
                setDemoShopLists(res.data);
            })
            .catch((error) => {
                console.log("fetching error demoShop", error);
            });
    }, [axiosPublic]);

    // console.log(demoShopLists);

    return (
        <div className=" max-w-screen-xl mx-auto md:mt-36 md:mb-36">
            <div className="mb-4 flex justify-center">
                <h1 className="text-center text-4xl font-semibold uppercase text-siteDefaultSecond border-b-2 border-siteDefaultSecond w-[280px] border-r-2 border-l-2 pb-2">
                    Our Clients
                </h1>
            </div>
            <div className="mb-10 flex justify-center">
                <p className="text-center text-base mb-10 w-[620px] text-siteDefaultSecond">
                    Still thinking about your shop inventory management system??
                    Here we are...
                </p>
            </div>
            <Marquee speed={80}>
                <div className="flex">
                    {demoShopLists.map((demoShopList) => (
                        <div key={demoShopList._id} className="pr-24">
                            <div>
                                <Card sx={{ width: 320 }}>
                                    <CardMedia
                                        sx={{ height: 420 }}
                                        image={demoShopList?.image}
                                        title="Real-Time Inventory Insights"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            {demoShopList?.shopName}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <button className="text-sm bg-siteDefault text-white w-full py-2 hover:bg-[#8F2D49]">
                                            Visit this site
                                        </button>
                                    </CardActions>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    );
};

export default OurClients;
