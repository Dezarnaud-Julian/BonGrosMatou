const express = require('express');
const app = express();
const { db } = require('./src/utils/database');

// Autres imports...
const mainRoutes = require('./src/routes/mainRoutes');

app.use(express.json());

// Middlewares, configurations, etc.

// Utilisation des routes
app.use('/', mainRoutes);

// index page
app.get('/', function(req, res) {
  res.send('hello world');
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
