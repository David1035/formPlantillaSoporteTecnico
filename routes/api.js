const express = require('express');
const router = express.Router();
const { getAllForm, createForm, getFormById, updateForm, deleteForm } = require('../controllers/formController');

router.get('/forms', getAllForm)
router.post('/forms', createForm)
router.get('/forms/:id', getFormById)
router.put('/forms/:id', updateForm)
router.delete('/forms/:id', deleteForm)

module.exports = router;