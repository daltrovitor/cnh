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

const ICON_CLASS = "h-12 w-auto text-white drop-shadow-sm";

/** Carro de lado, silhueta sólida com janelas e rodas vazadas */
function CarSide({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M2 30 L2 24 C2 21.5 3.5 20 6 19.5 L16 17 L23 8 C24 6.8 25.2 6.2 27 6.2 L41 6.2 C43 6.2 44.2 6.8 45.2 8 L51.5 17 L58 18.5 C60.5 19.2 62 21 62 23.5 L62 30 C62 31.2 61 32 60 32 L4 32 C2.9 32 2 31.2 2 30 Z" />
      <path d="M20 17 L25.5 10 L33 10 L33 17 Z M36 10 L41 10 L46.5 17 L36 17 Z" fill="#000" fillOpacity="0.28" />
      <circle cx="17" cy="32" r="6.2" />
      <circle cx="49" cy="32" r="6.2" />
      <circle cx="17" cy="32" r="2.6" fill="#000" fillOpacity="0.35" />
      <circle cx="49" cy="32" r="2.6" fill="#000" fillOpacity="0.35" />
    </g>
  );
}

/** Ícone CONDUTOR: condutor ao lado do carro */
export function CondutorIcon({ className = ICON_CLASS }: { className?: string }) {
  return (
    <svg viewBox="0 0 92 40" className={className} fill="currentColor" aria-hidden>
      <circle cx="12" cy="10" r="6.5" />
      <path d="M0 36 C0 26 5 22 12 22 C19 22 24 26 24 36 Z" />
      <CarSide x={28} />
    </svg>
  );
}

/** Ícone VEÍCULOS: carro de lado */
export function VeiculosIcon({ className = ICON_CLASS }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} fill="currentColor" aria-hidden>
      <CarSide />
    </svg>
  );
}

/** Ícone INFRAÇÕES: agente com quepe ao lado do carro */
export function InfracoesIcon({ className = ICON_CLASS }: { className?: string }) {
  return (
    <svg viewBox="0 0 92 40" className={className} fill="currentColor" aria-hidden>
      <path d="M4 7 C4 2.5 8 1 12 1 C16 1 20 2.5 20 7 L21 8.5 L3 8.5 Z" />
      <circle cx="12" cy="14" r="5.5" />
      <path d="M0 36 C0 27 5 23 12 23 C19 23 24 27 24 36 Z" />
      <CarSide x={28} />
    </svg>
  );
}

/** Ícone EDUCAÇÃO: pessoa em frente ao quadro/tela */
export function EducacaoIcon({ className = ICON_CLASS }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 44" className={className} fill="currentColor" aria-hidden>
      <rect x="20" y="4" width="42" height="28" rx="3" />
      <rect x="24" y="8" width="34" height="20" rx="1.5" fill="#000" fillOpacity="0.25" />
      <rect x="37" y="32" width="8" height="6" />
      <circle cx="11" cy="20" r="6" />
      <path d="M0 42 C0 32 5 29 12 29 C19 29 24 32 24 42 Z" />
    </svg>
  );
}
