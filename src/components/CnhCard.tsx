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

/** Frente da CNH Oficial Brasileira no design oficial CDT calibrado */
export function CnhCardFront({ profile }: { profile: Profile }) {
  // Separação dos nomes da filiação para renderizar em 2 linhas autênticas
  const affiliationParts = profile.affiliation
    ? profile.affiliation.split(/\s*[/|\n]\s*/)
    : [];
  const line1Father = affiliationParts[0] || "";
  const line2Mother = affiliationParts[1] || "";

  // Conteúdo visual do documento horizontal oficial ampliado (510px x 365px)
  const documentCard = (
    <article
      aria-label="Frente da Carteira Nacional de Habilitação Oficial"
      className="relative flex aspect-[1.40] w-[510px] flex-col overflow-hidden rounded-md border border-[#1b3d2b] bg-[#eaf4eb] shadow-[0_12px_32px_-10px_rgba(20,83,45,0.3)] select-none text-slate-900"
      style={{
        backgroundImage: `
          radial-gradient(#b0d7b7 0.75px, transparent 0.75px),
          repeating-linear-gradient(45deg, rgba(162,212,173,0.12) 0px, rgba(162,212,173,0.12) 2px, transparent 2px, transparent 8px),
          linear-gradient(135deg, #f7faf7 0%, #eaf4eb 45%, #dcf0de 100%)
        `,
        backgroundSize: "6px 6px, 12px 12px, 100% 100%",
      }}
    >
      {/* 1. Tarja Superior Preta Oficial idêntica à imagem media_1791685400386_8e007c34.png */}
      <header className="flex h-13 shrink-0 items-center justify-between bg-black px-4 text-white shadow-xs">
        {/* Brasão da República Federativa do Brasil em Dourado Oficial */}
        <div className="flex items-center shrink-0">
          <BrasaoRepublica className="h-8 w-8 text-[#facc15] drop-shadow-xs" />
        </div>

        {/* Textos Oficiais Centrais em Dourado/Amarelo com tipografia e espaçamentos exatos */}
        <div className="flex flex-col items-center justify-center text-center px-3">
          <span className="text-[10.5px] font-black tracking-widest text-[#facc15] uppercase leading-none">
            REPÚBLICA FEDERATIVA DO BRASIL
          </span>
          <span className="text-[8px] font-bold tracking-wider text-[#fde047] uppercase mt-1 leading-none">
            MINISTÉRIO DOS TRANSPORTES
          </span>
          <span className="text-[7.5px] font-bold tracking-tight text-[#fef08a] uppercase mt-0.5 leading-none">
            SECRETARIA NACIONAL DE TRÂNSITO
          </span>
        </div>

        {/* Selo Oval Oficial BR em Dourado com acabamento final da barra preta */}
        <div className="flex items-center shrink-0 pr-1">
          <SeloBr className="h-7 w-11" />
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
        {/* Faixa Extrema Esquerda: Mapa do Estado Emissor idêntico à foto + Tarja Vertical ("VÁLIDA EM TODO O TERRITÓRIO NACIONAL" + Nº) */}
        <div className="flex w-8 shrink-0 flex-col items-center justify-between py-0.5">
          {/* Topo: Mapa Oficial idêntico à imagem media_1791685441157_697bedc4.png */}
          <div className="flex items-center justify-center pt-0.5">
            <MapaEstado className="h-7 w-7 text-[#c9972c] drop-shadow-xs shrink-0" />
          </div>

          {/* Tarja de Texto e Número em 90 Graus */}
          <div className="my-auto flex items-center justify-center [writing-mode:vertical-rl] rotate-180 gap-2">
            <span className="text-[7px] font-black tracking-widest text-slate-900 uppercase">
              VÁLIDA EM TODO O TERRITÓRIO NACIONAL
            </span>
            <span className="font-mono text-[9.5px] font-black text-slate-950 tracking-wider">
              {profile.formNumber || "\u00A0"}
            </span>
          </div>
        </div>

        {/* Coluna da Foto Oficial 3x4 e Assinatura do Portador */}
        <div className="flex w-[110px] shrink-0 flex-col justify-between pt-7">
          {/* Foto Oficial do Condutor: Proporção Exata 3x4, rebaixada para que o fundo alinhe ao lado de "BRASILEIRA" */}
          <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-[3px] border border-[#2b533d] bg-white shadow-xs">
            {profile.photo ? (
              // eslint-disable-next-line @next/next/no-img-element -- foto proporcional com cabeça apontada para a direita após rotação
              <img
                src={profile.photo}
                alt={`Foto de ${profile.name}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/70" />
            )}
          </div>

          {/* Box da Assinatura do Portador: Logo abaixo da foto (bem perto dela) e ao lado da Filiação */}
          <div className="relative mt-1.5 flex h-11 w-full shrink-0 flex-col justify-between rounded-[3px] border border-[#2b533d] bg-white/95 px-1 py-0.5 shadow-xs">
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
                <span className="text-[9px] text-transparent select-none">{"\u00A0"}</span>
              )}
            </div>

            {/* Rótulo 7 ASSINATURA DO PORTADOR */}
            <span className="text-[5.5px] font-black uppercase tracking-tight text-[#1e4632] leading-none text-center">
              7 ASSINATURA DO PORTADOR
            </span>
          </div>
        </div>

        {/* Coluna Direita: Grade de Campos Oficiais da CNH */}
        <div className="flex flex-1 flex-col justify-between gap-1 min-w-0">
          {/* Linha 1: 2 e 1 Nome e Sobrenome (Aumentado para alcançar a parte superior da foto) + 1ª Habilitação */}
          <div className="grid grid-cols-12 gap-1 items-stretch">
            <CnhBox
              label="2 e 1 NOME E SOBRENOME"
              value={profile.name}
              className="col-span-8 min-h-[30px] py-1"
              valueClassName="text-[11px] font-black text-slate-950"
            />
            <CnhBox
              label="1ª HABILITAÇÃO"
              value={profile.firstLicenseDate}
              className="col-span-4 text-center min-h-[30px] py-1"
              valueClassName="text-[10px] font-black text-center"
            />
          </div>

          {/* Linha 2: 3 Data, Local e UF de Nascimento */}
          <CnhBox
            label="3 DATA, LOCAL E UF DE NASCIMENTO"
            value={profile.birthDate ? `${profile.birthDate}${profile.birthPlace ? `, ${profile.birthPlace}` : ""}` : ""}
            valueClassName="text-[10px] font-black"
          />

          {/* Linha 3: 4a Data Emissão + 4b Validade + ACC + Categoria D */}
          <div className="grid grid-cols-12 gap-1 items-stretch">
            <CnhBox
              label="4a DATA EMISSÃO"
              value={profile.issueDate}
              className="col-span-4"
              valueClassName="text-[9.5px] font-black"
            />
            <CnhBox
              label="4b VALIDADE"
              value={profile.validUntil}
              className="col-span-4"
              valueClassName="text-[10px] font-black text-red-600"
            />
            <div className="col-span-2">
              <AccSecurityHatch />
            </div>
            {/* Box Categoria da CNH */}
            <div className="col-span-2 flex flex-col justify-center items-center rounded-[3px] border border-[#2b533d] bg-white/95 px-0.5 shadow-xs">
              <span className="text-[14px] font-black uppercase text-slate-950 leading-none">
                {profile.category || "\u00A0"}
              </span>
            </div>
          </div>

          {/* Linha 4: 4c Doc Identidade / Órg Emissor / UF */}
          <CnhBox
            label="4c DOC IDENTIDADE / ÓRG EMISSOR / UF"
            value={profile.rg}
            valueClassName="text-[10px] font-black"
          />

          {/* Linha 5: 4d CPF + 5 Nº Registro + 9 Cat Hab */}
          <div className="grid grid-cols-12 gap-1">
            <CnhBox
              label="4d CPF"
              value={profile.cpf}
              className="col-span-5"
              valueClassName="font-mono text-[9.5px] font-black"
            />
            <CnhBox
              label="5 Nº REGISTRO"
              value={profile.registerNumber}
              className="col-span-4 text-center"
              valueClassName="font-mono text-[9.5px] font-black text-red-600 text-center"
            />
            <CnhBox
              label="9 CAT HAB"
              value={profile.category}
              className="col-span-3 text-center"
              valueClassName="text-[10px] font-black text-red-600 text-center"
            />
          </div>

          {/* Linha 6: Nacionalidade (Alinhada exatamente com o final da foto) */}
          <CnhBox
            label="NACIONALIDADE"
            value={profile.nationality}
            valueClassName="text-[10px] font-black"
          />

          {/* Linha 7: Filiação (2 Linhas Oficiais, alinhada com o Box da Assinatura) */}
          <div className="flex flex-col justify-between rounded-[3px] border border-[#2b533d] bg-white/85 px-1.5 py-0.5 shadow-xs">
            <span className="text-[7px] font-bold uppercase tracking-tight text-[#1e4632] leading-none">
              FILIAÇÃO
            </span>
            <div className="flex flex-col leading-tight mt-0.5 min-h-[24px]">
              <span className="truncate text-[9.5px] font-black uppercase text-slate-950">
                {line1Father || "\u00A0"}
              </span>
              <span className="truncate text-[9.5px] font-black uppercase text-slate-950 mt-0.5">
                {line2Mother || "\u00A0"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );

  // Exibição 100% deitada no padrão CDT oficial (90 graus em sentido horário, ampliado para 530px):
  return (
    <div className="relative flex h-[530px] w-full items-center justify-center overflow-visible">
      <div className="shrink-0 rotate-90 origin-center transition-transform duration-300">
        {documentCard}
      </div>
    </div>
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

  const documentCard = (
    <article
      aria-label="Verso da Carteira Nacional de Habilitação Oficial"
      className="relative flex aspect-[1.40] w-[510px] flex-col justify-between overflow-hidden rounded-md border border-[#1b3d2b] bg-[#eaf4eb] p-3 shadow-[0_12px_32px_-10px_rgba(20,83,45,0.3)] select-none text-slate-900"
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
        <span className="text-[9px] font-black tracking-wider text-[#111914] uppercase">
          CATEGORIAS AUTORIZADAS / SENATRAN
        </span>
        <span className="text-[8.5px] font-bold text-emerald-900">
          SERPRO / GOV.BR
        </span>
      </div>

      {/* Tabela de Categorias Autêntica */}
      <div className="grid grid-cols-2 gap-1.5 py-1">
        {categories.map(({ cat, name, active }) => (
          <div
            key={cat}
            className={`flex items-center justify-between rounded-[3px] border px-2 py-1 ${
              active
                ? "border-emerald-800 bg-emerald-900 text-white font-bold"
                : "border-[#2b533d]/30 bg-white/70 text-slate-800"
            }`}
          >
            <span className="font-mono text-[10px] font-black">{cat}</span>
            <span className="text-[8px] truncate max-w-[140px]">{name}</span>
            <span className="text-[8.5px] font-black">{active ? "SIM" : "NÃO"}</span>
          </div>
        ))}
      </div>

      {/* Observações e Emissão */}
      <div className="flex flex-col gap-1">
        <CnhBox
          label="12 OBSERVAÇÕES"
          value={profile.observations}
          valueClassName="text-[9.5px] font-black"
        />
        <div className="grid grid-cols-2 gap-1">
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
      <div className="mt-1 rounded-[3px] bg-white/90 p-1 font-mono text-[7.5px] font-bold tracking-widest text-slate-700 leading-none">
        <div>{`I<BRA${profile.formNumber || "0000000000"}<<<<<<<<<<<<<<<`}</div>
        <div className="mt-0.5">{`0000000M0000000BRA<<<<<<<<<<<${profile.registerNumber?.slice(-1) || "0"}`}</div>
      </div>
    </article>
  );

  return (
    <div className="relative flex h-[530px] w-full items-center justify-center overflow-visible">
      <div className="shrink-0 rotate-90 origin-center transition-transform duration-300">
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
      className="relative flex h-[530px] w-full max-w-[365px] mx-auto flex-col items-center justify-between overflow-hidden rounded-xl border border-emerald-900/35 bg-white p-5 shadow-[0_12px_32px_-12px_rgba(20,83,45,0.25)] select-none text-center"
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
      className="relative flex h-[530px] w-full max-w-[365px] mx-auto flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_-12px_rgba(20,83,45,0.25)] select-none text-slate-800"
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
