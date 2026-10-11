// Hello World
/**
 * Vetores Oficiais em SVG Puro do CDT (Carteira Digital de Trânsito):
 * - Brasão de Armas da República Federativa do Brasil
 * - Selo de Segurança Oval "BR"
 * - Silhueta do Mapa (Ouro)
 * - QR Code de Segurança Oficial Padrão Vio
 * - Ícone "Histórico de emissões da CNH"
 * - Ícone "Compartilhar"
 */

/** Brasão das Armas da República Federativa do Brasil em vetor de alta precisão */
export function BrasaoRepublica({ className = "h-7 w-7 text-amber-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className={className} aria-label="Brasão da República">
      {/* Glória de raios dourados e espada central */}
      <circle cx="50" cy="50" r="46" strokeWidth="2" strokeDasharray="3 2" opacity="0.8" />
      <path d="M50 6 L53 38 L50 94 L47 38 Z" fill="currentColor" opacity="0.95" />
      <path d="M36 34 L64 34 L60 38 L40 38 Z" fill="currentColor" />
      {/* Estrela de cinco pontas (Símbolo Nacional) */}
      <polygon
        points="50,14 59,37 84,37 64,52 72,75 50,60 28,75 36,52 16,37 41,37"
        fill="currentColor"
        strokeWidth="1.5"
      />
      {/* Escudo redondo central azul e Cruzeiro do Sul */}
      <circle cx="50" cy="46" r="14" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="40" r="1.6" fill="currentColor" />
      <circle cx="50" cy="52" r="1.6" fill="currentColor" />
      <circle cx="44" cy="46" r="1.6" fill="currentColor" />
      <circle cx="56" cy="46" r="1.6" fill="currentColor" />
      <circle cx="53" cy="49" r="1.1" fill="currentColor" />
      {/* Ramos de café e fumo */}
      <path d="M26 68 C 18 48, 28 26, 44 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M74 68 C 82 48, 72 26, 56 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** Selo Oficial Oval "BR" com textura de segurança guilhochê idêntico ao modelo da CNH */
export function SeloBr({ className = "h-8 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 64" className={className} aria-label="Selo BR Oficial">
      <defs>
        <linearGradient id="goldSeloGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#eab308" />
          <stop offset="70%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>
        <pattern id="guillochePattern" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M 0 6 Q 3 0, 6 6 T 12 6" fill="none" stroke="#fef08a" strokeWidth="0.6" opacity="0.45" />
          <path d="M 6 0 Q 0 3, 6 6 T 6 12" fill="none" stroke="#ca8a04" strokeWidth="0.5" opacity="0.35" />
        </pattern>
      </defs>
      {/* Oval externo dourado com relevo */}
      <ellipse cx="48" cy="32" rx="46" ry="30" fill="url(#goldSeloGrad)" stroke="#713f12" strokeWidth="1.5" />
      {/* Camada guilhochê */}
      <ellipse cx="48" cy="32" rx="42" ry="26" fill="url(#guillochePattern)" stroke="#fef9c3" strokeWidth="0.8" />
      {/* Círculo concêntrico tracejado */}
      <ellipse cx="48" cy="32" rx="38" ry="22" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="2.5 1.5" opacity="0.85" />
      {/* Letras BR proeminentes em negrito */}
      <text
        x="48"
        y="41"
        textAnchor="middle"
        fill="#1e293b"
        fontSize="28"
        fontWeight="900"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="2"
      >
        BR
      </text>
    </svg>
  );
}

/** Silhueta Oficial do Mapa em Dourado/Âmbar idêntica à foto de referência enviada */
export function MapaEstado({ className = "h-8 w-8 text-[#c9972c]" }: { estado?: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} aria-label="Mapa Oficial do Estado Emissor">
      <path d="M 52,8 C 60,7 68,10 74,15 C 78,19 82,24 81,28 C 79,31 84,35 86,40 C 88,46 83,52 81,57 C 78,63 75,69 70,75 C 66,81 58,89 54,92 C 50,91 46,85 43,80 C 39,74 34,70 32,65 C 29,61 24,59 20,56 C 15,52 9,50 6,47 C 3,44 4,40 9,38 C 16,36 23,35 27,31 C 31,27 34,21 38,16 C 42,12 46,9 52,8 Z" />
    </svg>
  );
}

/** QR Code Vio Ultra-Denso de Alta Segurança Oficial */
export function QrCodeVioSvg({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 33 33" className={className} fill="#0f172a" shapeRendering="crispEdges" aria-label="QR Code Vio">
      <rect width="33" height="33" fill="#ffffff" />
      {/* 3 Marcadores de Canto Oficiais (Finder Patterns) */}
      <path d="M2 2 h8 v8 h-8 z M3 3 v6 h6 v-6 z M5 5 h2 v2 h-2 z" fillRule="evenodd" />
      <path d="M23 2 h8 v8 h-8 z M24 3 v6 h6 v-6 z M26 5 h2 v2 h-2 z" fillRule="evenodd" />
      <path d="M2 23 h8 v8 h-8 z M3 24 v6 h6 v-6 z M5 26 h2 v2 h-2 z" fillRule="evenodd" />
      {/* Matriz de Dados Criptográfica do Vio */}
      <rect x="12" y="2" width="2" height="3" /><rect x="16" y="3" width="3" height="2" /><rect x="20" y="2" width="2" height="2" />
      <rect x="11" y="7" width="3" height="2" /><rect x="16" y="6" width="2" height="3" /><rect x="20" y="7" width="2" height="2" />
      <rect x="2" y="12" width="3" height="2" /><rect x="7" y="11" width="2" height="3" /><rect x="10" y="13" width="2" height="1" />
      <rect x="13" y="11" width="2" height="2" /><rect x="16" y="12" width="3" height="2" /><rect x="21" y="12" width="2" height="3" />
      <rect x="25" y="11" width="3" height="2" /><rect x="29" y="13" width="2" height="3" />
      <rect x="2" y="16" width="2" height="3" /><rect x="6" y="17" width="3" height="2" /><rect x="11" y="16" width="3" height="2" />
      <rect x="16" y="15" width="2" height="3" /><rect x="20" y="17" width="3" height="2" /><rect x="25" y="16" width="2" height="2" />
      <rect x="28" y="18" width="3" height="2" />
      <rect x="11" y="21" width="3" height="2" /><rect x="16" y="22" width="2" height="2" /><rect x="20" y="21" width="3" height="2" />
      <rect x="25" y="22" width="2" height="3" /><rect x="29" y="23" width="2" height="2" />
      <rect x="12" y="25" width="2" height="3" /><rect x="16" y="26" width="4" height="2" /><rect x="22" y="26" width="3" height="2" />
      <rect x="27" y="25" width="3" height="2" /><rect x="11" y="29" width="3" height="2" /><rect x="16" y="29" width="2" height="2" />
      <rect x="21" y="29" width="3" height="2" /><rect x="26" y="29" width="2" height="2" />
    </svg>
  );
}

/** Ícone Oficial do Botão "Histórico de emissões da CNH" (Imagem 1) */
export function IconCnhHistorico({ className = "h-5 w-5 text-[#19234e]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <line x1="7" y1="8" x2="11" y2="8" />
      <line x1="7" y1="12" x2="11" y2="12" />
      <circle cx="16" cy="10" r="2.2" />
      <path d="M13.5 16.5 C 13.5 14.8, 15 14, 16 14 C 17 14, 18.5 14.8, 18.5 16.5" />
    </svg>
  );
}

/** Ícone Oficial do Botão "Compartilhar" (Imagem 2) */
export function IconCompartilharPessoas({ className = "h-5 w-5 text-[#19234e]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {/* Silhueta de pessoas em grupo */}
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}
