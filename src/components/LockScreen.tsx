// Hello World
"use client";

import { ScanFace } from "lucide-react";
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
      ? "Verificando…"
      : state.status === "ready" && !state.registered
        ? "Cadastrar biometria"
        : "Entrar com biometria";

  return (
    <main className="screen-in flex min-h-dvh flex-col items-center justify-between px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[calc(4rem+env(safe-area-inset-top))]">
      <div className="flex flex-col items-center gap-5 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG estático pequeno */}
        <img src="/icon.svg" alt="" width={96} height={96} className="h-24 w-24 rounded-md" />
        <h1 className="text-2xl font-bold text-foreground">Campus Digital</h1>
        <p className="max-w-[18rem] text-sm text-muted">
          Sua carteirinha de estudante no celular.
        </p>
      </div>

      <div className="flex w-full max-w-sm flex-col items-center gap-4">
        <ScanFace aria-hidden className="h-16 w-16 text-accent" strokeWidth={1.25} />

        {state.status === "unsupported" ? (
          <>
            <p className="text-center text-sm text-muted">
              Biometria indisponível neste navegador. Abra o app instalado no celular (HTTPS) para usar o
              reconhecimento facial.
            </p>
            <button
              type="button"
              onClick={onUnlock}
              className="h-12 w-full rounded-md bg-accent text-sm font-semibold text-white transition-transform active:scale-[0.98]"
            >
              Entrar sem biometria
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleUnlock}
            disabled={state.status !== "ready"}
            className="h-12 w-full rounded-md bg-accent text-sm font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
          >
            {state.status === "checking" ? "Carregando…" : label}
          </button>
        )}

        <p role="alert" className="min-h-5 text-center text-sm text-red-700">
          {error}
        </p>
      </div>
    </main>
  );
}
