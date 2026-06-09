import { JOBS, FILIERE_DATA } from "@/lib/data";
import { CheckCircle, ArrowDown, Database, Server } from "lucide-react";

const jobColors = [
  "border-[#2E75B6] bg-blue-50",
  "border-[#3B6D11] bg-green-50",
  "border-[#F4B942] bg-amber-50",
  "border-[#C0392B] bg-red-50",
  "border-[#7F77DD] bg-purple-50",
];
const jobBadgeColors = [
  "bg-[#2E75B6] text-white",
  "bg-[#3B6D11] text-white",
  "bg-[#F4B942] text-[#1F3864]",
  "bg-[#C0392B] text-white",
  "bg-[#7F77DD] text-white",
];

const hdfsZones = [
  { path: "/projet9/raw/",       label: "Raw Zone",     files: "students_dataset.csv",    color: "bg-slate-100 border-slate-300" },
  { path: "/projet9/clean/",     label: "Clean Zone",   files: "job1_out/part-00000,01",  color: "bg-green-50 border-green-300"  },
  { path: "/projet9/results/",   label: "Results Zone", files: "job2_out…job5_out",        color: "bg-blue-50 border-blue-300"    },
];

export default function PipelinePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="mb-10 animate-fade-up">
        <span className="badge-info mb-3 inline-block">Hadoop 3.2.1 · YARN · Hadoop Streaming</span>
        <h1 className="text-3xl font-extrabold text-[#1F3864]">Pipeline MapReduce</h1>
        <p className="text-slate-500 mt-1">5 jobs enchaînés sur HDFS · Python 3.5 · Hadoop Streaming</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* ── Pipeline flow ── */}
        <div className="lg:col-span-2 space-y-3 animate-fade-up delay-100">
          {/* HDFS Raw */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-100 border border-slate-200">
            <Database className="w-8 h-8 text-slate-500 shrink-0" />
            <div>
              <p className="font-bold text-slate-700 text-sm">HDFS Raw Zone</p>
              <code className="text-xs text-slate-500">/projet9/raw/students_dataset.csv</code>
            </div>
            <span className="ml-auto badge-info">1 200 lignes</span>
          </div>

          {JOBS.map((job, i) => (
            <div key={job.num}>
              <div className="flex justify-center py-1">
                <ArrowDown className="w-5 h-5 text-slate-400" />
              </div>
              <div className={`rounded-2xl border-l-4 ${jobColors[i]} p-5`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${jobBadgeColors[i]}`}>
                      {job.num}
                    </span>
                    <div>
                      <p className="font-bold text-slate-800">Job {job.num} — {job.nom}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{job.desc}</p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                </div>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white/60 rounded-lg p-2">
                    <p className="text-slate-400">Input</p>
                    <p className="font-bold text-slate-700">{job.input.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-2">
                    <p className="text-slate-400">Output</p>
                    <p className="font-bold text-slate-700">{job.output.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-2">
                    <p className="text-slate-400">Reducers</p>
                    <p className="font-bold text-slate-700">{job.reducers}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-2">
                    <p className="text-slate-400">Statut</p>
                    <p className="font-bold text-green-600">SUCCEEDED</p>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <code className="bg-white/60 px-2 py-1 rounded">{job.entree}</code>
                  <span className="text-slate-400">→</span>
                  <code className="bg-white/60 px-2 py-1 rounded text-green-700">{job.sortie}</code>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center py-1">
            <ArrowDown className="w-5 h-5 text-slate-400" />
          </div>

          {/* HDFS Results */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-200">
            <Database className="w-8 h-8 text-blue-500 shrink-0" />
            <div>
              <p className="font-bold text-blue-700 text-sm">HDFS Results Zone</p>
              <code className="text-xs text-blue-500">/projet9/results/ · job2_out…job5_out</code>
            </div>
            <span className="ml-auto badge-info">4 dossiers</span>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="space-y-6 animate-fade-up delay-200">

          {/* Cluster info */}
          <div className="card">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Server className="w-4 h-4 text-[#2E75B6]" /> Cluster Docker
            </h3>
            {[
              { name: "namenode",       role: "Gestionnaire HDFS",  port: ":9870" },
              { name: "datanode1",      role: "Stockage distribué", port: ":9864" },
              { name: "datanode2",      role: "Stockage distribué", port: ":9864" },
              { name: "resourcemanager",role: "Orchestrateur YARN", port: ":8088" },
              { name: "nodemanager",    role: "Exécution tâches",   port: ""      },
            ].map(c => (
              <div key={c.name} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-mono font-semibold text-slate-700">{c.name}</p>
                  <p className="text-xs text-slate-400">{c.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  {c.port && <code className="text-xs text-slate-400">{c.port}</code>}
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                </div>
              </div>
            ))}
          </div>

          {/* Aggregation table */}
          <div className="card">
            <h3 className="font-bold text-slate-700 mb-4">Job 2 — Agrégation</h3>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-2 text-left text-slate-500">Filière</th>
                  <th className="pb-2 text-center text-green-600">✓</th>
                  <th className="pb-2 text-center text-amber-600">⚠</th>
                  <th className="pb-2 text-center text-red-600">✗</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {FILIERE_DATA.map(f => (
                  <tr key={f.filiere} className="hover:bg-slate-50">
                    <td className="py-2 font-semibold text-slate-700">{f.filiere}</td>
                    <td className="py-2 text-center font-bold text-green-600">{f.Reussi}</td>
                    <td className="py-2 text-center font-bold text-amber-600">{f.A_risque}</td>
                    <td className="py-2 text-center font-bold text-red-600">{f.Echec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* HDFS zones */}
          <div className="card">
            <h3 className="font-bold text-slate-700 mb-3">Zones HDFS</h3>
            <div className="space-y-2">
              {hdfsZones.map(z => (
                <div key={z.path} className={`rounded-xl border p-3 ${z.color}`}>
                  <p className="font-semibold text-slate-700 text-xs">{z.label}</p>
                  <code className="text-xs text-slate-500 block">{z.path}</code>
                  <p className="text-xs text-slate-400 mt-1">{z.files}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
