import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/trexolyte-logo.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Demo App", href: "#demo" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="container flex items-center justify-between h-20">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="Trexolyte Technologies logo" className="h-12 w-12 rounded-full object-cover ring-1 ring-primary/40" />
          <div className="leading-tight hidden sm:block">
            <div className="font-display font-bold text-sm tracking-wider">TREXOLYTE</div>
            <div className="text-[10px] text-muted-foreground tracking-[0.25em]">TECHNOLOGIES</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button variant="hero" size="sm" asChild>
            <a href="#booking">Book Appointment</a>
          </Button>
        </div>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95">
          <div className="container py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm">
                {l.label}
              </a>
            ))}
            <Button variant="hero" size="sm" asChild>
              <a href="#booking">Book Appointment</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
