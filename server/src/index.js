const express = require('express');
const app = express();
const { db } = require('./utils/database');

// Autres imports...
const mainRoutes = require('./routes/mainRoutes');

// Middlewares, configurations, etc.

// Utilisation des routes
app.use('/', mainRoutes);

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
