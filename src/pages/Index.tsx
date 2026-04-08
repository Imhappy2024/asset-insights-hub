import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import IntegrationMarquee from "@/components/IntegrationMarquee";
import StatsBar from "@/components/StatsBar";
import FeaturesSection from "@/components/FeaturesSection";
import ExcelPreview from "@/components/ExcelPreview";
import ReportsSection from "@/components/ReportsSection";
import HowItWorks from "@/components/HowItWorks";
import FAQSection from "@/components/FAQSection";
import CaptureForm from "@/components/CaptureForm";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <IntegrationMarquee />
      <StatsBar />
      <FeaturesSection />
      <ExcelPreview />
      <ReportsSection />
      <HowItWorks />
      <FAQSection />
      <CaptureForm />
      <FooterSection />
    </div>
  );
};

export default Index;
