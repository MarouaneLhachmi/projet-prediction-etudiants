"use client";
import { useState } from "react";
import { Brain, TrendingUp, TrendingDown, AlertTriangle, RefreshCw } from "lucide-react";

type Result = { score: number; statut: string; niveau: "success"|"warning"|"danger"; percent: number } | null;

function predict(note: number, absences: number, participation: string): Result {
  const p = participation === "Elevee" ? 0 : participation === "Moyenne" ? 1 : 2;
  const score = (20 - note) * 0.40 + absences * 0.30 + p * 0.20;
  const s = Math.round(score * 100) / 100;
  if (s > 12) return { score: s, statut: "Échec",    niveau: "danger",  percent: Math.min((s/20)*100, 100) };
  if (s > 6)  return { score: s, statut: "À risque", niveau: "warning", percent: (s/20)*100 };
  return       { score: s, statut: "Réussi",   niveau: "success", percent: (s/20)*100 };
}

const ICONS = { success: TrendingUp, warning: AlertTriangle, danger: TrendingDown };
const COLORS = {
  success: { bar:"bg-[#3B6D11]", badge:"bg-green-100 text-green-800", ring:"ring-green-200", text:"text-[#3B6D11]", bg:"bg-green-50" },
  warning: { bar:"bg-[#F4B942]", badge:"bg-amber-100 text-amber-800", ring:"ring-amber-200", text:"text-[#D4890A]", bg:"bg-amber-50" },
  danger:  { bar:"bg-[#C0392B]", badge:"bg-red-100 text-red-800",     ring:"ring-red-200",   text:"text-[#C0392B]", bg:"bg-red-50"   },
};

export default function PredictionForm() {
  const [note, setNote]        = useState(12);
  const [absences, setAbs]    = useState(5);
  const [parti, setParti]     = useState("Moyenne");
  const result = predict(note, absences, parti);
  const c = result ? COLORS[result.niveau] : COLORS.success;
  const Icon = result ? ICONS[result.niveau] : Brain;

  return (
    <div className="grid lg:grid-cols-2 gap-8">

      {/* ── Form ── */}
      <div className="card space-y-6">
        <h2 className="font-bold text-slate-700 text-lg flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#2E75B6]" /> Données de l'étudiant
        </h2>

        {/* Note */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-slate-700">Note moyenne</label>
            <span className="text-sm font-bold text-[#1F3864]">{note} <span className="text-slate-400 font-normal">/ 20</span></span>
          </div>
          <input type="range" min={0} max={20} step={0.5} value={note}
            onChange={e => setNote(Number(e.target.value))}
            className="w-full h-2 appearance-none rounded-full bg-slate-200 cursor-pointer accent-[#1F3864]" />
          <div className="flex justify-between text-xs text-slate-400 mt-1"><span>0</span><span>10</span><span>20</span></div>
        </div>

        {/* Absences */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-slate-700">Nombre d'absences</label>
            <span className="text-sm font-bold text-[#1F3864]">{absences} <span className="text-slate-400 font-normal">séances</span></span>
          </div>
          <input type="range" min={0} max={30} step={1} value={absences}
            onChange={e => setAbs(Number(e.target.value))}
            className="w-full h-2 appearance-none rounded-full bg-slate-200 cursor-pointer accent-[#C0392B]" />
          <div className="flex justify-between text-xs text-slate-400 mt-1"><span>0</span><span>15</span><span>30</span></div>
        </div>

        {/* Participation */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">Niveau de participation</label>
          <div className="grid grid-cols-3 gap-2">
            {["Elevee","Moyenne","Faible"].map(p => (
              <button key={p} onClick={() => setParti(p)}
                className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all
                  ${parti === p
                    ? p === "Elevee" ? "border-[#3B6D11] bg-green-50 text-[#3B6D11]"
                      : p === "Moyenne" ? "border-[#F4B942] bg-amber-50 text-[#D4890A]"
                      : "border-[#C0392B] bg-red-50 text-[#C0392B]"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                {p === "Elevee" ? "Élevée" : p}
              </button>
            ))}
          </div>
        </div>

        {/* Formula */}
        <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-500 font-mono leading-relaxed">
          Score = (20 - note) × <strong>0.40</strong><br />
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ absences × <strong>0.30</strong><br />
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ participation × <strong>0.20</strong><br />
          <span className="text-slate-400">→ 0 = Élevée · 1 = Moyenne · 2 = Faible</span>
        </div>

        {/* Reset */}
        <button onClick={() => { setNote(12); setAbs(5); setParti("Moyenne"); }}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition">
          <RefreshCw className="w-4 h-4" /> Réinitialiser
        </button>
      </div>

      {/* ── Result ── */}
      <div className={`card ring-4 ${c.ring} ${c.bg} flex flex-col items-center justify-center text-center gap-6 min-h-[400px] transition-all duration-300`}>
        <div className={`w-24 h-24 rounded-full flex items-center justify-center ${c.badge} ring-8 ${c.ring}`}>
          <Icon className="w-12 h-12" />
        </div>

        <div>
          <p className="text-sm text-slate-500 mb-1">Statut prédit</p>
          <h2 className={`text-4xl font-extrabold ${c.text}`}>{result?.statut}</h2>
        </div>

        {/* Score gauge */}
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Score de risque</span>
            <span className={`font-bold ${c.text}`}>{result?.score?.toFixed(2)}</span>
          </div>
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <div className={`h-full ${c.bar} rounded-full transition-all duration-500`}
              style={{ width: `${result?.percent ?? 0}%` }} />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0 — Faible</span><span>6 — Moyen</span><span>12 — Élevé</span>
          </div>
        </div>

        {/* Thresholds */}
        <div className="grid grid-cols-3 gap-3 w-full text-center text-xs">
          {[
            { label: "Réussi",   range: "≤ 6",  color: "text-green-600 bg-green-50",  border: "border-green-200" },
            { label: "À risque", range: "6–12", color: "text-amber-600 bg-amber-50",   border: "border-amber-200" },
            { label: "Échec",    range: "> 12", color: "text-red-600 bg-red-50",       border: "border-red-200"   },
          ].map(t => (
            <div key={t.label} className={`rounded-xl border ${t.border} p-2 ${t.color}`}>
              <p className="font-bold">{t.label}</p>
              <p className="opacity-70">{t.range}</p>
            </div>
          ))}
        </div>

        {/* ML info */}
        <p className="text-xs text-slate-400">
          Modèle : <strong>RandomForestClassifier</strong> · 50 arbres<br />
          Précision : <strong className="text-[#1D9E75]">96.05%</strong> sur 253 étudiants test
        </p>
      </div>
    </div>
  );
}
