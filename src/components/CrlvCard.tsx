// Hello World
"use client";

import type { Profile } from "@/lib/profile";
import { BrasaoRepublica, QrCodeVioSvg } from "./BrasaoRepublica";

function CrlvBox({
  label,
  value,
  className = "",
  valueClassName = "",
}: {
  label: string;
  value: string;
  className?: string;
  valueClassName?: string;
}) {
  return (
    <div className={`flex flex-col border-b border-r border-slate-300 p-1.5 ${className}`}>
      <span className="text-[7px] font-bold uppercase tracking-tight text-slate-500 leading-none">
        {label}
      </span>
      <span className={`text-[10px] font-black uppercase text-slate-900 leading-tight truncate ${valueClassName}`}>
        {value || "—"}
      </span>
    </div>
  );
}

export function CrlvDocFront({ profile }: { profile: Profile }) {
  return (
    <article
      aria-label="Certificado de Registro e Licenciamento de Veículo Digital"
      className="relative flex aspect-[0.62] w-full max-w-[345px] mx-auto flex-col overflow-hidden rounded-xl border border-slate-300 bg-white p-2.5 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.15)] select-none"
    >
      {/* 1. Tarja Superior Preta Oficial idêntica à Imagem 2 */}
      <header className="flex items-center gap-2 rounded-t-[4px] bg-[#232528] px-2.5 py-1.5 text-white">
        <BrasaoRepublica className="h-6 w-6 text-white shrink-0" />
        <div className="flex flex-col">
          <span className="text-[7.5px] font-black uppercase tracking-wider text-white leading-tight">
            REPÚBLICA FEDERATIVA DO BRASIL
          </span>
          <span className="text-[6.5px] font-bold uppercase tracking-tight text-slate-300 leading-tight">
            MINISTÉRIO DOS TRANSPORTES
          </span>
          <span className="text-[6.5px] font-extrabold uppercase tracking-tight text-slate-200 leading-tight">
            SECRETARIA NACIONAL DE TRÂNSITO - SENATRAN
          </span>
        </div>
      </header>

      {/* 2. Título Oficial do Documento */}
      <div className="py-1 border-b border-slate-300 text-center">
        <span className="block text-[6.5px] font-bold text-slate-500 uppercase leading-none">
          DETRAN/{profile.state || "SP"}
        </span>
        <h2 className="mt-0.5 text-[8.5px] font-black text-slate-900 uppercase tracking-tight leading-none">
          CERTIFICADO DE REGISTRO E LICENCIAMENTO DE VEÍCULO - DIGITAL
        </h2>
      </div>

      {/* 3. Bloco Superior: Dados + QR Code Vio ao Lado (Imagem 2) */}
      <div className="flex border-l border-t border-slate-300">
        {/* Coluna Esquerda: 4 Linhas de Dados */}
        <div className="flex flex-1 flex-col">
          <CrlvBox label="CÓDIGO RENAVAM" value={profile.renavam} valueClassName="font-mono text-[10px]" />
          <div className="grid grid-cols-2">
            <CrlvBox label="PLACA" value={profile.plate} valueClassName="font-mono text-blue-900" />
            <CrlvBox label="EXERCÍCIO" value={profile.exerciseYear} valueClassName="font-mono" />
          </div>
          <div className="grid grid-cols-2">
            <CrlvBox label="ANO FABRICAÇÃO" value={profile.manufactureYear} />
            <CrlvBox label="ANO MODELO" value={profile.modelYear} />
          </div>
          <CrlvBox label="NÚMERO DO CRV" value={profile.crvNumber} valueClassName="font-mono" />
        </div>

        {/* Coluna Direita: QR Code Vio com Rótulo Vertical Lateral */}
        <div className="flex w-32 items-center justify-between border-b border-r border-slate-300 p-1.5 bg-white">
          <div className="relative aspect-square w-24 p-0.5 border border-slate-400 bg-white">
            <QrCodeVioSvg className="h-full w-full" />
          </div>
          {/* Texto Vertical Oficial: "Valide este QRCode com app Vio" */}
          <div className="flex items-center justify-center [writing-mode:vertical-rl] rotate-180 pl-1 shrink-0">
            <span className="text-[6.5px] font-bold text-slate-600 uppercase tracking-tighter">
              Valide este QRCode com app Vio
            </span>
          </div>
        </div>
      </div>

      {/* 4. Bloco Inferior de Campos */}
      <div className="flex flex-col border-l border-slate-300">
        <div className="grid grid-cols-2">
          <CrlvBox label="CÓDIGO DE SEGURANÇA DO CLA" value={profile.claSecurityCode} />
          <CrlvBox label="CAT" value={profile.cat || "—"} />
        </div>
        <CrlvBox label="MARCA / MODELO / VERSÃO" value={profile.brandModel} />
        <CrlvBox label="ESPÉCIE / TIPO" value={profile.vehicleType} />
        <div className="grid grid-cols-3">
          <CrlvBox label="PLACA ANTERIOR / UF" value={profile.previousPlate || "—"} className="col-span-1" />
          <CrlvBox label="CHASSI" value={profile.chassis} className="col-span-2 font-mono text-[9px]" />
        </div>
        <div className="grid grid-cols-2">
          <CrlvBox label="COR PREDOMINANTE" value={profile.color} />
          <CrlvBox label="COMBUSTÍVEL" value={profile.fuel} />
        </div>
      </div>
    </article>
  );
}
