"use client";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";
import { FILIERE_DATA, SEMESTRE_DATA, SCORE_DIST,
         FEATURE_IMPORTANCE, MODEL_COMPARISON } from "@/lib/data";

const C = { Reussi: "#3B6D11", A_risque: "#F4B942", Echec: "#C0392B" };
const PIE_DATA = [
  { name: "Réussi",   value: 710, color: C.Reussi   },
  { name: "À risque", value: 436, color: C.A_risque  },
  { name: "Échec",    value: 54,  color: C.Echec     },
];
const SCORE_COLORS: Record<string, string> = {
  faible: "#3B6D11", moyen: "#F4B942", eleve: "#C0392B"
};

const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color ?? p.fill }} className="font-medium">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export function DistributionPie() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={PIE_DATA} cx="50%" cy="45%" innerRadius={65} outerRadius={100}
          paddingAngle={3} dataKey="value">
          {PIE_DATA.map((e) => <Cell key={e.name} fill={e.color} />)}
        </Pie>
        <Tooltip />
        <Legend iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function FiliereBar() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={FILIERE_DATA} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="filiere" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip content={<Tip />} />
        <Legend iconType="circle" />
        <Bar dataKey="Reussi"   name="Réussi"   stackId="a" fill={C.Reussi}   />
        <Bar dataKey="A_risque" name="À risque" stackId="a" fill={C.A_risque} />
        <Bar dataKey="Echec"    name="Échec"    stackId="a" fill={C.Echec}    radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SemestreBar() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={SEMESTRE_DATA} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="semestre" tick={{ fontSize: 12 }} />
        <YAxis domain={[50, 70]} tick={{ fontSize: 11 }} unit="%" />
        <Tooltip content={<Tip />} formatter={(v) => [`${v}%`, "Taux réussite"]} />
        <Bar dataKey="taux" name="Taux réussite" radius={[6,6,0,0]}>
          {SEMESTRE_DATA.map((e, i) => (
            <Cell key={i} fill={e.taux >= 60 ? "#3B6D11" : "#2E75B6"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ScoreHistogram() {
  const data = SCORE_DIST.map(d => ({ ...d, fill: SCORE_COLORS[d.zone] }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="range" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip content={<Tip />} formatter={(v) => [v, "Étudiants"]} />
        <Bar dataKey="count" name="Étudiants" radius={[4,4,0,0]}>
          {data.map((e, i) => <Cell key={i} fill={e.fill} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function FeatureImportanceChart() {
  const data = [...FEATURE_IMPORTANCE].sort((a, b) => b.importance - a.importance);
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical"
        margin={{ top: 5, right: 40, bottom: 5, left: 80 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
        <XAxis type="number" unit="%" tick={{ fontSize: 11 }} domain={[0, 55]} />
        <YAxis type="category" dataKey="feature" tick={{ fontSize: 12 }} width={90} />
        <Tooltip formatter={(v: number) => [`${v}%`, "Importance"]} />
        <Bar dataKey="importance" name="Importance" radius={[0, 6, 6, 0]}>
          {data.map((e, i) => <Cell key={i} fill={e.color} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ModelComparisonChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={MODEL_COMPARISON}
        margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="model" tick={{ fontSize: 12 }} />
        <YAxis domain={[85, 100]} unit="%" tick={{ fontSize: 11 }} />
        <Tooltip formatter={(v: number) => [`${v}%`, "Accuracy"]} />
        <Bar dataKey="accuracy" name="Accuracy" radius={[8, 8, 0, 0]} maxBarSize={80}>
          {MODEL_COMPARISON.map((e, i) => <Cell key={i} fill={e.color} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
