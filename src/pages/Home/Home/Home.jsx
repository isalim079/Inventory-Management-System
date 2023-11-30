import { Helmet } from "react-helmet-async";
import BannerSection from "../BannerSection/BannerSection";
import OurClients from "../OurClients(DemoShop)/OurClients";
import SubscriptionPlan from "../SubscriptionPlan/SubscriptionPlan";
import TopBanner from "../TopBanner/TopBanner";
import LastBanner from "../LastBanner/LastBanner";

const Home = () => {
    return (
        <div>
            <Helmet><title>IMS || Home</title></Helmet>
            <TopBanner></TopBanner>
            <BannerSection></BannerSection>
            <OurClients></OurClients>
            <SubscriptionPlan></SubscriptionPlan>
            <LastBanner></LastBanner>
        </div>
    );
};

export default Home;