// Hello World
import { ChevronLeft } from "lucide-react";

export function ScreenHeader({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle?: string;
  onBack: () => void;
}) {
  return (
    <header className="sticky top-0 z-10 bg-[#19234e] pt-[env(safe-area-inset-top)] text-white shadow-sm">
      <div className="flex h-16 items-center gap-3 px-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a386b] text-white transition-opacity hover:opacity-90 active:scale-95 cursor-pointer shrink-0"
        >
          <ChevronLeft aria-hidden className="h-6 w-6 stroke-[2.5]" />
        </button>
        <div className="flex flex-col min-w-0">
          <h1 className="text-base font-bold tracking-wider text-white uppercase leading-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <span className="text-[11px] font-medium text-slate-300 uppercase tracking-tight truncate leading-tight">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
