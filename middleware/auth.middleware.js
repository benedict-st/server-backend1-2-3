const tokenService = require('../services/token.service')
module.exports = (req, res, next) => {
    if (req.method === 'OPTION') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        if (!token) {
            return res.status(401).json({ message: 'Unautorized' })
        }
        const data = tokenService.validateAccess(token)
        console.log('Decoder', data)
        if (!data) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        req.user = data
        next()
    } catch (e) {
        return res.status(401).json({ message: 'Unautorized' })
    }
}
