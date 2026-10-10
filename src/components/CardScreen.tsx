// Hello World
"use client";

import { ChevronRight, UserRoundPen } from "lucide-react";
import { useRef, useState } from "react";
import type { Profile } from "@/lib/profile";
import { ScreenHeader } from "./ScreenHeader";
import { StudentCardBack, StudentCardFront } from "./StudentCard";

const SLIDES = ["Frente", "Verso"] as const;

export function CardScreen({ profile, onBack, onEdit }: { profile: Profile; onBack: () => void; onEdit: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  }

  function goTo(index: number) {
    const el = trackRef.current;
    el?.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="screen-in flex min-h-dvh flex-col bg-white">
      <ScreenHeader title="CARTEIRINHA" onBack={onBack} />
      <main className="flex flex-1 flex-col">
        <p className="px-4 py-3 text-center text-xs text-muted">Documento fictício, criado para fins acadêmicos.</p>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          aria-roledescription="carrossel"
        >
          <div className="w-full shrink-0 snap-center px-6 pb-2">
            <StudentCardFront profile={profile} />
          </div>
          <div className="w-full shrink-0 snap-center px-6 pb-2">
            <StudentCardBack profile={profile} />
          </div>
        </div>

        <div role="tablist" aria-label="Lado da carteirinha" className="flex justify-center gap-1 py-2">
          {SLIDES.map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={label}
              onClick={() => goTo(i)}
              className="flex h-12 w-12 items-center justify-center"
            >
              <span
                className={`h-2.5 w-2.5 rounded-full border border-navy transition-colors ${active === i ? "bg-navy" : "bg-white"}`}
              />
            </button>
          ))}
        </div>

        <div className="mt-auto border-t border-line pb-[env(safe-area-inset-bottom)]">
          <button
            type="button"
            onClick={onEdit}
            className="flex h-14 w-full items-center gap-3 px-5 text-left text-sm font-semibold text-navy hover:bg-surface"
          >
            <UserRoundPen aria-hidden className="h-5 w-5" />
            <span className="flex-1">Alterar foto e dados</span>
            <ChevronRight aria-hidden className="h-4 w-4 text-muted" />
          </button>
        </div>
      </main>
    </div>
  );
}
