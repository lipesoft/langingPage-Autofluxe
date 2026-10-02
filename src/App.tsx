import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import ProofStrip from "./components/sections/ProofStrip";
import OrderFlowDemo from "./components/sections/OrderFlowDemo";
import PlatformStrip from "./components/sections/PlatformStrip";
import FeatureShowcase from "./components/sections/FeatureShowcase";
import DashboardDemo from "./components/sections/DashboardDemo";
import UseCases from "./components/sections/UseCases";
import HowItWorks from "./components/sections/HowItWorks";
import FAQ from "./components/sections/FAQ";
import FinalCTA from "./components/sections/FinalCTA";

export default function App() {
  const [orderStage, setOrderStage] = useState(-1);

  useEffect(() => {
    if (orderStage < 0 || orderStage >= 4) return;
    const timeout = window.setTimeout(() => setOrderStage((current) => current + 1), 1200);
    return () => window.clearTimeout(timeout);
  }, [orderStage]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main>
        <Hero />
        <ProofStrip />
        <OrderFlowDemo stage={orderStage} onStart={() => setOrderStage(0)} />
        <PlatformStrip />
        <FeatureShowcase />
        <DashboardDemo orderStage={orderStage} />
        <UseCases />
        <HowItWorks />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
