// Hello World
"use client";

import { ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { hasRegisteredBiometric, isBiometricAvailable, verifyBiometric } from "@/lib/biometric";

const DEFAULT_LABEL = "ENTRAR COM biometria";

type LockState =
  | { status: "checking" }
  | { status: "ready"; registered: boolean }
  | { status: "verifying"; registered: boolean }
  | { status: "unsupported" };

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [state, setState] = useState<LockState>({ status: "checking" });
  const [error, setError] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<"terms" | "privacy" | null>(null);

  useEffect(() => {
    let alive = true;
    isBiometricAvailable().then((available) => {
      if (!alive) return;
      setState(available ? { status: "ready", registered: hasRegisteredBiometric() } : { status: "unsupported" });
    });
    return () => {
      alive = false;
    };
  }, []);

  async function handleUnlock() {
    if (state.status !== "ready") return;
    setError(null);
    setState({ status: "verifying", registered: state.registered });
    const result = await verifyBiometric();
    if (result.ok) {
      onUnlock();
      return;
    }
    setError(result.message);
    setState({ status: "ready", registered: hasRegisteredBiometric() });
  }

  const label =
    state.status === "verifying"
      ? "Verificando biometria…"
      : state.status === "ready" && !state.registered
        ? "Cadastrar biometria facial"
        : DEFAULT_LABEL;

  return (
    <main className="screen-in relative flex min-h-dvh w-full flex-col justify-end overflow-hidden bg-slate-900 select-none">
      {/* 1. Imagem no fundo inteiro da tela */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element -- foto limpa da condutora em tela inteira */}
        <img
          src="/driver-bg-clean.png"
          alt="Condutora no trânsito"
          className="h-full w-full object-cover object-[center_15%]"
        />
        {/* Sombra sutil de profundidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>

      {/* 2. Card inferior mais alto e arredondado sobre a imagem de fundo */}
      <div className="relative z-10 flex w-full flex-col items-center justify-between min-h-[42dvh] rounded-t-[36px] bg-[#f0f0f1] px-7 pt-5 pb-[calc(2rem+env(safe-area-inset-bottom))] font-[family-name:var(--font-poppins)] shadow-[0_-12px_32px_rgba(0,0,0,0.18)]">
        <div className="flex w-full flex-col items-center text-center">
          {/* Logo Oficial: Bandeira do Brasil + CNH do BRASIL */}
          {/* eslint-disable-next-line @next/next/no-img-element -- ícone oficial fornecido pelo usuário */}
          <img
            src="/app-icon-brasil.png"
            alt="CNH do Brasil"
            className="h-[190px] w-auto object-contain mix-blend-multiply"
          />

          {/* Termos de Uso e Política de Privacidade */}
          <p className="mt-2 max-w-[330px] text-[15px] font-light text-slate-800 leading-snug">
            Ao entrar, você concorda com nosso{" "}
            <button
              type="button"
              onClick={() => setModalContent("terms")}
              className="cursor-pointer font-semibold text-[#3a6fd8] underline underline-offset-2"
            >
              Termo de Responsabilidade
            </button>{" "}
            e{" "}
            <button
              type="button"
              onClick={() => setModalContent("privacy")}
              className="cursor-pointer font-semibold text-[#3a6fd8] underline underline-offset-2"
            >
              Política de Privacidade
            </button>
          </p>
        </div>

        {/* 3. Botão de Biometria Facial */}
        <div className="mt-6 flex w-full max-w-sm flex-col items-center gap-2.5">
          {state.status === "unsupported" ? (
            <button
              type="button"
              onClick={onUnlock}
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-full bg-[#1651c0] px-6 text-[15px] font-medium uppercase text-white shadow-[0_4px_10px_rgba(22,81,192,0.35)] transition-transform active:scale-[0.98] hover:bg-[#1242ab]"
            >
              ENTRAR COM&nbsp;<strong className="font-bold normal-case">biometria</strong>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleUnlock}
              disabled={state.status !== "ready"}
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-full bg-[#1651c0] px-6 text-[15px] font-medium uppercase text-white shadow-[0_4px_10px_rgba(22,81,192,0.35)] transition-transform active:scale-[0.98] hover:bg-[#1242ab] disabled:opacity-60"
            >
              {state.status === "checking" ? (
                "INICIANDO…"
              ) : label === DEFAULT_LABEL ? (
                <>
                  ENTRAR COM&nbsp;<strong className="font-bold normal-case">biometria</strong>
                </>
              ) : (
                label
              )}
            </button>
          )}

          {/* Opção secundária sem biometria */}
          {state.status !== "unsupported" && (
            <button
              type="button"
              onClick={onUnlock}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-1"
            >
              Entrar sem biometria
            </button>
          )}

          {error && (
            <p role="alert" className="text-center text-xs font-bold text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Modal de Termos ou Privacidade */}
      {modalContent && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#154fc9]" />
                <h3 className="text-sm font-bold text-slate-900">
                  {modalContent === "terms"
                    ? "Termo de Responsabilidade"
                    : "Política de Privacidade"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto py-4 text-xs leading-relaxed text-slate-600">
              {modalContent === "terms" ? (
                <div className="flex flex-col gap-2">
                  <p>
                    O aplicativo oficial da CNH do Brasil disponibiliza a versão digital da Carteira Nacional de Habilitação e do CRLV-e com a mesma validade jurídica do documento impresso em todo o território nacional.
                  </p>
                  <p>
                    O usuário é responsável pela veracidade dos dados exibidos e pela guarda das credenciais biométricas cadastradas em seu dispositivo móvel.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <p>
                    Seus dados pessoais, fotos e documentos são armazenados localmente no seu dispositivo móvel através de armazenamento seguro (Web Storage e Cache PWA), garantindo privacidade e disponibilidade offline.
                  </p>
                  <p>
                    A autenticação biométrica é processada diretamente pelo hardware de segurança do seu aparelho celular.
                  </p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setModalContent(null)}
              className="mt-2 h-10 w-full rounded-xl bg-[#154fc9] text-xs font-bold text-white transition-transform active:scale-95"
            >
              Concordar e fechar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
