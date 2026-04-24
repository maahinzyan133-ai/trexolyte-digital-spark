import { useState } from "react";
import medicalImg from "@/assets/medical-app-1.jpeg";
import pfcImg from "@/assets/project-pfc.png";
import mccImg from "@/assets/project-mcc.png";
import nmrImg from "@/assets/project-nmr.png";
import swastiImg from "@/assets/project-swasti.png";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, CheckCircle2, Filter, ExternalLink } from "lucide-react";

type Category = "all" | "healthcare" | "ecommerce" | "education" | "automotive";

type Project = {
  src: string;
  name: string;
  tagline: string;
  category: Exclude<Category, "all">;
  tags: string[];
};

const projects: Project[] = [
  {
    src: medicalImg,
    name: "MediCare Plus",
    tagline: "Telemedicine, pharmacy & lab booking app",
    category: "healthcare",
    tags: ["Mobile App", "Telemedicine", "E-Pharmacy"],
  },
  {
    src: swastiImg,
    name: "New Swasti Diagnostic",
    tagline: "Diagnostic center with online appointments",
    category: "healthcare",
    tags: ["Web", "Booking", "WhatsApp"],
  },
  {
    src: pfcImg,
    name: "PFC — Pure Fried Chicken",
    tagline: "Restaurant ordering & cart with WhatsApp checkout",
    category: "ecommerce",
    tags: ["Web", "Cart", "Food Delivery"],
  },
  {
    src: mccImg,
    name: "Modern Computer Centre",
    tagline: "NBCE certified institute — courses & admissions",
    category: "education",
    tags: ["Web", "LMS", "Admissions"],
  },
  {
    src: nmrImg,
    name: "NMR Motors",
    tagline: "Pre-owned car dealership with inventory search",
    category: "automotive",
    tags: ["Web", "Catalog", "Lead Gen"],
  },
];

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All Industries" },
  { value: "healthcare", label: "Healthcare" },
  { value: "ecommerce", label: "E-commerce / Food" },
  { value: "education", label: "Education" },
  { value: "automotive", label: "Automotive" },
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
  const [filter, setFilter] = useState<Category>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

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
            A glimpse into the digital products we've crafted for clients across healthcare, retail, education and automotive industries.
          </p>
        </div>

        <div className="flex justify-center mb-8 md:mb-10">
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:pl-4 rounded-full bg-card border border-border shadow-card w-full max-w-sm sm:w-auto">
            <Filter className="h-4 w-4 text-accent shrink-0 ml-2 sm:ml-0" />
            <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">Filter by industry:</span>
            <Select value={filter} onValueChange={(v) => setFilter(v as Category)}>
              <SelectTrigger className="flex-1 sm:w-[200px] rounded-full border-0 bg-secondary text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16 min-h-[200px]">
          {visible.map((p, i) => (
            <article
              key={p.name}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-glow transition-smooth"
              style={{ animation: `fade-up 0.6s ${i * 0.08}s both` }}
            >
              <div className="aspect-[16/10] overflow-hidden bg-secondary">
                <img
                  src={p.src}
                  alt={`${p.name} — ${p.tagline}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-smooth duration-700"
                  loading="lazy"
                />
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
            </article>
          ))}
          {visible.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12">No projects in this industry yet.</div>
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
    </section>
  );
};
