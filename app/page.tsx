import HomeHeader from "@/components/home/HomeHeader";
import BetaBanner from "@/components/home/BetaBanner";
import JobAnalysisForm from "@/components/home/JobAnalysisForm";
import Footer from "@/components/home/Footer";
import Feedback from "@/components/home/result/Feedback";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 selection:bg-emerald-500/30 flex flex-col font-sans relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 inset-x-0 h-125 bg-linear-to-b from-emerald-500/10 via-emerald-500/5 to-transparent pointer-events-none" />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 md:py-20 z-10 relative">
        <HomeHeader />

        <BetaBanner />

        <JobAnalysisForm />

        {/* <PromoBox /> */}

        {/* <Feedback /> */}

        <Footer />
      </main>
    </div>
  );
}
