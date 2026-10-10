// Hello World
"use client";

import { useEffect, useState } from "react";
import { clearBiometric } from "@/lib/biometric";
import { defaultProfile, loadProfile, saveProfile, type Profile } from "@/lib/profile";
import { CardScreen } from "./CardScreen";
import { EditScreen } from "./EditScreen";
import { HomeScreen } from "./HomeScreen";
import { LockScreen } from "./LockScreen";

type View = "lock" | "home" | "card" | "edit";

export function CampusApp() {
  const [view, setView] = useState<View>("lock");
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  useEffect(() => {
    // localStorage só existe no navegador: carregar após a montagem evita divergência de hidratação.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincronização única com armazenamento externo
    setProfile(loadProfile());

    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* PWA offline indisponível; o app continua funcionando online */
      });
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  function handleSave(next: Profile): boolean {
    const ok = saveProfile(next);
    if (ok) setProfile(next);
    return ok;
  }

  return (
    <div className="mx-auto w-full max-w-[480px] overflow-x-hidden">
      {view === "lock" && <LockScreen onUnlock={() => setView("home")} />}
      {view === "home" && (
        <HomeScreen
          profile={profile}
          onOpenCard={() => setView("card")}
          onOpenEditor={() => setView("edit")}
          onLock={() => setView("lock")}
          onResetBiometric={() => {
            clearBiometric();
            setView("lock");
          }}
        />
      )}
      {view === "card" && <CardScreen profile={profile} onBack={() => setView("home")} onEdit={() => setView("edit")} />}
      {view === "edit" && <EditScreen profile={profile} onBack={() => setView("card")} onSave={handleSave} />}
    </div>
  );
}
