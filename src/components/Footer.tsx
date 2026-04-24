import logo from "@/assets/trexolyte-logo.png";

export const Footer = () => (
  <footer className="border-t border-border bg-background pt-16 pb-8">
    <div className="container grid md:grid-cols-4 gap-10">
      <div className="md:col-span-1">
        <div className="flex items-center gap-3 mb-4">
          <img src={logo} alt="Trexolyte logo" className="h-12 w-12 rounded-full ring-1 ring-primary/40" />
          <div>
            <div className="font-display font-bold tracking-wider text-sm">TREXOLYTE</div>
            <div className="text-[10px] text-muted-foreground tracking-[0.25em]">TECHNOLOGIES</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Innovating the digital future with cutting-edge technology solutions.</p>
      </div>
      <div>
        <h5 className="font-display font-semibold mb-4 text-sm">Quick Links</h5>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {["Home", "Services", "Our Work", "About", "Contact"].map((l) => (
            <li key={l}><a href={`#${l.toLowerCase().replace(" ", "")}`} className="hover:text-foreground transition-smooth">{l}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h5 className="font-display font-semibold mb-4 text-sm">Services</h5>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>Web Development</li>
          <li>Mobile Apps</li>
          <li>Cloud Solutions</li>
          <li>Support & Maintenance</li>
        </ul>
      </div>
      <div>
        <h5 className="font-display font-semibold mb-4 text-sm">Contact</h5>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>Kolkata, West Bengal, India</li>
          <li>+91 62918 28459</li>
          <li>WhatsApp: +91 75858 25547</li>
          <li className="break-all">abbasmolla456@gmail.com</li>
        </ul>
      </div>
    </div>
    <div className="container mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
      © 2026 Trexolyte Technologies. All rights reserved.
    </div>
  </footer>
);
