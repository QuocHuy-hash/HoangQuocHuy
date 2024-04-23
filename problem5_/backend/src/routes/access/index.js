
const express = require('express');
const router = express.Router();
const { asyncHandle } = require('../../auth/checkauth');
const accessController = require('../../controller/access.controller');
const { authentication } = require('../../auth/authUtils');

router.post('/user/signup', asyncHandle(accessController.signUp));
router.post('/user/login', asyncHandle(accessController.login));

router.use(authentication)
router.post('/user/logout', asyncHandle(accessController.logout));




module.exports = router;
