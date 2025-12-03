import Banner from "../Banner/Banner";
import BannerCard from "../../../components/Others/BannerCard";
import ServicesCard from "../../../components/Others/ServicesCard";
import Brands from "../Brands/Brands";
import TrackingCard from "../../../components/Others/TrackingCard";
import Reviews from "../reviews/Reviews";
import { Suspense } from "react";
import FAQSection from "../../../components/Others/FAQSection";
import MerchantBanner from "../../../components/Others/MerchantBanner";

const Home = () => {
  const reviewsPromise = fetch("/reviews.json").then((res) => res.json());
  return (
    <div className="mt-16">
      <Banner></Banner>
      <BannerCard></BannerCard>
      <ServicesCard></ServicesCard>
      <Brands></Brands>
      <TrackingCard></TrackingCard>
      <MerchantBanner></MerchantBanner>
      <Suspense fallback={<div>Loading reviews...</div>}>
        <Reviews reviewsPromise={reviewsPromise} />
      </Suspense>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
