// Hello World
"use client";

import { Camera, Check, RotateCcw, UserRound } from "lucide-react";
import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { defaultProfile, profileSchema, resizeImage, type Profile } from "@/lib/profile";
import { ScreenHeader } from "./ScreenHeader";

type TextField = Exclude<keyof Profile, "photo">;

type Props = {
  profile: Profile;
  onBack: () => void;
  onSave: (profile: Profile) => boolean;
};

function FormInput({
  id,
  label,
  value,
  error,
  placeholder,
  onChange,
  className = "",
  inputClassName = "",
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  placeholder?: string;
  onChange: (val: string) => void;
  className?: string;
  inputClassName?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="text-xs font-bold text-slate-700 uppercase">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`h-11 rounded-xl border bg-white px-3 text-sm font-semibold text-slate-900 focus:outline-none transition-colors ${
          error ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-[#19234e]"
        } ${inputClassName}`}
      />
      {error && <span className="text-[11px] font-semibold text-red-600">{error}</span>}
    </div>
  );
}

export function EditScreen({ profile, onBack, onSave }: Props) {
  const [draft, setDraft] = useState<Profile>(profile);
  const [activeTab, setActiveTab] = useState<"cnh" | "crlv">("cnh");
  const [errors, setErrors] = useState<Partial<Record<keyof Profile, string>>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const photoId = useId();

  function update(key: TextField, value: string) {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setSavedSuccess(false);
  }

  async function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const photo = await resizeImage(file);
      setDraft((d) => ({ ...d, photo }));
      setStatus(null);
      setSavedSuccess(false);
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
      setStatus("Corrija os campos destacados com erro.");
      return;
    }

    if (onSave(parsed.data)) {
      setSavedSuccess(true);
      setStatus("Dados e fotos atualizados com sucesso!");
      setTimeout(() => {
        onBack();
      }, 700);
    } else {
      setStatus("Não foi possível salvar os dados no armazenamento local.");
    }
  }

  return (
    <div className="screen-in flex min-h-dvh flex-col bg-[#ffffff]">
      <ScreenHeader title="MEU PERFIL" onBack={onBack} />

      <main className="flex-1 px-4 pt-4 pb-[calc(2rem+env(safe-area-inset-bottom))]">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {/* Foto do Condutor */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">
            <div className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-xl border-2 border-[#19234e]/20 bg-white shadow-sm">
              {draft.photo ? (
                // eslint-disable-next-line @next/next/no-img-element -- foto local
                <img src={draft.photo} alt="Foto do condutor" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-300">
                  <UserRound aria-hidden className="h-10 w-10 text-slate-400" />
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <span className="text-xs font-bold uppercase text-[#19234e]">Foto do Condutor</span>
              <label
                htmlFor={photoId}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#19234e] bg-white px-3 text-xs font-bold text-[#19234e] shadow-sm hover:bg-slate-50 transition-colors"
              >
                <Camera aria-hidden className="h-4 w-4" />
                Alterar foto
              </label>
              <input id={photoId} type="file" accept="image/*" onChange={handlePhoto} className="sr-only" />

              {draft.photo && (
                <button
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, photo: "" }))}
                  className="h-8 rounded-lg text-left text-xs font-semibold text-red-600 hover:underline"
                >
                  Remover foto
                </button>
              )}
            </div>
          </div>

          {/* Abas: Condutor (CNH) vs Veículo (CRLV-e) */}
          <div className="flex rounded-xl bg-slate-100 p-1" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "cnh"}
              onClick={() => setActiveTab("cnh")}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
                activeTab === "cnh"
                  ? "bg-[#19234e] text-white shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Dados da CNH
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "crlv"}
              onClick={() => setActiveTab("crlv")}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
                activeTab === "crlv"
                  ? "bg-[#19234e] text-white shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Dados do Veículo
            </button>
          </div>

          {/* Formulário CNH */}
          {activeTab === "cnh" && (
            <div className="flex flex-col gap-3.5">
              <FormInput
                id="f-name"
                label="Nome Completo"
                value={draft.name}
                error={errors.name}
                placeholder="Nome do condutor"
                onChange={(v) => update("name", v)}
                inputClassName="uppercase"
              />

              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  id="f-cpf"
                  label="CPF"
                  value={draft.cpf}
                  error={errors.cpf}
                  placeholder="000.000.000-00"
                  onChange={(v) => update("cpf", v)}
                  inputClassName="font-mono"
                />
                <FormInput
                  id="f-rg"
                  label="Identidade (RG / UF)"
                  value={draft.rg}
                  error={errors.rg}
                  placeholder="RG e Órgão Emissor"
                  onChange={(v) => update("rg", v)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  id="f-birthDate"
                  label="Nascimento"
                  value={draft.birthDate}
                  error={errors.birthDate}
                  placeholder="DD/MM/AAAA"
                  onChange={(v) => update("birthDate", v)}
                />
                <FormInput
                  id="f-birthPlace"
                  label="Local / UF"
                  value={draft.birthPlace}
                  error={errors.birthPlace}
                  placeholder="CIDADE - UF"
                  onChange={(v) => update("birthPlace", v)}
                  inputClassName="uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  id="f-registerNumber"
                  label="Nº de Registro"
                  value={draft.registerNumber}
                  error={errors.registerNumber}
                  placeholder="Nº CNH"
                  onChange={(v) => update("registerNumber", v)}
                  inputClassName="font-mono"
                />
                <FormInput
                  id="f-category"
                  label="Categoria (Cat. Hab.)"
                  value={draft.category}
                  error={errors.category}
                  placeholder="Ex: AB, B, A"
                  onChange={(v) => update("category", v)}
                  inputClassName="font-bold uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  id="f-validUntil"
                  label="Validade CNH"
                  value={draft.validUntil}
                  error={errors.validUntil}
                  placeholder="DD/MM/AAAA"
                  onChange={(v) => update("validUntil", v)}
                />
                <FormInput
                  id="f-firstLicenseDate"
                  label="1ª Habilitação"
                  value={draft.firstLicenseDate}
                  error={errors.firstLicenseDate}
                  placeholder="DD/MM/AAAA"
                  onChange={(v) => update("firstLicenseDate", v)}
                />
              </div>

              <FormInput
                id="f-affiliation"
                label="Filiação"
                value={draft.affiliation}
                error={errors.affiliation}
                placeholder="Nome dos pais"
                onChange={(v) => update("affiliation", v)}
                inputClassName="uppercase"
              />

              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  id="f-securityCode"
                  label="Cód. Segurança"
                  value={draft.securityCode}
                  error={errors.securityCode}
                  placeholder="Código de segurança"
                  onChange={(v) => update("securityCode", v)}
                  inputClassName="font-mono"
                />
                <FormInput
                  id="f-observations"
                  label="Observações"
                  value={draft.observations}
                  error={errors.observations}
                  placeholder="Ex: EAR"
                  onChange={(v) => update("observations", v)}
                  inputClassName="uppercase"
                />
              </div>
            </div>
          )}

          {/* Formulário Veículo */}
          {activeTab === "crlv" && (
            <div className="flex flex-col gap-3.5">
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  id="f-plate"
                  label="Placa do Veículo"
                  value={draft.plate}
                  error={errors.plate}
                  placeholder="BRA2E19"
                  onChange={(v) => update("plate", v)}
                  inputClassName="font-mono font-bold uppercase text-blue-900"
                />
                <FormInput
                  id="f-renavam"
                  label="Código RENAVAM"
                  value={draft.renavam}
                  error={errors.renavam}
                  placeholder="RENAVAM"
                  onChange={(v) => update("renavam", v)}
                  inputClassName="font-mono"
                />
              </div>

              <FormInput
                id="f-brandModel"
                label="Marca / Modelo / Versão"
                value={draft.brandModel}
                error={errors.brandModel}
                placeholder="Ex: VW / POLO TRACK 1.0"
                onChange={(v) => update("brandModel", v)}
                inputClassName="uppercase"
              />

              <div className="grid grid-cols-3 gap-2">
                <FormInput
                  id="f-exerciseYear"
                  label="Exercício"
                  value={draft.exerciseYear}
                  error={errors.exerciseYear}
                  placeholder="2026"
                  onChange={(v) => update("exerciseYear", v)}
                  inputClassName="font-mono"
                />
                <FormInput
                  id="f-manufactureYear"
                  label="Ano Fab."
                  value={draft.manufactureYear}
                  error={errors.manufactureYear}
                  placeholder="2024"
                  onChange={(v) => update("manufactureYear", v)}
                  inputClassName="font-mono"
                />
                <FormInput
                  id="f-modelYear"
                  label="Ano Mod."
                  value={draft.modelYear}
                  error={errors.modelYear}
                  placeholder="2025"
                  onChange={(v) => update("modelYear", v)}
                  inputClassName="font-mono"
                />
              </div>

              <FormInput
                id="f-chassis"
                label="Chassi"
                value={draft.chassis}
                error={errors.chassis}
                placeholder="Número do chassi"
                onChange={(v) => update("chassis", v)}
                inputClassName="font-mono text-xs"
              />

              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  id="f-color"
                  label="Cor Predominante"
                  value={draft.color}
                  error={errors.color}
                  placeholder="Cor"
                  onChange={(v) => update("color", v)}
                  inputClassName="uppercase"
                />
                <FormInput
                  id="f-fuel"
                  label="Combustível"
                  value={draft.fuel}
                  error={errors.fuel}
                  placeholder="Combustível"
                  onChange={(v) => update("fuel", v)}
                  inputClassName="uppercase"
                />
              </div>
            </div>
          )}

          {/* Feedback de status */}
          {status && (
            <p
              role="status"
              className={`text-center text-xs font-bold ${
                savedSuccess ? "text-emerald-700" : "text-red-700"
              }`}
            >
              {status}
            </p>
          )}

          {/* Botões de Ação */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#19234e] text-sm font-bold text-white shadow-md transition-all active:scale-[0.98] hover:bg-[#202e66]"
            >
              <Check className="h-4 w-4" />
              Salvar Alterações
            </button>

            <button
              type="button"
              onClick={() => {
                setDraft(defaultProfile);
                setErrors({});
                setStatus("Valores padrão restaurados. Clique em Salvar para persistir.");
              }}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restaurar dados padrão
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
