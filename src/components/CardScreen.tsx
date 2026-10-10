// Hello World
"use client";

import { CreditCard, Share2, ShieldCheck, X } from "lucide-react";
import { useRef, useState } from "react";
import type { Profile } from "@/lib/profile";
import { ScreenHeader } from "./ScreenHeader";
import { CnhCardFront, CnhVioQrSlide } from "./CnhCard";

const SLIDES = [
  { id: "frente", label: "Frente da CNH" },
  { id: "qrcode", label: "QR Code Vio" },
] as const;

export function CardScreen({ profile, onBack }: { profile: Profile; onBack: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState(false);

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

  function handleExport() {
    if (navigator.share) {
      navigator.share({
        title: "CNH Digital",
        text: `CNH Digital de ${profile.name} - Nº Registro: ${profile.registerNumber}`,
      }).catch(() => {});
    } else {
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 2500);
    }
  }

  return (
    <div className="screen-in flex min-h-dvh flex-col bg-[#f5f6fa]">
      {/* Cabeçalho Oficial Navy exato da referência visual (Image 4) */}
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

        {/* Carrossel da CNH com APENAS 2 páginas (Frente e QR Code) */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto px-4"
          aria-roledescription="carrossel"
        >
          <div className="w-full shrink-0 snap-center pb-2">
            <CnhCardFront profile={profile} />
          </div>
          <div className="w-full shrink-0 snap-center pb-2">
            <CnhVioQrSlide profile={profile} />
          </div>
        </div>

        {/* Indicador de exatamente 2 pontos (Dots) exato da instrução */}
        <div role="tablist" aria-label="Páginas da habilitação" className="flex justify-center items-center gap-2 py-3">
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

        {/* Ações inferiores da referência visual (Image 4) */}
        <div className="mt-auto flex flex-col gap-2.5 px-4 pt-2">
          {/* 1. Histórico de emissões da CNH */}
          <button
            type="button"
            onClick={() => setHistoryOpen(true)}
            className="flex h-14 w-full items-center gap-3.5 rounded-xl border border-slate-200/90 bg-white px-4 text-left shadow-sm transition-transform hover:bg-slate-50 active:scale-[0.99]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#19234e]/10 text-[#19234e]">
              <CreditCard aria-hidden className="h-5 w-5" />
            </span>
            <span className="flex-1 text-sm font-bold text-[#19234e]">
              Histórico de emissões da CNH
            </span>
          </button>

          {/* 2. Compartilhar / Exportar */}
          <button
            type="button"
            onClick={handleExport}
            className="flex h-14 w-full items-center gap-3.5 rounded-xl border border-slate-200/90 bg-white px-4 text-left shadow-sm transition-transform hover:bg-slate-50 active:scale-[0.99]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#19234e]/10 text-[#19234e]">
              <Share2 aria-hidden className="h-5 w-5" />
            </span>
            <span className="flex-1 text-sm font-bold text-[#19234e]">
              Exportar CNH digital
            </span>
            {copiedNotice && (
              <span className="text-xs font-semibold text-emerald-700">Link copiado!</span>
            )}
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
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-3 text-xs">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900">Emissão Atual (Vigente)</span>
                  <span className="rounded bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold text-white">ATIVA</span>
                </div>
                <p className="mt-1 text-slate-600">RENACH: {profile.registerNumber}</p>
                <p className="text-slate-600">Data de Validade: {profile.validUntil}</p>
                <p className="text-slate-600">Categoria: {profile.category}</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">1ª Habilitação</span>
                  <span className="text-[10px] font-bold text-slate-500">HISTÓRICO</span>
                </div>
                <p className="mt-1 text-slate-500">Data de Registro: {profile.firstLicenseDate}</p>
                <p className="text-slate-500">Órgão Emissor: DETRAN / {profile.state}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
