// Hello World
/**
 * Ícones e curvas de pista específicos dos 4 botões oficiais da CDT (Image 4 e Image 5).
 */

export function RoadCurves() {
  return (
    <svg
      viewBox="0 0 160 100"
      className="pointer-events-none absolute inset-y-0 right-0 h-full w-48 opacity-30 select-none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M20,100 C60,60 85,35 160,15 L160,100 Z"
        fill="white"
        fillOpacity="0.3"
      />
      <path
        d="M0,100 C50,70 90,30 160,0"
        stroke="white"
        strokeWidth="3.5"
        strokeDasharray="6,6"
        fill="none"
      />
      <path
        d="M35,100 C75,65 110,32 160,8"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  );
}

/** Ícone CONDUTOR: Condutor ao lado do carro (Image 4) */
export function CondutorIcon({ className = "h-9 w-9 text-white drop-shadow-sm" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" className={className} fill="currentColor" aria-hidden>
      {/* Condutor */}
      <circle cx="15" cy="14" r="7" />
      <path d="M4,34 C4,26 10,23 20,23 C23,23 26,24 28,26 L26,34 Z" />
      {/* Carro ao lado */}
      <path d="M26,28 C28,20 34,16 45,16 C54,16 58,20 60,26 L62,32 C63,33 63,35 61,35 L59,35 C58,38 55,40 52,40 C49,40 46,38 45,35 L33,35 C32,38 29,40 26,40 C23,40 20,38 19,35 L20,32 Z" />
      {/* Rodas */}
      <circle cx="26" cy="35" r="3.5" fill="currentColor" />
      <circle cx="52" cy="35" r="3.5" fill="currentColor" />
      {/* Farol / Para-brisa */}
      <path d="M33,26 L38,20 L48,20 L53,26 Z" fill="white" fillOpacity="0.4" />
    </svg>
  );
}

/** Ícone VEÍCULOS: Carro visto de frente (Image 4) */
export function VeiculosIcon({ className = "h-9 w-9 text-white drop-shadow-sm" }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 48" className={className} fill="currentColor" aria-hidden>
      {/* Carroçaria frontal */}
      <path d="M12,18 C15,10 20,8 27,8 C34,8 39,10 42,18 L46,24 C48,26 49,29 48,32 L47,38 C47,40 45,41 43,41 L41,41 C39,41 38,39 38,37 L16,37 C16,39 15,41 13,41 L11,41 C9,41 7,40 7,38 L6,32 C5,29 6,26 8,24 Z" />
      {/* Para-brisa */}
      <path d="M14,18 L18,12 L36,12 L40,18 Z" fill="white" fillOpacity="0.4" />
      {/* Faróis */}
      <circle cx="13" cy="27" r="3.5" fill="white" fillOpacity="0.9" />
      <circle cx="41" cy="27" r="3.5" fill="white" fillOpacity="0.9" />
      {/* Grade */}
      <rect x="21" y="27" width="12" height="3" rx="1.5" fill="white" fillOpacity="0.6" />
      {/* Pneus inferiores */}
      <rect x="9" y="38" width="5" height="4" rx="1.5" />
      <rect x="40" y="38" width="5" height="4" rx="1.5" />
    </svg>
  );
}

/** Ícone INFRAÇÕES: Agente/policial com quepe ao lado do carro (Image 4) */
export function InfracoesIcon({ className = "h-9 w-9 text-white drop-shadow-sm" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" className={className} fill="currentColor" aria-hidden>
      {/* Agente com Quepe */}
      <ellipse cx="16" cy="11" rx="8" ry="2.5" />
      <circle cx="16" cy="14" r="5.5" />
      <path d="M6,34 C6,26 12,24 20,24 C23,24 26,25 28,27 L26,34 Z" />
      {/* Carro */}
      <path d="M26,28 C28,20 34,16 45,16 C54,16 58,20 60,26 L62,32 C63,33 63,35 61,35 L59,35 C58,38 55,40 52,40 C49,40 46,38 45,35 L33,35 C32,38 29,40 26,40 C23,40 20,38 19,35 L20,32 Z" />
      <circle cx="26" cy="35" r="3.5" fill="currentColor" />
      <circle cx="52" cy="35" r="3.5" fill="currentColor" />
      {/* Giroflex */}
      <rect x="42" y="13" width="5" height="3" rx="1" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

/** Ícone EDUCAÇÃO: Instrutor/pessoa ao lado do quadro/tela (Image 4) */
export function EducacaoIcon({ className = "h-9 w-9 text-white drop-shadow-sm" }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 48" className={className} fill="currentColor" aria-hidden>
      {/* Quadro / Monitor */}
      <rect x="16" y="10" width="34" height="25" rx="3" fill="currentColor" />
      <rect x="20" y="14" width="26" height="17" rx="1.5" fill="white" fillOpacity="0.35" />
      <rect x="30" y="35" width="6" height="6" fill="currentColor" />
      {/* Pessoa em frente */}
      <circle cx="12" cy="22" r="5" />
      <path d="M4,39 C4,32 8,30 16,30 C20,30 22,32 23,35 L23,39 Z" />
    </svg>
  );
}
