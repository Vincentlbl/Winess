import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js'; 

const app = express();
app.use(cors());
app.use(express.json()); 

const port = process.env.PORT || 3000;


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

app.put('/api/utilisateurs/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, mot_de_passe, age, poids, taille, imc_calculé, objectif } = req.body;

  try {
    const result = await db.query(
      `UPDATE utilisateur 
       SET nom = $1, prenom = $2, email = $3, mot_de_passe = $4, age = $5, poids = $6, taille = $7, imc_calculé = $8, objectif = $9
       WHERE user_id = $10 RETURNING *`,
      [nom, prenom, email, mot_de_passe, age, poids, taille, imc_calculé, objectif, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete('/api/utilisateurs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      'DELETE FROM utilisateur WHERE user_id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ message: 'Utilisateur supprimé', utilisateur: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.listen(port, () => {
  console.log(`Serveur API lancé sur http://localhost:${port}`);
});
