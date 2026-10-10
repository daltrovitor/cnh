// Hello World
"use client";

import { UserRound } from "lucide-react";
import type { Profile } from "@/lib/profile";
import { BrasaoRepublica, MapaEstado, SeloBr, QrCodeVioSvg } from "./BrasaoRepublica";

/** Campo com borda fina de segurança padrão CNH Oficial */
function CnhBox({
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
    <div className={`flex flex-col justify-between rounded-[3px] border border-emerald-950/40 bg-white/75 px-1.5 py-0.5 ${className}`}>
      <span className="text-[7px] font-bold uppercase tracking-tight text-emerald-950/80 leading-none">
        {label}
      </span>
      <span className={`truncate text-[10px] font-black uppercase text-slate-900 leading-tight ${valueClassName}`}>
        {value || "—"}
      </span>
    </div>
  );
}

/** Frente da CNH oficial brasileira idêntica à referência visual (Imagem 1) */
export function CnhCardFront({ profile }: { profile: Profile }) {
  return (
    <article
      aria-label="Frente da Carteira Nacional de Habilitação"
      className="relative flex aspect-[0.62] w-full max-w-[345px] mx-auto flex-col overflow-hidden rounded-xl border border-emerald-900/35 bg-[#eaf5ec] p-2 shadow-[0_12px_32px_-12px_rgba(20,83,45,0.25)] select-none"
      style={{
        backgroundImage: `
          radial-gradient(#bfe3c5 0.75px, transparent 0.75px),
          linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(230,245,232,0.85) 100%)
        `,
        backgroundSize: "8px 8px, 100% 100%",
      }}
    >
      {/* 1. Faixa Superior do Documento */}
      <div className="flex items-center justify-between border-b border-emerald-900/30 pb-1 px-1">
        <span className="text-[8.5px] font-black tracking-wider text-emerald-950 uppercase">
          Válida em todo o território nacional
        </span>
        <MapaEstado className="h-6 w-6 text-[#c89632]" />
      </div>

      {/* 2. Conteúdo Interno + Tarja Lateral Direita */}
      <div className="flex flex-1 gap-1.5 pt-1 overflow-hidden">
        {/* Corpo de Campos da CNH */}
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          {/* Linha Superior: Foto Tombada + Rótulo Assinatura + Nome e Nascimento */}
          <div className="flex gap-1.5 items-stretch">
            {/* Rótulo Vertical "7 ASSINATURA DO PORTADOR" */}
            <div className="flex items-center justify-center [writing-mode:vertical-rl] rotate-180 shrink-0">
              <span className="text-[6px] font-black tracking-tighter text-emerald-950/75 uppercase">
                7 ASSINATURA DO PORTADOR
              </span>
            </div>

            {/* Foto Tombada (90º no fluxo do CDT Oficial) */}
            <div className="flex flex-col shrink-0 w-24">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px] border border-emerald-900/60 bg-emerald-50/70 p-0.5 shadow-inner">
                {profile.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- foto oficial orientada na horizontal como no app CDT
                  <img
                    src={profile.photo}
                    alt={`Foto de ${profile.name}`}
                    className="h-full w-full object-cover -rotate-90 scale-125"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-emerald-700/50">
                    <UserRound aria-hidden className="h-8 w-8 -rotate-90" />
                  </div>
                )}
              </div>
              {/* Assinatura Cursiva */}
              <div className="mt-1 flex h-6 w-full flex-col justify-end rounded-[3px] border border-emerald-900/40 bg-white/70 px-1 pb-0.5 text-center">
                <span className="font-serif italic text-[8px] font-bold text-slate-800 leading-none truncate">
                  {profile.name}
                </span>
              </div>
            </div>

            {/* Nome e Nascimento */}
            <div className="flex min-w-0 flex-1 flex-col gap-1 justify-between">
              <CnhBox
                label="1 Nome e Sobrenome"
                value={profile.name}
                className="flex-1"
                valueClassName="text-[10px] font-black text-emerald-950"
              />
              <CnhBox
                label="2 Data, Local e UF de Nascimento"
                value={`${profile.birthDate} ${profile.birthPlace}`}
                className="flex-1"
                valueClassName="text-[9px]"
              />
            </div>
          </div>

          {/* Linha: Identidade + CPF */}
          <div className="grid grid-cols-2 gap-1">
            <CnhBox label="4a Doc. Identidade / Órgão / UF" value={profile.rg} />
            <CnhBox label="4b CPF" value={profile.cpf} valueClassName="font-mono text-[9.5px]" />
          </div>

          {/* Linha: Validade + ACC + Categoria */}
          <div className="grid grid-cols-12 gap-1">
            <CnhBox label="4c Validade" value={profile.validUntil} className="col-span-6" valueClassName="text-emerald-900" />
            <CnhBox label="ACC" value="—" className="col-span-3 text-center" valueClassName="text-center" />
            {/* Box Escura com a Categoria da Habilitação */}
            <div className="col-span-3 flex flex-col justify-between rounded-[3px] border border-black bg-[#171717] px-1 py-0.5 text-center text-white">
              <span className="text-[6.5px] font-bold uppercase leading-none text-amber-300">
                Cat.
              </span>
              <span className="text-[12px] font-black uppercase leading-tight tracking-wider">
                {profile.category || "D"}
              </span>
            </div>
          </div>

          {/* Filiação */}
          <CnhBox
            label="Filiação"
            value={profile.affiliation}
            valueClassName="text-[9px]"
          />

          {/* Linha: Código de Segurança + Registro + 1ª Hab. */}
          <div className="grid grid-cols-3 gap-1">
            <CnhBox label="11 Cód. Segurança" value={profile.securityCode} valueClassName="font-mono text-[8.5px]" />
            <CnhBox label="Nº Registro" value={profile.registerNumber} valueClassName="font-mono text-[8.5px]" />
            <CnhBox label="1ª Habilitação" value={profile.firstLicenseDate} valueClassName="text-[8.5px]" />
          </div>

          {/* Nacionalidade */}
          <CnhBox label="Nacionalidade" value={profile.nationality || "BRASILEIRA"} valueClassName="text-[9px]" />
        </div>

        {/* Faixa Vertical Intermediária: Texto Oficial em 90 Graus */}
        <div className="flex items-center justify-center [writing-mode:vertical-rl] rotate-180 px-0.5 shrink-0">
          <span className="text-[6px] font-black tracking-tight text-emerald-950 uppercase">
            CARTEIRA NACIONAL DE HABILITAÇÃO / DRIVER LICENSE / PERMISO DE CONDUCCIÓN
          </span>
        </div>

        {/* Tarja Lateral Direita Oficial (Preta / Grafite) */}
        <div className="flex w-10 shrink-0 flex-col items-center justify-between rounded-[4px] bg-[#171717] py-2 text-center text-white shadow-sm">
          {/* Brasão Dourado Oficial */}
          <BrasaoRepublica className="h-6 w-6 text-amber-400" />

          {/* Texto Vertical Oficial em Amarelo/Dourado */}
          <div className="my-auto flex flex-col items-center justify-center [writing-mode:vertical-rl] rotate-180 gap-1">
            <span className="text-[6.5px] font-black tracking-widest text-[#facc15] uppercase">
              REPÚBLICA FEDERATIVA DO BRASIL
            </span>
            <span className="text-[5.5px] font-bold tracking-wider text-[#fef08a] uppercase">
              MINISTÉRIO DOS TRANSPORTES
            </span>
            <span className="text-[5.5px] font-black tracking-tight text-white uppercase">
              SECRETARIA NACIONAL DE TRÂNSITO
            </span>
          </div>

          {/* Selo Oval BR Dourado */}
          <SeloBr className="h-6 w-8" />
        </div>
      </div>
    </article>
  );
}

