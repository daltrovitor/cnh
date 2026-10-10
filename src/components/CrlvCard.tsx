// Hello World
"use client";

import type { Profile } from "@/lib/profile";
import { BrasaoRepublica } from "./BrasaoRepublica";

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
      <span className="text-[7.5px] font-bold uppercase tracking-tight text-slate-500 leading-none">
        {label}
      </span>
      <span className={`text-[11px] font-black uppercase text-slate-900 leading-tight truncate ${valueClassName}`}>
        {value || "—"}
      </span>
    </div>
  );
}

export function CrlvDocFront({ profile }: { profile: Profile }) {
  return (
    <article
      aria-label="Certificado de Registro e Licenciamento de Veículo Digital"
      className="relative flex aspect-[0.67] w-full max-w-[360px] mx-auto flex-col overflow-hidden rounded-xl border border-slate-300 bg-white p-3 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.15)] select-none"
    >
      {/* Topo Oficial com Brasão */}
      <header className="flex items-center gap-2 border-b-2 border-slate-900 pb-2">
        <BrasaoRepublica className="h-8 w-8 text-slate-800" />
        <div className="flex flex-col">
          <span className="text-[7.5px] font-black uppercase tracking-wider text-slate-900">
            REPÚBLICA FEDERATIVA DO BRASIL
          </span>
          <span className="text-[6.5px] font-bold uppercase tracking-tight text-slate-600">
            MINISTÉRIO DOS TRANSPORTES
          </span>
          <span className="text-[6.5px] font-extrabold uppercase tracking-tight text-slate-700">
            SECRETARIA NACIONAL DE TRÂNSITO — SENATRAN
          </span>
        </div>
      </header>

      {/* Título do Documento */}
      <div className="py-1.5 border-b border-slate-300 text-center">
        <span className="block text-[6.5px] font-bold text-slate-500 uppercase">DETRAN/SP</span>
        <h2 className="text-[9px] font-black text-slate-900 uppercase tracking-tight">
          CERTIFICADO DE REGISTRO E LICENCIAMENTO DE VEÍCULO — DIGITAL
        </h2>
      </div>

      {/* Grid Principal com QR Code ao lado */}
      <div className="flex border-l border-t border-slate-300">
        <div className="flex flex-1 flex-col">
          <CrlvBox label="Código RENAVAM" value={profile.renavam} valueClassName="font-mono" />
          <div className="grid grid-cols-2">
            <CrlvBox label="Placa" value={profile.plate} valueClassName="font-mono text-blue-900" />
            <CrlvBox label="Exercício" value={profile.exerciseYear} valueClassName="font-mono" />
          </div>
          <div className="grid grid-cols-2">
            <CrlvBox label="Ano Fabricação" value={profile.manufactureYear} />
            <CrlvBox label="Ano Modelo" value={profile.modelYear} />
          </div>
          <CrlvBox label="Número do CRV" value={profile.crvNumber} valueClassName="font-mono" />
        </div>

        {/* QR Code Vio com rótulo vertical */}
        <div className="flex w-28 flex-col items-center justify-center border-b border-r border-slate-300 p-1.5 bg-slate-50">
          <div className="relative aspect-square w-20 bg-white p-1 border border-slate-400">
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
              <rect x="9" y="2" width="2" height="2" />
              <rect x="13" y="3" width="3" height="1" />
              <rect x="8" y="8" width="2" height="3" />
              <rect x="12" y="7" width="4" height="2" />
              <rect x="18" y="9" width="2" height="4" />
              <rect x="9" y="14" width="4" height="2" />
              <rect x="15" y="15" width="2" height="3" />
              <rect x="8" y="20" width="3" height="2" />
              <rect x="13" y="19" width="3" height="3" />
              <rect x="18" y="18" width="4" height="2" />
            </svg>
          </div>
          <span className="mt-1 text-[6.5px] font-bold text-slate-500 uppercase leading-none text-center">
            Valide este QRCode com app Vio
          </span>
        </div>
      </div>

      {/* Linhas de baixo */}
      <div className="flex flex-col border-l border-slate-300">
        <div className="grid grid-cols-2">
          <CrlvBox label="Código de Segurança do CLA" value={profile.claSecurityCode} />
          <CrlvBox label="CAT" value={profile.cat} />
        </div>
        <CrlvBox label="Marca / Modelo / Versão" value={profile.brandModel} />
        <CrlvBox label="Espécie / Tipo" value={profile.vehicleType} />
        <div className="grid grid-cols-3">
          <CrlvBox label="Placa Anterior / UF" value={profile.previousPlate} className="col-span-1" />
          <CrlvBox label="Chassi" value={profile.chassis} className="col-span-2 font-mono text-[9.5px]" />
        </div>
        <div className="grid grid-cols-2">
          <CrlvBox label="Cor Predominante" value={profile.color} />
          <CrlvBox label="Combustível" value={profile.fuel} />
        </div>
      </div>
    </article>
  );
}
