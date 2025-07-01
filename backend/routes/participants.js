const express = require('express');
const ParticipantController = require('../controllers/participantsController');
const { upload, handleUploadError } = require('../config/upload');

const router = express.Router();

router.post('/', 
    upload.single('photo'),
    handleUploadError,
    ParticipantController.creerParticipant
);

router.get('/', ParticipantController.obtenirParticipants);

router.get('/classement', ParticipantController.obtenirClassement);

module.exports = router;