import { BookOpen } from "lucide-react";

interface TopNavProps {
  title: string;
}

export default function TopNav({ title }: TopNavProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-bg-primary/80 backdrop-blur-md border-b border-border flex items-center justify-between px-8">
      <h1 className="text-lg font-semibold text-text-primary tracking-tight">
        {title}
      </h1>

      <a
        href="https://misterpilot.online"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border text-sm font-medium text-text-secondary hover:text-text-primary hover:border-gold/50 hover:bg-bg-secondary transition-colors"
      >
        <BookOpen className="w-4 h-4" />
        Docs
      </a>
    </header>
  );
}
