const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/bonGrosMatou';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.db = mongoose.connection;

exports.db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
exports.db.once('open', () => {
  console.log('Connecté à MongoDB');
});