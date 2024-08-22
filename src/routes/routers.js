const express = require('express');
const router = express.Router();
router.use(express.json());
const { getContacts, createContacts, updateContacts, deleteContact, getOnlyOneContact,  } = require('../controllers/contactController');
const authenticateJWT = require('../middlewares/authMiddleware');
const { loginUsers, registerUsers, getUsers } = require('../controllers/authController');
const { blacklistJwtToken, checkBlacklist } = require('../middlewares/logoutMiddleware');

// Routes
router.post('/hux-assessment/api/auth/login', loginUsers);
router.post('/hux-assessment/api/auth/register', registerUsers);
router.get('/hux-assessment/api/auth/get-user', authenticateJWT, getUsers);
router.post('/hux-assessment/api/create-contact', createContacts);
router.get('/hux-assessment/api/get-contact/:id', getContacts);
router.get('/hux-assessment/api/get-only-one-contact/:id', getOnlyOneContact);
router.put('/hux-assessment/api/edit-contact', updateContacts);
router.post('/hux-assessment/api/delete-contact/:id', deleteContact);
router.post('/hux-assessment/api/logout',checkBlacklist, blacklistJwtToken);


module.exports = router;
