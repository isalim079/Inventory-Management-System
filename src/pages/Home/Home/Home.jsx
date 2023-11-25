import BannerSection from "../BannerSection/BannerSection";
import OurClients from "../OurClients(DemoShop)/OurClients";
import SubscriptionPlan from "../SubscriptionPlan/SubscriptionPlan";
import TopBanner from "../TopBanner/TopBanner";

const Home = () => {
    return (
        <div>
            <TopBanner></TopBanner>
            <BannerSection></BannerSection>
            <OurClients></OurClients>
            <SubscriptionPlan></SubscriptionPlan>
        </div>
    );
};

export default Home;