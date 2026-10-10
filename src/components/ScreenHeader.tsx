// Hello World
import { ChevronLeft } from "lucide-react";

export function ScreenHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header className="sticky top-0 z-10 bg-[#19234e] pt-[env(safe-area-inset-top)] text-white shadow-sm">
      <div className="flex h-16 items-center gap-3 px-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a386b] text-white transition-opacity hover:opacity-90 active:scale-95"
        >
          <ChevronLeft aria-hidden className="h-6 w-6 stroke-[2.5]" />
        </button>
        <h1 className="text-base font-bold tracking-wider text-white uppercase">{title}</h1>
      </div>
    </header>
  );
}
