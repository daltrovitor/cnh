// Hello World
import { z } from "zod";

/** Dados do condutor e veículo exibidos na Carteira Digital (CNH e CRLV-e). */
export const profileSchema = z.object({
  photo: z.string().startsWith("data:image/").or(z.literal("")),
  name: z.string().trim().min(1, "Informe o nome").max(70),
  cpf: z.string().trim().min(1, "Informe o CPF").max(20),
  rg: z.string().trim().min(1, "Informe o RG").max(30),
  birthDate: z.string().trim().max(12),
  birthPlace: z.string().trim().max(50),
  validUntil: z.string().trim().max(12),
  firstLicenseDate: z.string().trim().max(12),
  registerNumber: z.string().trim().max(20),
  category: z.string().trim().max(10),
  securityCode: z.string().trim().max(20),
  nationality: z.string().trim().max(40),
  affiliation: z.string().trim().max(100),
  observations: z.string().trim().max(60),
  state: z.string().trim().max(10),

  // Dados do veículo (CRLV-e)
  renavam: z.string().trim().max(20),
  plate: z.string().trim().max(12),
  exerciseYear: z.string().trim().max(10),
  manufactureYear: z.string().trim().max(10),
  modelYear: z.string().trim().max(10),
  crvNumber: z.string().trim().max(25),
  claSecurityCode: z.string().trim().max(25),
  cat: z.string().trim().max(15),
  brandModel: z.string().trim().max(60),
  vehicleType: z.string().trim().max(40),
  previousPlate: z.string().trim().max(30),
  chassis: z.string().trim().max(30),
  color: z.string().trim().max(30),
  fuel: z.string().trim().max(40),
});

export type Profile = z.infer<typeof profileSchema>;

export const defaultProfile: Profile = {
  photo: "",
  name: "MARIANA DE OLIVEIRA SANTOS",
  cpf: "348.912.765-04",
  rg: "45.892.103-7 SSP/SP",
  birthDate: "14/03/1995",
  birthPlace: "SÃO PAULO - SP",
  validUntil: "12/10/2032",
  firstLicenseDate: "14/05/2013",
  registerNumber: "06284917305",
  category: "AB",
  securityCode: "98124765301",
  nationality: "BRASILEIRA",
  affiliation: "MARIA DE OLIVEIRA SANTOS / JOSÉ CARLOS SANTOS",
  observations: "EAR - EXERCE ATIVIDADE REMUNERADA",
  state: "SP",

  renavam: "00981246735",
  plate: "BRA2E19",
  exerciseYear: "2026",
  manufactureYear: "2024",
  modelYear: "2025",
  crvNumber: "123894756102",
  claSecurityCode: "876543210",
  cat: "000000",
  brandModel: "VW / POLO TRACK 1.0",
  vehicleType: "PASSAGEIRO / AUTOMÓVEL",
  previousPlate: "SÃO PAULO / SP",
  chassis: "9BWCA11BZRP012345",
  color: "BRANCA",
  fuel: "ÁLCOOL / GASOLINA",
};

const STORAGE_KEY = "cnh-digital:profile";
const LEGACY_STORAGE_KEY = "campus-digital:profile";
const IDB_NAME = "cnh-brasil-db";
const IDB_STORE = "cnh-profile-store";

function openIdb(): Promise<IDBDatabase | null> {
  if (typeof window === "undefined" || !("indexedDB" in window)) return Promise.resolve(null);
  return new Promise((resolve) => {
    try {
      const request = window.indexedDB.open(IDB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

function saveToIdb(profile: Profile): void {
  openIdb().then((db) => {
    if (!db) return;
    try {
      const tx = db.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).put(profile, "profile");
    } catch {
      /* armazenamento redundante falhou silenciosamente */
    }
  });
}

export function loadProfile(): Profile {
  try {
    let raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacy) {
        try {
          const legacyObj = JSON.parse(legacy);
          const migrated = {
            ...defaultProfile,
            photo: legacyObj.photo || defaultProfile.photo,
            name: (legacyObj.name || defaultProfile.name).toUpperCase(),
            birthDate: legacyObj.birthDate || defaultProfile.birthDate,
            validUntil: legacyObj.validUntil || defaultProfile.validUntil,
          };
          saveProfile(migrated);
          return migrated;
        } catch {
          /* ignora erro de migração */
        }
      }
      return defaultProfile;
    }
    const parsed = profileSchema.safeParse({ ...defaultProfile, ...JSON.parse(raw) });
    return parsed.success ? parsed.data : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

/** Sincroniza dados redundantes do IndexedDB caso o localStorage tenha sido limpo pelo SO */
export async function syncIdbProfile(onProfile: (p: Profile) => void): Promise<void> {
  const db = await openIdb();
  if (!db) return;
  try {
    const tx = db.transaction(IDB_STORE, "readonly");
    const req = tx.objectStore(IDB_STORE).get("profile");
    req.onsuccess = () => {
      if (req.result) {
        const parsed = profileSchema.safeParse({ ...defaultProfile, ...req.result });
        if (parsed.success) {
          saveProfile(parsed.data);
          onProfile(parsed.data);
        }
      }
    };
  } catch {
    /* erro silencioso */
  }
}

export function saveProfile(profile: Profile): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    saveToIdb(profile);
    return true;
  } catch {
    // Se o localStorage atingir cota, tenta persistir pelo menos no IndexedDB
    saveToIdb(profile);
    return false;
  }
}

export function resetProfile(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    openIdb().then((db) => {
      if (!db) return;
      try {
        const tx = db.transaction(IDB_STORE, "readwrite");
        tx.objectStore(IDB_STORE).delete("profile");
      } catch {
        /* erro silencioso */
      }
    });
  } catch {
    /* armazenamento indisponível */
  }
}

/** Reduz a foto escolhida para no máximo `maxSize` px e devolve um data URL JPEG otimizado. */
export async function resizeImage(file: File, maxSize = 480): Promise<string> {
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
  return canvas.toDataURL("image/jpeg", 0.82);
}
