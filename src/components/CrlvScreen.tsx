// Hello World
"use client";

import { Users } from "lucide-react";
import { useRef, useState } from "react";
import type { Profile } from "@/lib/profile";
import { ScreenHeader } from "./ScreenHeader";
import { CrlvDocFront } from "./CrlvCard";

const SLIDES = [
  { id: "crlv-frente", label: "CRLV-e Principal" },
  { id: "crlv-veiculo", label: "Dados do Veículo" },
  { id: "crlv-qrcode", label: "Validação QR Code" },
  { id: "crlv-seguro", label: "Taxas e Licenciamento" },
] as const;

export function CrlvScreen({ profile, onBack }: { profile: Profile; onBack: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [shareNotice, setShareNotice] = useState(false);

  function handleScroll() {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    if (next >= 0 && next < SLIDES.length) {
      setActive(next);
    }
  }

  function goTo(index: number) {
    const el = trackRef.current;
    el?.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
    setActive(index);
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: "CRLV-e Digital",
        text: `CRLV-e Digital do Veículo Placa: ${profile.plate} - Renavam: ${profile.renavam}`,
      }).catch(() => {});
    } else {
      setShareNotice(true);
      setTimeout(() => setShareNotice(false), 2500);
    }
  }

  return (
    <div className="screen-in flex min-h-dvh flex-col bg-[#f5f6fa]">
      <ScreenHeader title="LICENCIAMENTO" onBack={onBack} />

      <main className="flex flex-1 flex-col pb-6">
        {/* Banner oficial Vio */}
        <div className="py-2.5 px-4 text-center">
          <p className="text-[12.5px] font-medium text-[#19234e]">
            Verifique autenticidade do QR Code com o app{" "}
            <a
              href="https://servicos.serpro.gov.br/vio/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#1d4ed8] underline hover:text-blue-800"
            >
              Vio
            </a>
          </p>
        </div>

        {/* Carrossel do CRLV-e */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto px-4"
          aria-roledescription="carrossel"
        >
          <div className="w-full shrink-0 snap-center pb-2">
            <CrlvDocFront profile={profile} />
          </div>
          <div className="w-full shrink-0 snap-center pb-2">
            <div className="relative aspect-[0.67] w-full max-w-[360px] mx-auto flex flex-col justify-between rounded-xl border border-slate-300 bg-white p-4 shadow-sm text-slate-800">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-[#19234e] uppercase">Status de Licenciamento</h3>
                <p className="text-[10px] text-slate-500">Exercício Atual: {profile.exerciseYear}</p>
              </div>
              <div className="flex flex-col gap-2 py-2 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Placa:</span>
                  <span className="font-mono font-bold text-blue-900">{profile.plate}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">RENAVAM:</span>
                  <span className="font-mono font-bold">{profile.renavam}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Chassi:</span>
                  <span className="font-mono font-bold text-[10px]">{profile.chassis}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">IPVA:</span>
                  <span className="font-bold text-emerald-700">QUITADO</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Licenciamento:</span>
                  <span className="font-bold text-emerald-700">EMITIDO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Restrições Financeiras:</span>
                  <span className="font-bold text-slate-700">NENHUMA</span>
                </div>
              </div>
              <div className="rounded-md bg-emerald-50 p-2 text-center text-[10px] text-emerald-800 font-medium">
                Veículo licenciado e apto para circulação nacional
              </div>
            </div>
          </div>
          <div className="w-full shrink-0 snap-center pb-2">
            <div className="relative aspect-[0.67] w-full max-w-[360px] mx-auto flex flex-col items-center justify-between rounded-xl border border-slate-300 bg-white p-5 text-center shadow-sm">
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#19234e]">
                  Validação SENATRAN
                </span>
                <span className="text-xs text-slate-500">
                  Leitura de segurança e QR Code
                </span>
              </div>
              <div className="aspect-square w-44 rounded border-2 border-slate-900 p-2">
                <svg viewBox="0 0 25 25" className="h-full w-full" fill="#0f172a" shapeRendering="crispEdges" aria-hidden>
                  <rect width="25" height="25" fill="#fff" />
                  <rect x="1" y="1" width="6" height="6" />
                  <rect x="2" y="2" width="4" height="4" fill="#fff" />
                  <rect x="3" y="3" width="2" height="2" />
                  <rect x="18" y="1" width="6" height="6" />
                  <rect x="19" y="2" width="4" height="4" fill="#fff" />
                  <rect x="20" y="3" width="2" height="2" />
                  <rect x="1" y="18" width="6" height="6" />
                  <rect x="2" y="19" width="4" height="4" fill="#fff" />
                  <rect x="3" y="20" width="2" height="2" />
                  <rect x="9" y="4" width="2" height="4" />
                  <rect x="13" y="2" width="3" height="2" />
                  <rect x="8" y="10" width="4" height="2" />
                  <rect x="14" y="9" width="2" height="3" />
                  <rect x="9" y="15" width="3" height="3" />
                  <rect x="16" y="15" width="2" height="2" />
                  <rect x="13" y="19" width="4" height="3" />
                </svg>
              </div>
              <div className="text-[10px] text-slate-600 font-mono">
                Código de Segurança: {profile.claSecurityCode}
              </div>
            </div>
          </div>
          <div className="w-full shrink-0 snap-center pb-2">
            <div className="relative aspect-[0.67] w-full max-w-[360px] mx-auto flex flex-col justify-between rounded-xl border border-slate-300 bg-white p-4 text-slate-800 shadow-sm text-xs">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="font-bold text-[#19234e] uppercase text-xs">Histórico do Registro</h3>
                <p className="text-[10px] text-slate-500">Base Nacional de Veículos (RENAVAM)</p>
              </div>
              <div className="flex flex-col gap-2">
                <p><strong>Município de Registro:</strong> SÃO PAULO - SP</p>
                <p><strong>Tipo de Carroceria:</strong> FECHADA</p>
                <p><strong>Capacidade:</strong> 5 PASSAGEIROS</p>
                <p><strong>Potência / Cilindrada:</strong> 84CV / 999CC</p>
                <p><strong>Combustível:</strong> {profile.fuel}</p>
                <p><strong>Cor Predominante:</strong> {profile.color}</p>
              </div>
              <div className="rounded bg-slate-100 p-2 text-center text-[10px] text-slate-600 font-mono">
                Assinado digitalmente por SERPRO / SENATRAN
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de 4 pontos */}
        <div role="tablist" aria-label="Páginas do documento" className="flex justify-center items-center gap-2 py-3">
          {SLIDES.map(({ id, label }, i) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={label}
              onClick={() => goTo(i)}
              className="flex h-8 w-8 items-center justify-center p-0"
            >
              <span
                className={`transition-all ${
                  active === i
                    ? "h-2.5 w-2.5 rounded-full bg-[#19234e] ring-2 ring-[#19234e]/30"
                    : "h-2 w-2 rounded-full border border-slate-400 bg-white"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Botão de ação oficial da Imagem 4 */}
        <div className="mt-auto flex flex-col gap-2.5 px-4 pt-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex h-14 w-full items-center gap-3.5 rounded-xl border border-slate-200/90 bg-white px-4 text-left shadow-sm transition-transform hover:bg-slate-50 active:scale-[0.99]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#19234e]/10 text-[#19234e]">
              <Users aria-hidden className="h-5 w-5" />
            </span>
            <span className="flex-1 text-sm font-bold text-[#19234e]">
              Compartilhar
            </span>
            {shareNotice && (
              <span className="text-xs font-semibold text-emerald-700">Link pronto para envio!</span>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
