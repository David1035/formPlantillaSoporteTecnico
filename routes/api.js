const express = require('express');
const router = express.Router();
const { getAllForm, createForm, getFormById, updateForm, deleteForm, searchDocumentoForm, searchIdLlamadaForm } = require('../controllers/formController');

router.get('/forms', getAllForm)
router.post('/forms', createForm)
router.get('/forms/:id', getFormById)
router.put('/forms/:id', updateForm)
router.delete('/forms/:id', deleteForm)
router.get('/forms/documento/:documentoIdentidad', searchDocumentoForm)
router.get('/forms/llamada/:idLlamada', searchIdLlamadaForm)

module.exports = router;