import Link from "next/link";
import Image from "next/image";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Documentation", href: "https://platform.misterpilot.online/docs" },
      { label: "VS Code Extension", href: "https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "mailto:support@misterpilot.online" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-and-conditions" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src="/icon.png"
                alt="MisterPilot"
                width={28}
                height={28}
                className="w-7 h-7 rounded-md"
              />
              <span className="font-bold text-text-primary text-sm tracking-tight">
                MisterPilot
              </span>
            </Link>
            <p className="text-xs text-text-muted leading-relaxed max-w-[180px]">
              DeepSeek API gateway for developers. One key. Full cost control.
            </p>
          </div>

          {/* Columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-muted hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-border">
          <p className="text-xs text-text-muted">
            © 2026 MisterPilot. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Built for developers in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
