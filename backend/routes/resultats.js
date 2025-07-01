const express = require('express');
const ResultatsController = require('../controllers/resultatsController');

const router = express.Router();

router.get('/', ResultatsController.obtenirResultatsReels);

router.post('/', ResultatsController.enregistrerResultatsReels);

router.post('/recalculer', ResultatsController.recalculerScores);

module.exports = router;