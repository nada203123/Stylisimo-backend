const express = require('express');
const { register,verifyAccount,login,resetPasswordRequest,resetPassword , countUsers,checkEmail} = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);
router.post('/verifyAccount', verifyAccount);
router.post('/login',login);
router.post('/resetPasswordRequest',resetPasswordRequest);
router.post('/resetPassword/:token',resetPassword);
router.get('/countUsers',countUsers)
router.post('/checkEmail',checkEmail)


module.exports = router;