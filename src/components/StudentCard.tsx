// Hello World
import { UserRound } from "lucide-react";
import type { Profile } from "@/lib/profile";

function Field({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <dt className="text-[9px] font-semibold uppercase tracking-wide text-muted">{label}</dt>
      <dd className="truncate text-[13px] font-semibold text-foreground">{value || "—"}</dd>
    </div>
  );
}

function CardShell({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <article
      aria-label={label}
      className="relative flex aspect-[0.68] w-full flex-col overflow-hidden rounded-md border border-line bg-white shadow-[0_8px_24px_-12px_rgba(15,23,42,0.35)]"
    >
      <header className="bg-navy px-4 py-3 text-white">
        <p className="text-[11px] font-bold tracking-[0.18em]">UNIVERSIDADE AURORA</p>
        <p className="text-[10px] font-medium tracking-wide text-blue-100">Carteira de Estudante</p>
      </header>
      {children}
      <footer className="mt-auto bg-accent-soft px-4 py-2 text-center text-[9px] font-bold tracking-[0.14em] text-navy">
        DOCUMENTO FICTÍCIO · PROJETO ACADÊMICO
      </footer>
    </article>
  );
}

export function StudentCardFront({ profile }: { profile: Profile }) {
  return (
    <CardShell label="Frente da carteirinha">
      <div className="flex gap-3 px-4 pt-4">
        <div className="relative aspect-[3/4] w-[38%] shrink-0 overflow-hidden rounded-sm border border-line bg-surface">
          {profile.photo ? (
            // eslint-disable-next-line @next/next/no-img-element -- data URL local, next/image não se aplica
            <img src={profile.photo} alt={`Foto de ${profile.name}`} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-300">
              <UserRound aria-hidden className="h-1/2 w-1/2" />
              <span className="sr-only">Sem foto</span>
            </div>
          )}
        </div>
        <dl className="flex min-w-0 flex-1 flex-col gap-2.5">
          <div className="min-w-0">
            <dt className="text-[9px] font-semibold uppercase tracking-wide text-muted">Nome</dt>
            <dd className="text-[15px] font-bold leading-tight text-foreground [overflow-wrap:anywhere]">
              {profile.name}
            </dd>
          </div>
          <Field label="Curso" value={profile.course} />
          <Field label="Matrícula" value={profile.enrollment} />
        </dl>
      </div>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5 px-4 pt-4">
        <Field label="Nível" value={profile.level} />
        <Field label="Turno" value={profile.shift} />
        <Field label="Campus" value={profile.campus} />
        <Field label="Nascimento" value={profile.birthDate} />
        <Field label="Validade" value={profile.validUntil} className="col-span-2" />
      </dl>
    </CardShell>
  );
}

/** Padrão decorativo determinístico (estilo QR) gerado a partir da matrícula. Não é um QR Code legível. */
function DecorativeCode({ seed }: { seed: string }) {
  const size = 21;
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const next = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return (h >>> 0) / 4294967296;
  };
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8);
  const cells: React.ReactNode[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!inFinder(x, y) && next() > 0.5) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
    }
  }
  const finder = (x: number, y: number) => (
    <g key={`f${x}${y}`}>
      <rect x={x} y={y} width="7" height="7" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" />
    </g>
  );
  return (
    <svg viewBox={`-1 -1 ${size + 2} ${size + 2}`} className="h-full w-full" fill="#0f172a" shapeRendering="crispEdges" aria-hidden>
      <rect x="-1" y="-1" width={size + 2} height={size + 2} fill="#fff" />
      {cells}
      {finder(0, 0)}
      {finder(size - 7, 0)}
      {finder(0, size - 7)}
    </svg>
  );
}

export function StudentCardBack({ profile }: { profile: Profile }) {
  return (
    <CardShell label="Verso da carteirinha">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-4">
        <div className="aspect-square w-3/5 rounded-sm border border-line p-2">
          <DecorativeCode seed={profile.enrollment + profile.name} />
        </div>
        <p className="text-center text-[10px] text-muted">Código ilustrativo · sem verificação</p>
        <dl className="grid w-full grid-cols-2 gap-3 border-t border-line pt-3">
          <Field label="Matrícula" value={profile.enrollment} />
          <Field label="Validade" value={profile.validUntil} />
        </dl>
      </div>
    </CardShell>
  );
}
