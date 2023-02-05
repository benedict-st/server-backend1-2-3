const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const router = express.Router({ mergeParams: true })
const { check, validationResult } = require('express-validator')
const tokenService = require('../services/token.service')
const { publicDecrypt } = require('crypto')

router.post('/signUp', [
    check('email', 'Неккоректный email').isEmail(),
    check('password', 'Минимальная длинна пароля 8 символов').isLength({
        min: 8,
    }),

    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: 'INVALID_DATA',
                        code: 400,
                    },
                })
            }
            const { email, password } = req.body
            const exitingUser = await User.findOne({ email: email })
            if (exitingUser) {
                return res.status(400).json({
                    error: {
                        message: 'EMAIL_EXISTS',
                        code: 400,
                    },
                })
            }
            const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = await User.create({
                ...req.body,
                email: email,
                address: 'Moskow',
                phone: '9103256833',
                password: hashedPassword,
            })

            const tokens = tokenService.generate({ _id: newUser._id })

            await tokenService.save(newUser._id, tokens.refreshToken)

            res.status(201).send({ ...tokens, userId: newUser._id })
        } catch (e) {
            res.status(400).json({ status: 400, message: e.message })
        }
    },
])
router.post('/signInWithPassword', [
    check('email', 'Не корректный email').normalizeEmail().isEmail(),
    check('password', 'Password не может быть пустым').exists(),

    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: 'INVALID_DATA',
                        code: 400,
                    },
                })
            }
            const { email, password } = req.body
            const existingUser = await User.findOne({ email })

            if (!existingUser) {
                return res.status(400).send({
                    error: {
                        message: 'EMAIL_NOT_FOUND',
                        code: 400,
                    },
                })
            }
            const isPasswordEqual = await bcrypt.compare(
                password,
                existingUser.password
            )
            if (!isPasswordEqual) {
                return res.status(400).send({
                    error: {
                        message: 'INVALID_PASSWORD',
                        code: 400,
                    },
                })
            }

            const tokens = tokenService.generate({ _id: existingUser._id })
            await tokenService.save(existingUser._id, tokens.refreshToken)
            res.status(200).send({ ...tokens, userId: existingUser._id })
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка.Попробуйте позже',
            })
        }
    },
])

function isTokenInvalid(data, dbToken) {
    console.log('data._id', data._id)
    console.log('dbToken?.user?.toString()', dbToken.user.toString())
    return !data || !dbToken || data._id !== dbToken?.user?.toString()
}
router.post('/token', async (req, res) => {
    try {
        const { refresh_token: refreshToken } = req.body
        // console.log('refreshToken', refreshToken)
        const data = tokenService.validateRefresh(refreshToken)
        console.log('data', data)
        const dbToken = await tokenService.findToken(refreshToken)
        console.log('dbToken', dbToken)
        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({
                message: 'Unautorized',
            })
        }
        const tokens = await tokenService.generate({
            _id: data._id,
        })
        await tokenService.save(data._id, tokens.refreshToken)
        res.status(200).send({ ...tokens, userId: data._id })
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка.Попробуйте позже',
        })
    }
})
module.exports = router
