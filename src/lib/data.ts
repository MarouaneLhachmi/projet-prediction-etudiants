// src/lib/data.ts — données complètes pipeline + ML v2

export const STATS = {
  total:    1200,
  reussi:   710,
  aRisque:  436,
  echec:    54,
  noteMoy:  12.5,
  absMoy:   8.2,
  accuracyRF: 96.05,
  accuracyDT: 91.30,
};

export const FILIERE_DATA = [
  { filiere: "BIGDATA", Reussi: 89,  A_risque: 54,  Echec: 8  },
  { filiere: "GINF",    Reussi: 148, A_risque: 92,  Echec: 11 },
  { filiere: "GI",      Reussi: 147, A_risque: 90,  Echec: 12 },
  { filiere: "IASDT",   Reussi: 165, A_risque: 103, Echec: 12 },
  { filiere: "IIRT",    Reussi: 161, A_risque: 97,  Echec: 11 },
];

export const SEMESTRE_DATA = [
  { semestre: "S1", taux: 57 },
  { semestre: "S2", taux: 60 },
  { semestre: "S3", taux: 59 },
  { semestre: "S4", taux: 62 },
  { semestre: "S5", taux: 58 },
  { semestre: "S6", taux: 61 },
];

export const SCORE_DIST = [
  { range: "0-2",   count: 45,  zone: "faible" },
  { range: "2-4",   count: 98,  zone: "faible" },
  { range: "4-6",   count: 567, zone: "faible" },
  { range: "6-8",   count: 213, zone: "moyen"  },
  { range: "8-10",  count: 142, zone: "moyen"  },
  { range: "10-12", count: 81,  zone: "moyen"  },
  { range: "12-14", count: 34,  zone: "eleve"  },
  { range: "14-16", count: 16,  zone: "eleve"  },
  { range: ">16",   count: 4,   zone: "eleve"  },
];

export const TOP10_RISQUE = [
  { id: "E0681", filiere: "IIRT",    score: 15.49, note: 3.2,  absences: 28 },
  { id: "E0730", filiere: "GINF",    score: 15.21, note: 2.8,  absences: 27 },
  { id: "E0505", filiere: "IASDT",   score: 15.17, note: 3.5,  absences: 26 },
  { id: "E0113", filiere: "GI",      score: 15.05, note: 4.1,  absences: 25 },
  { id: "E0783", filiere: "BIGDATA", score: 14.48, note: 4.8,  absences: 24 },
  { id: "E1064", filiere: "IIRT",    score: 14.36, note: 5.2,  absences: 23 },
  { id: "E0947", filiere: "GINF",    score: 14.29, note: 5.5,  absences: 22 },
  { id: "E0375", filiere: "IASDT",   score: 14.22, note: 5.8,  absences: 21 },
  { id: "E0666", filiere: "GI",      score: 14.12, note: 5.9,  absences: 21 },
  { id: "E1028", filiere: "IIRT",    score: 14.11, note: 6.1,  absences: 20 },
];

export const JOBS = [
  { num: 1, nom: "Nettoyage massif",    desc: "Suppression des NaN, normalisation des filières et formats",           entree: "/projet9/raw/",            sortie: "/projet9/clean/job1_out",    input: 1200, output: 1200, reducers: 2 },
  { num: 2, nom: "Agrégation filière",  desc: "Comptage par combinaison filière × semestre × statut",                entree: "/projet9/clean/job1_out",  sortie: "/projet9/results/job2_out",  input: 1200, output: 88,   reducers: 2 },
  { num: 3, nom: "Score de risque",     desc: "Score = (20-note)×0.4 + absences×0.3 + participation×0.2",           entree: "/projet9/clean/job1_out",  sortie: "/projet9/results/job3_out",  input: 1200, output: 1200, reducers: 2 },
  { num: 4, nom: "Détection anomalies", desc: "Alerte si score > seuil historique × 1.5",                            entree: "/projet9/results/job3_out",sortie: "/projet9/results/job4_out",  input: 1200, output: 1200, reducers: 2 },
  { num: 5, nom: "Classement à risque", desc: "Top 10 par catégorie trié par score décroissant",                     entree: "/projet9/results/job4_out",sortie: "/projet9/results/job5_out",  input: 487,  output: 20,   reducers: 1 },
];

// ── ML v2 : 6 features ──────────────────────────────────────────
export const FEATURE_IMPORTANCE = [
  { feature: "note_moy",      importance: 48.21, color: "#C0392B" },
  { feature: "nb_absences",   importance: 29.34, color: "#E05A4B" },
  { feature: "participation", importance: 11.03, color: "#F4B942" },
  { feature: "filiere",       importance: 6.12,  color: "#2E75B6" },
  { feature: "semestre",      importance: 3.41,  color: "#3B6D11" },
  { feature: "age",           importance: 1.89,  color: "#888780" },
];

export const MODEL_COMPARISON = [
  { model: "Random Forest", accuracy: 96.05, trees: "50 arbres · profondeur 5", color: "#1F3864" },
  { model: "Decision Tree",  accuracy: 91.30, trees: "profondeur 8",             color: "#2E75B6" },
];

// Matrice de confusion RF : lignes = réel, colonnes = prédit
// ordre : A_risque, Echec, Reussi
export const CONFUSION_LABELS = ["A_risque", "Echec", "Réussi"];
export const CONFUSION_MATRIX = [
  [208,  2, 18],
  [  3, 46,  3],
  [ 10,  1, 339],
];
