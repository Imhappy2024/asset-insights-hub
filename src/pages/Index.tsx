import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExcelPreview from "@/components/ExcelPreview";
import IntegrationMarquee from "@/components/IntegrationMarquee";
import StatsBar from "@/components/StatsBar";
import FeaturesSection from "@/components/FeaturesSection";
import ReportsSection from "@/components/ReportsSection";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CaptureForm from "@/components/CaptureForm";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ExcelPreview />
      <IntegrationMarquee />
      <StatsBar />
      <FeaturesSection />
      <ReportsSection />
      <HowItWorks />
      <TestimonialsSection />
      <FAQSection />
      <CaptureForm />
      <FooterSection />
    </div>
  );
};

export default Index;
