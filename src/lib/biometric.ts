// Hello World
/**
 * Trava local por biometria usando WebAuthn (Face ID / Touch ID / digital do dispositivo).
 * Verificação biométrica local para acesso seguro aos documentos no dispositivo.
 * Requer contexto seguro (HTTPS ou localhost).
 */

const CREDENTIAL_KEY = "cnh-digital:credential";
const LEGACY_CREDENTIAL_KEY = "campus-digital:credential";

export type BiometricResult =
  | { ok: true }
  | { ok: false; reason: "unsupported" | "cancelled" | "error"; message: string };

function toBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function randomBytes(length: number): Uint8Array<ArrayBuffer> {
  return crypto.getRandomValues(new Uint8Array(length));
}

function storedCredentialId(): string | null {
  try {
    return window.localStorage.getItem(CREDENTIAL_KEY) || window.localStorage.getItem(LEGACY_CREDENTIAL_KEY);
  } catch {
    return null;
  }
}

export function hasRegisteredBiometric(): boolean {
  return storedCredentialId() !== null;
}

export function clearBiometric(): void {
  try {
    window.localStorage.removeItem(CREDENTIAL_KEY);
    window.localStorage.removeItem(LEGACY_CREDENTIAL_KEY);
  } catch {
    /* armazenamento indisponível */
  }
}

export async function isBiometricAvailable(): Promise<boolean> {
  if (!window.isSecureContext || typeof window.PublicKeyCredential === "undefined") return false;
  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
}

function toFailure(error: unknown): BiometricResult {
  if (error instanceof DOMException && error.name === "NotAllowedError") {
    return { ok: false, reason: "cancelled", message: "Verificação cancelada ou não reconhecida." };
  }
  return { ok: false, reason: "error", message: "Não foi possível usar a biometria." };
}

/** Cadastra a biometria do aparelho na primeira abertura. */
export async function registerBiometric(): Promise<BiometricResult> {
  if (!(await isBiometricAvailable())) {
    return { ok: false, reason: "unsupported", message: "Biometria indisponível neste aparelho." };
  }
  try {
    const credential = (await navigator.credentials.create({
      publicKey: {
        challenge: randomBytes(32),
        rp: { name: "CNH do Brasil" },
        user: { id: randomBytes(16), name: "condutor", displayName: "Condutor" },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 },
          { type: "public-key", alg: -257 },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
          residentKey: "discouraged",
        },
        timeout: 60_000,
        attestation: "none",
      },
    })) as PublicKeyCredential | null;
    if (!credential) return { ok: false, reason: "cancelled", message: "Cadastro cancelado." };
    window.localStorage.setItem(CREDENTIAL_KEY, toBase64Url(credential.rawId));
    return { ok: true };
  } catch (error) {
    return toFailure(error);
  }
}

/** Pede a biometria cadastrada para destravar o app. */
export async function verifyBiometric(): Promise<BiometricResult> {
  const id = storedCredentialId();
  if (!id) return registerBiometric();
  try {
    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge: randomBytes(32),
        allowCredentials: [{ type: "public-key", id: fromBase64Url(id), transports: ["internal"] }],
        userVerification: "required",
        timeout: 60_000,
      },
    });
    return assertion
      ? { ok: true }
      : { ok: false, reason: "cancelled", message: "Verificação cancelada." };
  } catch (error) {
    return toFailure(error);
  }
}
