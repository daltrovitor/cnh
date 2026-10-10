// Hello World
"use client";

import { ScanFace, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { hasRegisteredBiometric, isBiometricAvailable, verifyBiometric } from "@/lib/biometric";

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
        : "USAR BIOMETRIA FACIAL";

  return (
    <main className="screen-in relative flex min-h-dvh w-full flex-col justify-end overflow-hidden bg-slate-900 select-none">
      {/* 1. Imagem no fundo inteiro da tela */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element -- foto limpa da condutora em tela inteira */}
        <img
          src="/driver-bg-clean.png"
          alt="Condutora no trânsito"
          className="h-full w-full object-cover object-center"
        />
        {/* Sombra sutil de profundidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>

      {/* 2. Card inferior mais alto e arredondado sobre a imagem de fundo */}
      <div className="relative z-10 flex w-full flex-col items-center justify-between rounded-t-[32px] bg-white px-6 pt-7 pb-[calc(2.2rem+env(safe-area-inset-bottom))] shadow-[0_-16px_40px_rgba(0,0,0,0.28)]">
        <div className="flex w-full flex-col items-center text-center">
          {/* Logo Oficial: Bandeira do Brasil + CNH do BRASIL */}
          {/* eslint-disable-next-line @next/next/no-img-element -- ícone oficial fornecido pelo usuário */}
          <img
            src="/app-icon-brasil.png"
            alt="CNH do Brasil"
            className="h-32 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105"
          />

          {/* Termos de Uso e Política de Privacidade */}
          <p className="mt-3.5 max-w-[290px] text-xs font-medium text-slate-700 leading-relaxed">
            Ao entrar, você concorda com nosso{" "}
            <button
              type="button"
              onClick={() => setModalContent("terms")}
              className="font-bold text-[#154fc9] hover:underline"
            >
              Termo de Responsabilidade
            </button>{" "}
            e{" "}
            <button
              type="button"
              onClick={() => setModalContent("privacy")}
              className="font-bold text-[#154fc9] hover:underline"
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
              className="flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-[#154fc9] px-6 text-sm font-bold tracking-wider text-white shadow-lg shadow-blue-900/30 transition-transform active:scale-[0.98] hover:bg-[#1242ab]"
            >
              <ScanFace className="h-5 w-5" />
              USAR BIOMETRIA FACIAL
            </button>
          ) : (
            <button
              type="button"
              onClick={handleUnlock}
              disabled={state.status !== "ready"}
              className="flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-[#154fc9] px-6 text-sm font-bold tracking-wider text-white shadow-lg shadow-blue-900/30 transition-transform active:scale-[0.98] disabled:opacity-60 hover:bg-[#1242ab]"
            >
              <ScanFace className="h-5 w-5 stroke-[2.2]" />
              {state.status === "checking" ? "INICIANDO…" : label}
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
