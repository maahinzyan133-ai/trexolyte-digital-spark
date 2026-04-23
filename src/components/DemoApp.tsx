import { useState } from "react";
import img1 from "@/assets/medical-app-1.jpeg";
import img2 from "@/assets/medical-app-2.jpeg";
import img3 from "@/assets/medical-app-3.jpeg";
import img4 from "@/assets/medical-app-4.jpeg";
import img5 from "@/assets/medical-app-5.jpeg";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, CheckCircle2, Filter } from "lucide-react";

type Department = "all" | "telemedicine" | "ehr" | "pharmacy" | "lab";

const screens: { src: string; label: string; departments: Department[] }[] = [
  { src: img1, label: "Home & Quick Actions", departments: ["telemedicine", "ehr", "pharmacy", "lab"] },
  { src: img2, label: "Shop by Category", departments: ["pharmacy"] },
  { src: img3, label: "Pharmacy & Imaging", departments: ["pharmacy", "lab"] },
  { src: img4, label: "Consult Doctors", departments: ["telemedicine", "ehr"] },
  { src: img5, label: "Health Packages", departments: ["lab", "ehr"] },
];

const departments: { value: Department; label: string }[] = [
  { value: "all", label: "All Departments" },
  { value: "telemedicine", label: "Telemedicine" },
  { value: "ehr", label: "EHR / Records" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "lab", label: "Lab Tests & Imaging" },
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
  const [filter, setFilter] = useState<Department>("all");
  const visible = filter === "all" ? screens : screens.filter((s) => s.departments.includes(filter));

  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-3xl rounded-full" />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="text-sm tracking-[0.3em] text-accent uppercase mb-3">Live Demo Project</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Medical & Healthcare <span className="text-gradient">App Showcase</span>
          </h2>
          <p className="text-muted-foreground">A real-world example of what we build for our clients — pharmacy, diagnostics, doctor consultations, and more in one seamless mobile experience.</p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3 p-2 pl-4 rounded-full bg-card border border-border shadow-card">
            <Filter className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground hidden sm:inline">Filter by department:</span>
            <Select value={filter} onValueChange={(v) => setFilter(v as Department)}>
              <SelectTrigger className="w-[200px] rounded-full border-0 bg-secondary"><SelectValue /></SelectTrigger>
              <SelectContent>
                {departments.map((d) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16 min-h-[200px]">
          {visible.map((s, i) => (
            <div key={s.label} className="group relative" style={{ animation: `fade-up 0.6s ${i * 0.1}s both` }}>
              <div className="relative rounded-[2rem] p-2 bg-gradient-to-br from-primary/40 via-steel/30 to-primary-glow/30 shadow-elegant group-hover:shadow-glow transition-smooth">
                <div className="rounded-[1.6rem] overflow-hidden bg-background">
                  <img src={s.src} alt={`Medical app screen — ${s.label}`} className="w-full h-auto block" loading="lazy" />
                </div>
              </div>
              <div className="text-center mt-3 text-xs text-muted-foreground tracking-wide">{s.label}</div>
            </div>
          ))}
          {visible.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12">No screens match this department yet.</div>
          )}
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
