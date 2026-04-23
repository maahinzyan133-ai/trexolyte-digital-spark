import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock, Mail, Phone, MapPin, MessageCircle, CheckCircle2, Download } from "lucide-react";
import { toast } from "sonner";

const services = [
  "Custom Web Application",
  "Mobile App (Android/iOS)",
  "E-Commerce Platform",
  "Medical / Healthcare App",
  "Booking & Reservation System",
  "POS / Retail System",
  "Cloud Integration",
  "Other",
];

const slots = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];

const FOUNDER_EMAIL = "abbasmolla456@gmail.com";
const FOUNDER_WHATSAPP = "917585825547"; // +91 75858 25547
const STORAGE_KEY = "trexolyte_bookings";

type BookingRecord = {
  submittedAt: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
};

export const Booking = () => {
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", date: "", time: "", message: "" });

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setCount(Array.isArray(stored) ? stored.length : 0);
    } catch { setCount(0); }
  }, [submitted]);

  const buildSummary = (b: typeof form) =>
    `New Appointment Request — Trexolyte Technologies\n\n` +
    `Name: ${b.name}\nEmail: ${b.email}\nPhone/WhatsApp: ${b.phone}\n` +
    `Service: ${b.service}\nPreferred Date: ${b.date || "Not specified"}\n` +
    `Preferred Time: ${b.time || "Not specified"}\n\n` +
    `Project Details:\n${b.message || "—"}\n\n` +
    `— Sent from trexolyte.com booking form`;

  const persistBooking = (b: typeof form) => {
    try {
      const stored: BookingRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      stored.push({ submittedAt: new Date().toISOString(), ...b });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch (e) { console.error(e); }
  };

  const openWhatsApp = (b: typeof form) => {
    const msg = encodeURIComponent(buildSummary(b));
    window.open(`https://wa.me/${FOUNDER_WHATSAPP}?text=${msg}`, "_blank", "noopener");
  };

  const openEmail = (b: typeof form) => {
    const subject = encodeURIComponent(`Appointment Request — ${b.name} (${b.service})`);
    const body = encodeURIComponent(
      `Hello Abbas Ali Molla,\n\n` +
      `A new appointment request has been submitted on the Trexolyte website.\n\n` +
      buildSummary(b) +
      `\n\nA copy of this summary has been sent to the client at ${b.email}.`
    );
    // Send to founder + cc the client so they receive the confirmation summary
    const cc = encodeURIComponent(b.email);
    window.location.href = `mailto:${FOUNDER_EMAIL}?cc=${cc}&subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.service) {
      toast.error("Please fill in all required fields");
      return;
    }
    persistBooking(form);
    setSubmitted(true);
    toast.success("Opening WhatsApp & email confirmation…");
    openWhatsApp(form);
    setTimeout(() => openEmail(form), 600);
  };

  const exportCSV = () => {
    try {
      const stored: BookingRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (stored.length === 0) { toast.error("No bookings saved yet"); return; }
      const headers = ["Submitted At", "Name", "Email", "Phone", "Service", "Date", "Time", "Message"];
      const escape = (v: string) => `"${(v || "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
      const rows = stored.map((b) => [b.submittedAt, b.name, b.email, b.phone, b.service, b.date, b.time, b.message].map(escape).join(","));
      const csv = [headers.join(","), ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `trexolyte-bookings-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Exported ${stored.length} booking${stored.length > 1 ? "s" : ""}`);
    } catch (e) {
      console.error(e);
      toast.error("Failed to export bookings");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="booking" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero opacity-60" />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-sm tracking-[0.3em] text-accent uppercase mb-3">Book a Free Consultation</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Schedule Your <span className="text-gradient">Project Appointment</span>
          </h2>
          <p className="text-muted-foreground">Tell us about your idea — we'll set up a 30-minute discovery call to map out your digital roadmap.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 p-8 rounded-2xl bg-card-gradient border border-border shadow-elegant">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="h-16 w-16 text-accent mx-auto" />
                <h3 className="font-display text-2xl font-bold">Appointment Requested!</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We've opened WhatsApp with your details and prepared an email confirmation. Just hit send in both apps to lock in your slot — Abbas will reply within 2 hours.
                </p>
                <div className="flex flex-wrap gap-3 justify-center pt-2">
                  <Button variant="hero" onClick={() => openWhatsApp(form)}><MessageCircle /> Resend on WhatsApp</Button>
                  <Button variant="outlineGlow" onClick={() => openEmail(form)}><Mail /> Resend via Email</Button>
                  <Button variant="ghost" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", service: "", date: "", time: "", message: "" }); }}>Book Another</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone / WhatsApp *</Label>
                    <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98xxx xxxxx" />
                  </div>
                  <div className="space-y-2">
                    <Label>Service Required *</Label>
                    <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                      <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
                      <SelectContent>
                        {services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2"><CalendarIcon className="h-4 w-4" /> Preferred Date</Label>
                    <Input id="date" type="date" min={today} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Clock className="h-4 w-4" /> Preferred Time</Label>
                    <Select value={form.time} onValueChange={(v) => setForm({ ...form, time: v })}>
                      <SelectTrigger><SelectValue placeholder="Pick a slot" /></SelectTrigger>
                      <SelectContent>
                        {slots.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about your project</Label>
                  <Textarea id="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Briefly describe what you'd like to build..." />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  <MessageCircle /> Confirm via WhatsApp + Email
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Submitting opens WhatsApp & your email app with a prefilled appointment summary sent to our founder Abbas Ali Molla.
                </p>
              </form>
            )}
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
              <h4 className="font-display font-semibold mb-4">Contact Information</h4>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3"><MapPin className="h-5 w-5 text-primary shrink-0" /><div><div className="font-medium">Location</div><div className="text-muted-foreground">Kolkata, West Bengal, India</div></div></div>
                <div className="flex gap-3"><Phone className="h-5 w-5 text-primary shrink-0" /><div><div className="font-medium">Call Us</div><div className="text-muted-foreground">+91 62918 28459</div></div></div>
                <div className="flex gap-3"><MessageCircle className="h-5 w-5 text-accent shrink-0" /><div><div className="font-medium">WhatsApp</div><div className="text-muted-foreground">+91 75858 25547</div></div></div>
                <div className="flex gap-3"><Mail className="h-5 w-5 text-primary shrink-0" /><div><div className="font-medium">Email</div><div className="text-muted-foreground break-all">{FOUNDER_EMAIL}</div></div></div>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
              <h4 className="font-display font-semibold mb-4 flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> Business Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Mon – Fri</span><span>9 AM – 6 PM</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Saturday</span><span>10 AM – 4 PM</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Sunday</span><span>Closed</span></div>
              </div>
            </div>
            <a href={`https://wa.me/${FOUNDER_WHATSAPP}`} target="_blank" rel="noreferrer" className="block p-5 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 border border-accent/30 hover:border-accent transition-smooth">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-accent" />
                <div>
                  <div className="font-display font-semibold">Quick Chat on WhatsApp</div>
                  <div className="text-xs text-muted-foreground">Instant reply within minutes</div>
                </div>
              </div>
            </a>
            <div className="p-5 rounded-2xl bg-card border border-dashed border-border">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div>
                  <div className="font-display font-semibold text-sm">Team Export</div>
                  <div className="text-xs text-muted-foreground">{count} booking{count !== 1 ? "s" : ""} saved on this device</div>
                </div>
              </div>
              <Button variant="outlineGlow" size="sm" className="w-full" onClick={exportCSV}>
                <Download /> Download CSV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
