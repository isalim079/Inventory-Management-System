import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Aos from "aos";
import "aos/dist/aos.css";

import Typography from "@mui/material/Typography";
import { useEffect } from "react";

export default function BannerSection() {
    useEffect(() => {
        Aos.init({
            duration: 700,
        });
    }, []);

    return (
        <div className="md:my-28 max-w-screen-xl mx-auto p-8 md:p-0">
            <div className="flex justify-center">
                <h1 className="text-center mb-2 md:text-3xl uppercase font-semibold border-b-2 border-r-2 border-l-2 border-siteDefaultSecond text-siteDefaultSecond md:py-3 pb-3 md:pb-0 w-[920px]">
                    Streamline Your Inventory Management Effortlessly
                </h1>
            </div>
            <div className="flex justify-center">
                <p className="text-center md:text-base text-xs mb-10 border-b-2 border-r-2 border-l-2 border-siteDefaultSecond md:w-[680px] w-[220px] text-siteDefaultSecond">
                    A concise description emphasizing the efficiency and ease of
                    use of your system
                </p>
            </div>
            <div className=" md:flex justify-around w-full md:space-y-0 space-y-5">
                <Card sx={{ maxWidth: 345 }} data-aos="fade-up">
                    <CardMedia
                        sx={{ height: 340 }}
                        image="https://i.ibb.co/6y0wT3C/inventory-traking.png"
                        title="Real-Time Inventory Insights"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Real-Time Inventory Insights
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Highlight how your system offers instant visibility
                            into inventory levels, enabling businesses to track
                            stock in real time. Emphasize benefits like reducing
                            stockouts and overstock situations.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <button className="text-sm bg-siteDefault text-white w-full py-2 hover:bg-[#8F2D49]">
                            Learn more
                        </button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345 }} data-aos="fade-up">
                    <CardMedia
                        sx={{ height: 340 }}
                        image="https://i.ibb.co/314N9xH/inventory-report.png"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Insightful Reports & Analytics
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Highlight how your system generates customizable
                            reports and analytics, providing actionable insights
                            into inventory trends, sales forecasts, and more.
                            Focus on informed decision-making capabilities.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <button className="text-sm bg-siteDefault text-white w-full py-2 hover:bg-[#8F2D49]">
                            Learn more
                        </button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345 }} data-aos="fade-up">
                    <CardMedia
                        sx={{ height: 340 }}
                        image="https://i.ibb.co/JnZzx05/inventory-alert.png"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Automated Reordering And Alert
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Showcase how your system automates reordering
                            processes based on preset thresholds, sending alerts
                            when inventory levels are low. Emphasize time-saving
                            benefits and inventory optimization
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <button className="text-sm bg-siteDefault text-white w-full py-2 hover:bg-[#8F2D49]">
                            Learn more
                        </button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}
