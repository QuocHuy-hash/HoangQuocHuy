const { BadRequestError, NotFoundError } = require("../core/error.response");
const { Task, Sequelize } = require("../models");
const { checkExist, findById, findAll ,searchTask} = require("../models/repositorys/task.repo");

const createTask = async (body, userId) => {
        const { taskName, description} = body;
    const exist = await checkExist(taskName, userId );
    if (exist) {
        throw new BadRequestError('Task already exists');
    }
    return await Task.create({ taskName, description, userId });
   
}

const updateTask = async (body, userId) => {

        const { id , taskName, description, status } = body;
        const exist = await findById(id);
        if (!exist) {
            throw new BadRequestError('Task not exists');
        }
        if (exist.taskName === taskName && exist.description === description && exist.status === status) {
            throw new BadRequestError('Task not changed value');
        }
        return await Task.update({ taskName, description, status }, { where: { id: id } });
   
}
const deleteTask = async (body ) => {
    //check
    const { id } = body;
    const exist = await findById(id);
    if(!exist){
        throw new BadRequestError('Task not exists');
    }
    return await Task.destroy({ where: { id: id } });
}
const getListForUser = async (userId) => {
    const where= {where : {userId : userId}};
    const attributes = ['id', 'taskName', 'description', 'status'];
    return await findAll(where , attributes , 10 , 0);
}
const getAllTask = async () => {
    const attributes = ['id', 'taskName', 'description', 'status'];
    return await findAll({}, attributes , 10 , 0);
}

const searchTasks = async (searchKey, userId) => {
    const { keysearch } = searchKey;
    const keySearch = '%' + keysearch + '%'; 
        return await Task.findAll({
            where: {
                taskName: { [Sequelize.Op.like]: keySearch },
                userId: userId
            }
        });
}
module.exports = { createTask, updateTask, deleteTask, getListForUser, getAllTask ,searchTasks}