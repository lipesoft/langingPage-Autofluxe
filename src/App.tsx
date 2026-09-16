import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import PlatformStrip from "./components/sections/PlatformStrip";
import HowItWorks from "./components/sections/HowItWorks";
import FeatureShowcase from "./components/sections/FeatureShowcase";
import DashboardDemo from "./components/sections/DashboardDemo";
import UseCases from "./components/sections/UseCases";
import FinalCTA from "./components/sections/FinalCTA";

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main>
        <Hero />
        <PlatformStrip />
        <HowItWorks />
        <FeatureShowcase />
        <DashboardDemo />
        <UseCases />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
