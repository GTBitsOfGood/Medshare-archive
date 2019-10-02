const express = require('express');
const router = express.Router();

const userController=require('../controllers/userController');
const user=new userController();

router.post('/login', user.login);
router.post('/register', user.register);

module.exports = router;