// Hello World
"use client";

import type { Profile } from "@/lib/profile";
import { QrCodeVioSvg } from "./BrasaoRepublica";

/**
 * Verifica se a documentação está completa para exibição na CNH Oficial.
 * Conforme exigência estrita: se não tiver a informação completa, deixa em branco
 * a documentação. Com ela completa, aí vai aparecer o documento com as coisas por cima.
 */
export function isDocumentationComplete(profile: Profile): boolean {
  return Boolean(
    profile.name && profile.name.trim().length > 0 &&
    profile.cpf && profile.cpf.trim().length > 0 &&
    profile.registerNumber && profile.registerNumber.trim().length > 0
  );
}

/**
 * Frente da CNH Oficial Brasileira (Modelo 2022+) — Usa exatamente a imagem
 * oficial da carteira fornecida (/cnh-template-base.png) como documento base.
 *
 * Máscaras opacas calibradas pixel a pixel garantem que os dados de teste da imagem
 * original NUNCA apareçam. Se o usuário não tiver preenchido as informações, o documento
 * fica 100% em branco. Quando preenchido, os dados, a foto e a assinatura são sobrepostos
 * nas posições exatas, todos na mesma tipografia (font-sans font-bold).
 */
export function CnhCardFront({ profile }: { profile: Profile }) {
  const isComplete = isDocumentationComplete(profile);

  const affiliationParts = profile.affiliation
    ? profile.affiliation.split(/\s*[/|\n]\s*/)
    : [];
  const line1Father = affiliationParts[0] || "";
  const line2Mother = affiliationParts[1] || "";

  const birthText = [profile.birthDate, profile.birthPlace]
    .filter(Boolean)
    .join(", ");

  const categoryInitial = profile.category
    ? profile.category.trim().charAt(0)
    : "B";

  return (
    <article
      aria-label="Frente da Carteira Nacional de Habilitação Oficial"
      className="relative select-none overflow-hidden rounded-md shadow-[0_12px_32px_-10px_rgba(20,83,45,0.3)] border border-[#1b3d2b]/20 bg-white w-full max-w-[360px] aspect-[960/678]"
      style={{ containerType: "inline-size" }}
    >
      {/* ═══ CAMADA 0: Imagem oficial do documento de habilitação ═══ */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cnh-template-base.png"
        alt="Modelo Oficial da CNH Brasileira"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* ═══ CAMADA 1: Box 2 e 1 NOME E SOBRENOME ═══ */}
      <div
        className="absolute bg-white flex items-center px-1 overflow-hidden z-10"
        style={{ top: "26.5%", left: "18.2%", width: "62.2%", height: "4.5%" }}
      >
        {isComplete && profile.name ? (
          <span className="font-sans font-bold text-black text-[2.6cqw] uppercase truncate leading-none">
            {profile.name}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 2: Box 1ª HABILITAÇÃO ═══ */}
      <div
        className="absolute bg-white flex items-center justify-center px-1 overflow-hidden z-10"
        style={{ top: "26.5%", left: "82.0%", width: "16.0%", height: "4.5%" }}
      >
        {isComplete && profile.firstLicenseDate ? (
          <span className="font-sans font-bold text-black text-[2.5cqw] truncate leading-none text-center">
            {profile.firstLicenseDate}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 3: Foto do Condutor (3x4) ═══ */}
      <div
        className="absolute bg-white overflow-hidden z-10"
        style={{ top: "32.2%", left: "17.4%", width: "25.8%", height: "52.2%" }}
      >
        {isComplete && profile.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.photo}
            alt={`Foto de ${profile.name || "Condutor"}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-white" />
        )}
      </div>

      {/* ═══ CAMADA 4: Assinatura do Portador ═══ */}
      <div
        className="absolute bg-white flex items-center justify-center overflow-hidden z-10"
        style={{ top: "84.8%", left: "17.4%", width: "25.8%", height: "10.4%" }}
      >
        {isComplete && profile.signature ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.signature}
            alt="Assinatura do Portador"
            className="max-h-full max-w-full object-contain p-0.5"
          />
        ) : (
          <div className="h-full w-full bg-white" />
        )}
      </div>

      {/* ═══ CAMADA 5: Numeração Vertical de Segurança (Faixa Lateral Esquerda) ═══ */}
      <div
        className="absolute bg-[#edf4ea] flex items-center justify-center overflow-hidden z-10"
        style={{ top: "57.0%", left: "7.2%", width: "8.8%", height: "39.5%" }}
      >
        {isComplete && profile.formNumber ? (
          <span className="font-sans font-bold text-black text-[2.2cqw] [writing-mode:vertical-rl] rotate-180 tracking-[0.16em] whitespace-nowrap">
            {profile.formNumber}
          </span>
        ) : (
          <div className="h-full w-full bg-[#edf4ea]" />
        )}
      </div>

      {/* ═══ CAMADA 6: Box 3 DATA, LOCAL E UF DE NASCIMENTO ═══ */}
      <div
        className="absolute bg-white flex items-center px-1 overflow-hidden z-10"
        style={{ top: "34.8%", left: "45.8%", width: "52.4%", height: "4.5%" }}
      >
        {isComplete && birthText ? (
          <span className="font-sans font-bold text-black text-[2.4cqw] uppercase truncate leading-none">
            {birthText}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 7: Box 4a DATA EMISSÃO ═══ */}
      <div
        className="absolute bg-white flex items-center justify-center px-1 overflow-hidden z-10"
        style={{ top: "42.8%", left: "45.8%", width: "16.4%", height: "4.5%" }}
      >
        {isComplete && profile.issueDate ? (
          <span className="font-sans font-bold text-black text-[2.4cqw] truncate leading-none text-center">
            {profile.issueDate}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 8: Box 4b VALIDADE (Destaque Vermelho Oficial) ═══ */}
      <div
        className="absolute bg-white flex items-center justify-center px-1 overflow-hidden z-10"
        style={{ top: "42.8%", left: "63.8%", width: "16.4%", height: "4.5%" }}
      >
        {isComplete && profile.validUntil ? (
          <span className="font-sans font-bold text-[#c01818] text-[2.4cqw] truncate leading-none text-center">
            {profile.validUntil}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 9: Letra da Categoria ao lado do ACC ═══ */}
      <div
        className="absolute bg-white flex items-center justify-center overflow-hidden z-10"
        style={{ top: "41.5%", left: "92.5%", width: "5.6%", height: "5.8%" }}
      >
        {isComplete && profile.category ? (
          <span className="font-sans font-black text-black text-[3.8cqw] leading-none">
            {categoryInitial}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 10: Box 4c DOC IDENTIDADE / ÓRG EMISSOR / UF ═══ */}
      <div
        className="absolute bg-white flex items-center px-1 overflow-hidden z-10"
        style={{ top: "50.8%", left: "45.8%", width: "52.4%", height: "4.5%" }}
      >
        {isComplete && profile.rg ? (
          <span className="font-sans font-bold text-black text-[2.4cqw] uppercase truncate leading-none">
            {profile.rg}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 11: Box 4d CPF ═══ */}
      <div
        className="absolute bg-white flex items-center justify-center px-1 overflow-hidden z-10"
        style={{ top: "58.8%", left: "45.8%", width: "19.4%", height: "4.5%" }}
      >
        {isComplete && profile.cpf ? (
          <span className="font-sans font-bold text-black text-[2.3cqw] truncate leading-none text-center">
            {profile.cpf}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 12: Box 5 Nº REGISTRO (Destaque Vermelho Oficial) ═══ */}
      <div
        className="absolute bg-white flex items-center justify-center px-1 overflow-hidden z-10"
        style={{ top: "58.8%", left: "66.2%", width: "17.6%", height: "4.5%" }}
      >
        {isComplete && profile.registerNumber ? (
          <span className="font-sans font-bold text-[#c01818] text-[2.3cqw] truncate leading-none text-center">
            {profile.registerNumber}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 13: Box 9 CAT HAB (Destaque Vermelho Oficial) ═══ */}
      <div
        className="absolute bg-white flex items-center justify-center px-1 overflow-hidden z-10"
        style={{ top: "58.8%", left: "84.8%", width: "13.4%", height: "4.5%" }}
      >
        {isComplete && profile.category ? (
          <span className="font-sans font-bold text-[#c01818] text-[2.6cqw] truncate leading-none text-center">
            {profile.category}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 14: Box NACIONALIDADE ═══ */}
      <div
        className="absolute bg-white flex items-center px-1 overflow-hidden z-10"
        style={{ top: "66.8%", left: "45.8%", width: "52.4%", height: "4.5%" }}
      >
        {isComplete && profile.nationality ? (
          <span className="font-sans font-bold text-black text-[2.5cqw] uppercase truncate leading-none">
            {profile.nationality}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 15: Box FILIAÇÃO (2 Linhas) ═══ */}
      <div
        className="absolute bg-white flex flex-col justify-around px-1 overflow-hidden z-10"
        style={{ top: "75.2%", left: "45.8%", width: "52.4%", height: "19.8%" }}
      >
        <div className="flex items-center min-h-[4.5%]">
          {isComplete && line1Father ? (
            <span className="font-sans font-bold text-black text-[2.4cqw] uppercase truncate leading-none">
              {line1Father}
            </span>
          ) : null}
        </div>
        <div className="flex items-center min-h-[4.5%]">
          {isComplete && line2Mother ? (
            <span className="font-sans font-bold text-black text-[2.4cqw] uppercase truncate leading-none">
              {line2Mother}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** Verso da CNH oficial brasileira com tabela de categorias e observações */
export function CnhCardBack({ profile }: { profile: Profile }) {
  const isComplete = isDocumentationComplete(profile);
  const catUpper = profile.category ? profile.category.toUpperCase() : "";

  const isA = isComplete && catUpper.includes("A");
  const isB = isComplete && catUpper.includes("B");
  const isC = isComplete && catUpper.includes("C");
  const isD = isComplete && catUpper.includes("D");
  const isE = isComplete && catUpper.includes("E");

  const categories = [
    { cat: "A", name: "Motocicletas e triciclos", active: isA },
    { cat: "B", name: "Automóveis até 3.500 kg", active: isB },
    { cat: "C", name: "Veículos de carga > 3.500 kg", active: isC },
    { cat: "D", name: "Passageiros > 8 lugares", active: isD },
    { cat: "E", name: "Articulados / Unidade acoplada", active: isE },
    { cat: "ACC", name: "Ciclomotores até 50cc", active: false },
  ];

  return (
    <article
      aria-label="Verso da Carteira Nacional de Habilitação Oficial"
      className="relative flex h-[485px] w-[345px] max-w-full flex-col justify-between overflow-hidden rounded-md border border-[#1b3d2b] bg-[#edf5ee] p-3 shadow-[0_12px_32px_-10px_rgba(20,83,45,0.3)] select-none text-slate-900"
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
      <div className="flex items-center justify-between border-b border-[#2b533d]/40 pb-1.5">
        <span className="text-[9px] font-black tracking-wider text-[#111914] uppercase">
          CATEGORIAS AUTORIZADAS / SENATRAN
        </span>
        <span className="text-[8.5px] font-bold text-emerald-900">
          SERPRO / GOV.BR
        </span>
      </div>

      {/* Tabela de Categorias Autêntica */}
      <div className="grid grid-cols-1 gap-1.5 py-1">
        {categories.map(({ cat, name, active }) => (
          <div
            key={cat}
            className={`flex items-center justify-between rounded-[3px] border px-2.5 py-1.5 ${
              active
                ? "border-emerald-800 bg-emerald-900 text-white font-bold"
                : "border-[#2b533d]/30 bg-white/70 text-slate-800"
            }`}
          >
            <span className="font-mono text-[11px] font-black">{cat}</span>
            <span className="text-[9px] truncate max-w-[170px]">{name}</span>
            <span className="text-[9px] font-black">{active ? "SIM" : "NÃO"}</span>
          </div>
        ))}
      </div>

      {/* Observações e Emissão */}
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col justify-between rounded-[3px] border border-[#2b533d] bg-white/85 px-1.5 py-0.5 shadow-xs">
          <span className="text-[7px] font-bold uppercase tracking-tight text-[#1e4632] leading-none">
            12 OBSERVAÇÕES
          </span>
          <span className="truncate text-[9.5px] font-black uppercase text-slate-950 leading-tight min-h-[14px]">
            {isComplete && profile.observations ? profile.observations : "\u00A0"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="flex flex-col justify-between rounded-[3px] border border-[#2b533d] bg-white/85 px-1.5 py-0.5 shadow-xs">
            <span className="text-[7px] font-bold uppercase tracking-tight text-[#1e4632] leading-none">
              LOCAL DE EMISSÃO
            </span>
            <span className="truncate text-[9.5px] font-black uppercase text-slate-950 leading-tight min-h-[14px]">
              {isComplete && profile.birthPlace ? profile.birthPlace : "\u00A0"}
            </span>
          </div>
          <div className="flex flex-col justify-between rounded-[3px] border border-[#2b533d] bg-white/85 px-1.5 py-0.5 shadow-xs">
            <span className="text-[7px] font-bold uppercase tracking-tight text-[#1e4632] leading-none">
              ÓRGÃO EMISSOR
            </span>
            <span className="truncate text-[9.5px] font-black uppercase text-slate-950 leading-tight min-h-[14px]">
              {isComplete && profile.state ? `DETRAN-${profile.state}` : "\u00A0"}
            </span>
          </div>
        </div>
      </div>

      {/* Faixa MRZ (Machine Readable Zone) do Verso Oficial */}
      <div className="mt-1 rounded-[3px] bg-white/90 p-1.5 font-mono text-[8px] font-bold tracking-widest text-slate-700 leading-tight">
        <div>{isComplete ? `I<BRA${profile.formNumber || "0000000000"}<<<<<<<<<<<<<<<` : "\u00A0"}</div>
        <div className="mt-0.5">{isComplete ? `0000000M0000000BRA<<<<<<<<<<<${profile.registerNumber?.slice(-1) || "0"}` : "\u00A0"}</div>
      </div>
    </article>
  );
}

/** Slide do QR Code Vio Oficial com Alta Resolução e Fidelidade */
export function CnhVioQrSlide({ profile }: { profile: Profile }) {
  return (
    <article
      aria-label="QR Code de autenticidade Vio"
      className="relative flex h-[485px] w-[345px] max-w-full mx-auto flex-col items-center justify-between overflow-hidden rounded-md border border-emerald-900/35 bg-white p-5 shadow-[0_12px_32px_-12px_rgba(20,83,45,0.25)] select-none text-center"
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-[11px] font-black tracking-widest text-[#19234e] uppercase">
          Validação Digital de Autenticidade
        </span>
        <span className="text-xs text-slate-500">
          Escaneie com o aplicativo oficial <strong className="text-blue-700">Vio</strong>
        </span>
      </div>

      {/* QR Code Vio Oficial em SVG de Alta Resolução */}
      <div className="relative aspect-square w-52 rounded-lg border-2 border-slate-900 p-2 shadow-sm bg-white">
        <QrCodeVioSvg className="h-full w-full" />
      </div>

      <div className="flex flex-col gap-0.5 text-center">
        <span className="font-mono text-[11px] font-bold text-slate-800">
          RENACH: {profile.registerNumber || "00000000000"}
        </span>
        <span className="text-[9.5px] text-slate-500">
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
      className="relative flex h-[485px] w-[345px] max-w-full mx-auto flex-col justify-between overflow-hidden rounded-md border border-slate-200 bg-white p-5 shadow-[0_12px_32px_-12px_rgba(20,83,45,0.25)] select-none text-slate-800"
    >
      <div className="border-b border-slate-100 pb-2">
        <h3 className="text-sm font-bold text-[#19234e] uppercase">
          Certificado Digital do Condutor
        </h3>
        <p className="text-[10.5px] text-slate-500">Secretaria Nacional de Trânsito — SENATRAN</p>
      </div>

      <div className="flex flex-col gap-2.5 py-2 text-xs">
        <div className="flex justify-between border-b border-slate-100 pb-1.5">
          <span className="text-slate-500">Nome:</span>
          <span className="font-bold text-right">{profile.name || "—"}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-1.5">
          <span className="text-slate-500">CPF:</span>
          <span className="font-mono font-bold">{profile.cpf || "—"}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-1.5">
          <span className="text-slate-500">RG / UF:</span>
          <span className="font-bold">{profile.rg || "—"}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-1.5">
          <span className="text-slate-500">Nº Registro:</span>
          <span className="font-mono font-bold">{profile.registerNumber || "—"}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-1.5">
          <span className="text-slate-500">Categoria:</span>
          <span className="font-black text-emerald-800">{profile.category || "—"}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-1.5">
          <span className="text-slate-500">Validade CNH:</span>
          <span className="font-bold text-emerald-700">{profile.validUntil || "—"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Situação:</span>
          <span className="font-bold text-emerald-600">
            {isDocumentationComplete(profile) ? "REGULAR" : "PENDENTE DE PREENCHIMENTO"}
          </span>
        </div>
      </div>

      <div className="rounded-md bg-emerald-50 p-2 text-center text-[10.5px] text-emerald-800 font-medium">
        Documento assinado digitalmente com certificado ICP-Brasil
      </div>
    </article>
  );
}
