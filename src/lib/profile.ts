// Hello World
import { z } from "zod";

/** Dados do condutor e veículo exibidos na Carteira Digital (CNH e CRLV-e). */
export const profileSchema = z.object({
  photo: z.string().default(""),
  signature: z.string().default(""),
  name: z.string().trim().max(70).default(""),
  cpf: z.string().trim().max(20).default(""),
  rg: z.string().trim().max(30).default(""),
  birthDate: z.string().trim().max(12).default(""),
  birthPlace: z.string().trim().max(50).default(""),
  validUntil: z.string().trim().max(12).default(""),
  firstLicenseDate: z.string().trim().max(12).default(""),
  registerNumber: z.string().trim().max(20).default(""),
  category: z.string().trim().max(10).default(""),
  securityCode: z.string().trim().max(20).default(""),
  nationality: z.string().trim().max(40).default(""),
  affiliation: z.string().trim().max(100).default(""),
  observations: z.string().trim().max(60).default(""),
  state: z.string().trim().max(10).default(""),
  issueDate: z.string().trim().max(15).default(""),
  formNumber: z.string().trim().max(25).default(""),

  // Dados do veículo (CRLV-e)
  renavam: z.string().trim().max(20).default(""),
  plate: z.string().trim().max(12).default(""),
  exerciseYear: z.string().trim().max(10).default(""),
  manufactureYear: z.string().trim().max(10).default(""),
  modelYear: z.string().trim().max(10).default(""),
  crvNumber: z.string().trim().max(25).default(""),
  claSecurityCode: z.string().trim().max(25).default(""),
  cat: z.string().trim().max(15).default(""),
  brandModel: z.string().trim().max(60).default(""),
  vehicleType: z.string().trim().max(40).default(""),
  previousPlate: z.string().trim().max(30).default(""),
  chassis: z.string().trim().max(30).default(""),
  color: z.string().trim().max(30).default(""),
  fuel: z.string().trim().max(40).default(""),
});

export type Profile = z.infer<typeof profileSchema>;

/** Perfil 100% Zerado (em branco) conforme solicitado pelo usuário */
export const emptyProfile: Profile = {
  photo: "",
  signature: "",
  name: "",
  cpf: "",
  rg: "",
  birthDate: "",
  birthPlace: "",
  validUntil: "",
  firstLicenseDate: "",
  registerNumber: "",
  category: "",
  securityCode: "",
  nationality: "",
  affiliation: "",
  observations: "",
  state: "",
  issueDate: "",
  formNumber: "",

  renavam: "",
  plate: "",
  exerciseYear: "",
  manufactureYear: "",
  modelYear: "",
  crvNumber: "",
  claSecurityCode: "",
  cat: "",
  brandModel: "",
  vehicleType: "",
  previousPlate: "",
  chassis: "",
  color: "",
  fuel: "",
};

export const defaultProfile: Profile = emptyProfile;

/** Gerador de informações aleatórias realistas para teste */
export function generateRandomProfile(): Profile {
  const firstNames = ["LUCAS", "GABRIEL", "MATEUS", "CAMILA", "BEATRIZ", "JULIANA", "RODRIGO", "FERNANDO", "LETICIA", "MARCELO"];
  const lastNames = ["SILVA", "SANTOS", "OLIVEIRA", "SOUZA", "RODRIGUES", "FERREIRA", "ALVES", "PEREIRA", "LIMA", "GOMES"];
  const cities = ["SÃO PAULO - SP", "RIO DE JANEIRO - RJ", "BELO HORIZONTE - MG", "CURITIBA - PR", "SALVADOR - BA", "BRASÍLIA - DF", "PORTO ALEGRE - RS"];
  const categories = ["AB", "B", "A", "D", "C"];

  const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
  const ln1 = lastNames[Math.floor(Math.random() * lastNames.length)];
  const ln2 = lastNames[Math.floor(Math.random() * lastNames.length)];
  const fullName = `${fn} ${ln1} ${ln2}`;

  const father = `JOSÉ ${ln1}`;
  const mother = `MARIA ${ln2}`;

  const randDigits = (len: number) => Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join("");

  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = city.split(" - ")[1] || "SP";

  return {
    photo: "",
    signature: "",
    name: fullName,
    cpf: `${randDigits(3)}.${randDigits(3)}.${randDigits(3)}-${randDigits(2)}`,
    rg: `${randDigits(2)}.${randDigits(3)}.${randDigits(3)}-${randDigits(1)} SSP/${state}`,
    birthDate: `1${Math.floor(Math.random() * 9)}/0${Math.floor(Math.random() * 8) + 1}/19${70 + Math.floor(Math.random() * 30)}`,
    birthPlace: city,
    validUntil: `10/05/203${Math.floor(Math.random() * 5)}`,
    firstLicenseDate: `12/03/201${Math.floor(Math.random() * 9)}`,
    registerNumber: randDigits(11),
    category: categories[Math.floor(Math.random() * categories.length)],
    securityCode: randDigits(11),
    nationality: "BRASILEIRA",
    affiliation: `${father} / ${mother}`,
    observations: "EAR — EXERCE ATIVIDADE REMUNERADA",
    state,
    issueDate: "15/01/2024",
    formNumber: randDigits(10),

    renavam: randDigits(11),
    plate: `BRA${Math.floor(Math.random() * 9)}E${randDigits(2)}`,
    exerciseYear: "2026",
    manufactureYear: "2023",
    modelYear: "2024",
    crvNumber: randDigits(12),
    claSecurityCode: randDigits(9),
    cat: "000000",
    brandModel: "HYUNDAI / HB20 1.0M",
    vehicleType: "PASSAGEIRO / AUTOMÓVEL",
    previousPlate: city,
    chassis: `9BW${randDigits(6)}ZP${randDigits(6)}`,
    color: "PRATA",
    fuel: "ÁLCOOL / GASOLINA",
  };
}

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
