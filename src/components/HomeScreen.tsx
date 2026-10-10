// Hello World
"use client";

import { Bell, BookOpen, IdCard, Menu, UserRoundPen, UserRound, Wallet, X } from "lucide-react";
import { useState, type ComponentType } from "react";
import type { Profile } from "@/lib/profile";

type Tile = {
  title: string;
  subtitle: string;
  color: string;
  Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  onClick?: () => void;
};

type Props = {
  profile: Profile;
  onOpenCard: () => void;
  onOpenEditor: () => void;
  onLock: () => void;
  onResetBiometric: () => void;
};

export function HomeScreen({ profile, onOpenCard, onOpenEditor, onLock, onResetBiometric }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const tiles: Tile[] = [
    { title: "ESTUDANTE", subtitle: "Veja sua carteirinha digital", color: "bg-[#15803d]", Icon: IdCard, onClick: onOpenCard },
    { title: "PERFIL", subtitle: "Altere sua foto e seus dados", color: "bg-[#a16207]", Icon: UserRoundPen, onClick: onOpenEditor },
    { title: "BIBLIOTECA", subtitle: "Empréstimos e reservas", color: "bg-navy", Icon: BookOpen },
    { title: "FINANCEIRO", subtitle: "Boletos e mensalidades", color: "bg-[#0369a1]", Icon: Wallet },
  ];

  return (
    <div className="screen-in flex min-h-dvh flex-col">
      <header className="pt-[env(safe-area-inset-top)]">
        <div className="flex h-16 items-center justify-between px-2">
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-md text-navy hover:bg-surface"
          >
            <Menu aria-hidden className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <span className="flex h-12 w-12 items-center justify-center text-navy" aria-hidden>
              <Bell className="h-5 w-5" />
            </span>
            <button
              type="button"
              aria-label="Editar perfil"
              onClick={onOpenEditor}
              className="flex h-12 w-12 items-center justify-center rounded-md"
            >
              <span className="h-9 w-9 overflow-hidden rounded-full border-2 border-navy bg-surface">
                {profile.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- data URL local
                  <img src={profile.photo} alt="" className="h-full w-full object-cover" />
                ) : (
                  <UserRound aria-hidden className="m-1.5 h-5 w-5 text-navy" />
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-3 px-4 pb-4">
        <h1 className="sr-only">Campus Digital — início</h1>
        {tiles.map(({ title, subtitle, color, Icon, onClick }) => {
          const disabled = !onClick;
          return (
            <button
              key={title}
              type="button"
              onClick={onClick}
              disabled={disabled}
              aria-describedby={disabled ? "soon" : undefined}
              className={`${color} relative flex h-[104px] w-full items-center justify-between overflow-hidden rounded-md px-5 text-left text-white shadow-sm transition-transform enabled:active:scale-[0.98] disabled:cursor-not-allowed`}
            >
              <span>
                <span className="block text-lg font-extrabold tracking-wide">{title}</span>
                <span className="mt-0.5 block max-w-[11rem] text-xs font-medium leading-snug">{subtitle}</span>
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-md bg-white/15">
                <Icon aria-hidden className="h-7 w-7" />
              </span>
            </button>
          );
        })}
        <p id="soon" className="sr-only">
          Em breve
        </p>
      </main>

      <footer className="flex items-center justify-center gap-2 border-t border-line px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG estático pequeno */}
        <img src="/icon.svg" alt="" width={24} height={24} className="h-6 w-6 rounded-sm" />
        <span className="text-xs font-semibold text-muted">Universidade Aurora · projeto acadêmico</span>
      </footer>

      {menuOpen && (
        <div className="fixed inset-0 z-20 flex" role="dialog" aria-modal="true" aria-label="Menu">
          <nav className="screen-in flex w-72 max-w-[80%] flex-col bg-white pt-[env(safe-area-inset-top)] shadow-xl">
            <div className="flex h-16 items-center justify-between px-4">
              <span className="text-sm font-bold text-navy">Menu</span>
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setMenuOpen(false)}
                className="flex h-12 w-12 items-center justify-center rounded-md hover:bg-surface"
                autoFocus
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>
            <button type="button" onClick={onLock} className="h-12 px-4 text-left text-sm font-medium hover:bg-surface">
              Bloquear app
            </button>
            <button
              type="button"
              onClick={() => {
                onResetBiometric();
                setMenuOpen(false);
              }}
              className="h-12 px-4 text-left text-sm font-medium hover:bg-surface"
            >
              Redefinir biometria
            </button>
          </nav>
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
            className="flex-1 bg-slate-900/40"
          />
        </div>
      )}
    </div>
  );
}
