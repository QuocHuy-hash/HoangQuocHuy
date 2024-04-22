
const express = require('express');
const router = express.Router();
const { asyncHandle } = require('../../auth/checkauth');
const taskController = require('../../controller/task.controller');
const { authentication } = require('../../auth/authUtils');


router.use(authentication)
router.post('/create', asyncHandle(taskController.createTask));
router.post('/update', asyncHandle(taskController.updateTask));
router.post('/delete', asyncHandle(taskController.delTask));
router.get('/getByUser', asyncHandle(taskController.getListByUser));
router.get('/all', asyncHandle(taskController.getAll));
router.get('/search/:keysearch', asyncHandle(taskController.searchTaskSelf)); 



module.exports = router;
