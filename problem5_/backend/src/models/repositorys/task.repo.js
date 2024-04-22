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

const searchTask = async (searchKey , userId) => {
    try {
        
        const keySearch = searchKey.keysearch
        const regexSearch = new RegExp(keySearch, 'i');
        console.log("searchKey : ", regexSearch);
    return await Task.findAll({
        where: { taskName: searchKey , userId: userId},
        $text: { $search: regexSearch }
    }, { $score: { $meta: 'textScore' } });
    } catch (error) {
console.log("error : " , error);
    }

}
module.exports = { checkExist, findById, findAll, searchTask }