const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/posts_controller');
const passport = require('passport');

router.post('/create',passport.checkAuthentication, post_controller.create);
router.get('/destroy/:id',passport.checkAuthentication, post_controller.destroy); 



module.exports = router;