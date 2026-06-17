import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Dashboard from "@/components/Dashboard";
import DeepWork from "@/components/DeepWork";
import DecisionJournal from "@/components/DecisionJournal";
import EnergyLayer from "@/components/EnergyLayer";
import Reflection from "@/components/Reflection";
import Philosophy from "@/components/Philosophy";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative w-full">
        <Hero />
        <div id="problem">
          <Problem />
        </div>
        <Dashboard />
        <DeepWork />
        <DecisionJournal />
        <EnergyLayer />
        <Reflection />
        <Philosophy />
        <FinalCTA />
      </main>
    </>
  );
}
