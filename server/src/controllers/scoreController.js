const Scores = require('../models/scoreModel');

exports.postScore = async (req, res) => {
  const { name, points } = req.body;
    try {
        const score = await Scores.create({ name, points });
        res.status(201).json(score);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
};

exports.getAllScores = async (req, res) => {
    try {
      //const scores = await Score.find();
      const scores = await Scores.find();
      res.status(200).json(scores);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  };

  
exports.deleteAllScores = async (req, res) => {
    try {
      await Scores.deleteMany();
      res.status(200).send('Scores supprimés');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
};