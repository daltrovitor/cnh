// Hello World
/**
 * Rodapé oficial com as marcas Serpro, CNH do Brasil e Ministério dos Transportes.
 */

export function GovLogos() {
  return (
    <footer className="mt-auto flex w-full items-center justify-between gap-3 border-t border-slate-100 bg-[#f8f9fa] px-5 py-3.5 pb-[calc(1rem+env(safe-area-inset-bottom))] select-none">
      {/* 1. Logo Serpro */}
      <div className="flex shrink-0 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- logo oficial Serpro */}
        <img
          src="/logo-footer-serpro.png"
          alt="Serpro"
          className="h-6 w-auto object-contain opacity-90"
        />
      </div>

      {/* 2. Logo CNH do Brasil */}
      <div className="flex shrink-0 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- logo oficial CNH do Brasil */}
        <img
          src="/logo-footer-cnh.png"
          alt="CNH do Brasil"
          className="h-5 w-auto object-contain opacity-80"
        />
      </div>

      {/* 3. Logo Ministério dos Transportes + Bandeira */}
      <div className="flex shrink-0 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- logo Ministério dos Transportes */}
        <img
          src="/logo-footer-transportes.png"
          alt="Ministério dos Transportes"
          className="h-6 w-auto object-contain opacity-90"
        />
      </div>
    </footer>
  );
}
