import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import MarkdownContent from "@/components/legal/MarkdownContent";

export const metadata = {
  title: "Privacy Policy — MisterPilot",
};

export default function PrivacyPolicyPage() {
  const content = fs.readFileSync(
    path.join(process.cwd(), "privacy-policy.md"),
    "utf-8"
  );

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-10">
          <Link href="/" className="flex items-center gap-2 text-text-muted hover:text-text-secondary transition-colors">
            <Image src="/icon.png" alt="MisterPilot" width={28} height={28} className="rounded-lg" />
            <span className="text-sm font-medium">MisterPilot</span>
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-xl p-8">
          <MarkdownContent content={content} />
        </div>

        <p className="text-center text-xs text-text-muted mt-8">
          <Link href="/terms-and-conditions" className="hover:text-text-secondary transition-colors">
            Terms and Conditions
          </Link>
          {" · "}
          <Link href="/" className="hover:text-text-secondary transition-colors">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
