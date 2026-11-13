import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { WhyUs } from "@/components/site/WhyUs";
import { Industries } from "@/components/site/Industries";
import { Process } from "@/components/site/Process";
import { GlobalReach } from "@/components/site/GlobalReach";
import { Clients } from "@/components/site/ClientMarquee";
import { Team } from "@/components/site/Team";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-navy">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <WhyUs />
        <Industries />
        <Process />
        <GlobalReach />
        <Clients />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
