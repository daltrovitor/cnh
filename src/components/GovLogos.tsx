// Hello World
/**
 * Rodapé com as marcas oficiais do Governo Federal, Ministério dos Transportes e CNH do Brasil.
 */

export function GovLogos() {
  return (
    <footer className="mt-auto flex w-full items-center justify-between gap-2 border-t border-slate-100 bg-white px-4 py-3.5 pb-[calc(1rem+env(safe-area-inset-bottom))]">
      {/* 1. Logo CNH do Brasil */}
      <div className="flex shrink-0 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- logo oficial PNG */}
        <img
          src="/logo-brasil.png"
          alt="CNH do Brasil"
          className="h-10 w-auto object-contain"
        />
      </div>

      {/* 2. Ministério dos Transportes */}
      <div className="flex flex-col text-left">
        <span className="text-[8.5px] font-black tracking-wider text-slate-800 uppercase">
          Ministério dos
        </span>
        <span className="text-[9.5px] font-black tracking-tight text-slate-900 uppercase">
          Transportes
        </span>
      </div>

      {/* 3. Governo Federal do Brasil */}
      <div className="flex items-center gap-1.5">
        <div className="flex flex-col text-right">
          <span className="text-[7.5px] font-extrabold tracking-widest text-slate-700 uppercase">
            Governo do
          </span>
          <div className="flex items-center gap-0.5">
            <span className="text-xs font-black tracking-tight text-[#16a34a]">B</span>
            <span className="text-xs font-black tracking-tight text-[#facc15]">R</span>
            <span className="text-xs font-black tracking-tight text-[#2563eb]">A</span>
            <span className="text-xs font-black tracking-tight text-[#dc2626]">S</span>
            <span className="text-xs font-black tracking-tight text-[#16a34a]">I</span>
            <span className="text-xs font-black tracking-tight text-[#2563eb]">L</span>
          </div>
          <span className="text-[6.5px] font-bold text-slate-500 uppercase">
            Do lado do povo brasileiro
          </span>
        </div>
      </div>
    </footer>
  );
}