/** Verso da CNH oficial com tabela de categorias e observações */
export function CnhCardBack({ profile }: { profile: Profile }) {
  const isA = profile.category.toUpperCase().includes("A");
  const isB = profile.category.toUpperCase().includes("B");
  const isC = profile.category.toUpperCase().includes("C");
  const isD = profile.category.toUpperCase().includes("D");
  const isE = profile.category.toUpperCase().includes("E");

  const categories = [
    { cat: "A", name: "Veículos motorizados de 2 ou 3 rodas", active: isA },
    { cat: "B", name: "Veículos a motor até 3.500 kg / 8 lugares", active: isB },
    { cat: "C", name: "Veículos de carga acima de 3.500 kg", active: isC },
    { cat: "D", name: "Veículos de transporte de passageiros > 8", active: isD },
    { cat: "E", name: "Veículos com unidade acoplada > 6.000 kg", active: isE },
    { cat: "ACC", name: "Autorização para Ciclomotores", active: false },
  ];

  return (
    <article
      aria-label="Verso da Carteira Nacional de Habilitação"
      className="relative flex aspect-[0.62] w-full max-w-[345px] mx-auto flex-col justify-between overflow-hidden rounded-xl border border-emerald-900/35 bg-[#eaf5ec] p-2.5 shadow-[0_12px_32px_-12px_rgba(20,83,45,0.25)] select-none"
      style={{
        backgroundImage: `
          radial-gradient(#bfe3c5 0.75px, transparent 0.75px),
          linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(230,245,232,0.85) 100%)
        `,
        backgroundSize: "8px 8px, 100% 100%",
      }}
    >
      <div className="flex items-center justify-between border-b border-emerald-900/30 pb-1">
        <span className="text-[8px] font-black tracking-wider text-emerald-950 uppercase">
          Categorias Autorizadas
        </span>
        <span className="text-[8px] font-bold text-emerald-900">
          SENATRAN / SERPRO
        </span>
      </div>

      <div className="flex flex-col gap-1 py-1">
        {categories.map(({ cat, name, active }) => (
          <div
            key={cat}
            className={`flex items-center justify-between rounded-[3px] border px-2 py-1 ${
              active
                ? "border-emerald-800 bg-emerald-900 text-white font-bold"
                : "border-emerald-900/20 bg-white/60 text-slate-700"
            }`}
          >
            <span className="font-mono text-[10px] font-black">{cat}</span>
            <span className="text-[7.5px] truncate max-w-[210px]">{name}</span>
            <span className="text-[8px] font-bold">{active ? "SIM" : "NÃO"}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <CnhBox label="12 Observações" value="EAR — Exerce Atividade Remunerada" />
        <div className="grid grid-cols-2 gap-1">
          <CnhBox label="Local de Emissão" value={`${profile.birthPlace || "SÃO PAULO - SP"}`} />
          <CnhBox label="Órgão Emissor" value="DETRAN" />
        </div>
      </div>
    </article>
  );
}

/** Slide do QR Code Vio Oficial com Alta Resolução e Fidelidade */
export function CnhVioQrSlide({ profile }: { profile: Profile }) {
  return (
    <article
      aria-label="QR Code de autenticidade Vio"
      className="relative flex aspect-[0.62] w-full max-w-[345px] mx-auto flex-col items-center justify-between overflow-hidden rounded-xl border border-emerald-900/35 bg-white p-5 shadow-[0_12px_32px_-12px_rgba(20,83,45,0.25)] select-none text-center"
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] font-black tracking-widest text-[#19234e] uppercase">
          Validação Digital de Autenticidade
        </span>
        <span className="text-xs text-slate-500">
          Escaneie com o aplicativo oficial <strong className="text-blue-700">Vio</strong>
        </span>
      </div>

      {/* QR Code Vio Oficial em SVG de Alta Resolução */}
      <div className="relative aspect-square w-48 rounded-lg border-2 border-slate-900 p-2 shadow-sm bg-white">
        <QrCodeVioSvg className="h-full w-full" />
      </div>

      <div className="flex flex-col gap-0.5 text-center">
        <span className="font-mono text-[10px] font-bold text-slate-800">
          RENACH: {profile.registerNumber}
        </span>
        <span className="text-[9px] text-slate-500">
          Certificação digital assinada pelo SERPRO
        </span>
      </div>
    </article>
  );
}

/** Slide com Dados Cadastrais Detalhados */
export function CnhDetailsSlide({ profile }: { profile: Profile }) {
  return (
    <article
      aria-label="Dados completos da habilitação"
      className="relative flex aspect-[0.62] w-full max-w-[345px] mx-auto flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-[0_12px_32px_-12px_rgba(20,83,45,0.25)] select-none text-slate-800"
    >
      <div className="border-b border-slate-100 pb-2">
        <h3 className="text-xs font-bold text-[#19234e] uppercase">
          Certificado Digital do Condutor
        </h3>
        <p className="text-[10px] text-slate-500">Secretaria Nacional de Trânsito — SENATRAN</p>
      </div>

      <div className="flex flex-col gap-2 py-2 text-xs">
        <div className="flex justify-between border-b border-slate-100 pb-1">
          <span className="text-slate-500">Nome:</span>
          <span className="font-bold text-right">{profile.name}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-1">
          <span className="text-slate-500">CPF:</span>
          <span className="font-mono font-bold">{profile.cpf}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-1">
          <span className="text-slate-500">RG / UF:</span>
          <span className="font-bold">{profile.rg}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-1">
          <span className="text-slate-500">Nº Registro:</span>
          <span className="font-mono font-bold">{profile.registerNumber}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-1">
          <span className="text-slate-500">Categoria:</span>
          <span className="font-black text-emerald-800">{profile.category}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-1">
          <span className="text-slate-500">Validade CNH:</span>
          <span className="font-bold text-emerald-700">{profile.validUntil}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Situação:</span>
          <span className="font-bold text-emerald-600">REGULAR</span>
        </div>
      </div>

      <div className="rounded-md bg-emerald-50 p-2 text-center text-[10px] text-emerald-800 font-medium">
        Documento assinado digitalmente com certificado ICP-Brasil
      </div>
    </article>
  );
}
