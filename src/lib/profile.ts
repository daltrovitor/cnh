// Hello World
import { z } from "zod";

/** Dados exibidos na carteirinha fictícia (projeto acadêmico, sem valor legal). */
export const profileSchema = z.object({
  photo: z.string().startsWith("data:image/").or(z.literal("")),
  name: z.string().trim().min(1, "Informe o nome").max(60),
  course: z.string().trim().min(1, "Informe o curso").max(60),
  enrollment: z.string().trim().min(1, "Informe a matrícula").max(20),
  campus: z.string().trim().max(40),
  level: z.string().trim().max(30),
  shift: z.string().trim().max(20),
  birthDate: z.string().trim().max(10),
  validUntil: z.string().trim().max(10),
});

export type Profile = z.infer<typeof profileSchema>;

export const defaultProfile: Profile = {
  photo: "",
  name: "Ana Clara Souza",
  course: "Engenharia de Software",
  enrollment: "2026.1.0042",
  campus: "Campus Centro",
  level: "Graduação",
  shift: "Noturno",
  birthDate: "14/03/2004",
  validUntil: "12/2027",
};

const STORAGE_KEY = "campus-digital:profile";

export function loadProfile(): Profile {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    const parsed = profileSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function saveProfile(profile: Profile): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    return true;
  } catch {
    // Cota do localStorage excedida (foto grande) ou armazenamento bloqueado.
    return false;
  }
}

export function resetProfile(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* armazenamento indisponível */
  }
}

/** Reduz a foto escolhida para no máximo `maxSize` px e devolve um data URL JPEG. */
export async function resizeImage(file: File, maxSize = 600): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("O arquivo não é uma imagem.");
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Não foi possível processar a imagem.");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.85);
}
