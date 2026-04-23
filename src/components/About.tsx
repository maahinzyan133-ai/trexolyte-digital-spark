import logo from "@/assets/trexolyte-logo.png";

const stats = [
  { label: "Innovation", desc: "Cutting-edge solutions" },
  { label: "Quality", desc: "Excellence in delivery" },
  { label: "Support", desc: "24/7 availability" },
  { label: "Value", desc: "Competitive pricing" },
];

export const About = () => (
  <section id="about" className="py-24">
    <div className="container grid lg:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/10 blur-3xl rounded-full" />
        <img src={logo} alt="Trexolyte Technologies emblem" className="relative w-full max-w-md mx-auto rounded-3xl shadow-elegant ring-1 ring-primary/30" />
      </div>
      <div className="space-y-6">
        <div className="text-sm tracking-[0.3em] text-primary uppercase">About Us</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold">
          About <span className="text-gradient">Trexolyte Technologies</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          At Trexolyte Technologies, we turn bold ideas into powerful digital solutions. Based in Kolkata, India, we're a team of passionate developers and designers committed to delivering excellence.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our mission is to empower businesses with innovative technology that drives growth, efficiency, and success. We combine technical expertise with creative thinking to deliver results that matter.
        </p>
        <div className="grid grid-cols-2 gap-4 pt-4">
          {stats.map((s) => (
            <div key={s.label} className="p-4 rounded-xl bg-card border border-border">
              <div className="font-display font-semibold text-lg text-gradient">{s.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
