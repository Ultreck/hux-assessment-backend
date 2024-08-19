const express = require('express');
const router = express.Router();
router.use(express.json());
const { getContacts, createContact } = require('../controllers/contactController');

// Routes
router.get('/', getContacts);

router.post('/', createContact);

module.exports = router;
