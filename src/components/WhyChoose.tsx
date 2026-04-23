import { UserCheck, Zap, ShieldCheck, TrendingUp } from "lucide-react";

const items = [
  { icon: UserCheck, title: "Client-Focused", desc: "We prioritize your vision and goals, delivering solutions that exceed expectations." },
  { icon: Zap, title: "Fast Delivery", desc: "Agile process ensures quick turnaround without compromising quality." },
  { icon: ShieldCheck, title: "Reliable & Secure", desc: "Enterprise-grade security and reliability in every solution we build." },
  { icon: TrendingUp, title: "Scalable Solutions", desc: "Future-proof technology that grows with your business needs." },
];

export const WhyChoose = () => (
  <section className="py-24 bg-secondary/20 border-y border-border">
    <div className="container">
      <div className="text-center mb-16">
        <div className="text-sm tracking-[0.3em] text-primary uppercase mb-3">Why Trexolyte</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold">
          Empowering your vision with <span className="text-gradient">next-gen innovation</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it) => (
          <div key={it.title} className="text-center p-6 rounded-xl hover:bg-card transition-smooth">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary-glow/10 border border-primary/30 flex items-center justify-center mb-4">
              <it.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">{it.title}</h3>
            <p className="text-sm text-muted-foreground">{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
