// Hello World
"use client";

import { Check, PenTool, RotateCw, ShieldCheck, X } from "lucide-react";
import { useRef, useState } from "react";
import type { Profile } from "@/lib/profile";
import { ScreenHeader } from "./ScreenHeader";
import { CnhCardFront, CnhCardBack, CnhVioQrSlide, CnhDetailsSlide } from "./CnhCard";
import { IconCnhHistorico } from "./BrasaoRepublica";
import { SignatureModal } from "./SignatureModal";

const SLIDES = [
  { id: "frente", label: "Frente da CNH" },
  { id: "verso", label: "Verso da CNH" },
  { id: "qrcode", label: "QR Code Vio" },
  { id: "detalhes", label: "Dados do Condutor" },
] as const;

export function CardScreen({
  profile,
  onBack,
  onSave,
}: {
  profile: Profile;
  onBack: () => void;
  onSave?: (profile: Profile) => boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [isSideways, setIsSideways] = useState(true); // Padrão CDT ("de lado" conforme solicitado)
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  const [signatureSuccessToast, setSignatureSuccessToast] = useState(false);

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

  function handleSaveSignature(signatureDataUrl: string) {
    const updated: Profile = {
      ...profile,
      signature: signatureDataUrl,
    };
    onSave?.(updated);
    setSignatureSuccessToast(true);
    setTimeout(() => {
      setSignatureSuccessToast(false);
    }, 2500);
  }

  return (
    <div className="screen-in flex min-h-dvh flex-col bg-[#f5f6fa] select-none">
      {/* Cabeçalho Oficial Navy exato da referência visual */}
      <ScreenHeader title="HABILITAÇÃO" onBack={onBack} />

      <main className="flex flex-1 flex-col pb-6">
        {/* Barra de utilidades superiores: Aviso Vio + Controles Rápidos */}
        <div className="flex flex-col gap-2 px-4 pt-2 pb-1">
          <div className="text-center">
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

          {/* Botões de Ação Rápida: Girar Documento & Assinar Carteira */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            {/* Alternar Visualização: De Lado (CDT) vs Reto */}
            <button
              type="button"
              onClick={() => setIsSideways((s) => !s)}
              className="flex h-9 items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 text-xs font-bold text-[#19234e] shadow-xs hover:bg-slate-50 active:scale-98 cursor-pointer transition-all"
            >
              <RotateCw className="h-3.5 w-3.5 text-[#19234e]" />
              <span>{isSideways ? "Exibir Reto" : "Exibir De Lado (CDT)"}</span>
            </button>

            {/* Criar / Alterar Assinatura do Portador */}
            <button
              type="button"
              onClick={() => setSignatureModalOpen(true)}
              className="flex h-9 items-center gap-1.5 rounded-full border border-[#19234e] bg-[#19234e] px-3.5 text-xs font-bold text-white shadow-xs hover:bg-blue-900 active:scale-98 cursor-pointer transition-all"
            >
              <PenTool className="h-3.5 w-3.5" />
              <span>Assinar Carteira</span>
            </button>
          </div>
        </div>

        {/* Notificação toast de assinatura gravada */}
        {signatureSuccessToast && (
          <div className="mx-4 mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-1.5 px-3 text-xs font-bold text-white shadow-sm animate-in fade-in duration-200">
            <Check className="h-3.5 w-3.5" />
            <span>Assinatura estampada na CNH com sucesso!</span>
          </div>
        )}

        {/* Carrossel da CNH com 4 Páginas Oficiais */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto px-4 mt-1"
          aria-roledescription="carrossel"
        >
          <div className="w-full shrink-0 snap-center pb-1 flex justify-center">
            <CnhCardFront
              profile={profile}
              isSideways={isSideways}
              onSign={() => setSignatureModalOpen(true)}
            />
          </div>
          <div className="w-full shrink-0 snap-center pb-1 flex justify-center">
            <CnhCardBack profile={profile} isSideways={isSideways} />
          </div>
          <div className="w-full shrink-0 snap-center pb-1 flex justify-center">
            <CnhVioQrSlide profile={profile} />
          </div>
          <div className="w-full shrink-0 snap-center pb-1 flex justify-center">
            <CnhDetailsSlide profile={profile} />
          </div>
        </div>

        {/* Indicador de exatamente 4 pontos (Dots): ● ○ ○ ○ */}
        <div
          role="tablist"
          aria-label="Páginas da habilitação"
          className="flex justify-center items-center gap-2 py-3"
        >
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

        {/* Botão Único Inferior Oficial */}
        <div className="mt-auto flex flex-col px-4 pt-1">
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

      {/* Modal Interativo de Desenho / Upload / Geração de Assinatura */}
      <SignatureModal
        isOpen={signatureModalOpen}
        onClose={() => setSignatureModalOpen(false)}
        onSave={handleSaveSignature}
        currentSignature={profile.signature}
        driverName={profile.name}
      />

      {/* Modal Histórico de Emissões */}
      {historyOpen && (
        <div
          className="fixed inset-0 z-30 flex items-end sm:items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Histórico de emissões"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-slate-200">
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
                <span className="text-slate-500">Data de Emissão Atual:</span>
                <span className="font-bold text-slate-800">{profile.issueDate || "06/01/2023"}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Validade Atual:</span>
                <span className="font-bold text-emerald-700">{profile.validUntil}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-600">ATIVO / EMITIDO</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
