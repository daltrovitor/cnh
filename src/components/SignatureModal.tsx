// Hello World
"use client";

import {
  Check,
  Eraser,
  PenTool,
  RotateCcw,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signatureDataUrl: string) => void;
  currentSignature?: string;
  driverName: string;
};

type Point = { x: number; y: number };
type Stroke = { points: Point[]; color: string; width: number };

export function SignatureModal({
  isOpen,
  onClose,
  onSave,
  currentSignature,
  driverName,
}: Props) {
  const [mode, setMode] = useState<"draw" | "upload" | "generate">("draw");
  const [penColor, setPenColor] = useState<string>("#0f172a");
  const [penWidth, setPenWidth] = useState<number>(3);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>(currentSignature || "");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentStrokeRef = useRef<Point[]>([]);

  // Redesenha todos os traços no canvas com suavização de curva quadrática
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Linha guia de assinatura sutil (marca d'água na tela)
    ctx.save();
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(30, canvas.height - 40);
    ctx.lineTo(canvas.width - 30, canvas.height - 40);
    ctx.stroke();
    ctx.restore();

    for (const stroke of strokes) {
      if (stroke.points.length === 0) continue;
      ctx.save();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (stroke.points.length === 1) {
        ctx.beginPath();
        ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.width / 2, 0, Math.PI * 2);
        ctx.fillStyle = stroke.color;
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

        for (let i = 1; i < stroke.points.length - 1; i++) {
          const xc = (stroke.points[i].x + stroke.points[i + 1].x) / 2;
          const yc = (stroke.points[i].y + stroke.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(stroke.points[i].x, stroke.points[i].y, xc, yc);
        }

        const last = stroke.points[stroke.points.length - 1];
        const prev = stroke.points[stroke.points.length - 2];
        ctx.quadraticCurveTo(prev.x, prev.y, last.x, last.y);
        ctx.stroke();
      }
      ctx.restore();
    }
  }, [strokes]);

  useEffect(() => {
    if (isOpen && mode === "draw") {
      redrawCanvas();
    }
  }, [isOpen, mode, redrawCanvas]);

  if (!isOpen) return null;

  function getCanvasCoords(e: React.PointerEvent<HTMLCanvasElement>): Point | null {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const pt = getCanvasCoords(e);
    if (!pt) return;
    setIsDrawing(true);
    currentStrokeRef.current = [pt];
    setStrokes((prev) => [...prev, { points: [pt], color: penColor, width: penWidth }]);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    const pt = getCanvasCoords(e);
    if (!pt) return;

    currentStrokeRef.current.push(pt);
    setStrokes((prev) => {
      const copy = [...prev];
      if (copy.length > 0) {
        copy[copy.length - 1] = {
          points: [...currentStrokeRef.current],
          color: penColor,
          width: penWidth,
        };
      }
      return copy;
    });
  }

  function handlePointerUp(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* evento já liberado */
    }
    setIsDrawing(false);
  }

  function handleUndo() {
    setStrokes((prev) => prev.slice(0, -1));
  }

  function handleClear() {
    setStrokes([]);
    setPreviewDataUrl("");
  }

  function exportCanvasToDataUrl(): string {
    const canvas = canvasRef.current;
    if (!canvas) return "";

    // Cria canvas secundário limpo (sem a linha tracejada de guia)
    const out = document.createElement("canvas");
    out.width = canvas.width;
    out.height = canvas.height;
    const ctx = out.getContext("2d");
    if (!ctx) return "";

    for (const stroke of strokes) {
      if (stroke.points.length === 0) continue;
      ctx.save();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (stroke.points.length === 1) {
        ctx.beginPath();
        ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.width / 2, 0, Math.PI * 2);
        ctx.fillStyle = stroke.color;
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length - 1; i++) {
          const xc = (stroke.points[i].x + stroke.points[i + 1].x) / 2;
          const yc = (stroke.points[i].y + stroke.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(stroke.points[i].x, stroke.points[i].y, xc, yc);
        }
        const last = stroke.points[stroke.points.length - 1];
        const prev = stroke.points[stroke.points.length - 2];
        ctx.quadraticCurveTo(prev.x, prev.y, last.x, last.y);
        ctx.stroke();
      }
      ctx.restore();
    }

    return out.toDataURL("image/png");
  }

  // Gera assinatura caligráfica estilizada em canvas
  function generateCursive(styleIndex: number) {
    const out = document.createElement("canvas");
    out.width = 600;
    out.height = 200;
    const ctx = out.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, out.width, out.height);
    ctx.fillStyle = penColor;
    ctx.strokeStyle = penColor;

    // Normaliza nome do condutor
    const parts = driverName.trim().split(" ");
    const firstName = parts[0] || "Condutor";
    const lastName = parts.length > 1 ? parts[parts.length - 1] : "";
    const shortName = lastName ? `${firstName} ${lastName}` : firstName;

    if (styleIndex === 0) {
      // Estilo Cursivo Odair Fabian (Laço clássico oficial da imagem)
      ctx.font = "italic bold 64px 'Brush Script MT', 'Segoe Script', cursive, sans-serif";
      ctx.fillText(shortName, 50, 115);

      // Traço de assinatura com laço no final
      ctx.beginPath();
      ctx.lineWidth = 3.5;
      ctx.lineCap = "round";
      ctx.moveTo(40, 135);
      ctx.bezierCurveTo(180, 145, 380, 115, 520, 125);
      ctx.bezierCurveTo(550, 128, 540, 150, 500, 140);
      ctx.stroke();

      // Ponto duplo característico
      ctx.beginPath();
      ctx.arc(525, 122, 2.5, 0, Math.PI * 2);
      ctx.arc(538, 120, 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (styleIndex === 1) {
      // Estilo Executivo Moderno
      ctx.font = "italic 60px 'Lucida Handwriting', 'Segoe Script', cursive, sans-serif";
      ctx.fillText(firstName, 60, 95);
      ctx.font = "italic bold 52px cursive, sans-serif";
      ctx.fillText(lastName || firstName, 220, 125);

      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.moveTo(50, 145);
      ctx.lineTo(540, 135);
      ctx.stroke();
    } else {
      // Estilo Rubrica Rápida
      ctx.font = "italic bold 68px cursive, sans-serif";
      const initial = (firstName[0] || "O") + (lastName ? lastName[0] : "F");
      ctx.fillText(initial, 60, 110);
      ctx.font = "italic 44px 'Segoe Script', cursive, sans-serif";
      ctx.fillText(lastName || firstName, 170, 110);

      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.moveTo(45, 130);
      ctx.bezierCurveTo(200, 155, 400, 120, 530, 130);
      ctx.stroke();
    }

    const dataUrl = out.toDataURL("image/png");
    setPreviewDataUrl(dataUrl);
  }

  // Processa arquivo enviado removendo o fundo branco/claro
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, c.width, c.height);
        const data = imgData.data;

        // Limiar de luminância: clareia fundos e mantém a tinta escura
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;

          if (brightness > 200) {
            // Fundo transparente
            data[i + 3] = 0;
          } else {
            // Intensifica a tinta preta/escura
            data[i] = Math.max(0, r - 50);
            data[i + 1] = Math.max(0, g - 50);
            data[i + 2] = Math.max(0, b - 50);
            data[i + 3] = 255;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setPreviewDataUrl(c.toDataURL("image/png"));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  function handleSaveFinal() {
    let finalUrl = "";
    if (mode === "draw") {
      if (strokes.length > 0) {
        finalUrl = exportCanvasToDataUrl();
      } else {
        finalUrl = previewDataUrl;
      }
    } else {
      finalUrl = previewDataUrl;
    }

    onSave(finalUrl);
    onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Assinatura do Portador"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs select-none"
    >
      <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#19234e] text-white">
              <PenTool className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#19234e] leading-tight">
                7 ASSINATURA DO PORTADOR
              </h3>
              <p className="text-[11px] text-slate-500">
                Assine com o dedo ou mouse para estampar na CNH
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 cursor-pointer transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Abas de Modo */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 p-1.5 gap-1" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "draw"}
            onClick={() => setMode("draw")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
              mode === "draw"
                ? "bg-[#19234e] text-white shadow-sm"
                : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
            }`}
          >
            <PenTool className="h-3.5 w-3.5" />
            Desenhar na Tela
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "generate"}
            onClick={() => setMode("generate")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
              mode === "generate"
                ? "bg-[#19234e] text-white shadow-sm"
                : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Gerar Automática
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "upload"}
            onClick={() => setMode("upload")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
              mode === "upload"
                ? "bg-[#19234e] text-white shadow-sm"
                : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            Enviar Foto
          </button>
        </div>

        {/* Conteúdo por Modo */}
        <div className="p-4 flex flex-col gap-3">
          {mode === "draw" && (
            <>
              {/* Barra de Ferramentas de Desenho */}
              <div className="flex items-center justify-between gap-2">
                {/* Seleção de Cor da Tinta */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Tinta:</span>
                  <button
                    type="button"
                    onClick={() => setPenColor("#0f172a")}
                    aria-label="Tinta Preta"
                    className={`h-7 w-7 rounded-full bg-slate-900 border-2 cursor-pointer transition-transform ${
                      penColor === "#0f172a" ? "border-emerald-500 scale-110 shadow-sm" : "border-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setPenColor("#1d4ed8")}
                    aria-label="Tinta Azul Caneta"
                    className={`h-7 w-7 rounded-full bg-blue-700 border-2 cursor-pointer transition-transform ${
                      penColor === "#1d4ed8" ? "border-emerald-500 scale-110 shadow-sm" : "border-white"
                    }`}
                  />
                </div>

                {/* Espessura do Traço */}
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setPenWidth(2)}
                    className={`px-2 py-1 rounded cursor-pointer ${
                      penWidth === 2 ? "bg-white text-slate-900 shadow-xs font-bold" : "text-slate-600"
                    }`}
                  >
                    Fina
                  </button>
                  <button
                    type="button"
                    onClick={() => setPenWidth(3.5)}
                    className={`px-2 py-1 rounded cursor-pointer ${
                      penWidth === 3.5 ? "bg-white text-slate-900 shadow-xs font-bold" : "text-slate-600"
                    }`}
                  >
                    Média
                  </button>
                </div>

                {/* Ações Desfazer / Limpar */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleUndo}
                    disabled={strokes.length === 0}
                    className="flex h-8 items-center gap-1 rounded-lg border border-slate-200 px-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Desfazer
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex h-8 items-center gap-1 rounded-lg border border-red-200 px-2.5 text-xs font-bold text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                  >
                    <Eraser className="h-3.5 w-3.5" />
                    Limpar
                  </button>
                </div>
              </div>

              {/* Área do Canvas de Assinatura */}
              <div className="relative h-48 w-full overflow-hidden rounded-xl border-2 border-dashed border-[#19234e]/40 bg-[#f8fafc] shadow-inner touch-none">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={220}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className="h-full w-full cursor-crosshair touch-none"
                  style={{ touchAction: "none" }}
                />
                {strokes.length === 0 && (
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                    <PenTool className="h-8 w-8 stroke-1 mb-1 text-slate-300" />
                    <span className="text-xs font-medium">Desenhe sua assinatura aqui</span>
                  </div>
                )}
              </div>
            </>
          )}

          {mode === "generate" && (
            <div className="flex flex-col gap-3">
              <span className="text-xs text-slate-600">
                Escolha um estilo caligráfico gerado a partir do nome <strong>{driverName}</strong>:
              </span>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => generateCursive(0)}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-3 hover:border-[#19234e] hover:bg-slate-50 transition-all text-left cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#19234e]">
                      Estilo 1: Cursiva Oficial com Laço (Padrão Odair)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Letra manuscrita fluida com laço e pontuação idêntica à foto
                    </span>
                  </div>
                  <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => generateCursive(1)}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-3 hover:border-[#19234e] hover:bg-slate-50 transition-all text-left cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#19234e]">
                      Estilo 2: Rubrica Executiva
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Assinatura alongada com linha inferior de segurança
                    </span>
                  </div>
                  <Sparkles className="h-4 w-4 text-blue-500 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => generateCursive(2)}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-3 hover:border-[#19234e] hover:bg-slate-50 transition-all text-left cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#19234e]">
                      Estilo 3: Iniciais com Rubrica Rápida
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Traçado dinâmico combinando iniciais e sobrenome
                    </span>
                  </div>
                  <Sparkles className="h-4 w-4 text-emerald-500 shrink-0" />
                </button>
              </div>

              {previewDataUrl && (
                <div className="mt-2 rounded-xl border border-emerald-300 bg-emerald-50/60 p-3 text-center">
                  <span className="block text-[11px] font-bold text-emerald-900 uppercase mb-1">
                    Prévia Gerada:
                  </span>
                  <div className="h-16 flex items-center justify-center bg-white rounded-lg border border-emerald-200 p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewDataUrl} alt="Prévia da Assinatura" className="h-full object-contain" />
                  </div>
                </div>
              )}
            </div>
          )}

          {mode === "upload" && (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-[#19234e]">
                <Upload className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Envie uma foto da sua assinatura no papel
                </p>
                <p className="text-[11px] text-slate-500 max-w-xs mt-0.5">
                  Nosso sistema remove o fundo branco automaticamente e deixa a tinta nítida para a CNH.
                </p>
              </div>

              <label
                htmlFor="signature-upload-input"
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#19234e] px-5 text-xs font-bold text-white shadow-sm hover:bg-blue-900 cursor-pointer transition-colors"
              >
                <Upload className="h-4 w-4" />
                Selecionar foto da assinatura
              </label>
              <input
                id="signature-upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="sr-only"
              />

              {previewDataUrl && (
                <div className="mt-2 w-full rounded-xl border border-emerald-300 bg-emerald-50/60 p-3 text-center">
                  <span className="block text-[11px] font-bold text-emerald-900 uppercase mb-1">
                    Prévia com Fundo Removido:
                  </span>
                  <div className="h-16 flex items-center justify-center bg-white rounded-lg border border-emerald-200 p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewDataUrl} alt="Assinatura Processada" className="h-full object-contain" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rodapé com Botões de Ação */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-xl px-4 text-xs font-bold text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSaveFinal}
            className="flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-6 text-xs font-bold text-white shadow-md hover:bg-emerald-700 active:scale-98 cursor-pointer transition-all"
          >
            <Check className="h-4 w-4" />
            Salvar na CNH
          </button>
        </div>
      </div>
    </div>
  );
}
