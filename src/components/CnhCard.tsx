// Hello World
"use client";

import { Edit3, UserRound } from "lucide-react";
import type { Profile } from "@/lib/profile";
import { BrasaoRepublica, MapaEstado, SeloBr, QrCodeVioSvg } from "./BrasaoRepublica";

/** Caixa de campo oficial da CNH com borda verde floresta e cantos padrão Contran */
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
    <div
      className={`flex flex-col justify-between rounded-[4px] border border-[#2b533d] bg-white/85 px-1.5 py-0.5 shadow-xs ${className}`}
    >
      <span className="text-[7px] font-bold uppercase tracking-tight text-[#1e4632] leading-none">
        {label}
      </span>
      <span
        className={`truncate text-[10.5px] font-black uppercase text-slate-950 leading-tight ${valueClassName}`}
      >
        {value || "—"}
      </span>
    </div>
  );
}

/** Padrão de hachuras de segurança para o campo ACC da CNH */
function AccSecurityHatch() {
  return (
    <div className="flex flex-col justify-between rounded-[4px] border border-[#2b533d] bg-white/85 px-1 py-0.5 shadow-xs">
      <span className="text-[6.5px] font-bold uppercase tracking-tight text-[#1e4632] leading-none text-center">
        ACC
      </span>
      <div className="flex h-3 items-center justify-center overflow-hidden">
        <svg viewBox="0 0 40 10" className="h-full w-full opacity-60">
          <line x1="0" y1="2" x2="40" y2="2" stroke="#1e4632" strokeWidth="1" strokeDasharray="2 1" />
          <line x1="0" y1="5" x2="40" y2="5" stroke="#1e4632" strokeWidth="1" strokeDasharray="3 1" />
          <line x1="0" y1="8" x2="40" y2="8" stroke="#1e4632" strokeWidth="1" strokeDasharray="2 1" />
        </svg>
      </div>
    </div>
  );
}

