const router = require('express').Router();

const auth = require('../middlewares/auth');
const { validateUpdateProfile } = require('../middlewares/validation');

const { getCurrentUser, updateCurrentUser } = require('../controllers/users');

router.get('/me', auth, getCurrentUser);

router.patch('/me', auth, validateUpdateProfile, updateCurrentUser);

module.exports = router;
