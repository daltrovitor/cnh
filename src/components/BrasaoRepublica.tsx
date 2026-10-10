// Hello World
/**
 * Brasão de Armas da República Federativa do Brasil e Selo de Segurança Nacional.
 */

export function BrasaoRepublica({ className = "h-10 w-10 text-amber-700" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden>
      {/* Estrela de 5 pontas central */}
      <polygon
        points="50,8 59,34 87,34 64,51 72,77 50,61 28,77 36,51 13,34 41,34"
        fill="#b8860b"
        opacity="0.9"
      />
      {/* Círculo central com estrelas */}
      <circle cx="50" cy="46" r="16" fill="#1e3a8a" />
      <circle cx="50" cy="46" r="14" fill="#0f172a" />
      {/* Cruzeiro do Sul */}
      <circle cx="50" cy="40" r="1.5" fill="#ffffff" />
      <circle cx="50" cy="52" r="1.5" fill="#ffffff" />
      <circle cx="44" cy="46" r="1.5" fill="#ffffff" />
      <circle cx="56" cy="45" r="1.5" fill="#ffffff" />
      <circle cx="53" cy="48" r="1" fill="#ffffff" />
      {/* Ramos de café e fumo */}
      <path
        d="M20,68 C24,80 38,88 50,88 C62,88 76,80 80,68"
        stroke="#15803d"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Faixa azul na base */}
      <path d="M26,82 Q50,86 74,82" stroke="#1d4ed8" strokeWidth="3" fill="none" />
      {/* Espada vertical estilizada */}
      <rect x="48.5" y="4" width="3" height="88" fill="#94a3b8" rx="1.5" opacity="0.6" />
    </svg>
  );
}

export function SeloBr({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <circle cx="30" cy="30" r="28" fill="#d4af37" stroke="#b8860b" strokeWidth="2" />
      <circle cx="30" cy="30" r="23" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="2,2" />
      <text
        x="30"
        y="37"
        fontSize="18"
        fontWeight="bold"
        fontFamily="sans-serif"
        textAnchor="middle"
        fill="#ffffff"
        letterSpacing="1"
      >
        BR
      </text>
    </svg>
  );
}

export function MapaEstado({ estado = "SP", className = "h-10 w-10 text-amber-600/70" }: { estado?: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden>
      {/* Silhueta estilizada do Estado */}
      <path d="M12,24 C16,18 28,14 42,16 C48,18 54,26 52,34 C50,42 44,48 38,54 C30,56 22,50 18,44 C14,38 10,30 12,24 Z" />
      <text
        x="32"
        y="36"
        fontSize="12"
        fontWeight="bold"
        fill="#ffffff"
        textAnchor="middle"
        opacity="0.9"
      >
        {estado}
      </text>
    </svg>
  );
}
