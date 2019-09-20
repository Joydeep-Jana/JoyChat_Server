const express = require('express');
const router = require('express-promise-router')();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Passport = require('passport');
const PassportConf = require('../passport');
const {validateBody, schemas} = require('../helpers/authentication');

const UsersController = new (require('../controllers/users'))();

//routes
router.route('/signup').post(validateBody(schemas.signUpAuthSchema), UsersController.signUp.bind(UsersController));
router.route('/signin').post(validateBody(schemas.signInAuthSchema), Passport.authenticate("local", {session: false}), UsersController.signIn.bind(UsersController));
router.route('/secret').get(Passport.authenticate('jwt', {session: false}), UsersController.secret);

//exports
module.exports = router;