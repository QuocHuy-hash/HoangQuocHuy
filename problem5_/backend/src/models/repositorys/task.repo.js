const { Task, Users, sequelize} = require("../../models");

const checkExist = async (taskName, userId ) => {
    return await Task.findOne({
        where: { taskName: taskName, userId: userId }
    });
}
const findById = async (id) => {
    return await Task.findOne({
        where: { id: id }
    });
}
const findAll = async (where ,attributes , limit ,skip) => {
    return await Task.findAll({
        ...where,
        attributes: attributes,
        include: [{model: Users, attributes: ['email', ]}],
        order: [['updatedAt', 'DESC']],
        offset: skip,
        limit: limit,
        nest: true,
        raw: true
    });
}

module.exports = { checkExist, findById, findAll }