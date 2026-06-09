# 🎓 Projet 9 — Prédiction de réussite des étudiants

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![Hadoop](https://img.shields.io/badge/Hadoop-3.2.1-yellow?style=for-the-badge&logo=apache-hadoop)
![PySpark](https://img.shields.io/badge/PySpark-2.4.8-orange?style=for-the-badge&logo=apache-spark)
![Python](https://img.shields.io/badge/Python-3.5-blue?style=for-the-badge&logo=python)
![Docker](https://img.shields.io/badge/Docker-Cluster-2496ED?style=for-the-badge&logo=docker)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)

**Pipeline Big Data complet pour la prédiction de réussite des étudiants**

[🌐 Demo Live](https://projet-prediction-etudiants.vercel.app) · [📊 Dashboard](https://projet-prediction-etudiants.vercel.app) · [🤖 Prédiction ML](https://projet-prediction-etudiants.vercel.app/predict)

</div>

---

## 📌 Description

Projet final Big Data (individuel) réalisé dans le cadre de la **4ème année IASDT** à l'**EMSI Tanger**, sous la supervision de **M. Hassan BADIR**.

L'objectif est de construire un pipeline Big Data complet permettant d'analyser des données académiques massives et de **prédire le statut des étudiants** (Réussi / À risque / Échec) à l'aide de l'apprentissage automatique.

---

## 🚀 Demo

| Page | Aperçu |
|------|--------|
| **Dashboard** | Statistiques, 6 graphiques interactifs, Top 10 étudiants à risque |
| **Pipeline MapReduce** | Visualisation des 5 jobs Hadoop, cluster Docker, résultats HDFS |
| **Prédiction ML** | Calculateur temps réel, matrice de confusion, feature importance |

🔗 **[Voir le site en live →](https://projet-prediction-etudiants.vercel.app)**

---

## 🏗️ Architecture du pipeline

```
students_dataset.csv (1 200 lignes)
         │
         ▼
┌─────────────────────────────────────────────────┐
│              HDFS Raw Zone                      │
│         /projet9/raw/                           │
└────────────────────┬────────────────────────────┘
                     │  Hadoop Streaming
         ┌───────────▼───────────┐
         │  Job 1 : Nettoyage    │ → 1 200 lignes propres
         │  mapper_clean.py      │
         └───────────┬───────────┘
                     │
         ┌───────────▼───────────┐
         │  HDFS Clean Zone      │
         │  /projet9/clean/      │
         └───────────┬───────────┘
                     │
    ┌────────────────┼────────────────┐
    ▼                ▼                ▼
┌────────┐     ┌──────────┐    ┌──────────┐
│ Job 2  │     │  Job 3   │    │  Job 4   │
│ Agrég. │     │  Score   │    │Anomalies │
│ 88 gp. │     │  risque  │    │  alertes │
└────────┘     └──────────┘    └────┬─────┘
                                    │
                          ┌─────────▼──────────┐
                          │  Job 5 : Classement │
                          │  Top 20 à risque    │
                          └─────────┬──────────┘
                                    │
                     ┌──────────────▼───────────────┐
                     │  HDFS Results Zone            │
                     │  /projet9/results/            │
                     └──────────────┬───────────────┘
                                    │  PySpark + MLlib
                     ┌──────────────▼───────────────┐
                     │  RandomForestClassifier       │
                     │  50 arbres · 6 features       │
                     │  ✅ Accuracy : 96.05%          │
                     └──────────────────────────────┘
```

---

## 📊 Résultats

| Métrique | Valeur |
|----------|--------|
| Dataset | 1 200 étudiants |
| Étudiants Réussis | 710 (59%) |
| Étudiants À risque | 436 (36%) |
| Étudiants en Échec | 54 (4%) |
| Jobs MapReduce | 5 jobs exécutés avec succès |
| ML — Random Forest | **96.05%** accuracy |
| ML — Decision Tree | 91.30% accuracy |
| Features utilisées | note_moy, nb_absences, participation, filière, semestre, âge |

### 🔍 Importance des variables
| Variable | Importance |
|----------|------------|
| note_moy | 48.21% |
| nb_absences | 29.34% |
| participation | 11.03% |
| filiere | 6.12% |
| semestre | 3.41% |
| age | 1.89% |

---

## 🛠️ Stack technique

### Big Data
- **Hadoop 3.2.1** — Stockage distribué HDFS + orchestration YARN
- **Hadoop Streaming** — Exécution des jobs MapReduce en Python 3.5
- **PySpark 2.4.8** — MLlib pour l'apprentissage automatique
- **Docker** — Cluster 5 conteneurs (NameNode, 2 DataNodes, ResourceManager, NodeManager)

### Machine Learning
- **RandomForestClassifier** — 50 arbres, profondeur 5, 6 features
- **DecisionTreeClassifier** — Profondeur 8 (comparaison)
- **MLlib Pipeline** — StringIndexer + VectorAssembler + Classifier

### Application Web
- **Next.js 14** — React framework avec App Router
- **TypeScript** — Typage statique
- **Tailwind CSS** — Styling utilitaire
- **Recharts** — Graphiques interactifs

---

## 📁 Structure du projet

```
projet9-webapp/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Dashboard principal
│   │   ├── pipeline/page.tsx     # Pipeline MapReduce
│   │   └── predict/page.tsx      # Prédiction ML
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── DashboardCharts.tsx   # Recharts visualisations
│   │   └── PredictionForm.tsx    # Calculateur temps réel
│   └── lib/
│       └── data.ts               # Données du pipeline
├── package.json
└── README.md
```

---

## ⚙️ Installation locale

```bash
# Cloner le repo
git clone https://github.com/MarouaneLhachmi/projet-prediction-etudiants.git
cd projet-prediction-etudiants

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## 🐳 Pipeline Big Data (Docker)

```bash
# Démarrer le cluster Hadoop
docker compose up -d

# Vérifier les 5 conteneurs
docker ps

# Lancer le pipeline complet
docker exec namenode bash /tmp/pipeline_run.sh
```

---

## 📈 Score de risque — Formule

```
Score = (20 - note_moy)  × 0.40
      + nb_absences       × 0.30
      + participation     × 0.20

Risque Faible  : Score ≤ 6   → Réussi
Risque Moyen   : 6 < Score ≤ 12 → À risque  
Risque Élevé   : Score > 12  → Échec
```

---

## 👨‍🎓 Informations académiques

| | |
|--|--|
| **Étudiant** | Marouane Lhachmi |
| **Filière** | 4ème année IASDT — Data Science & AI |
| **École** | EMSI Tanger |
| **Encadrant** | M. Hassan BADIR |
| **Année** | 2025-2026 |
| **Sujet** | N°9 — Éducation & Learning Analytics |

---

<div align="center">
  <strong>🌐 <a href="https://projet-prediction-etudiants.vercel.app">projet-prediction-etudiants.vercel.app</a></strong>
</div>
