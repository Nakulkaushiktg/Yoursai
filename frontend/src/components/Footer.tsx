import { Brain, Github, Twitter, Instagram, Shield, Linkedin } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Demo", href: "#demo" },
      { name: "Pricing", href: "#pricing" }
    ],
    company: [
      { name: "About", href: "#" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" }
    ],
    privacy: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "#" },
      { name: "Security", href: "#" },
      { name: "Data Protection", href: "#" }
    ]
  };

  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
<a href="/" className="flex items-center gap-2 mb-4 transition-neural hover:scale-105 w-fit">
              <img 
                src="/lovable-uploads/e6301409-809c-4a91-8a7d-02a8168b9c1e.png" 
                alt="YoursAI Logo" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                YoursAI
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              The ultimate personalized AI twin that learns your patterns, 
              respects your privacy, and automates your digital life.
            </p>
            <div className="flex items-center gap-4">
              <a href="/launching-soon" className="text-muted-foreground hover:text-primary transition-neural">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/your-sai/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-neural">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="/launching-soon" className="text-muted-foreground hover:text-primary transition-neural">
                <Github className="w-5 h-5" />
              </a>
              <a href="/launching-soon" className="text-muted-foreground hover:text-primary transition-neural">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-neural text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-neural text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-success" />
              Privacy
            </h4>
            <ul className="space-y-2">
              {footerLinks.privacy.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-neural text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 YoursAI. All rights reserved. Your data, your control.
          </p>
          <div className="flex items-center gap-2 text-sm text-success">
            <Shield className="w-4 h-4" />
            <span>100% Local-First & Privacy Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;