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
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-md bg-white px-4 py-3 font-semibold text-ink shadow-lift focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <OrderFlowDemo stage={orderStage} onStart={() => setOrderStage(0)} />
        <ProofStrip />
        <PlatformStrip />
        <FeatureShowcase />
        <DashboardDemo orderStage={orderStage} />
        <UseCases />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
