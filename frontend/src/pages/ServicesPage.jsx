import { Navbar } from "@/components/site/Navbar";
import { Services } from "@/components/site/Services";
import { Footer } from "@/components/site/Footer";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Services contactHref="/#contact" />
      </main>
      <Footer />
    </>
  );
}
