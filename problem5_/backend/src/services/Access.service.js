'use strict'
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const { KeyTokenService, removeKeyById, findByUserId } = require('./key.token.service');
const { createTokenPair, verifyJWT } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { findByEmail } = require('./User.service');
const { AuthFailureError, BadRequestError } = require('../core/error.response');


/*
       1 - check email in dbs
       2 - match password
       3 - create AT vs RT and save
       4 - generate tokens
       5 - get data return login
   */
const login = async ({ email, password, refreshToken = null }) => {
    //1.
    const foundUser = await findByEmail({ email });

    if (!foundUser) {
        throw new BadRequestError('Users not registed');
    }
    //2.
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
        throw new AuthFailureError('Authentication error');
    }
    console.log("match", match);

    //3.
    const privateKey = crypto.randomBytes(64).toString('hex');
    const publicKey = crypto.randomBytes(64).toString('hex');

    //4.
    const tokens = await createTokenPair({ userId: foundUser.id, email }, publicKey, privateKey);

    await KeyTokenService({
        userId: foundUser.id,
        refreshToken: tokens.refreshToken,
        privateKey, publicKey
    });

    return {
        shop: { id: foundUser.id, firstName: foundUser.firstName, lastName: foundUser.lastName, email: foundUser.email },
        tokens
    }
}
const AccessService = async (user) => {
    const { email, password, firstName, lastName } = user;

    const passwordHash = await bcrypt.hash(password, 10);

    // Check if the email already exists in the database
    const existingUser = await Users.findOne({ where: { email: email } });

    // If the email already exists, return an error
    if (existingUser) {
        throw new BadRequestError('Error : Users already register');
    }
    const newU = await Users.create({
        email, password: passwordHash, firstName, lastName
    });
    if (newU) {

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const keyStore = await KeyTokenService({
            userId: newU.id,
            publicKey,
            privateKey,
            refreshToken: '111'
        });
        if (!keyStore) {
            return;
        }
        const tokens = await createTokenPair({ userId: newU.id, email }, publicKey, privateKey);
     
        return {
            code: '201',
            metadata: {
                shop: getInfoData({ fileds: ['id', 'email'], object: newU }),
                tokens
            }
        }
    }

};

const logout = async (userId) => {
    console.log("userId", userId);
    const foundKey = await findByUserId( userId );
    if (!foundKey) {
        throw new BadRequestError('Key not found');
    }
    console.log("foundKey", foundKey);
    const deleteKey = await removeKeyById(foundKey.id);
    return deleteKey;
}

module.exports = {
    AccessService,
    login,
    logout,
}