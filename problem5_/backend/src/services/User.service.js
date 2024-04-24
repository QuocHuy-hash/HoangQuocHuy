'use strict'

const { Users } = require("../models")

const findByEmail = async ({ email }) => {
    const attributes = ['id', 'email', 'password', 'firstName', 'lastName'];
    return await Users.findOne({
        where: { email: email },
        attributes: attributes,
    });
}
const findById = async ({ shopId }) => {
    const attributes = ['id', 'email',];
    return await Users.findOne({
        where: { id: shopId },
        attributes: attributes, 
    });
};



module.exports = { findByEmail, findById }