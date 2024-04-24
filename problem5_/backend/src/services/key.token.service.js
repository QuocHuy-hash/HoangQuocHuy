const { KeyToken } = require('../models');

const KeyTokenService = async ({ userId, publicKey, privateKey, refreshToken }) => {
    try {
        console.log(" userId", userId);
        let token = await KeyToken.findOne({ where: { userId } });

        if (token) {
            token.publicKey = publicKey;
            token.privateKey = privateKey;
            token.refreshToken = refreshToken;
            token.refreshTokenUsed = []; 
            await token.save();
        } else {
            token = await KeyToken.create({
                userId,
                publicKey,
                privateKey,
                refreshToken,
            });
        }

        return token ? token.publicKey : null;
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }
};
const findByUserId = async (userId) => {
    return await KeyToken.findOne({ where: { userId : userId} });
}
const removeKeyById = async (id) => {
    return await KeyToken.destroy({ where: { id } });
}


const updateRefreshToken = async (refreshToken, refreshTokenUsed) => {
    const token = await KeyToken.findOne({ where: { refreshToken: refreshTokenUsed } });
    console.log("totken", token);
    if (token) {
        await token.update({
            refreshToken,
            $addToSet: {
                refreshTokensUsed: refreshTokenUsed // Already used to obtain a new token
            }
        });
    }

    console.log('check token result', token, refreshTokenUsed);
}
module.exports = {
    KeyTokenService,
    findByUserId,
    removeKeyById,
    updateRefreshToken

};