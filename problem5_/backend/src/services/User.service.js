'use strict'

const { Users } = require("../models")

const findByEmail = async ({ email }) => {
    // Specify the attributes you want to retrieve
    const attributes = ['id', 'email', 'password', 'firstName', 'lastName'];
    // Use the attributes in the findOne query
    return await Users.findOne({
        where: { email: email },
        attributes: attributes, // Only select the specified attributes
    });
}
const findById = async ({ shopId }) => {
    // Specify the attributes you want to retrieve
    const attributes = ['id', 'email',];
    // Use the attributes in the findOne query
    return await Users.findOne({
        where: { id: shopId },
        attributes: attributes, // Only select the specified attributes
    });
};



module.exports = { findByEmail, findById }