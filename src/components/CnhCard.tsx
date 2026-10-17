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
 * Frente da CNH Oficial Brasileira (Modelo 2022+) — Orientada na vertical com proporção
 * exata do documento (692×955), responsiva para preencher a largura disponível.
 * Foto na parte superior, cabeça virada para a direita.
 *
 * Máscaras opacas calibradas pixel a pixel com sharp (coordenadas medidas via
 * scripts/measure_fields.js) na COR EXATA DO DOCUMENTO (#eaf5ee — verde suave do papel
 * de segurança) garantem que os dados de teste da imagem original NUNCA apareçam.
 * Se a documentação não estiver completa, o documento fica 100% em branco.
 * Quando completa, as informações, a foto e a assinatura são sobrepostas com perfeição
 * geométrica na mesma tipografia (Arial 400 regular), idêntica à impressão oficial.
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

  // Cor verde exata do documento atrás das letras: #eaf5ee
  const docGreen = "bg-[#eaf5ee]";
  // Fonte idêntica à impressão oficial da CNH: Arial regular (400), não bold
  const fontStyle: React.CSSProperties = {
    fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
    fontWeight: 400,
    letterSpacing: "0.01em",
  };

  return (
    <article
      aria-label="Frente da Carteira Nacional de Habilitação Oficial"
      className="relative select-none overflow-hidden rounded-md shadow-[0_12px_32px_-10px_rgba(20,83,45,0.3)] border border-[#1b3d2b]/30 bg-[#eaf5ee] w-full aspect-[692/955] max-w-full"
    >
      {/* ═══ CAMADA 0: Imagem oficial do documento de habilitação vertical ═══ */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cnh-template-vertical.png"
        alt="Modelo Oficial da CNH Brasileira"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* ═══ CAMADA 1: Box 2 e 1 NOME E SOBRENOME ═══
          Medido: data value x=535-559, y=170-506 → left:77.3% top:17.8% w:3.6% h:35.3%
          Overlay cobre a faixa de dados com margem para nomes mais longos */}
      <div
        className={`absolute ${docGreen} flex items-center overflow-hidden z-10 [writing-mode:vertical-rl] rotate-180`}
        style={{ top: "17.8%", left: "77.0%", width: "3.8%", height: "35.5%" }}
      >
        {isComplete && profile.name ? (
          <span
            className="uppercase truncate leading-none text-black text-[9px]"
            style={fontStyle}
          >
            {profile.name}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 2: Box 1ª HABILITAÇÃO ═══
          Medido: data value x=542-559, y=792-916 → left:78.3% top:82.9% w:2.6% h:13.1% */}
      <div
        className={`absolute ${docGreen} flex items-center justify-center overflow-hidden z-10 [writing-mode:vertical-rl] rotate-180`}
        style={{ top: "83.0%", left: "77.0%", width: "3.8%", height: "13.0%" }}
      >
        {isComplete && profile.firstLicenseDate ? (
          <span
            className="truncate leading-none text-black text-[8px] text-center"
            style={fontStyle}
          >
            {profile.firstLicenseDate}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 3: Foto do Condutor ═══
          Medido: foto original x=155-514, y=30-269 → left:22.4% top:3.1% w:52.0% h:25.1%
          Deslocada um pouco para baixo conforme feedback para cobrir foto original inteira */}
      <div
        className={`absolute ${docGreen} overflow-hidden z-10 flex items-center justify-center`}
        style={{ top: "3.0%", left: "22.0%", width: "53.0%", height: "25.5%" }}
      >
        {isComplete && profile.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.photo}
            alt={`Foto de ${profile.name || "Condutor"}`}
            className="h-full w-full object-cover rotate-90"
          />
        ) : (
          <div className={`h-full w-full ${docGreen}`} />
        )}
      </div>

      {/* ═══ CAMADA 4: Assinatura do Portador ═══
          Medido: assinatura original x=45-159, y=30-269 → left:6.5% top:3.1% w:16.6% h:25.1%
          Background branco conforme solicitado pelo usuário */}
      <div
        className="absolute bg-white flex items-center justify-center overflow-hidden z-10"
        style={{ top: "3.0%", left: "6.2%", width: "15.5%", height: "25.5%" }}
      >
        {isComplete && profile.signature ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.signature}
            alt="Assinatura do Portador"
            className="max-h-full max-w-full object-contain p-0.5 rotate-90"
          />
        ) : (
          <div className="h-full w-full bg-white" />
        )}
      </div>

      {/* ═══ CAMADA 5: Numeração Vertical de Segurança (Nº Espelho) ═══
          Medido: x=17-44, y=340-942 → left:2.5% top:35.6% w:4.0% h:63.1% */}
      <div
        className={`absolute ${docGreen} flex items-center justify-center overflow-hidden z-10`}
        style={{ top: "35.5%", left: "2.3%", width: "4.2%", height: "63.5%" }}
      >
        {isComplete && profile.formNumber ? (
          <span
            className="text-black text-[7.5px] [writing-mode:vertical-rl] rotate-180 tracking-[0.16em] whitespace-nowrap"
            style={fontStyle}
          >
            {profile.formNumber}
          </span>
        ) : (
          <div className={`h-full w-full ${docGreen}`} />
        )}
      </div>

      {/* ═══ CAMADA 6: Box 3 DATA, LOCAL E UF DE NASCIMENTO ═══
          Medido: data value x=460-499, y=260-942 → left:66.5% top:27.2% w:5.8% h:71.5%
          Label (campo) x=490-519 está à direita; overlay cobre só o valor (esquerda do label) */}
      <div
        className={`absolute ${docGreen} flex items-center overflow-hidden z-10 [writing-mode:vertical-rl] rotate-180`}
        style={{ top: "27.2%", left: "66.2%", width: "4.0%", height: "70.5%" }}
      >
        {isComplete && birthText ? (
          <span
            className="uppercase truncate leading-none text-black text-[8px]"
            style={fontStyle}
          >
            {birthText}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 7: Box 4a DATA EMISSÃO ═══
          Medido: data value x=395-434, y=260-519 → left:57.1% top:27.2% w:5.8% h:27.2%
          Posição perfeita conforme feedback, apenas fonte corrigida */}
      <div
        className={`absolute ${docGreen} flex items-center justify-center overflow-hidden z-10 [writing-mode:vertical-rl] rotate-180`}
        style={{ top: "27.2%", left: "57.0%", width: "4.0%", height: "27.0%" }}
      >
        {isComplete && profile.issueDate ? (
          <span
            className="truncate leading-none text-black text-[8px] text-center"
            style={fontStyle}
          >
            {profile.issueDate}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 8: Box 4b VALIDADE (Destaque Vermelho Oficial) ═══
          Medido: data value x=395-434, y=510-724 → left:57.1% top:53.4% w:5.8% h:22.5%
          Corrigido para não sobrepor lado esquerdo */}
      <div
        className={`absolute ${docGreen} flex items-center justify-center overflow-hidden z-10 [writing-mode:vertical-rl] rotate-180`}
        style={{ top: "53.5%", left: "57.0%", width: "4.0%", height: "22.0%" }}
      >
        {isComplete && profile.validUntil ? (
          <span
            className="truncate leading-none text-[#c01818] text-[8px] text-center"
            style={fontStyle}
          >
            {profile.validUntil}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 9: Letra da Categoria ao lado do ACC (D) ═══
          Medido: ACC area x=390-439, y=720-942 → left:56.4% top:75.4% w:7.2% h:23.4% */}
      <div
        className={`absolute ${docGreen} flex items-center justify-center overflow-hidden z-10 [writing-mode:vertical-rl] rotate-180`}
        style={{ top: "92.0%", left: "56.5%", width: "5.5%", height: "5.0%" }}
      >
        {isComplete && profile.category ? (
          <span
            className="text-black text-[14px] leading-none text-center"
            style={fontStyle}
          >
            {profile.category?.trim().charAt(0) || "B"}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 10: Box 4c DOC IDENTIDADE / ÓRG EMISSOR / UF ═══
          Medido: data value x=325-369, y=340-942 → left:47.0% top:35.6% w:6.5% h:63.1%
          Corrigido top para não sobrepor em cima */}
      <div
        className={`absolute ${docGreen} flex items-center overflow-hidden z-10 [writing-mode:vertical-rl] rotate-180`}
        style={{ top: "35.5%", left: "47.0%", width: "4.5%", height: "63.0%" }}
      >
        {isComplete && profile.rg ? (
          <span
            className="uppercase truncate leading-none text-black text-[8px]"
            style={fontStyle}
          >
            {profile.rg}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 11: Box 4d CPF ═══
          Medido: data value x=265-304, y=260-519 → left:38.3% top:27.2% w:5.8% h:27.2%
          Corrigido: descer (top maior), afastar do direito (left menor) */}
      <div
        className={`absolute ${docGreen} flex items-center justify-center overflow-hidden z-10 [writing-mode:vertical-rl] rotate-180`}
        style={{ top: "27.2%", left: "38.0%", width: "4.0%", height: "27.0%" }}
      >
        {isComplete && profile.cpf ? (
          <span
            className="truncate leading-none text-black text-[8px] text-center"
            style={fontStyle}
          >
            {profile.cpf}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 12: Box 5 Nº REGISTRO (Destaque Vermelho Oficial) ═══
          Medido: data value x=265-303, y=510-724 → left:38.3% top:53.4% w:5.6% h:22.5%
          Corrigido: descer, afastar da esquerda */}
      <div
        className={`absolute ${docGreen} flex items-center justify-center overflow-hidden z-10 [writing-mode:vertical-rl] rotate-180`}
        style={{ top: "53.5%", left: "38.0%", width: "4.0%", height: "22.0%" }}
      >
        {isComplete && profile.registerNumber ? (
          <span
            className="truncate leading-none text-[#c01818] text-[8px] text-center"
            style={fontStyle}
          >
            {profile.registerNumber}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 13: Box 9 CAT HAB (Destaque Vermelho Oficial) ═══
          Medido: data value x=265-304, y=720-942 → left:38.3% top:75.4% w:5.8% h:23.4%
          Corrigido: mais para o canto, descer, afastar da esquerda */}
      <div
        className={`absolute ${docGreen} flex items-center justify-center overflow-hidden z-10 [writing-mode:vertical-rl] rotate-180`}
        style={{ top: "75.5%", left: "38.0%", width: "4.0%", height: "23.0%" }}
      >
        {isComplete && profile.category ? (
          <span
            className="truncate leading-none text-[#c01818] text-[8.5px] text-center"
            style={fontStyle}
          >
            {profile.category}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 14: Box NACIONALIDADE ═══
          Medido: data value x=195-232, y=265-942 → left:28.2% top:27.7% w:5.5% h:71.0%
          Corrigido: descer sem sobrepor embaixo */}
      <div
        className={`absolute ${docGreen} flex items-center overflow-hidden z-10 [writing-mode:vertical-rl] rotate-180`}
        style={{ top: "27.8%", left: "28.0%", width: "4.0%", height: "70.5%" }}
      >
        {isComplete && profile.nationality ? (
          <span
            className="uppercase truncate leading-none text-black text-[8.5px]"
            style={fontStyle}
          >
            {profile.nationality}
          </span>
        ) : null}
      </div>

      {/* ═══ CAMADA 15: Box FILIAÇÃO (2 Linhas) ═══
          Medido: linha 1 x=135-174, y=260-942 → left:19.5% top:27.2% w:5.8% h:71.5%
          Medido: linha 2 x=65-124, y=278-942 → left:9.4% top:29.1% w:8.7% h:69.6% */}
      <div
        className={`absolute ${docGreen} flex items-center overflow-hidden z-10 [writing-mode:vertical-rl] rotate-180`}
        style={{ top: "27.2%", left: "19.5%", width: "4.0%", height: "71.0%" }}
      >
        {isComplete && line1Father ? (
          <span
            className="uppercase truncate leading-none text-black text-[8px]"
            style={fontStyle}
          >
            {line1Father}
          </span>
        ) : null}
      </div>
      <div
        className={`absolute ${docGreen} flex items-center overflow-hidden z-10 [writing-mode:vertical-rl] rotate-180`}
        style={{ top: "29.0%", left: "9.2%", width: "4.0%", height: "69.5%" }}
      >
        {isComplete && line2Mother ? (
          <span
            className="uppercase truncate leading-none text-black text-[8px]"
            style={fontStyle}
          >
            {line2Mother}
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
