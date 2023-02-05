const express = require('express')
const Basket = require('../models/Basket')
const auth = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams: true })
router.get('/', auth, async (req, res) => {
    try {
        const list = await Basket.find({ userId: req.user_id })
        res.status(200).json({
            status: 200,
            content: list,
            message: 'Succesfully Basket Retrieved',
        })
    } catch (e) {
        res.status(400).json({ status: 400, message: e.message })
    }
})
router.post('/', async (req, res) => {
    try {
        const newBasket = await Basket.create({
            ...req.body,
            userId: req.user._id,
        })
        res.status(200).json({
            status: 200,
            content: updateBasket,
            message: 'add Basket product',
        })
    } catch (e) {
        res.status(400).json({ status: 400, message: e.message })
    }
})
router.delete('/:productId', auth, async (req, res) => {
    try {
        const { productId } = req.params
        const removedProduct = await Basket.find({ product: productId })
        await removedProduct.remove()
        return res.send(null)
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже',
        })
    }
})
module.exports = router
