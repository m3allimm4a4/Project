const express = require('express');

const { deleteMe, updateMe } = require('../controllers/userController');
const { signup, signin, updatePassword } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddlewares');
const { getMe } = require('../middlewares/userMiddlewares');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

// Protect all routes below
router.use(protect);

router.patch('/update-password', updatePassword);

router.get('/me', getMe);

router.patch('/update-me', updateMe);
router.delete('/delete-me', deleteMe);

module.exports = router;
