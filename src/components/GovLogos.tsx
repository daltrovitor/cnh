// Hello World
/**
 * Rodapé oficial com as marcas Serpro, CNH do Brasil e Ministério dos Transportes
 * Convertidas 100% em vetores SVG nativos e ampliadas com alta fidelidade visual.
 */

export function GovLogos() {
  return (
    <footer className="mt-auto flex w-full items-center justify-between gap-3 border-t border-slate-200/80 bg-[#f8f9fa] px-5 py-4 pb-[calc(1.2rem+env(safe-area-inset-bottom))] select-none">
      {/* 1. Logo Serpro em Vetor SVG Ampliado */}
      <div className="flex shrink-0 items-center">
        <svg viewBox="0 0 115 32" className="h-8 w-auto fill-[#19234e]" aria-label="Serpro">
          <path d="M8 7 C14 7, 16 10, 16 13 C16 17, 12 18, 7 19 C2 20, 0 22, 0 25 C0 29, 4 31, 10 31 C16 31, 20 28, 20 28 L18 24 C18 24, 14 26, 10 26 C6 26, 4 24, 4 22 C4 19, 8 18, 13 17 C18 16, 20 13, 20 10 C20 5, 15 3, 8 3 C3 3, 0 5, 0 5 L2 9 C2 9, 5 7, 8 7 Z" />
          <text x="26" y="24" fontSize="19" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5">
            serpro
          </text>
        </svg>
      </div>

      {/* 2. Logo CNH do Brasil em Vetor SVG Ampliado */}
      <div className="flex shrink-0 items-center">
        <svg viewBox="0 0 120 34" className="h-8 w-auto" aria-label="CNH do Brasil">
          <rect x="1" y="2" width="30" height="30" rx="7" fill="#15803d" />
          <path d="M8 17 L14 23 L24 11" stroke="#facc15" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="37" y="16" fontSize="10.5" fontWeight="900" fill="#19234e" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.2">
            CNH DO
          </text>
          <text x="37" y="28" fontSize="11" fontWeight="900" fill="#15803d" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.2">
            BRASIL
          </text>
        </svg>
      </div>

      {/* 3. Logo Ministério dos Transportes + Governo Federal em Vetor SVG Ampliado */}
      <div className="flex shrink-0 items-center">
        <svg viewBox="0 0 145 34" className="h-8 w-auto" aria-label="Ministério dos Transportes">
          {/* Bandeira estilizada do Brasil */}
          <rect x="1" y="4" width="32" height="24" rx="3.5" fill="#15803d" />
          <polygon points="17,6 30,16 17,26 4,16" fill="#facc15" />
          <circle cx="17" cy="16" r="5" fill="#1e3a8a" />
          <text x="39" y="14" fontSize="8" fontWeight="800" fill="#19234e" fontFamily="system-ui, -apple-system, sans-serif">
            MINISTÉRIO DOS
          </text>
          <text x="39" y="25" fontSize="9" fontWeight="900" fill="#19234e" fontFamily="system-ui, -apple-system, sans-serif">
            TRANSPORTES
          </text>
        </svg>
      </div>
    </footer>
  );
}
