import HeroBanner from "@/components/home/HeroBanner";
import FeaturedEquipment from "@/components/home/FeaturedEquipment";
import CategoriesSection from "@/components/home/CategoriesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HomeExtraSections from "@/components/home/HomeExtraSections";
import { getFeaturedEquipment } from "@/lib/api/equipment";

export default async function HomePage() {
  const featuredItems = await getFeaturedEquipment();

  return (
    <main>
      <HeroBanner />
      <FeaturedEquipment items={featuredItems} />
      <CategoriesSection />
      <WhyChooseUs />
      <HomeExtraSections />
    </main>
  );
}