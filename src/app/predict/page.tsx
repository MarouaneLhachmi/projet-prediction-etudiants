import PredictionForm from "@/components/PredictionForm";
import { FeatureImportanceChart, ModelComparisonChart } from "@/components/DashboardCharts";
import { CONFUSION_LABELS, CONFUSION_MATRIX, MODEL_COMPARISON } from "@/lib/data";

function ConfusionMatrix() {
  const max = Math.max(...CONFUSION_MATRIX.flat());
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-center">
        <thead>
          <tr>
            <th className="pb-2 text-left text-xs text-slate-400 font-normal pr-3">Réel \ Prédit</th>
            {CONFUSION_LABELS.map(l => (
              <th key={l} className="pb-2 font-semibold text-slate-600 text-xs px-2">{l}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CONFUSION_MATRIX.map((row, i) => (
            <tr key={i}>
              <td className="pr-3 py-1 text-left text-xs font-semibold text-slate-600">{CONFUSION_LABELS[i]}</td>
              {row.map((val, j) => {
                const isCorrect = i === j;
                const opacity   = 0.15 + (val / max) * 0.75;
                return (
                  <td key={j} className="px-2 py-1">
                    <div className={`rounded-lg py-2 text-sm font-bold transition-all
                      ${isCorrect ? "text-[#1F3864]" : "text-slate-600"}`}
                      style={{ background: isCorrect
                        ? `rgba(31,56,100,${opacity})`
                        : `rgba(200,200,200,${opacity * 0.5})` }}>
                      {val}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-slate-400 mt-2 text-center">
        Diagonale = prédictions correctes · Hors diagonale = erreurs
      </p>
    </div>
  );
}

export default function PredictPage() {
  const totalCorrect = CONFUSION_MATRIX.reduce((s, row, i) => s + row[i], 0);
  const total        = CONFUSION_MATRIX.flat().reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

      {/* Header */}
      <div className="animate-fade-up">
        <span className="badge-info mb-3 inline-block">PySpark 2.4.8 · MLlib · 6 features</span>
        <h1 className="text-3xl font-extrabold text-[#1F3864]">Prédiction ML</h1>
        <p className="text-slate-500 mt-1">
          Calculez en temps réel le statut d'un étudiant · Modèle RandomForest entraîné sur 947 étudiants
        </p>
      </div>

      {/* Prédiction */}
      <PredictionForm />

      {/* Comparaison modèles + Feature importance */}
      <div className="grid lg:grid-cols-2 gap-6 animate-fade-up delay-200">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-700">Comparaison des modèles</h3>
            <span className="badge-success">RF gagnant</span>
          </div>
          <ModelComparisonChart />
          <div className="mt-4 space-y-2">
            {MODEL_COMPARISON.map(m => (
              <div key={m.model} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <div>
                  <p className="font-semibold text-sm text-slate-700">{m.model}</p>
                  <p className="text-xs text-slate-400">{m.trees}</p>
                </div>
                <span className="text-lg font-extrabold" style={{ color: m.color }}>
                  {m.accuracy}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="font-bold text-slate-700 mb-4">Importance des variables</h3>
          <FeatureImportanceChart />
          <p className="text-xs text-slate-400 mt-2 text-center">
            note_moy et nb_absences expliquent 77% de la prédiction
          </p>
        </div>
      </div>

      {/* Matrice de confusion */}
      <div className="card animate-fade-up delay-300">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-slate-700">Matrice de confusion — RandomForest</h3>
            <p className="text-xs text-slate-400 mt-0.5">Évaluation sur 253 étudiants (20% test set)</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold text-[#1D9E75]">
              {((totalCorrect / total) * 100).toFixed(2)}%
            </p>
            <p className="text-xs text-slate-400">Accuracy</p>
          </div>
        </div>
        <ConfusionMatrix />
      </div>

    </div>
  );
}
