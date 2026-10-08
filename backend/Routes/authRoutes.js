const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser,getCurrentUser } = require("../Controllers/authController");
const { registerValidation, loginValidation } = require("../Middlewares/authValidation");
const ensureAuthenticated = require("../Middlewares/ensureAuth");

router.post('/register',registerValidation,registerUser);
router.post('/login',loginValidation,loginUser);
router.post('/logout',ensureAuthenticated,logoutUser);
router.get('/user',ensureAuthenticated,getCurrentUser);

module.exports = router;