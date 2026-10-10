// Hello World
"use client";

import { useRef, useState } from "react";
import type { Profile } from "@/lib/profile";
import { ScreenHeader } from "./ScreenHeader";
import { CrlvDocFront } from "./CrlvCard";
import { IconCompartilharPessoas, QrCodeVioSvg } from "./BrasaoRepublica";
import { FileDown } from "lucide-react";

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
    <div className="screen-in flex min-h-dvh flex-col bg-[#f5f6fa] select-none">
      {/* Cabeçalho Oficial Navy exato da referência visual (Imagem 2) */}
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
          <div className="w-full shrink-0 snap-center pb-1">
            <CrlvDocFront profile={profile} />
          </div>
          <div className="w-full shrink-0 snap-center pb-1">
            <div className="relative aspect-[0.62] w-full max-w-[345px] mx-auto flex flex-col justify-between rounded-xl border border-slate-300 bg-white p-4 shadow-sm text-slate-800">
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
                <div className="flex justify-between">
                  <span className="text-slate-500">Licenciamento:</span>
                  <span className="font-bold text-emerald-700">REGULARIZADO</span>
                </div>
              </div>
              <div className="rounded bg-slate-50 p-2 text-center text-[10px] text-slate-600">
                Veículo autorizado para circulação em todo o território nacional
              </div>
            </div>
          </div>
          <div className="w-full shrink-0 snap-center pb-1">
            <div className="relative aspect-[0.62] w-full max-w-[345px] mx-auto flex flex-col items-center justify-between rounded-xl border border-slate-300 bg-white p-4 shadow-sm text-center">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#19234e]">
                  Validação SENATRAN
                </span>
                <span className="text-xs text-slate-500">
                  Leitura de segurança e QR Code
                </span>
              </div>
              <div className="aspect-square w-44 rounded border-2 border-slate-900 p-2">
                <QrCodeVioSvg className="h-full w-full" />
              </div>
              <div className="text-[10px] text-slate-600 font-mono">
                Código de Segurança: {profile.claSecurityCode}
              </div>
            </div>
          </div>
          <div className="w-full shrink-0 snap-center pb-1">
            <div className="relative aspect-[0.62] w-full max-w-[345px] mx-auto flex flex-col justify-between rounded-xl border border-slate-300 bg-white p-4 text-slate-800 shadow-sm text-xs">
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

        {/* Indicador de 4 pontos idêntico: ● ○ ○ ○ */}
        <div role="tablist" aria-label="Páginas do documento" className="flex justify-center items-center gap-2 py-3.5">
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

        {/* Botões de Ação Oficiais da Imagem 2 */}
        <div className="mt-auto flex flex-col gap-2.5 px-4 pt-1">
          {/* Botão 1: Compartilhar com Ícone Oficial de Grupo */}
          <button
            type="button"
            onClick={handleShare}
            className="flex h-14 w-full items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white px-4 text-left shadow-sm transition-transform hover:bg-slate-50 active:scale-[0.99] cursor-pointer"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#19234e]/10 text-[#19234e]">
              <IconCompartilharPessoas className="h-5 w-5 text-[#19234e]" />
            </span>
            <span className="flex-1 text-sm font-bold text-[#19234e]">
              Compartilhar
            </span>
            {shareNotice && (
              <span className="text-xs font-semibold text-emerald-700">Link pronto para envio!</span>
            )}
          </button>

          {/* Botão 2: Exportar documento (parcialmente visível na Imagem 2) */}
          <button
            type="button"
            onClick={handleShare}
            className="flex h-14 w-full items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white px-4 text-left shadow-sm transition-transform hover:bg-slate-50 active:scale-[0.99] cursor-pointer"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#19234e]/10 text-[#19234e]">
              <FileDown className="h-5 w-5 text-[#19234e]" />
            </span>
            <span className="flex-1 text-sm font-bold text-[#19234e]">
              Exportar CRLV digital
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
