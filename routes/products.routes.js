const express = require('express')
const Products = require('../models/Products')
const router = express.Router({ mergeParams: true })
router.get('/', async (req, res) => {
    try {
        const list = await Products.find()
        res.status(200).json({
            status: 200,
            content: list,
            message: 'Succesfully Products Retrieved',
        })
    } catch (e) {
        res.status(400).json({ status: 400, message: e.message })
    }
})
router.get('/:productId', async (req, res) => {
    try {
        const { productId } = req.params
        console.log('productId', productId)
        const list = await Products.findById(productId)
        res.status(200).json({
            status: 200,
            content: list,
            message: 'Succesfully Products Retrieved',
        })
    } catch (e) {
        res.status(400).json({ status: 400, message: e.message })
    }
})
module.exports = router
