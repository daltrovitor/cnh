// Hello World
"use client";

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
      className={`flex flex-col justify-between rounded-[3px] border border-[#2b533d] bg-white/85 px-1.5 py-0.5 shadow-xs ${className}`}
    >
      <span className="text-[7px] font-bold uppercase tracking-tight text-[#1e4632] leading-none">
        {label}
      </span>
      <span
        className={`truncate text-[10px] font-black uppercase text-slate-950 leading-tight min-h-[14px] ${valueClassName}`}
      >
        {value || "\u00A0"}
      </span>
    </div>
  );
}

/** Padrão de hachuras de segurança para o campo ACC da CNH */
function AccSecurityHatch() {
  return (
    <div className="flex flex-col justify-between rounded-[3px] border border-[#2b533d] bg-white/85 px-1 py-0.5 shadow-xs">
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

/** Frente da CNH Oficial Brasileira no design oficial CDT calibrado (exato às imagens de referência) */
export function CnhCardFront({ profile }: { profile: Profile }) {
  // Separação dos nomes da filiação para renderizar em 2 linhas autênticas
  const affiliationParts = profile.affiliation
    ? profile.affiliation.split(/\s*[/|\n]\s*/)
    : [];
  const line1Father = affiliationParts[0] || "";
  const line2Mother = affiliationParts[1] || "";

  return (
    <article
      aria-label="Frente da Carteira Nacional de Habilitação Oficial"
      className="relative flex h-[485px] w-[345px] max-w-full flex-col overflow-hidden rounded-md border border-[#1b3d2b] bg-[#edf5ee] shadow-[0_12px_32px_-10px_rgba(20,83,45,0.3)] select-none text-slate-900"
      style={{
        backgroundImage: `
          radial-gradient(#b0d7b7 0.75px, transparent 0.75px),
          repeating-linear-gradient(45deg, rgba(162,212,173,0.12) 0px, rgba(162,212,173,0.12) 2px, transparent 2px, transparent 8px),
          linear-gradient(135deg, #f7faf7 0%, #eaf4eb 45%, #dcf0de 100%)
        `,
        backgroundSize: "6px 6px, 12px 12px, 100% 100%",
      }}
    >
      {/* 1. Tarja Lateral Direita Preta Oficial (Imagens 1, 2 e 4) */}
      <aside className="absolute top-0 right-0 bottom-0 w-[35px] bg-black flex flex-col items-center justify-between py-2 text-white shadow-xs z-20">
        {/* Brasão da República Federativa do Brasil em Dourado Oficial com leve saliência circular */}
        <div className="flex items-center justify-center shrink-0 -ml-1">
          <BrasaoRepublica className="h-8.5 w-8.5 text-[#facc15] drop-shadow-xs" />
        </div>

        {/* Textos Oficiais Verticais em Dourado/Amarelo com tipografia e espaçamentos exatos */}
        <div className="flex flex-col items-center justify-center text-center [writing-mode:vertical-rl] rotate-180 gap-1.5 my-auto">
          <span className="text-[8.5px] font-black tracking-widest text-[#facc15] uppercase leading-none">
            REPÚBLICA FEDERATIVA DO BRASIL
          </span>
          <span className="text-[7.5px] font-bold tracking-wider text-[#fde047] uppercase leading-none">
            MINISTÉRIO DOS TRANSPORTES
          </span>
          <span className="text-[7px] font-bold tracking-tight text-[#fef08a] uppercase leading-none">
            SECRETARIA NACIONAL DE TRÂNSITO
          </span>
        </div>

        {/* Selo Oval Oficial BR em Dourado com acabamento final */}
        <div className="flex items-center justify-center shrink-0 -ml-1">
          <SeloBr className="h-8.5 w-7 text-[#facc15] drop-shadow-xs" />
        </div>
      </aside>

      {/* 2. Sub-cabeçalho Verde Vertical Oficial (Imagens 1 e 5) */}
      <div className="absolute top-0 right-[35px] bottom-0 w-[14px] border-r border-[#2b533d]/40 bg-[#dff0e2]/90 flex items-center justify-center z-10">
        <span className="text-[6.5px] font-black tracking-tight text-slate-900 uppercase [writing-mode:vertical-rl] rotate-180 leading-none">
          CARTEIRA NACIONAL DE HABILITAÇÃO / DRIVER LICENSE / PERMISO DE CONDUCCIÓN
        </span>
      </div>

      {/* 3. Área Principal do Documento (à esquerda da tarja preta e do sub-cabeçalho) */}
      <div className="relative mr-[49px] flex flex-1 flex-col p-2 overflow-hidden justify-between">
        {/* Topo: VÁLIDA EM TODO O TERRITÓRIO NACIONAL + Número e Mapa do Brasil (Imagens 1 e 3) */}
        <div className="flex items-center justify-between pb-1 shrink-0">
          {/* Esquerda: VÁLIDA EM TODO O TERRITÓRIO NACIONAL + Box com Número */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[7px] font-black uppercase tracking-wider text-slate-900 leading-none">
              VÁLIDA EM TODO O TERRITÓRIO NACIONAL
            </span>
            <div className="flex h-5.5 items-center justify-center rounded-[2px] border border-[#2b533d] bg-white/95 px-2 shadow-xs">
              <span className="font-mono text-[10.5px] font-black text-slate-950 tracking-[0.2em] leading-none">
                {profile.formNumber || "\u00A0"}
              </span>
            </div>
          </div>

          {/* Direita: Mapa Oficial do Brasil em Dourado com Silhueta Real e Brilho (Imagem 3) */}
          <div className="flex items-center justify-center pr-1">
            <MapaEstado className="h-11 w-11 text-[#c9972c] drop-shadow-[0_0_2px_rgba(201,151,44,0.6)] shrink-0" />
          </div>
        </div>

        {/* Seção Superior do Corpo: Foto 3x4 Oficial + Faixa de Segurança + Card 2 e 1 NOME E SOBRENOME (Imagens 1 e 5) */}
        <div className="flex h-[115px] shrink-0 items-stretch gap-1.5 pt-0.5">
          {/* Faixa Vertical Esquerda com Micro-numeração de Segurança */}
          <div className="flex w-3 shrink-0 items-center justify-center bg-white/90 rounded-[2px] border border-[#2b533d]/40 [writing-mode:vertical-rl] rotate-180 py-1">
            <span className="text-[5px] font-mono text-slate-600 tracking-wider">
              1234567890 / 1234567890 / 1234567890
            </span>
          </div>

          {/* Foto Oficial do Condutor: Proporção 3x4, cabeça virada para a direita (Imagens 1 e 5) */}
          <div className="relative aspect-[4/3] w-[145px] shrink-0 overflow-hidden rounded-[2px] border border-[#2b533d] bg-white shadow-xs">
            {profile.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.photo}
                alt={`Foto de ${profile.name}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/70" />
            )}
          </div>

          {/* Card 2 e 1 NOME E SOBRENOME: Posicionado à direita da foto, com texto vertical autêntico */}
          <div className="flex flex-1 flex-col justify-between rounded-[2px] border border-[#2b533d] bg-white/90 p-1 shadow-xs">
            <span className="text-[6.5px] font-bold uppercase tracking-tight text-[#1e4632] leading-none [writing-mode:vertical-rl] rotate-180">
              2 e 1 NOME E SOBRENOME
            </span>
            <span className="font-black uppercase text-slate-950 text-[10.5px] leading-tight truncate [writing-mode:vertical-rl] rotate-180 my-auto">
              {profile.name || "\u00A0"}
            </span>
          </div>
        </div>

        {/* Seção Inferior do Corpo: Colunas Verticais de Campos Oficiais (Imagens 1 e 5) */}
        <div className="flex flex-1 items-stretch gap-1 pt-1 min-h-0">
          {/* Coluna 6 (Extrema Esquerda): FILIAÇÃO + ASSINATURA DO PORTADOR */}
          <div className="flex w-[68px] shrink-0 flex-col justify-between gap-1">
            {/* Box FILIAÇÃO */}
            <div className="flex flex-1 flex-col justify-between rounded-[2px] border border-[#2b533d] bg-white/85 p-1 shadow-xs">
              <span className="text-[6.5px] font-bold uppercase tracking-tight text-[#1e4632] leading-none [writing-mode:vertical-rl] rotate-180">
                FILIAÇÃO
              </span>
              <div className="flex items-center gap-1 my-auto [writing-mode:vertical-rl] rotate-180">
                <span className="truncate text-[8.5px] font-black uppercase text-slate-950">
                  {line1Father || "\u00A0"}
                </span>
                <span className="truncate text-[8.5px] font-black uppercase text-slate-950">
                  {line2Mother || "\u00A0"}
                </span>
              </div>
            </div>

            {/* Box 7 ASSINATURA DO PORTADOR (logo abaixo, quase colado) */}
            <div className="relative flex h-24 shrink-0 flex-col justify-between rounded-[2px] border border-[#2b533d] bg-white/95 p-1 shadow-xs">
              <div className="flex flex-1 items-center justify-center overflow-hidden">
                {profile.signature ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.signature}
                    alt="Assinatura do Portador"
                    className="max-h-full max-w-full object-contain [writing-mode:vertical-rl] rotate-180"
                  />
                ) : (
                  <span className="text-[9px] text-transparent select-none">{"\u00A0"}</span>
                )}
              </div>
              <span className="text-[5.5px] font-black uppercase tracking-tight text-[#1e4632] leading-none text-center">
                7 ASSINATURA DO PORTADOR
              </span>
            </div>
          </div>

          {/* Coluna 5: NACIONALIDADE */}
          <div className="flex w-[32px] shrink-0 flex-col justify-between rounded-[2px] border border-[#2b533d] bg-white/85 p-1 shadow-xs">
            <span className="text-[6.5px] font-bold uppercase tracking-tight text-[#1e4632] leading-none [writing-mode:vertical-rl] rotate-180">
              NACIONALIDADE
            </span>
            <span className="font-black text-[9.5px] uppercase text-slate-950 [writing-mode:vertical-rl] rotate-180 truncate my-auto">
              {profile.nationality || "\u00A0"}
            </span>
          </div>

          {/* Coluna 4: 4d CPF + 5 Nº REGISTRO + 9 CAT HAB */}
          <div className="flex w-[46px] shrink-0 flex-col justify-between gap-1">
            <div className="flex flex-1 flex-col justify-between rounded-[2px] border border-[#2b533d] bg-white/85 p-1 shadow-xs">
              <span className="text-[6.5px] font-bold uppercase tracking-tight text-[#1e4632] leading-none [writing-mode:vertical-rl] rotate-180">
                4d CPF
              </span>
              <span className="font-mono text-[9px] font-black text-slate-950 [writing-mode:vertical-rl] rotate-180 truncate my-auto">
                {profile.cpf || "\u00A0"}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between rounded-[2px] border border-[#2b533d] bg-white/85 p-1 shadow-xs">
              <span className="text-[6.5px] font-bold uppercase tracking-tight text-[#1e4632] leading-none [writing-mode:vertical-rl] rotate-180">
                5 Nº REGISTRO
              </span>
              <span className="font-mono text-[9px] font-black text-red-600 [writing-mode:vertical-rl] rotate-180 truncate my-auto">
                {profile.registerNumber || "\u00A0"}
              </span>
            </div>
            <div className="flex h-14 shrink-0 flex-col justify-between rounded-[2px] border border-[#2b533d] bg-white/85 p-1 shadow-xs">
              <span className="text-[6.5px] font-bold uppercase tracking-tight text-[#1e4632] leading-none [writing-mode:vertical-rl] rotate-180">
                9 CAT HAB
              </span>
              <span className="text-[10px] font-black text-red-600 [writing-mode:vertical-rl] rotate-180 text-center my-auto">
                {profile.category || "\u00A0"}
              </span>
            </div>
          </div>

          {/* Coluna 3: 4c DOC IDENTIDADE / ÓRG EMISSOR / UF */}
          <div className="flex w-[42px] shrink-0 flex-col justify-between rounded-[2px] border border-[#2b533d] bg-white/85 p-1 shadow-xs">
            <span className="text-[6.5px] font-bold uppercase tracking-tight text-[#1e4632] leading-none [writing-mode:vertical-rl] rotate-180">
              4c DOC IDENTIDADE / ÓRG EMISSOR / UF
            </span>
            <span className="font-black text-[9.5px] uppercase text-slate-950 [writing-mode:vertical-rl] rotate-180 truncate my-auto">
              {profile.rg || "\u00A0"}
            </span>
          </div>

          {/* Coluna 2: 4a DATA EMISSÃO + 4b VALIDADE + ACC + Categoria D */}
          <div className="flex w-[42px] shrink-0 flex-col justify-between gap-1">
            <div className="flex flex-1 flex-col justify-between rounded-[2px] border border-[#2b533d] bg-white/85 p-1 shadow-xs">
              <span className="text-[6.5px] font-bold uppercase tracking-tight text-[#1e4632] leading-none [writing-mode:vertical-rl] rotate-180">
                4a DATA EMISSÃO
              </span>
              <span className="font-black text-[9px] text-slate-950 [writing-mode:vertical-rl] rotate-180 truncate my-auto">
                {profile.issueDate || "\u00A0"}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between rounded-[2px] border border-[#2b533d] bg-white/85 p-1 shadow-xs">
              <span className="text-[6.5px] font-bold uppercase tracking-tight text-[#1e4632] leading-none [writing-mode:vertical-rl] rotate-180">
                4b VALIDADE
              </span>
              <span className="font-black text-[9px] text-red-600 [writing-mode:vertical-rl] rotate-180 truncate my-auto">
                {profile.validUntil || "\u00A0"}
              </span>
            </div>
            <div className="flex h-10 shrink-0 flex-col justify-between rounded-[2px] border border-[#2b533d] bg-white/85 p-0.5 shadow-xs">
              <span className="text-[6px] font-bold uppercase text-[#1e4632] text-center leading-none">
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
            <div className="flex h-10 shrink-0 flex-col justify-center items-center rounded-[2px] border border-[#2b533d] bg-white/95 p-0.5 shadow-xs">
              <span className="text-[13px] font-black uppercase text-slate-950 leading-none">
                {profile.category || "\u00A0"}
              </span>
            </div>
          </div>

          {/* Coluna 1 (Extrema Direita do Miolo): 3 DATA, LOCAL E UF DE NASCIMENTO + 1ª HABILITAÇÃO */}
          <div className="flex flex-1 flex-col justify-between gap-1">
            <div className="flex flex-1 flex-col justify-between rounded-[2px] border border-[#2b533d] bg-white/85 p-1 shadow-xs">
              <span className="text-[6.5px] font-bold uppercase tracking-tight text-[#1e4632] leading-none [writing-mode:vertical-rl] rotate-180">
                3 DATA, LOCAL E UF DE NASCIMENTO
              </span>
              <span className="font-black text-[9.5px] text-slate-950 [writing-mode:vertical-rl] rotate-180 truncate my-auto">
                {profile.birthDate ? `${profile.birthDate}${profile.birthPlace ? `, ${profile.birthPlace}` : ""}` : "\u00A0"}
              </span>
            </div>
            <div className="flex h-20 shrink-0 flex-col justify-between rounded-[2px] border border-[#2b533d] bg-white/85 p-1 shadow-xs">
              <span className="text-[6.5px] font-bold uppercase tracking-tight text-[#1e4632] leading-none [writing-mode:vertical-rl] rotate-180">
                1ª HABILITAÇÃO
              </span>
              <span className="font-black text-[9px] text-slate-950 [writing-mode:vertical-rl] rotate-180 text-center my-auto">
                {profile.firstLicenseDate || "\u00A0"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Verso da CNH oficial brasileira com tabela de categorias e observações */
export function CnhCardBack({ profile }: { profile: Profile }) {
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
        <CnhBox
          label="12 OBSERVAÇÕES"
          value={profile.observations}
          valueClassName="text-[9.5px] font-black"
        />
        <div className="grid grid-cols-2 gap-1.5">
          <CnhBox
            label="LOCAL DE EMISSÃO"
            value={profile.birthPlace}
            valueClassName="text-[9.5px]"
          />
          <CnhBox
            label="ÓRGÃO EMISSOR"
            value={profile.state ? `DETRAN-${profile.state}` : ""}
            valueClassName="text-[9.5px]"
          />
        </div>
      </div>

      {/* Faixa MRZ (Machine Readable Zone) do Verso Oficial */}
      <div className="mt-1 rounded-[3px] bg-white/90 p-1.5 font-mono text-[8px] font-bold tracking-widest text-slate-700 leading-tight">
        <div>{`I<BRA${profile.formNumber || "0000000000"}<<<<<<<<<<<<<<<`}</div>
        <div className="mt-0.5">{`0000000M0000000BRA<<<<<<<<<<<${profile.registerNumber?.slice(-1) || "0"}`}</div>
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
            {profile.name ? "REGULAR" : "PENDENTE DE PREENCHIMENTO"}
          </span>
        </div>
      </div>

      <div className="rounded-md bg-emerald-50 p-2 text-center text-[10.5px] text-emerald-800 font-medium">
        Documento assinado digitalmente com certificado ICP-Brasil
      </div>
    </article>
  );
}
