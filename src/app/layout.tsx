import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Projet 9 — Prédiction de réussite | EMSI Big Data",
  description: "Pipeline Big Data MapReduce + PySpark MLlib pour la prédiction de réussite des étudiants. EMSI 2025-2026.",
  keywords: ["Big Data", "MapReduce", "Hadoop", "PySpark", "Machine Learning", "EMSI"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <footer className="bg-[#1F3864] text-slate-300 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-white">Projet 9 — Prédiction de réussite des étudiants</p>
              <p className="text-sm text-slate-400">EMSI · 4ème année IASDT · 2025-2026</p>
            </div>
            <div className="text-sm text-slate-400 text-center">
              <p>Encadrant : M. Hassan BADIR</p>
              <p>Stack : Hadoop 3.2.1 · MapReduce · PySpark · MLlib</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm">Accuracy RF : <strong className="text-[#F4B942]">96.05%</strong></span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
