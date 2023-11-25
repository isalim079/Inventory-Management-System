import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BannerSection() {
    return (
        <div className="my-28">
            <div className="flex justify-center">
                <h1 className="text-center mb-2 text-3xl uppercase font-semibold border-b-2 border-r-2 border-l-2 border-siteDefaultSecond text-siteDefaultSecond py-3 w-[920px]">
                    Streamline Your Inventory Management Effortlessly
                </h1>
            </div>
            <div className="flex justify-center">
                <p className="text-center text-base mb-10 border-b-2 border-r-2 border-l-2 border-siteDefaultSecond w-[680px] text-siteDefaultSecond">
                    A concise description emphasizing the efficiency and ease of
                    use of your system
                </p>
            </div>
            <div className=" flex justify-around w-full">
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 340 }}
                        image="https://i.ibb.co/6y0wT3C/inventory-traking.png"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles,
                            with over 6,000 species, ranging across all
                            continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 340 }}
                        image="https://i.ibb.co/6y0wT3C/inventory-traking.png"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles,
                            with over 6,000 species, ranging across all
                            continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 340 }}
                        image="https://i.ibb.co/6y0wT3C/inventory-traking.png"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles,
                            with over 6,000 species, ranging across all
                            continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}
