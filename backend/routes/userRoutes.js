const express=require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userController');
//const { protect } = require('../middleware/authMidlleware');
const { protect } = require('../middleware/authMidlleware');
const router=express.Router();
router.route('/').post(registerUser);
router.route('/').get(protect,allUsers);
router.route('/login').post(authUser);
module.exports=router;