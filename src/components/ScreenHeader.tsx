// Hello World
import { ChevronLeft } from "lucide-react";

export function ScreenHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header className="sticky top-0 z-10 bg-navy pt-[env(safe-area-inset-top)] text-white">
      <div className="flex h-14 items-center gap-1 px-2">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar"
          className="flex h-12 w-12 items-center justify-center rounded-md transition-colors hover:bg-white/10 active:bg-white/20"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-navy">
            <ChevronLeft aria-hidden className="h-5 w-5" />
          </span>
        </button>
        <h1 className="text-sm font-bold tracking-wide">{title}</h1>
      </div>
    </header>
  );
}
