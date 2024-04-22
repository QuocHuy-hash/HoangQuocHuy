

const express = require('express');

const router = express.Router();


router.use('/v1/api/', require('./access/index'));
router.use('/v1/api/task', require('./tasks/index'));

module.exports = router;