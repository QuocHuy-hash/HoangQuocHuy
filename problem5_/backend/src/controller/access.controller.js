'use strict'

const { CreatedResponse, SuccessResponse } = require("../core/success.response");
const { AccessService, login, logout } = require("../services/Access.service");

const HEADER = {
    CLIENT_ID: 'x-client-id',
};
class AccessController {
    userId = null;
    setUserId(req) {
        this.userId = req.headers[HEADER.CLIENT_ID];
    }
    login = async (req, res, next) => {

        new SuccessResponse({
            message: 'login Success',
            metadata: await login(req.body),
        }).send(res)

    }
    logout = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            metadata: await logout(this.userId),
        }).send(res)
    }
    signUp = async (req, res, next) => {

        new CreatedResponse({
            message: 'Register OK',
            metadata: await AccessService(req.body),
            options: {
                limit: 10
            }
        }).send(res)
    }
}

module.exports = new AccessController();