// Hello World
"use client";

import {
  Bell,
  Car,
  GraduationCap,
  Menu,
  ShieldAlert,
  User,
  UserCheck,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import type { Profile } from "@/lib/profile";
import { GovLogos } from "./GovLogos";

type Props = {
  profile: Profile;
  onOpenCard: () => void;
  onOpenCrlv: () => void;
  onOpenEditor: () => void;
  onLock: () => void;
  onResetBiometric: () => void;
};

/** Fundo com linhas de pista orgânicas como visto nos cards da CDT */
function RoadWaves() {
  return (
    <svg
      viewBox="0 0 160 100"
      className="pointer-events-none absolute inset-y-0 right-0 h-full w-40 opacity-25"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M20,100 C60,60 80,40 160,20 L160,100 Z"
        fill="white"
        fillOpacity="0.4"
      />
      <path
        d="M0,100 C50,70 90,30 160,0"
        stroke="white"
        strokeWidth="3"
        strokeDasharray="6,6"
        fill="none"
      />
      <path
        d="M40,100 C80,60 110,30 160,10"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export function HomeScreen({
  profile,
  onOpenCard,
  onOpenCrlv,
  onOpenEditor,
  onLock,
  onResetBiometric,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<string | null>(null);

  return (
    <div className="screen-in flex min-h-dvh flex-col bg-[#ffffff]">
      {/* Topo Azul Marinho da Imagem 2 */}
      <header className="bg-[#19234e] pt-[env(safe-area-inset-top)] text-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-3">
          <button
            type="button"
            aria-label="Abrir menu lateral"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-lg text-white hover:bg-white/10 active:scale-95 transition-transform"
          >
            <Menu aria-hidden className="h-7 w-7" />
          </button>

          <div className="flex items-center gap-1">
            {/* Sino de Notificações */}
            <button
              type="button"
              aria-label="Notificações"
              onClick={() => setNotificationOpen(true)}
              className="flex h-12 w-12 items-center justify-center text-white hover:bg-white/10 rounded-lg active:scale-95 transition-transform"
            >
              <Bell className="h-6 w-6 fill-white/10" />
            </button>

            {/* Avatar do Usuário (Acesso ao Perfil) */}
            <button
              type="button"
              aria-label="Meu Perfil — alterar fotos e dados"
              onClick={onOpenEditor}
              className="flex h-12 w-12 items-center justify-center rounded-full active:scale-95 transition-transform"
            >
              <span className="flex h-10 w-10 overflow-hidden rounded-full border-2 border-white/80 bg-[#24336a] shadow-sm">
                {profile.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- foto local
                  <img src={profile.photo} alt="" className="h-full w-full object-cover" />
                ) : (
                  <UserRound aria-hidden className="m-auto h-6 w-6 text-white" />
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal — Os 4 Cards Oficiais da CDT */}
      <main className="flex flex-1 flex-col gap-3.5 px-4 pt-4 pb-4">
        {/* Card 1: CONDUTOR (Verde) */}
        <button
          type="button"
          onClick={onOpenCard}
          className="relative flex h-[108px] w-full items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#179c52] to-[#1eb05f] px-5 text-left text-white shadow-md transition-all hover:brightness-105 active:scale-[0.98]"
        >
          <RoadWaves />
          <div className="z-10 flex flex-col justify-center pr-2">
            <span className="text-xl font-black tracking-wide uppercase">CONDUTOR</span>
            <span className="mt-0.5 text-xs font-semibold text-white/90">
              Gerencie sua habilitação
            </span>
          </div>
          <div className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <UserCheck aria-hidden className="h-8 w-8 text-white stroke-[2.2]" />
          </div>
        </button>

        {/* Card 2: VEÍCULOS (Amarelo) */}
        <button
          type="button"
          onClick={onOpenCrlv}
          className="relative flex h-[108px] w-full items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#fabc2c] to-[#f5b320] px-5 text-left shadow-md transition-all hover:brightness-105 active:scale-[0.98]"
        >
          <RoadWaves />
          <div className="z-10 flex flex-col justify-center pr-2">
            <span className="text-xl font-black tracking-wide text-[#19234e] uppercase">
              VEÍCULOS
            </span>
            <span className="mt-0.5 text-xs font-semibold text-[#19234e]/90">
              Acesso ao CRLV-e, venda digital
            </span>
          </div>
          <div className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#19234e]/10">
            <Car aria-hidden className="h-8 w-8 text-[#19234e] stroke-[2.2]" />
          </div>
        </button>

        {/* Card 3: INFRAÇÕES (Azul Escuro) */}
        <button
          type="button"
          onClick={() =>
            setInfoModal(
              "Nenhuma infração registrada para a CNH ou veículo cadastrado no momento. Desconto de até 40% é aplicado automaticamente para pagamento antecipado pelo SNE."
            )
          }
          className="relative flex h-[108px] w-full items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#1b4897] to-[#2055b0] px-5 text-left text-white shadow-md transition-all hover:brightness-105 active:scale-[0.98]"
        >
          <RoadWaves />
          <div className="z-10 flex flex-col justify-center pr-2">
            <span className="text-xl font-black tracking-wide uppercase">INFRAÇÕES</span>
            <span className="mt-0.5 max-w-[15rem] text-xs font-semibold text-white/90 leading-tight">
              Visualize e pague infrações com até 40% de desconto
            </span>
          </div>
          <div className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <ShieldAlert aria-hidden className="h-8 w-8 text-white stroke-[2.2]" />
          </div>
        </button>

        {/* Card 4: EDUCAÇÃO (Azul Claro) */}
        <button
          type="button"
          onClick={() =>
            setInfoModal(
              "Plataforma de cursos oficiais da Secretaria Nacional de Trânsito (SENATRAN). Conteúdos de direção defensiva, legislação de trânsito e segurança viária."
            )
          }
          className="relative flex h-[108px] w-full items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#5ca3d7] to-[#4c95cc] px-5 text-left text-white shadow-md transition-all hover:brightness-105 active:scale-[0.98]"
        >
          <RoadWaves />
          <div className="z-10 flex flex-col justify-center pr-2">
            <span className="text-xl font-black tracking-wide uppercase">EDUCAÇÃO</span>
            <span className="mt-0.5 text-xs font-semibold text-white/90">
              Conheça nossa plataforma de cursos
            </span>
          </div>
          <div className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <GraduationCap aria-hidden className="h-8 w-8 text-white stroke-[2.2]" />
          </div>
        </button>
      </main>

      {/* Rodapé Oficial da Imagem 2 */}
      <GovLogos />

      {/* Menu Lateral Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 flex" role="dialog" aria-modal="true" aria-label="Menu principal">
          <nav className="screen-in flex w-72 max-w-[80%] flex-col bg-white pt-[env(safe-area-inset-top)] shadow-2xl">
            <div className="flex h-16 items-center justify-between bg-[#19234e] px-4 text-white">
              <span className="text-base font-bold uppercase tracking-wider">CNH do Brasil</span>
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
                autoFocus
              >
                <X aria-hidden className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="flex flex-col p-2 text-slate-800">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenCard();
                }}
                className="flex h-12 items-center gap-3 rounded-lg px-4 text-left text-sm font-semibold hover:bg-slate-100"
              >
                <UserCheck className="h-5 w-5 text-emerald-600" />
                <span>Condutor / Habilitação (CNH)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenCrlv();
                }}
                className="flex h-12 items-center gap-3 rounded-lg px-4 text-left text-sm font-semibold hover:bg-slate-100"
              >
                <Car className="h-5 w-5 text-amber-500" />
                <span>Veículos / Licenciamento (CRLV-e)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenEditor();
                }}
                className="flex h-12 items-center gap-3 rounded-lg px-4 text-left text-sm font-semibold hover:bg-slate-100"
              >
                <User className="h-5 w-5 text-[#19234e]" />
                <span>Meu Perfil (Alterar dados e fotos)</span>
              </button>

              <div className="my-2 border-t border-slate-100" />

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onLock();
                }}
                className="flex h-12 items-center gap-3 rounded-lg px-4 text-left text-sm font-semibold hover:bg-slate-100 text-slate-700"
              >
                <span>Bloquear aplicativo</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onResetBiometric();
                  setMenuOpen(false);
                }}
                className="flex h-12 items-center gap-3 rounded-lg px-4 text-left text-sm font-semibold hover:bg-slate-100 text-slate-700"
              >
                <span>Redefinir biometria</span>
              </button>
            </div>
          </nav>
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
            className="flex-1 bg-black/50"
          />
        </div>
      )}

      {/* Modal de Notificações */}
      {notificationOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Notificações">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-[#19234e]">Notificações</h3>
              <button
                type="button"
                onClick={() => setNotificationOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="py-6 text-center text-xs text-slate-500">
              Nenhuma notificação nova no momento.
            </div>
          </div>
        </div>
      )}

      {/* Modal Informativo (Infrações / Educação) */}
      {infoModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Informações">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-[#19234e]">Aviso do Sistema</h3>
              <button
                type="button"
                onClick={() => setInfoModal(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="py-4 text-xs leading-relaxed text-slate-700">{infoModal}</p>
            <button
              type="button"
              onClick={() => setInfoModal(null)}
              className="h-10 w-full rounded-xl bg-[#19234e] text-xs font-bold text-white transition-transform active:scale-95"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
