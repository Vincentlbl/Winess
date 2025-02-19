require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Sport App en ligne 🚀');
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
