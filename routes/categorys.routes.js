const express = require('express')
const Categorys = require('../models/Categorys')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
    try {
        const list = await Categorys.find()
        res.status(200).json({
            status: 200,
            content: list,
            message: 'Succesfully Categorys Retrieved',
        })
    } catch (e) {
        res.status(400).json({ status: 400, message: e.message })
    }
})

module.exports = router
