import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import logo from "@/assets/trexolyte-logo.png";

export const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-24 overflow-hidden bg-hero">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary-glow/10 blur-3xl" />

      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs tracking-wider uppercase text-muted-foreground">Innovating the Digital Future</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05]">
            Turning <span className="text-gradient">Bold Ideas</span> Into Powerful Digital Solutions
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            From high-performance software systems to smart mobile apps and cloud-powered technology — we build everything your business needs to stay ahead.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href="#booking">Start Your Project <ArrowRight /></a>
            </Button>
            <Button variant="outlineGlow" size="xl" asChild>
              <a href="#services">Explore Services</a>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
            {[
              { n: "100+", l: "Projects Delivered" },
              { n: "50+", l: "Happy Clients" },
              { n: "24/7", l: "Support Available" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient">{s.n}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl" />
          <div className="relative w-[28rem] h-[28rem] max-w-full flex items-center justify-center animate-float">
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin-slow" />
            <div className="absolute inset-8 rounded-full border border-primary/10 animate-spin-slow" style={{ animationDirection: "reverse" }} />
            <img src={logo} alt="Trexolyte gear emblem" className="relative w-72 h-72 object-cover rounded-full shadow-glow ring-2 ring-primary/30" />
          </div>
        </div>
      </div>
    </section>
  );
};