/** Frente da CNH Oficial Brasileira idêntica à referência visual (Resolução Contran 886) */
export function CnhCardFront({
  profile,
  isSideways = true,
  onSign,
}: {
  profile: Profile;
  isSideways?: boolean;
  onSign?: () => void;
}) {
  // Separação dos nomes da filiação para renderizar em 2 linhas autênticas
  const affiliationParts = profile.affiliation
    ? profile.affiliation.split(/\s*[/|\n]\s*/)
    : ["GERALDO ANTONIO", "ALMINDA DO NASCIMENTO"];
  const line1Father = affiliationParts[0] || "—";
  const line2Mother = affiliationParts[1] || "";

  // Conteúdo visual exato do documento horizontal
  const documentCard = (
    <article
      aria-label="Frente da Carteira Nacional de Habilitação Oficial"
      className="relative flex aspect-[1.42] w-[460px] flex-col overflow-hidden rounded-md border border-[#1b3d2b] bg-[#eaf4eb] shadow-[0_12px_32px_-10px_rgba(20,83,45,0.3)] select-none text-slate-900"
      style={{
        backgroundImage: `
          radial-gradient(#b0d7b7 0.75px, transparent 0.75px),
          repeating-linear-gradient(45deg, rgba(162,212,173,0.12) 0px, rgba(162,212,173,0.12) 2px, transparent 2px, transparent 8px),
          linear-gradient(135deg, #f7faf7 0%, #eaf4eb 45%, #dcf0de 100%)
        `,
        backgroundSize: "6px 6px, 12px 12px, 100% 100%",
      }}
    >
      {/* 1. Tarja Superior Preta Oficial com Brasão, Textos e Selo BR */}
      <header className="flex h-12 shrink-0 items-center justify-between bg-[#111914] px-3 text-white">
        {/* Brasão da República Federativa do Brasil */}
        <div className="flex items-center shrink-0">
          <BrasaoRepublica className="h-8 w-8 text-amber-400 drop-shadow-xs" />
        </div>

        {/* Textos Oficiais Centrais em Caixa Alta */}
        <div className="flex flex-col items-center justify-center text-center px-2">
          <span className="text-[10px] font-black tracking-wider text-white uppercase leading-none">
            REPÚBLICA FEDERATIVA DO BRASIL
          </span>
          <span className="text-[7.5px] font-semibold tracking-wide text-slate-200 uppercase mt-0.5 leading-none">
            MINISTÉRIO DA INFRAESTRUTURA
          </span>
          <span className="text-[7px] font-semibold tracking-tight text-slate-300 uppercase mt-0.5 leading-none">
            SECRETARIA NACIONAL DE TRÂNSITO
          </span>
        </div>

        {/* Selo Oval Oficial BR com Guilhochê */}
        <div className="flex items-center shrink-0">
          <SeloBr className="h-7 w-10" />
        </div>
      </header>

      {/* 2. Sub-cabeçalho com o Título Oficial da CNH */}
      <div className="border-b border-[#2b533d]/40 bg-[#dff0e2]/90 py-0.5 text-center shrink-0">
        <h2 className="text-[9px] font-black tracking-tight text-slate-900 uppercase leading-none">
          CARTEIRA NACIONAL DE HABILITAÇÃO / DRIVER LICENSE / PERMISO DE CONDUCCIÓN
        </h2>
      </div>

      {/* 3. Corpo Principal do Documento */}
      <div className="flex flex-1 p-2 gap-2 overflow-hidden items-stretch">
        {/* Coluna Esquerda: Mapa + Tarja Vertical ("VÁLIDA EM TODO O TERRITÓRIO NACIONAL" + Nº) + Foto + Assinatura */}
        <div className="flex w-[120px] shrink-0 flex-col justify-between">
          {/* Topo da coluna esquerda: Mapa do Brasil em Dourado */}
          <div className="flex items-center pl-1 pt-0.5">
            <MapaEstado className="h-7 w-7 text-[#c89632] drop-shadow-xs" />
          </div>

          {/* Área Central: Texto Vertical + Foto do Condutor */}
          <div className="flex items-stretch gap-1.5 my-auto">
            {/* Tarja de Texto e Número em 90 Graus */}
            <div className="flex items-center justify-center [writing-mode:vertical-rl] rotate-180 shrink-0 gap-1.5 pr-0.5">
              <span className="text-[6.5px] font-black tracking-widest text-slate-900 uppercase">
                VÁLIDA EM TODO O TERRITÓRIO NACIONAL
              </span>
              <span className="font-mono text-[9px] font-black text-slate-950 tracking-wider">
                {profile.formNumber || "2519950272"}
              </span>
            </div>

            {/* Foto Oficial do Condutor (em pé, sem rotação) */}
            <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-[4px] border border-[#2b533d] bg-white p-0.5 shadow-xs">
              {profile.photo ? (
                // eslint-disable-next-line @next/next/no-img-element -- foto do condutor orientada normalmente
                <img
                  src={profile.photo}
                  alt={`Foto de ${profile.name}`}
                  className="h-full w-full object-cover rounded-[2px]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                  <UserRound aria-hidden className="h-10 w-10 text-slate-400" />
                </div>
              )}
            </div>
          </div>

          {/* Base da coluna esquerda: Box da Assinatura do Portador */}
          <div
            onClick={onSign}
            role={onSign ? "button" : undefined}
            tabIndex={onSign ? 0 : undefined}
            title={onSign ? "Clique para alterar ou desenhar a assinatura" : undefined}
            className={`group relative flex h-10 w-full flex-col justify-between rounded-[4px] border border-[#2b533d] bg-white/95 px-1 py-0.5 shadow-xs transition-colors ${
              onSign ? "cursor-pointer hover:border-emerald-600 hover:bg-emerald-50/40" : ""
            }`}
          >
            {/* Assinatura Renderizada */}
            <div className="flex h-6 w-full items-center justify-center overflow-hidden">
              {profile.signature ? (
                // eslint-disable-next-line @next/next/no-img-element -- assinatura gráfica do portador
                <img
                  src={profile.signature}
                  alt="Assinatura do Portador"
                  className="max-h-6 w-auto max-w-full object-contain"
                />
              ) : (
                <span className="font-serif italic text-[11px] font-bold text-slate-900 tracking-wide select-none leading-none">
                  {profile.name}
                </span>
              )}
            </div>

            {/* Rótulo 7 ASSINATURA DO PORTADOR */}
            <div className="flex items-center justify-between">
              <span className="text-[6px] font-black uppercase tracking-tight text-[#1e4632] leading-none">
                7 ASSINATURA DO PORTADOR
              </span>
              {onSign && (
                <Edit3 className="h-2.5 w-2.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />
              )}
            </div>
          </div>
        </div>

        {/* Coluna Direita: Grade de Campos Oficiais da CNH */}
        <div className="flex flex-1 flex-col justify-between gap-1 min-w-0">
          {/* Linha 1: 2 e 1 Nome e Sobrenome + 1ª Habilitação */}
          <div className="grid grid-cols-12 gap-1">
            <CnhBox
              label="2 e 1 NOME E SOBRENOME"
              value={profile.name}
              className="col-span-8"
              valueClassName="text-[10px] font-black text-slate-950"
            />
            <CnhBox
              label="1ª HABILITAÇÃO"
              value={profile.firstLicenseDate || "08/07/1976"}
              className="col-span-4 text-center"
              valueClassName="text-[9.5px] font-black text-center"
            />
          </div>

          {/* Linha 2: 3 Data, Local e UF de Nascimento */}
          <CnhBox
            label="3 DATA, LOCAL E UF DE NASCIMENTO"
            value={`${profile.birthDate}, ${profile.birthPlace}`}
            valueClassName="text-[9.5px] font-black"
          />

          {/* Linha 3: 4a Data Emissão + 4b Validade + ACC + Categoria D */}
          <div className="grid grid-cols-12 gap-1 items-stretch">
            <CnhBox
              label="4a DATA EMISSÃO"
              value={profile.issueDate || "06/01/2023"}
              className="col-span-4"
              valueClassName="text-[9px] font-black"
            />
            <CnhBox
              label="4b VALIDADE"
              value={profile.validUntil}
              className="col-span-4"
              valueClassName="text-[9.5px] font-black text-red-600"
            />
            <div className="col-span-2">
              <AccSecurityHatch />
            </div>
            {/* Box Categoria da CNH */}
            <div className="col-span-2 flex flex-col justify-center items-center rounded-[4px] border border-[#2b533d] bg-white/95 px-0.5 shadow-xs">
              <span className="text-[13px] font-black uppercase text-slate-950 leading-none">
                {profile.category || "D"}
              </span>
            </div>
          </div>

          {/* Linha 4: 4c Doc Identidade / Órg Emissor / UF */}
          <CnhBox
            label="4c DOC IDENTIDADE / ÓRG EMISSOR / UF"
            value={profile.rg}
            valueClassName="text-[9.5px] font-black"
          />

          {/* Linha 5: 4d CPF + 5 Nº Registro + 9 Cat Hab */}
          <div className="grid grid-cols-12 gap-1">
            <CnhBox
              label="4d CPF"
              value={profile.cpf}
              className="col-span-5"
              valueClassName="font-mono text-[9px] font-black"
            />
            <CnhBox
              label="5 Nº REGISTRO"
              value={profile.registerNumber}
              className="col-span-4 text-center"
              valueClassName="font-mono text-[9px] font-black text-red-600 text-center"
            />
            <CnhBox
              label="9 CAT HAB"
              value={profile.category || "AB"}
              className="col-span-3 text-center"
              valueClassName="text-[9.5px] font-black text-red-600 text-center"
            />
          </div>

          {/* Linha 6: Nacionalidade */}
          <CnhBox
            label="NACIONALIDADE"
            value={profile.nationality || "BRASILEIRO"}
            valueClassName="text-[9.5px] font-black"
          />

          {/* Linha 7: Filiação (2 Linhas Oficiais) */}
          <div className="flex flex-col justify-between rounded-[4px] border border-[#2b533d] bg-white/85 px-1.5 py-0.5 shadow-xs">
            <span className="text-[6.5px] font-bold uppercase tracking-tight text-[#1e4632] leading-none">
              FILIAÇÃO
            </span>
            <div className="flex flex-col leading-tight mt-0.5">
              <span className="truncate text-[9px] font-black uppercase text-slate-950">
                {line1Father}
              </span>
              {line2Mother && (
                <span className="truncate text-[9px] font-black uppercase text-slate-950 mt-0.5">
                  {line2Mother}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );

  // Se o modo for "de lado" (padrão CDT conforme solicitado pelo usuário):
  if (isSideways) {
    return (
      <div className="relative flex h-[480px] w-full items-center justify-center overflow-visible">
        <div className="shrink-0 -rotate-90 origin-center transition-transform duration-300">
          {documentCard}
        </div>
      </div>
    );
  }

  // Modo horizontal (reto):
  return (
    <div className="flex w-full justify-center overflow-x-auto py-2">
      <div className="shrink-0 transition-transform duration-300">
        {documentCard}
      </div>
    </div>
  );
}

/** Verso da CNH oficial brasileira com tabela de categorias e observações */
export function CnhCardBack({
  profile,
  isSideways = true,
}: {
  profile: Profile;
  isSideways?: boolean;
}) {
  const isA = profile.category.toUpperCase().includes("A");
  const isB = profile.category.toUpperCase().includes("B");
  const isC = profile.category.toUpperCase().includes("C");
  const isD = profile.category.toUpperCase().includes("D");
  const isE = profile.category.toUpperCase().includes("E");

  const categories = [
    { cat: "A", name: "Motocicletas e triciclos", active: isA },
    { cat: "B", name: "Automóveis até 3.500 kg", active: isB },
    { cat: "C", name: "Veículos de carga > 3.500 kg", active: isC },
    { cat: "D", name: "Passageiros > 8 lugares", active: isD },
    { cat: "E", name: "Articulados / Unidade acoplada", active: isE },
    { cat: "ACC", name: "Ciclomotores até 50cc", active: false },
  ];

  const documentCard = (
    <article
      aria-label="Verso da Carteira Nacional de Habilitação Oficial"
      className="relative flex aspect-[1.42] w-[460px] flex-col justify-between overflow-hidden rounded-md border border-[#1b3d2b] bg-[#eaf4eb] p-2.5 shadow-[0_12px_32px_-10px_rgba(20,83,45,0.3)] select-none text-slate-900"
      style={{
        backgroundImage: `
          radial-gradient(#b0d7b7 0.75px, transparent 0.75px),
          repeating-linear-gradient(45deg, rgba(162,212,173,0.12) 0px, rgba(162,212,173,0.12) 2px, transparent 2px, transparent 8px),
          linear-gradient(135deg, #f7faf7 0%, #eaf4eb 45%, #dcf0de 100%)
        `,
        backgroundSize: "6px 6px, 12px 12px, 100% 100%",
      }}
    >
      {/* Topo do Verso */}
      <div className="flex items-center justify-between border-b border-[#2b533d]/40 pb-1">
        <span className="text-[8.5px] font-black tracking-wider text-[#111914] uppercase">
          CATEGORIAS AUTORIZADAS / SENATRAN
        </span>
        <span className="text-[8px] font-bold text-emerald-900">
          SERPRO / GOV.BR
        </span>
      </div>

      {/* Tabela de Categorias Autêntica */}
      <div className="grid grid-cols-2 gap-1 py-1">
        {categories.map(({ cat, name, active }) => (
          <div
            key={cat}
            className={`flex items-center justify-between rounded-[3px] border px-2 py-1 ${
              active
                ? "border-emerald-800 bg-emerald-900 text-white font-bold"
                : "border-[#2b533d]/30 bg-white/70 text-slate-800"
            }`}
          >
            <span className="font-mono text-[9.5px] font-black">{cat}</span>
            <span className="text-[7.5px] truncate max-w-[120px]">{name}</span>
            <span className="text-[8px] font-black">{active ? "SIM" : "NÃO"}</span>
          </div>
        ))}
      </div>

      {/* Observações e Emissão */}
      <div className="flex flex-col gap-1">
        <CnhBox
          label="12 OBSERVAÇÕES"
          value={profile.observations || "EAR — EXERCE ATIVIDADE REMUNERADA"}
          valueClassName="text-[9px] font-black"
        />
        <div className="grid grid-cols-2 gap-1">
          <CnhBox
            label="LOCAL DE EMISSÃO"
            value={profile.birthPlace || "UBERLANDIA, MG"}
            valueClassName="text-[9px]"
          />
          <CnhBox
            label="ÓRGÃO EMISSOR"
            value={`DETRAN-${profile.state || "MG"}`}
            valueClassName="text-[9px]"
          />
        </div>
      </div>

      {/* Faixa MRZ (Machine Readable Zone) do Verso Oficial */}
      <div className="mt-1 rounded-[3px] bg-white/90 p-1 font-mono text-[7px] font-bold tracking-widest text-slate-700 leading-none">
        <div>{`I<BRA${profile.formNumber || "2519950272"}<<<<<<<<<<<<<<<`}</div>
        <div className="mt-0.5">{`5801262M2801062BRA<<<<<<<<<<<${profile.registerNumber?.slice(-1) || "1"}`}</div>
      </div>
    </article>
  );

  if (isSideways) {
    return (
      <div className="relative flex h-[480px] w-full items-center justify-center overflow-visible">
        <div className="shrink-0 -rotate-90 origin-center transition-transform duration-300">
          {documentCard}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center overflow-x-auto py-2">
      <div className="shrink-0 transition-transform duration-300">
        {documentCard}
      </div>
    </div>
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
