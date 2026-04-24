import { useState } from "react";
import medical1 from "@/assets/medical-app-1.jpeg";
import medical2 from "@/assets/medical-app-2.jpeg";
import medical3 from "@/assets/medical-app-3.jpeg";
import medical4 from "@/assets/medical-app-4.jpeg";
import medical5 from "@/assets/medical-app-5.jpeg";
import pfc1 from "@/assets/project-pfc.png";
import pfc2 from "@/assets/project-pfc-2.png";
import pfc3 from "@/assets/project-pfc-3.png";
import mcc1 from "@/assets/project-mcc.png";
import mcc2 from "@/assets/project-mcc-2.png";
import mcc3 from "@/assets/project-mcc-3.png";
import nmr1 from "@/assets/project-nmr.png";
import nmr2 from "@/assets/project-nmr-2.png";
import swasti1 from "@/assets/project-swasti.png";
import swasti2 from "@/assets/project-swasti-2.png";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowRight, CheckCircle2, Filter, ExternalLink, Layers } from "lucide-react";

type Industry = "all" | "healthcare" | "ecommerce" | "education" | "automotive";
type ProjectType = "all" | "mobile" | "web" | "ecommerce-app" | "education-app";

type Project = {
  cover: string;
  gallery: string[];
  name: string;
  tagline: string;
  industry: Exclude<Industry, "all">;
  type: Exclude<ProjectType, "all">;
  tags: string[];
};

const projects: Project[] = [
  {
    cover: medical1,
    gallery: [medical1, medical2, medical3, medical4, medical5],
    name: "MediCare Plus",
    tagline: "Telemedicine, pharmacy & lab booking app",
    industry: "healthcare",
    type: "mobile",
    tags: ["Mobile App", "Telemedicine", "E-Pharmacy"],
  },
  {
    cover: swasti1,
    gallery: [swasti1, swasti2],
    name: "New Swasti Diagnostic",
    tagline: "Diagnostic center with online appointments",
    industry: "healthcare",
    type: "web",
    tags: ["Web", "Booking", "WhatsApp"],
  },
  {
    cover: pfc1,
    gallery: [pfc1, pfc2, pfc3],
    name: "PFC — Pure Fried Chicken",
    tagline: "Restaurant ordering & cart with WhatsApp checkout",
    industry: "ecommerce",
    type: "ecommerce-app",
    tags: ["Web", "Cart", "Food Delivery"],
  },
  {
    cover: mcc1,
    gallery: [mcc1, mcc2, mcc3],
    name: "Modern Computer Centre",
    tagline: "NBCE certified institute — courses & admissions",
    industry: "education",
    type: "education-app",
    tags: ["Web", "LMS", "Admissions"],
  },
  {
    cover: nmr1,
    gallery: [nmr1, nmr2],
    name: "NMR Motors",
    tagline: "Pre-owned car dealership with inventory search",
    industry: "automotive",
    type: "web",
    tags: ["Web", "Catalog", "Lead Gen"],
  },
];

const industries: { value: Industry; label: string }[] = [
  { value: "all", label: "All Industries" },
  { value: "healthcare", label: "Healthcare" },
  { value: "ecommerce", label: "E-commerce / Food" },
  { value: "education", label: "Education" },
  { value: "automotive", label: "Automotive" },
];

const types: { value: ProjectType; label: string }[] = [
  { value: "all", label: "All Project Types" },
  { value: "mobile", label: "Mobile App" },
  { value: "web", label: "Web" },
  { value: "ecommerce-app", label: "E-commerce" },
  { value: "education-app", label: "Education" },
];

const features = [
  "Custom web & mobile app development",
  "Online booking & appointment systems",
  "WhatsApp & email integrations",
  "Payment gateway & cart checkout",
  "Admin dashboards & CSV exports",
  "Mobile-first responsive design",
];

export const DemoApp = () => {
  const [industry, setIndustry] = useState<Industry>("all");
  const [type, setType] = useState<ProjectType>("all");
  const [active, setActive] = useState<Project | null>(null);

  const visible = projects.filter(
    (p) => (industry === "all" || p.industry === industry) && (type === "all" || p.type === type),
  );

  return (
    <section id="demo" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-3xl rounded-full" />

      <div className="container relative px-4">
        <div className="max-w-2xl mx-auto text-center mb-8 md:mb-10">
          <div className="text-xs md:text-sm tracking-[0.25em] md:tracking-[0.3em] text-accent uppercase mb-3">Our Client Work</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Real Projects, <span className="text-gradient">Real Results</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Browse digital products we've crafted across healthcare, retail, education and automotive industries. Tap any project to see all screens.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 mb-8 md:mb-10 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 p-2 pl-3 rounded-full bg-card border border-border shadow-card flex-1">
            <Filter className="h-4 w-4 text-accent shrink-0" />
            <Select value={industry} onValueChange={(v) => setIndustry(v as Industry)}>
              <SelectTrigger className="flex-1 rounded-full border-0 bg-secondary text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {industries.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 p-2 pl-3 rounded-full bg-card border border-border shadow-card flex-1">
            <Layers className="h-4 w-4 text-accent shrink-0" />
            <Select value={type} onValueChange={(v) => setType(v as ProjectType)}>
              <SelectTrigger className="flex-1 rounded-full border-0 bg-secondary text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {types.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16 min-h-[200px]">
          {visible.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActive(p)}
              className="group relative text-left rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-glow transition-smooth focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ animation: `fade-up 0.6s ${i * 0.08}s both` }}
            >
              <div className="aspect-[16/10] overflow-hidden bg-secondary relative">
                <img
                  src={p.cover}
                  alt={`${p.name} — ${p.tagline}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-smooth duration-700"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 text-[10px] md:text-xs px-2 py-1 rounded-full bg-background/80 backdrop-blur border border-border">
                  {p.gallery.length} screens
                </div>
              </div>
              <div className="p-4 md:p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-bold text-base md:text-lg leading-tight">{p.name}</h3>
                  <ExternalLink className="h-4 w-4 text-accent shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-smooth" />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">{p.tagline}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] md:text-xs px-2 py-1 rounded-full bg-primary/10 text-primary-glow border border-primary/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
          {visible.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12">No projects match these filters.</div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto p-5 md:p-8 rounded-2xl bg-card-gradient border border-border shadow-card">
          {features.map((f) => (
            <div key={f} className="flex gap-3 items-start">
              <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <span className="text-sm">{f}</span>
            </div>
          ))}
          <div className="md:col-span-2 flex justify-center pt-2 md:pt-4">
            <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
              <a href="#booking">Start a Project Like These <ArrowRight /></a>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{active.name}</DialogTitle>
                <DialogDescription>{active.tagline}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {active.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary-glow border border-primary/20">
                    {t}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {active.gallery.map((src, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-border bg-secondary">
                    <img src={src} alt={`${active.name} screen ${i + 1}`} className="w-full h-auto block" loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="flex justify-center pt-2">
                <Button variant="hero" asChild>
                  <a href="#booking" onClick={() => setActive(null)}>
                    Build something similar <ArrowRight />
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
