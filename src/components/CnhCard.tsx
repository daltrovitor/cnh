// Hello World
"use client";

import { UserRound } from "lucide-react";
import type { Profile } from "@/lib/profile";
import { BrasaoRepublica, MapaEstado, SeloBr } from "./BrasaoRepublica";

/** Campo com borda fina de segurança padrão CNH */
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
    <div className={`flex flex-col justify-between rounded-[3px] border border-emerald-800/40 bg-white/70 px-1.5 py-0.5 ${className}`}>
      <span className="text-[7.5px] font-bold uppercase tracking-tight text-emerald-950/75 leading-none">
        {label}
      </span>
      <span className={`truncate text-[10.5px] font-black uppercase text-slate-900 leading-tight ${valueClassName}`}>
        {value || "—"}
      </span>
    </div>
  );
}

/** Frente da CNH oficial brasileira */
export function CnhCardFront({ profile }: { profile: Profile }) {
  return (
    <article
      aria-label="Frente da Carteira Nacional de Habilitação"
      className="relative flex aspect-[0.67] w-full max-w-[360px] mx-auto flex-col overflow-hidden rounded-xl border border-emerald-900/30 bg-[#eef7ef] p-2.5 shadow-[0_12px_32px_-12px_rgba(20,83,45,0.25)] select-none"
      style={{
        backgroundImage: `
          radial-gradient(#c7e6cb 0.75px, transparent 0.75px),
          linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(230,245,232,0.8) 100%)
        `,
        backgroundSize: "8px 8px, 100% 100%",
      }}
    >
      {/* Faixa superior */}
      <div className="flex items-center justify-between border-b border-emerald-800/30 pb-1">
        <span className="text-[8px] font-black tracking-wider text-emerald-950 uppercase">
          Válida em todo o território nacional
        </span>
        <MapaEstado estado={profile.state || "SP"} className="h-6 w-6 text-amber-600/80" />
      </div>

      <div className="flex flex-1 gap-2 pt-1.5">
        {/* Coluna esquerda e centro: Foto, assinatura e dados */}
        <div className="flex flex-1 flex-col gap-1.5">
          {/* Topo: Foto do condutor + Nome */}
          <div className="flex gap-2">
            {/* Foto 3x4 */}
            <div className="flex flex-col shrink-0">
              <div className="relative aspect-[3/4] w-20 overflow-hidden rounded-[4px] border border-emerald-900/50 bg-emerald-50/60 shadow-inner">
                {profile.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- foto local em data URL
                  <img
                    src={profile.photo}
                    alt={`Foto de ${profile.name}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-emerald-700/50">
                    <UserRound aria-hidden className="h-10 w-10" />
                  </div>
                )}
              </div>
              {/* Assinatura do portador */}
              <div className="mt-1 flex h-7 w-20 flex-col justify-end rounded-[3px] border border-emerald-800/40 bg-white/70 px-1 pb-0.5 text-center">
                <span className="font-serif italic text-[8px] font-bold text-slate-800 leading-none truncate">
                  {profile.name.split(" ")[0]} {profile.name.split(" ").slice(-1)[0]}
                </span>
                <span className="text-[5.5px] font-semibold text-emerald-950/70 uppercase">
                  Assinatura do Portador
                </span>
              </div>
            </div>

            {/* Nome e Nascimento */}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <CnhBox
                label="1 Nome e Sobrenome"
                value={profile.name}
                className="flex-1"
                valueClassName="text-[11px] font-black text-emerald-950"
              />
              <CnhBox
                label="2 Data, Local e UF de Nascimento"
                value={`${profile.birthDate} ${profile.birthPlace}`}
                className="flex-1"
              />
            </div>
          </div>

          {/* Linha: Identidade + CPF */}
          <div className="grid grid-cols-2 gap-1">
            <CnhBox label="4a Doc. Identidade / Órgão / UF" value={profile.rg} />
            <CnhBox label="4b CPF" value={profile.cpf} valueClassName="font-mono text-[10px]" />
          </div>

          {/* Linha: Validade + 1ª Habilitação */}
          <div className="grid grid-cols-2 gap-1">
            <CnhBox label="4c Validade" value={profile.validUntil} valueClassName="text-emerald-900" />
            <CnhBox label="4d 1ª Habilitação" value={profile.firstLicenseDate} />
          </div>

          {/* Linha: Nº Registro + Categoria */}
          <div className="grid grid-cols-3 gap-1">
            <CnhBox
              label="5 Nº Registro"
              value={profile.registerNumber}
              className="col-span-2"
              valueClassName="font-mono"
            />
            <div className="flex flex-col justify-between rounded-[3px] border-2 border-emerald-900 bg-emerald-900 px-1 py-0.5 text-center text-white">
              <span className="text-[7px] font-extrabold uppercase leading-none text-emerald-200">
                6 Cat. Hab.
              </span>
              <span className="text-[13px] font-black uppercase leading-tight tracking-wider">
                {profile.category || "AB"}
              </span>
            </div>
          </div>

          {/* Filiação */}
          <CnhBox
            label="Filiação"
            value={profile.affiliation}
            valueClassName="text-[9.5px]"
          />

          {/* Código de Segurança + Nacionalidade */}
          <div className="grid grid-cols-2 gap-1">
            <CnhBox label="11 Cód. Segurança" value={profile.securityCode} valueClassName="font-mono text-[9.5px]" />
            <CnhBox label="Nacionalidade" value={profile.nationality} />
          </div>
        </div>

        {/* Faixa lateral direita oficial com Brasão e Selo */}
        <div className="flex w-9 flex-col items-center justify-between rounded-[4px] bg-[#0c1a30] py-2 text-center text-white shadow-sm">
          <BrasaoRepublica className="h-6 w-6 text-amber-400" />

          {/* Texto vertical estilizado */}
          <div className="my-auto flex flex-col items-center justify-center [writing-mode:vertical-rl] rotate-180 gap-1">
            <span className="text-[6.5px] font-black tracking-widest text-amber-300 uppercase">
              REPÚBLICA FEDERATIVA DO BRASIL
            </span>
            <span className="text-[5.5px] font-bold tracking-wider text-slate-300 uppercase">
              MINISTÉRIO DOS TRANSPORTES
            </span>
            <span className="text-[6px] font-black tracking-tight text-white uppercase">
              CARTEIRA NACIONAL DE HABILITAÇÃO
            </span>
          </div>

          <SeloBr className="h-6 w-6" />
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
      className="relative flex aspect-[0.67] w-full max-w-[360px] mx-auto flex-col justify-between overflow-hidden rounded-xl border border-emerald-900/30 bg-[#eef7ef] p-3 shadow-[0_12px_32px_-12px_rgba(20,83,45,0.25)] select-none"
      style={{
        backgroundImage: `
          radial-gradient(#c7e6cb 0.75px, transparent 0.75px),
          linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(230,245,232,0.8) 100%)
        `,
        backgroundSize: "8px 8px, 100% 100%",
      }}
    >
      <div className="flex items-center justify-between border-b border-emerald-800/30 pb-1.5">
        <span className="text-[8px] font-black tracking-wider text-emerald-950 uppercase">
          Categorias de Habilitação do Condutor
        </span>
        <span className="text-[8px] font-mono font-bold text-emerald-900">
          SENATRAN / RENACH
        </span>
      </div>

      {/* Grade de categorias */}
      <div className="flex flex-col gap-1 py-1">
        {categories.map((c) => (
          <div
            key={c.cat}
            className={`flex items-center justify-between rounded-[3px] border px-2 py-1 text-xs ${
              c.active
                ? "border-emerald-800 bg-emerald-900 text-white font-bold"
                : "border-emerald-800/30 bg-white/70 text-slate-700 font-medium"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-8 font-black ${c.active ? "text-amber-300" : "text-emerald-950"}`}>
                {c.cat}
              </span>
              <span className="text-[8.5px] leading-tight truncate">{c.name}</span>
            </div>
            <span className={`text-[9px] font-mono ${c.active ? "text-emerald-200" : "text-slate-400"}`}>
              {c.active ? "HABILITADO" : "—"}
            </span>
          </div>
        ))}
      </div>

      {/* Observações */}
      <div className="flex flex-col gap-1 border-t border-emerald-800/30 pt-1.5">
        <CnhBox
          label="Observações / Restrições"
          value={profile.observations || "SEM RESTRIÇÕES"}
          valueClassName="text-[10px] text-emerald-950"
        />
        <div className="grid grid-cols-2 gap-1">
          <CnhBox label="Local de Emissão" value={`${profile.birthPlace || "SÃO PAULO - SP"}`} />
          <CnhBox label="Órgão Emissor" value="DETRAN" />
        </div>
      </div>
    </article>
  );
}

/** Slide do QR Code Vio */
export function CnhVioQrSlide({ profile }: { profile: Profile }) {
  return (
    <article
      aria-label="QR Code de autenticidade Vio"
      className="relative flex aspect-[0.67] w-full max-w-[360px] mx-auto flex-col items-center justify-between overflow-hidden rounded-xl border border-emerald-900/30 bg-white p-5 shadow-[0_12px_32px_-12px_rgba(20,83,45,0.25)] select-none text-center"
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] font-black tracking-widest text-[#19234e] uppercase">
          Validação Digital de Autenticidade
        </span>
        <span className="text-xs text-slate-500">
          Escaneie com o aplicativo oficial <strong className="text-blue-700">Vio</strong>
        </span>
      </div>

      {/* QR Code SVG determinístico de alta densidade */}
      <div className="relative aspect-square w-48 rounded-lg border-2 border-slate-900 p-2 shadow-sm bg-white">
        <svg viewBox="0 0 29 29" className="h-full w-full" fill="#0f172a" shapeRendering="crispEdges" aria-hidden>
          {/* Fundo branco */}
          <rect width="29" height="29" fill="#ffffff" />
          {/* Finder patterns */}
          <rect x="1" y="1" width="7" height="7" />
          <rect x="2" y="2" width="5" height="5" fill="#fff" />
          <rect x="3" y="3" width="3" height="3" />

          <rect x="21" y="1" width="7" height="7" />
          <rect x="22" y="2" width="5" height="5" fill="#fff" />
          <rect x="23" y="3" width="3" height="3" />

          <rect x="1" y="21" width="7" height="7" />
          <rect x="2" y="22" width="5" height="5" fill="#fff" />
          <rect x="3" y="23" width="3" height="3" />

          {/* Dados do QR Code */}
          <rect x="10" y="2" width="2" height="2" />
          <rect x="14" y="1" width="2" height="3" />
          <rect x="18" y="2" width="1" height="2" />
          <rect x="9" y="5" width="2" height="1" />
          <rect x="13" y="5" width="1" height="2" />
          <rect x="16" y="5" width="2" height="2" />
          <rect x="10" y="8" width="8" height="1" />

          <rect x="1" y="10" width="2" height="2" />
          <rect x="5" y="10" width="1" height="3" />
          <rect x="8" y="11" width="3" height="1" />
          <rect x="12" y="10" width="2" height="2" />
          <rect x="16" y="11" width="2" height="3" />
          <rect x="20" y="10" width="3" height="1" />
          <rect x="25" y="10" width="2" height="3" />

          <rect x="3" y="14" width="2" height="1" />
          <rect x="7" y="13" width="3" height="2" />
          <rect x="11" y="14" width="2" height="2" />
          <rect x="15" y="13" width="1" height="3" />
          <rect x="18" y="15" width="3" height="1" />
          <rect x="23" y="14" width="2" height="2" />

          <rect x="1" y="17" width="3" height="2" />
          <rect x="6" y="17" width="2" height="2" />
          <rect x="10" y="18" width="1" height="2" />
          <rect x="13" y="17" width="3" height="1" />
          <rect x="18" y="18" width="2" height="2" />
          <rect x="22" y="17" width="2" height="2" />
          <rect x="26" y="18" width="2" height="1" />

          <rect x="10" y="21" width="2" height="3" />
          <rect x="14" y="22" width="2" height="2" />
          <rect x="18" y="21" width="1" height="3" />
          <rect x="21" y="22" width="3" height="1" />
          <rect x="26" y="21" width="2" height="3" />

          <rect x="9" y="25" width="3" height="2" />
          <rect x="14" y="26" width="2" height="2" />
          <rect x="18" y="25" width="2" height="1" />
          <rect x="22" y="26" width="3" height="2" />
        </svg>
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
      className="relative flex aspect-[0.67] w-full max-w-[360px] mx-auto flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-[0_12px_32px_-12px_rgba(20,83,45,0.25)] select-none text-slate-800"
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
