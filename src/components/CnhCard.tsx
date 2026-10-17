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

/** Template 692×955 px: converte coordenadas em pixels para porcentagens do documento */
const DOC_W = 692;
const DOC_H = 955;
const px = (x0: number, x1: number, y0: number, y1: number): React.CSSProperties => ({
  left: `${(x0 / DOC_W) * 100}%`,
  width: `${((x1 - x0) / DOC_W) * 100}%`,
  top: `${(y0 / DOC_H) * 100}%`,
  height: `${((y1 - y0) / DOC_H) * 100}%`,
});

// Cor verde exata do papel atrás dos dados
const DOC_GREEN = "#eaf5ee";
// Tipografia idêntica à impressão: humanista condensada, semibold, altura de caixa ≈ 12px/692
const DATA_FONT: React.CSSProperties = {
  fontFamily: "var(--font-cnh), 'Fira Sans Condensed', 'Arial Narrow', sans-serif",
  fontWeight: 600,
  fontSize: "2.5cqw",
  lineHeight: 1,
  letterSpacing: "0.01em",
};

type VerticalField = {
  key: string;
  /** Máscara em pixels do template: x0, x1, y0, y1 (medidos com sharp sobre o texto original) */
  box: [number, number, number, number];
  value: string;
  red?: boolean;
  center?: boolean;
};

/**
 * Frente da CNH Oficial Brasileira (Modelo 2022+) — vertical, proporção exata do template
 * (692×955). Todas as posições foram medidas pixel a pixel sobre public/cnh-template-vertical.png;
 * cada máscara cobre apenas o valor original (sem invadir bordas ou rótulos) e o texto novo
 * é escrito na mesma fonte, peso e tamanho da impressão, lido de cima para baixo.
 * Se a documentação não estiver completa, os campos ficam em branco.
 */
export function CnhCardFront({ profile }: { profile: Profile }) {
  const isComplete = isDocumentationComplete(profile);

  const affiliationParts = profile.affiliation
    ? profile.affiliation.split(/\s*[/|\n]\s*/)
    : [];

  const birthText = [profile.birthDate, profile.birthPlace].filter(Boolean).join(", ");

  const fields: VerticalField[] = [
    { key: "name", box: [483, 503, 170, 455], value: profile.name.toUpperCase() },
    { key: "firstLicense", box: [483, 503, 790, 892], value: profile.firstLicenseDate ?? "" },
    { key: "birth", box: [424, 445, 446, 745], value: birthText.toUpperCase() },
    { key: "issue", box: [367, 387, 444, 548], value: profile.issueDate ?? "" },
    { key: "valid", box: [368, 386, 618, 724], value: profile.validUntil ?? "", red: true },
    { key: "rg", box: [310, 329, 444, 660], value: (profile.rg ?? "").toUpperCase() },
    { key: "cpf", box: [252, 271, 444, 572], value: profile.cpf },
    { key: "register", box: [253, 271, 638, 755], value: profile.registerNumber, red: true },
    { key: "catHab", box: [253, 272, 816, 862], value: (profile.category ?? "").toUpperCase(), red: true },
    { key: "nationality", box: [195, 214, 444, 590], value: (profile.nationality ?? "").toUpperCase() },
    { key: "father", box: [138, 157, 442, 720], value: (affiliationParts[0] ?? "").toUpperCase() },
    { key: "mother", box: [75, 95, 442, 740], value: (affiliationParts[1] ?? "").toUpperCase() },
  ];

  // Altura da faixa da foto/assinatura (y 164→416) expressa em cqw para girar a imagem sem distorcer
  const bandHeightCqw = ((416 - 164) / DOC_W) * 100;

  return (
    <article
      aria-label="Frente da Carteira Nacional de Habilitação Oficial"
      className="relative select-none overflow-hidden rounded-md shadow-[0_12px_32px_-10px_rgba(20,83,45,0.3)] border border-[#1b3d2b]/30 bg-[#eaf5ee] w-full aspect-[692/955] max-w-full [container-type:inline-size]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cnh-template-vertical.png"
        alt="Modelo Oficial da CNH Brasileira"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full pointer-events-none"
        draggable={false}
      />

      {/* Nº do espelho (horizontal, canto superior esquerdo) */}
      <div
        className="absolute z-10 flex items-center overflow-hidden"
        style={{ ...px(28, 296, 72, 116), backgroundColor: DOC_GREEN }}
      >
        {isComplete && profile.formNumber ? (
          <span
            className="whitespace-nowrap text-[#222]"
            style={{ fontFamily: "'Courier New', monospace", fontWeight: 700, fontSize: "5.6cqw", letterSpacing: "0.04em", paddingLeft: "0.6cqw" }}
          >
            {profile.formNumber}
          </span>
        ) : null}
      </div>

      {/* Foto do condutor — cobre toda a foto original, cabeça para a direita */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{ ...px(106, 452, 164, 416), backgroundColor: DOC_GREEN }}
      >
        {isComplete && profile.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.photo}
            alt={`Foto de ${profile.name || "Condutor"}`}
            className="absolute left-1/2 top-1/2 max-w-none object-cover"
            style={{
              width: `${bandHeightCqw}cqw`,
              height: `${((452 - 106) / DOC_W) * 100}cqw`,
              transform: "translate(-50%, -50%) rotate(90deg)",
            }}
          />
        ) : null}
      </div>

      {/* Assinatura do portador — área branca */}
      <div className="absolute z-10 overflow-hidden bg-white" style={px(27, 106, 164, 416)}>
        {isComplete && profile.signature ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.signature}
            alt="Assinatura do Portador"
            className="absolute left-1/2 top-1/2 max-w-none object-contain"
            style={{
              width: `${bandHeightCqw}cqw`,
              height: `${((106 - 27) / DOC_W) * 100}cqw`,
              transform: "translate(-50%, -50%) rotate(90deg)",
            }}
          />
        ) : null}
      </div>

      {/* Campos de dados (texto lido de cima para baixo, topo das letras para a direita) */}
      {fields.map(({ key, box, value, red, center }) => (
        <div
          key={key}
          className={`absolute z-10 flex items-center overflow-hidden [writing-mode:vertical-rl] ${center ? "justify-center" : "justify-start"}`}
          style={{ ...px(...box), backgroundColor: DOC_GREEN, paddingTop: "0.3cqw" }}
        >
          {isComplete && value ? (
            <span
              className={`whitespace-nowrap ${red ? "text-[#d22630]" : "text-[#2b2b2b]"}`}
              style={DATA_FONT}
            >
              {value}
            </span>
          ) : null}
        </div>
      ))}

      {/* Categoria (letra grande ao lado do ACC) */}
      <div
        className="absolute z-10 flex items-center justify-center overflow-hidden [writing-mode:vertical-rl]"
        style={{ ...px(361, 398, 866, 922), backgroundColor: DOC_GREEN }}
      >
        {isComplete && profile.category ? (
          <span
            className="text-[#1a1a1a]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, fontSize: "8.4cqw", lineHeight: 1 }}
          >
            {profile.category.trim().slice(-1).toUpperCase()}
          </span>
        ) : null}
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
