const express = require('express');
const router = express.Router();

// Autres imports...
const mainController = require('../controllers/mainController');

// Définition des routes
router.get('/', mainController.getHomePage);


module.exports = router;
