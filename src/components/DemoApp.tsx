import img1 from "@/assets/medical-app-1.jpeg";
import img2 from "@/assets/medical-app-2.jpeg";
import img3 from "@/assets/medical-app-3.jpeg";
import img4 from "@/assets/medical-app-4.jpeg";
import img5 from "@/assets/medical-app-5.jpeg";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const screens = [
  { src: img1, label: "Home & Quick Actions" },
  { src: img2, label: "Shop by Category" },
  { src: img3, label: "Pharmacy & Imaging" },
  { src: img4, label: "Consult Doctors" },
  { src: img5, label: "Health Packages" },
];

const features = [
  "Online medicine ordering with fast delivery",
  "Lab test & radiology scan booking",
  "Doctor consultation across 10+ specialties",
  "Prescription upload & e-pharmacy",
  "Health package subscriptions",
  "Multi-language & accessibility ready",
];

export const DemoApp = () => {
  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-3xl rounded-full" />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="text-sm tracking-[0.3em] text-accent uppercase mb-3">Live Demo Project</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Medical & Healthcare <span className="text-gradient">App Showcase</span>
          </h2>
          <p className="text-muted-foreground">A real-world example of what we build for our clients — pharmacy, diagnostics, doctor consultations, and more in one seamless mobile experience.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 mb-16">
          {screens.map((s, i) => (
            <div key={s.label} className="group relative" style={{ animation: `fade-up 0.6s ${i * 0.1}s both` }}>
              <div className="relative rounded-[2rem] p-2 bg-gradient-to-br from-primary/40 via-steel/30 to-primary-glow/30 shadow-elegant group-hover:shadow-glow transition-smooth">
                <div className="rounded-[1.6rem] overflow-hidden bg-background">
                  <img src={s.src} alt={`Medical app screen — ${s.label}`} className="w-full h-auto block" loading="lazy" />
                </div>
              </div>
              <div className="text-center mt-3 text-xs text-muted-foreground tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto p-8 rounded-2xl bg-card-gradient border border-border shadow-card">
          {features.map((f) => (
            <div key={f} className="flex gap-3 items-start">
              <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <span className="text-sm">{f}</span>
            </div>
          ))}
          <div className="md:col-span-2 flex justify-center pt-4">
            <Button variant="hero" size="lg" asChild>
              <a href="#booking">Book a Similar App for Your Business <ArrowRight /></a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
