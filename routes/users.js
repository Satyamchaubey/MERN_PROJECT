const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');


router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.update);
router.get('/satyam',passport.checkAuthentication, usersController.satyam);

router.get('/sign-in',usersController.singIn);
router.get('/sign-up', usersController.singUp);

router.post('/create', usersController.create);
// router.post('/create-session', usersController.createSession);
// router.post('/sign-out', usersController.signOut);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession)

module.exports = router;