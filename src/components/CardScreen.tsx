// Hello World
"use client";

import { ShieldCheck, X } from "lucide-react";
import { useRef, useState } from "react";
import type { Profile } from "@/lib/profile";
import { ScreenHeader } from "./ScreenHeader";
import { CnhCardFront, CnhCardBack, CnhVioQrSlide, CnhDetailsSlide } from "./CnhCard";
import { IconCnhHistorico } from "./BrasaoRepublica";

const SLIDES = [
  { id: "frente", label: "Frente da CNH" },
  { id: "verso", label: "Verso da CNH" },
  { id: "qrcode", label: "QR Code Vio" },
  { id: "detalhes", label: "Dados do Condutor" },
] as const;

export function CardScreen({ profile, onBack }: { profile: Profile; onBack: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [historyOpen, setHistoryOpen] = useState(false);

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

  return (
    <div className="screen-in flex min-h-dvh flex-col bg-[#f5f6fa] select-none">
      {/* Cabeçalho Oficial Navy exato da referência visual (Imagem 1) */}
      <ScreenHeader title="HABILITAÇÃO" onBack={onBack} />

      <main className="flex flex-1 flex-col pb-6">
        {/* Aviso Oficial Vio */}
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

        {/* Carrossel da CNH com 4 Páginas Oficiais */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto px-4"
          aria-roledescription="carrossel"
        >
          <div className="w-full shrink-0 snap-center pb-1">
            <CnhCardFront profile={profile} />
          </div>
          <div className="w-full shrink-0 snap-center pb-1">
            <CnhCardBack profile={profile} />
          </div>
          <div className="w-full shrink-0 snap-center pb-1">
            <CnhVioQrSlide profile={profile} />
          </div>
          <div className="w-full shrink-0 snap-center pb-1">
            <CnhDetailsSlide profile={profile} />
          </div>
        </div>

        {/* Indicador de exatamente 4 pontos (Dots) exato da Imagem 1: ● ○ ○ ○ */}
        <div role="tablist" aria-label="Páginas da habilitação" className="flex justify-center items-center gap-2 py-3.5">
          {SLIDES.map(({ id, label }, i) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={label}
              onClick={() => goTo(i)}
              className="flex h-6 w-6 items-center justify-center p-0 cursor-pointer"
            >
              <span
                className={`transition-all ${
                  active === i
                    ? "h-2 w-2 rounded-full bg-[#19234e]"
                    : "h-2 w-2 rounded-full border border-slate-400 bg-white"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Botão Único Inferior Oficial da Imagem 1 */}
        <div className="mt-auto flex flex-col px-4 pt-2">
          <button
            type="button"
            onClick={() => setHistoryOpen(true)}
            className="flex h-14 w-full items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white px-4 text-left shadow-sm transition-transform hover:bg-slate-50 active:scale-[0.99] cursor-pointer"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#19234e]/10 text-[#19234e]">
              <IconCnhHistorico className="h-5 w-5 text-[#19234e]" />
            </span>
            <span className="flex-1 text-sm font-bold text-[#19234e]">
              Histórico de emissões da CNH
            </span>
          </button>
        </div>
      </main>

      {/* Modal Histórico de Emissões */}
      {historyOpen && (
        <div className="fixed inset-0 z-30 flex items-end sm:items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Histórico de emissões">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-[#19234e]">Histórico de Emissões</h3>
              </div>
              <button
                type="button"
                onClick={() => setHistoryOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-3 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">1ª Emissão CNH:</span>
                <span className="font-bold text-slate-800">{profile.firstLicenseDate}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Última Renovação:</span>
                <span className="font-bold text-slate-800">12/03/2024</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Validade Atual:</span>
                <span className="font-bold text-emerald-700">{profile.validUntil}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Local de Emissão:</span>
                <span className="font-bold text-slate-800">{profile.birthPlace || "SÃO PAULO - SP"}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setHistoryOpen(false)}
              className="mt-5 h-11 w-full rounded-xl bg-[#19234e] text-xs font-bold text-white transition-transform active:scale-95 cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
