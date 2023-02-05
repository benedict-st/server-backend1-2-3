const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth.routes'))
router.use('/basket', require('./basket.routes'))
router.use('/categorys', require('./categorys.routes'))
router.use('/comment', require('./comment.routes'))
router.use('/favourit', require('./favourit.routes'))
router.use('/orders', require('./orders.routes'))
router.use('/products', require('./products.routes'))
router.use('/user', require('./user.routes'))
module.exports = router
