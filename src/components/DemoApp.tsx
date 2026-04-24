import { useState, useEffect, useMemo, useCallback } from "react";
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
import {
  ArrowRight,
  CheckCircle2,
  Filter,
  ExternalLink,
  Layers,
  ArrowUpDown,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Industry = "all" | "healthcare" | "ecommerce" | "education" | "automotive";
type ProjectType = "all" | "mobile" | "web" | "ecommerce-app" | "education-app";
type SortKey = "newest" | "popular" | "az";

type Project = {
  cover: string;
  gallery: string[];
  name: string;
  tagline: string;
  industry: Exclude<Industry, "all">;
  type: Exclude<ProjectType, "all">;
  tags: string[];
  year: number;
  popularity: number;
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
    year: 2026,
    popularity: 98,
  },
  {
    cover: swasti1,
    gallery: [swasti1, swasti2],
    name: "New Swasti Diagnostic",
    tagline: "Diagnostic center with online appointments",
    industry: "healthcare",
    type: "web",
    tags: ["Web", "Booking", "WhatsApp"],
    year: 2025,
    popularity: 86,
  },
  {
    cover: pfc1,
    gallery: [pfc1, pfc2, pfc3],
    name: "PFC — Pure Fried Chicken",
    tagline: "Restaurant ordering & cart with WhatsApp checkout",
    industry: "ecommerce",
    type: "ecommerce-app",
    tags: ["Web", "Cart", "Food Delivery"],
    year: 2025,
    popularity: 92,
  },
  {
    cover: mcc1,
    gallery: [mcc1, mcc2, mcc3],
    name: "Modern Computer Centre",
    tagline: "NBCE certified institute — courses & admissions",
    industry: "education",
    type: "education-app",
    tags: ["Web", "LMS", "Admissions"],
    year: 2024,
    popularity: 78,
  },
  {
    cover: nmr1,
    gallery: [nmr1, nmr2],
    name: "NMR Motors",
    tagline: "Pre-owned car dealership with inventory search",
    industry: "automotive",
    type: "web",
    tags: ["Web", "Catalog", "Lead Gen"],
    year: 2024,
    popularity: 71,
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

const sorts: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Popular" },
  { value: "az", label: "A–Z" },
];

const features = [
  "Custom web & mobile app development",
  "Online booking & appointment systems",
  "WhatsApp & email integrations",
  "Payment gateway & cart checkout",
  "Admin dashboards & CSV exports",
  "Mobile-first responsive design",
];

const PAGE_SIZE = 3;

const labelOf = <T extends string>(arr: { value: T; label: string }[], v: T) =>
  arr.find((x) => x.value === v)?.label ?? "";

export const DemoApp = () => {
  const [industry, setIndustry] = useState<Industry>("all");
  const [type, setType] = useState<ProjectType>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [active, setActive] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const filtersActive = industry !== "all" || type !== "all";

  const filtered = useMemo(() => {
    const list = projects.filter(
      (p) => (industry === "all" || p.industry === industry) && (type === "all" || p.type === type),
    );
    const sorted = [...list];
    if (sort === "newest") sorted.sort((a, b) => b.year - a.year);
    if (sort === "popular") sorted.sort((a, b) => b.popularity - a.popularity);
    if (sort === "az") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [industry, type, sort]);

  // Reset pagination when filters/sort change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [industry, type, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const clearFilters = () => {
    setIndustry("all");
    setType("all");
  };

  const openProject = (p: Project) => {
    setActive(p);
    setActiveIndex(0);
    setLightbox(false);
  };

  const next = useCallback(() => {
    if (!active) return;
    setActiveIndex((i) => (i + 1) % active.gallery.length);
  }, [active]);

  const prev = useCallback(() => {
    if (!active) return;
    setActiveIndex((i) => (i - 1 + active.gallery.length) % active.gallery.length);
  }, [active]);

  // Keyboard nav (modal + lightbox)
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      else if (e.key === "Escape" && lightbox) { e.preventDefault(); setLightbox(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, lightbox, next, prev]);

  const summaryParts: string[] = [];
  if (industry !== "all") summaryParts.push(labelOf(industries, industry));
  if (type !== "all") summaryParts.push(labelOf(types, type));

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

        {/* Filters + Sort */}
        <div className="flex flex-col gap-3 mb-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 p-2 pl-3 rounded-full bg-card border border-border shadow-card">
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
            <div className="flex items-center gap-2 p-2 pl-3 rounded-full bg-card border border-border shadow-card">
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
            <div className="flex items-center gap-2 p-2 pl-3 rounded-full bg-card border border-border shadow-card">
              <ArrowUpDown className="h-4 w-4 text-accent shrink-0" />
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="flex-1 rounded-full border-0 bg-secondary text-xs sm:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sorts.map((s) => (
                    <SelectItem key={s.value} value={s.value}>Sort: {s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Summary + clear */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="text-xs sm:text-sm text-muted-foreground">
              {summaryParts.length > 0 ? (
                <>
                  <span className="text-foreground font-medium">Showing:</span>{" "}
                  <span className="text-primary-glow">{summaryParts.join(" + ")}</span>
                  <span className="text-muted-foreground"> · {filtered.length} project{filtered.length !== 1 ? "s" : ""}</span>
                </>
              ) : (
                <span>Showing all {filtered.length} projects · Sorted by {labelOf(sorts, sort)}</span>
              )}
            </div>
            {filtersActive && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
                <X className="h-3.5 w-3.5" /> Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-6 mt-4 min-h-[200px]">
          {visible.map((p, i) => (
            <button
              key={p.name}
              onClick={() => openProject(p)}
              className="group relative text-left rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-glow transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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

        {/* Load more */}
        {hasMore && (
          <div className="flex justify-center mb-12 md:mb-16">
            <Button
              variant="outlineGlow"
              size="lg"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            >
              Load more ({filtered.length - visibleCount} remaining)
            </Button>
          </div>
        )}
        {!hasMore && filtered.length > PAGE_SIZE && (
          <div className="text-center text-xs text-muted-foreground mb-12 md:mb-16">
            You've reached the end · {filtered.length} projects shown
          </div>
        )}
        {!hasMore && filtered.length <= PAGE_SIZE && <div className="mb-12 md:mb-16" />}

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

      {/* Project gallery modal */}
      <Dialog open={!!active} onOpenChange={(o) => { if (!o) { setActive(null); setLightbox(false); } }}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{active.name}</DialogTitle>
                <DialogDescription>
                  {active.tagline} · Use ← → keys to navigate
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {active.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary-glow border border-primary/20">
                    {t}
                  </span>
                ))}
              </div>

              {/* Featured image */}
              <div className="relative rounded-xl overflow-hidden border border-border bg-secondary">
                <button
                  onClick={() => setLightbox(true)}
                  className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Open full size view"
                >
                  <img
                    src={active.gallery[activeIndex]}
                    alt={`${active.name} screen ${activeIndex + 1}`}
                    className="w-full max-h-[55vh] object-contain bg-background mx-auto"
                  />
                </button>
                {active.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      aria-label="Previous screen"
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur border border-border hover:bg-background transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next screen"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur border border-border hover:bg-background transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-2 right-2 text-xs px-2 py-1 rounded-full bg-background/80 backdrop-blur border border-border">
                      {activeIndex + 1} / {active.gallery.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {active.gallery.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-3">
                  {active.gallery.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Show screen ${i + 1}`}
                      aria-current={i === activeIndex}
                      className={`rounded-lg overflow-hidden border transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        i === activeIndex ? "border-primary ring-1 ring-primary" : "border-border opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={src} alt="" className="w-full aspect-[16/10] object-cover object-top" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}

              <div className="flex justify-center pt-3">
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

      {/* Lightbox for big single-image view */}
      {active && lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} screen ${activeIndex + 1} full size`}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
            aria-label="Close full size view"
            className="absolute top-4 right-4 p-2 rounded-full bg-card border border-border hover:bg-secondary transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-5 w-5" />
          </button>
          {active.gallery.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous screen"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-card border border-border hover:bg-secondary transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next screen"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-card border border-border hover:bg-secondary transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <img
            src={active.gallery[activeIndex]}
            alt={`${active.name} screen ${activeIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs px-3 py-1.5 rounded-full bg-card border border-border">
            {activeIndex + 1} / {active.gallery.length} · Click outside or press Esc to close
          </div>
        </div>
      )}
    </section>
  );
};
