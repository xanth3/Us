import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import ProductPage from "@/components/ProductPage";
import RecommendedSection from "@/components/RecommendedSection";
import StickyCartBar from "@/components/StickyCartBar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <ProductPage />
      <RecommendedSection />
      <Footer />
      <StickyCartBar />
    </div>
  );
};

export default Index;
