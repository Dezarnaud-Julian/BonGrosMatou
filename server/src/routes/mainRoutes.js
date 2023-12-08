const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

router.post('/scores', scoreController.postScore);
router.get('/scores', scoreController.getAllScores);
router.delete('/scores', scoreController.deleteAllScores);


module.exports = router;
