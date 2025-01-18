const express = require('express');
const router = express.Router();
const { getAllForm } = require('../controllers/formController')

router.get('forms', getAllForm)

module.exports = router;