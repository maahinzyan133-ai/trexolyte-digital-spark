import { Code2, Smartphone, Cloud, Headphones, ShoppingCart, Store, UtensilsCrossed, CalendarCheck, Bike, Truck, HeartPulse, GraduationCap, Landmark, Home, Users, Kanban } from "lucide-react";

const core = [
  { icon: Code2, title: "Custom Software & Web App Development", desc: "High-performance, scalable web applications built with modern technologies tailored to your business needs." },
  { icon: Smartphone, title: "Android & iOS Mobile Applications", desc: "Native and cross-platform mobile apps that deliver seamless experiences on every device." },
  { icon: Cloud, title: "Advanced Cloud & Modern Tech Integration", desc: "Cloud-powered solutions with cutting-edge tech to keep your business competitive and scalable." },
  { icon: Headphones, title: "Complete Support & Maintenance", desc: "Comprehensive support and maintenance at the most affordable prices to keep systems running smoothly." },
];

const ecosystem = [
  { icon: ShoppingCart, title: "E-Commerce", items: ["Online shopping", "Dropshipping", "Multi-vendor marketplaces", "Subscriptions & memberships"] },
  { icon: Store, title: "Retail & POS", items: ["In-store POS systems", "Inventory management", "Loyalty & rewards", "QR code payment"] },
  { icon: UtensilsCrossed, title: "Food & Restaurant", items: ["Restaurant ordering/delivery", "Table reservations", "Grocery delivery", "Cloud kitchen mgmt"] },
  { icon: CalendarCheck, title: "Booking & Reservation", items: ["Hotel/accommodation", "Flight/travel", "Salon/Spa appointments", "Doctor/Clinic apps"] },
  { icon: Bike, title: "On-Demand Service", items: ["Ride-hailing/Taxi", "Home service booking", "Freelancer hiring", "Laundry pickup/delivery"] },
  { icon: Truck, title: "Logistics & Delivery", items: ["Last-mile delivery tracking", "Courier dispatch/route", "Warehouse mgmt", "Fleet/vehicle tracking"] },
  { icon: HeartPulse, title: "Healthcare & Medical", items: ["Telemedicine consultations", "EHR systems", "Pharmacy delivery", "Lab test booking"] },
  { icon: GraduationCap, title: "Education & E-Learning", items: ["Online course platforms", "Live tutoring", "Exam preparation", "School management"] },
  { icon: Landmark, title: "Finance & Banking", items: ["Mobile banking", "Digital wallets/UPI", "Stock trading/investment", "Loan application"] },
  { icon: Home, title: "Real Estate & Property", items: ["Property listing/search", "Virtual tours/3D walkthrough", "Real estate agent CRM", "Mortgage calculator"] },
  { icon: Users, title: "Human Resources (HR)", items: ["Employee attendance", "Payroll/salary slip", "Recruitment portals", "Performance tracking"] },
  { icon: Kanban, title: "Project Mgmt & Collaboration", items: ["Task/to-do list", "Team chat/file sharing", "Gantt chart/timeline", "Time tracking"] },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="text-sm tracking-[0.3em] text-primary uppercase mb-3">What We Offer</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Comprehensive <span className="text-gradient">Digital Solutions</span>
          </h2>
          <p className="text-muted-foreground">Everything you need to transform your business and accelerate growth.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {core.map((s) => (
            <div key={s.title} className="group relative p-8 rounded-2xl bg-card-gradient border border-border hover:border-primary/40 transition-smooth shadow-card hover:shadow-elegant overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-smooth" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-5 shadow-glow">
                  <s.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <div className="text-sm tracking-[0.3em] text-accent uppercase mb-3">Complete Ecosystem</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Business App <span className="text-gradient">Ecosystem Directory</span>
          </h2>
          <p className="text-muted-foreground mt-3">12 industries. Endless possibilities. One technology partner.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {ecosystem.map((e, i) => (
            <div key={e.title} className="p-6 rounded-xl bg-card border border-border hover:border-primary/40 hover:-translate-y-1 transition-smooth shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <e.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground tracking-widest">0{i + 1 < 10 ? i + 1 : i + 1}</div>
                  <h4 className="font-display font-semibold text-sm">{e.title}</h4>
                </div>
              </div>
              <ul className="space-y-1.5">
                {e.items.map((it) => (
                  <li key={it} className="text-xs text-muted-foreground flex gap-2">
                    <span className="text-accent">▸</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
