import { STATS, TOP10_RISQUE } from "@/lib/data";
import {
  DistributionPie, FiliereBar, SemestreBar, ScoreHistogram,
  FeatureImportanceChart, ModelComparisonChart
} from "@/components/DashboardCharts";
import { Database, Users, TrendingDown, AlertTriangle, BookOpen, Cpu } from "lucide-react";
import Link from "next/link";

const statCards = [
  { label: "Étudiants",    value: STATS.total,       unit: "",    icon: Users,         color: "border-[#2E75B6] text-[#2E75B6]", bg: "bg-blue-50"  },
  { label: "Réussi",       value: STATS.reussi,      unit: "",    icon: BookOpen,       color: "border-[#3B6D11] text-[#3B6D11]", bg: "bg-green-50" },
  { label: "À risque",     value: STATS.aRisque,     unit: "",    icon: AlertTriangle,  color: "border-[#F4B942] text-[#D4890A]", bg: "bg-amber-50" },
  { label: "Échec",        value: STATS.echec,       unit: "",    icon: TrendingDown,   color: "border-[#C0392B] text-[#C0392B]", bg: "bg-red-50"   },
  { label: "Note moyenne", value: STATS.noteMoy,     unit: "/20", icon: BookOpen,       color: "border-[#1F3864] text-[#1F3864]", bg: "bg-slate-50" },
  { label: "RF Accuracy",  value: STATS.accuracyRF,  unit: "%",   icon: Cpu,            color: "border-[#1D9E75] text-[#1D9E75]", bg: "bg-teal-50"  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Hero */}
      <section className="relative rounded-3xl overflow-hidden mb-10 bg-[#1F3864] px-8 py-14 text-white">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #F4B942 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-2xl animate-fade-up">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F4B942]/20 text-[#F4B942] text-xs font-semibold tracking-wider uppercase mb-4">
            Big Data · EMSI 2025-2026
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">
            Prédiction de réussite<br />
            <span className="text-[#F4B942]">des étudiants</span>
          </h1>
          <p className="text-slate-300 text-base mb-6">
            Pipeline complet : HDFS · 5 jobs MapReduce · PySpark RandomForest (6 features)
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/pipeline"
              className="px-5 py-2.5 bg-[#F4B942] text-[#1F3864] rounded-xl font-bold text-sm hover:bg-amber-400 transition">
              Voir le pipeline →
            </Link>
            <Link href="/predict"
              className="px-5 py-2.5 border border-white/30 text-white rounded-xl font-semibold text-sm hover:bg-white/10 transition">
              Tester la prédiction
            </Link>
          </div>
        </div>
        <div className="absolute right-8 bottom-8 hidden lg:flex flex-col items-end gap-1 opacity-60 text-xs text-slate-400">
          <span>Hadoop 3.2.1</span><span>PySpark 2.4.8</span>
          <span>RandomForest · 50 arbres · 6 features</span>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {statCards.map(({ label, value, unit, icon: Icon, color, bg }, i) => (
          <div key={label}
            className={`card border-l-4 ${color.split(" ")[0]} ${bg} animate-fade-up delay-${(i+1)*100}`}>
            <Icon className={`w-5 h-5 mb-2 ${color.split(" ")[1]}`} />
            <p className={`text-2xl font-extrabold ${color.split(" ")[1]}`}>{value}{unit}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Graphiques ligne 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card animate-fade-up delay-200">
          <h3 className="font-bold text-slate-700 mb-4">Distribution des statuts</h3>
          <DistributionPie />
        </div>
        <div className="card animate-fade-up delay-300">
          <h3 className="font-bold text-slate-700 mb-4">Répartition par filière</h3>
          <FiliereBar />
        </div>
      </div>

      {/* Graphiques ligne 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card animate-fade-up delay-300">
          <h3 className="font-bold text-slate-700 mb-4">Taux de réussite par semestre</h3>
          <SemestreBar />
        </div>
        <div className="card animate-fade-up delay-400">
          <h3 className="font-bold text-slate-700 mb-4">Distribution des scores de risque</h3>
          <ScoreHistogram />
        </div>
      </div>

      {/* ML Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="card animate-fade-up delay-400">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-700">Importance des variables — ML</h3>
            <span className="badge-info">6 features</span>
          </div>
          <FeatureImportanceChart />
          <p className="text-xs text-slate-400 mt-2 text-center">
            note_moy + absences = 77% de la prédiction
          </p>
        </div>
        <div className="card animate-fade-up delay-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-700">RandomForest vs Decision Tree</h3>
            <span className="badge-success">RF gagnant</span>
          </div>
          <ModelComparisonChart />
          <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-[#1F3864]/10 rounded-xl p-2">
              <p className="font-extrabold text-[#1F3864] text-lg">{STATS.accuracyRF}%</p>
              <p className="text-slate-500">Random Forest</p>
            </div>
            <div className="bg-[#2E75B6]/10 rounded-xl p-2">
              <p className="font-extrabold text-[#2E75B6] text-lg">{STATS.accuracyDT}%</p>
              <p className="text-slate-500">Decision Tree</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top 10 */}
      <div className="card animate-fade-up delay-400">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-slate-700">🚨 Top 10 étudiants à risque élevé</h3>
          <span className="badge-danger">Job 5 — Classement</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {["Rang","ID","Filière","Note /20","Absences","Score risque"].map(h => (
                  <th key={h} className="pb-3 text-left font-semibold text-slate-500 text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {TOP10_RISQUE.map((s, i) => (
                <tr key={s.id} className="hover:bg-red-50 transition-colors">
                  <td className="py-3 pr-4">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                      ${i < 3 ? "bg-red-600 text-white" : "bg-red-100 text-red-700"}`}>{i+1}</span>
                  </td>
                  <td className="py-3 pr-4 font-mono font-semibold text-slate-700">{s.id}</td>
                  <td className="py-3 pr-4"><span className="badge-info">{s.filiere}</span></td>
                  <td className="py-3 pr-4 text-red-600 font-bold">{s.note}</td>
                  <td className="py-3 pr-4 text-red-600 font-bold">{s.absences}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full"
                          style={{ width: `${(s.score/20)*100}%` }} />
                      </div>
                      <span className="badge-danger">{s.score}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
