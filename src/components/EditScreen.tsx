// Hello World
"use client";

import { Camera, UserRound } from "lucide-react";
import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { defaultProfile, profileSchema, resizeImage, type Profile } from "@/lib/profile";
import { ScreenHeader } from "./ScreenHeader";

type TextField = Exclude<keyof Profile, "photo">;

const FIELDS: { key: TextField; label: string; placeholder?: string; inputMode?: "numeric" }[] = [
  { key: "name", label: "Nome completo" },
  { key: "course", label: "Curso" },
  { key: "enrollment", label: "Matrícula" },
  { key: "level", label: "Nível", placeholder: "Graduação" },
  { key: "shift", label: "Turno", placeholder: "Noturno" },
  { key: "campus", label: "Campus" },
  { key: "birthDate", label: "Data de nascimento", placeholder: "DD/MM/AAAA", inputMode: "numeric" },
  { key: "validUntil", label: "Validade", placeholder: "MM/AAAA", inputMode: "numeric" },
];

type Props = {
  profile: Profile;
  onBack: () => void;
  onSave: (profile: Profile) => boolean;
};

export function EditScreen({ profile, onBack, onSave }: Props) {
  const [draft, setDraft] = useState<Profile>(profile);
  const [errors, setErrors] = useState<Partial<Record<keyof Profile, string>>>({});
  const [status, setStatus] = useState<string | null>(null);
  const photoId = useId();

  function update(key: TextField, value: string) {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const photo = await resizeImage(file);
      setDraft((d) => ({ ...d, photo }));
      setStatus(null);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Não foi possível carregar a foto.");
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = profileSchema.safeParse(draft);
    if (!parsed.success) {
      const next: Partial<Record<keyof Profile, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Profile;
        next[key] ??= issue.message;
      }
      setErrors(next);
      setStatus("Corrija os campos destacados.");
      return;
    }
    if (onSave(parsed.data)) {
      onBack();
    } else {
      setStatus("Não foi possível salvar. Tente uma foto menor.");
    }
  }

  return (
    <div className="screen-in flex min-h-dvh flex-col bg-white">
      <ScreenHeader title="PERFIL" onBack={onBack} />
      <main className="flex-1 px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-sm border border-line bg-surface">
              {draft.photo ? (
                // eslint-disable-next-line @next/next/no-img-element -- data URL local
                <img src={draft.photo} alt="Foto atual" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-300">
                  <UserRound aria-hidden className="h-10 w-10" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor={photoId}
                className="flex h-12 items-center gap-2 rounded-md border border-navy px-4 text-sm font-semibold text-navy hover:bg-surface"
              >
                <Camera aria-hidden className="h-4 w-4" />
                Escolher foto
              </label>
              <input id={photoId} type="file" accept="image/*" onChange={handlePhoto} className="sr-only" />
              {draft.photo && (
                <button
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, photo: "" }))}
                  className="h-12 rounded-md px-4 text-left text-sm font-medium text-muted hover:bg-surface"
                >
                  Remover foto
                </button>
              )}
            </div>
          </div>

          {FIELDS.map(({ key, label, placeholder, inputMode }) => {
            const error = errors[key];
            return (
              <div key={key} className="flex flex-col gap-1.5">
                <label htmlFor={`f-${key}`} className="text-xs font-semibold text-muted">
                  {label}
                </label>
                <input
                  id={`f-${key}`}
                  value={draft[key]}
                  onChange={(e) => update(key, e.target.value)}
                  placeholder={placeholder}
                  inputMode={inputMode}
                  aria-invalid={!!error}
                  aria-describedby={error ? `e-${key}` : undefined}
                  className={`h-12 rounded-md border bg-white px-3 text-base text-foreground outline-none focus:border-accent ${error ? "border-red-600" : "border-line"}`}
                />
                {error && (
                  <p id={`e-${key}`} className="text-xs text-red-700">
                    {error}
                  </p>
                )}
              </div>
            );
          })}

          <p role="status" className="min-h-5 text-sm text-red-700">
            {status}
          </p>

          <button
            type="submit"
            className="h-12 rounded-md bg-accent text-sm font-semibold text-white transition-transform active:scale-[0.98]"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => {
              setDraft(defaultProfile);
              setErrors({});
            }}
            className="h-12 rounded-md text-sm font-medium text-muted hover:bg-surface"
          >
            Restaurar dados de exemplo
          </button>
        </form>
      </main>
    </div>
  );
}
