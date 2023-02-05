const jwt = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/Token')
class TokenService {
    generate(payload) {
        console.log('payload', payload)
        const accessToken = jwt.sign(payload, config.get('accessSecret'), {
            expiresIn: '1h',
        })
        const refreshToken = jwt.sign(payload, config.get('refreshSecret'))
        return {
            accessToken,
            refreshToken,
            expiresIn: 3600,
        }
    }
    async save(user, refreshToken) {
        const data = await Token.findOne({ user: user })
        if (data) {
            data.refreshToken = refreshToken
            return data.save()
        }
        const token = await Token.create({ user, refreshToken })
        return token
    }
    validateRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, config.get('refreshSecret'))
        } catch (e) {
            null
        }
    }
    validateAccess(accessToken) {
        try {
            return jwt.verify(accessToken, config.get('accessSecret'))
        } catch (e) {
            null
        }
    }
    async findToken(refreshTokin) {
        try {
            return await Token.findOne({ refreshTokin })
        } catch (e) {
            return null
        }
    }
}

module.exports = new TokenService()
