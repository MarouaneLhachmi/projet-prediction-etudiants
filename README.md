# Projet 9 — Prédiction de réussite des étudiants

Application web **Next.js 14** visualisant le pipeline Big Data complet.

## Stack
- **Frontend** : Next.js 14, React 18, TypeScript, Tailwind CSS
- **Charts** : Recharts
- **Big Data** : Hadoop 3.2.1, MapReduce, PySpark 2.4.8, MLlib

## Lancer en local

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Déployer sur Vercel (2 minutes)

1. Push ce dossier sur GitHub
2. Va sur [vercel.com](https://vercel.com) → **New Project**
3. Importe ton repo GitHub
4. Clique **Deploy** — c'est tout !

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Dashboard | `/` | Stats + 4 graphiques interactifs |
| Pipeline | `/pipeline` | 5 jobs MapReduce + cluster HDFS |
| Prédiction | `/predict` | Calculateur ML temps réel |

## EMSI 2025-2026 · M. Hassan BADIR
