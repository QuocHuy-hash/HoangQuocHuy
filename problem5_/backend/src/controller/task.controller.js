'use strict'

const { CreatedResponse, SuccessResponse } = require("../core/success.response");
const { createTask, updateTask, deleteTask, getListForUser, getAllTask, searchTasks } = require("../services/Task.service");

const HEADER = {
    CLIENT_ID: 'x-client-id',
};
class TaskController {
    userId = null;
    setUserId(req) {
        this.userId = req.headers[HEADER.CLIENT_ID];
    }
    createTask = async (req, res, next) => {
       
            this.setUserId(req);
            new SuccessResponse({
                message: 'createTask Success',
                metadata: await createTask(req.body, this.userId),
            }).send(res)
    }
    updateTask = async (req, res, next) => {

        this.setUserId(req);
        new SuccessResponse({
            message: 'updateTask Success',
            metadata: await updateTask(req.body, this.userId),
        }).send(res)
    }
    delTask = async (req, res, next) => {
        new SuccessResponse({
            message: 'deleteTask Success',
            metadata: await deleteTask(req.body,),
        }).send(res)
    }
    getListByUser = async (req, res, next) => {

        this.setUserId(req);
        new SuccessResponse({
            message: 'getListForUser Success',
            metadata: await getListForUser( this.userId),
        }).send(res)
    }
    getAll = async (req, res, next) => {
        new SuccessResponse({
            message: 'getAllTask Success',
            metadata: await getAllTask(),
        }).send(res)
    }
    searchTaskSelf = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            message: 'getAllTask Success',
            metadata: await searchTasks(req.params , this.userId),
        }).send(res)
    }
}

module.exports = new TaskController();