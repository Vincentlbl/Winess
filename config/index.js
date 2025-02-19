const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json()); // Pour lire le JSON dans les requêtes POST

const port = process.env.PORT || 3000;

// Route test API
app.get('/', (req, res) => {
  res.send('API SportApp connectée à PostgreSQL 🚀');
});

// GET : Récupérer tous les utilisateurs
app.get('/api/utilisateurs', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM utilisateur');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST : Ajouter un utilisateur
app.post('/api/utilisateurs', async (req, res) => {
  const { nom, prenom, email, mot_de_passe, age, poids, taille, imc_calculé, objectif } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, age, poids, taille, imc_calculé, objectif)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [nom, prenom, email, mot_de_passe, age, poids, taille, imc_calculé, objectif]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Serveur API lancé sur http://localhost:${port}`);
});
