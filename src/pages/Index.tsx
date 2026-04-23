import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { DemoApp } from "@/components/DemoApp";
import { WhyChoose } from "@/components/WhyChoose";
import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <Hero />
      <Services />
      <DemoApp />
      <WhyChoose />
      <About />
      <section id="contact"><Booking /></section>
    </main>
    <Footer />
  </div>
);

export default Index;
