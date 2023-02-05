const { Schema, model } = require('mongoose')
const schema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Products',
            required: true,
        },
        favourit: {
            type: Boolean,
        },
        fullname: {
            type: String,
        },
        name: {
            type: String,
        },
        picture: {
            type: String,
        },
        price: {
            type: Number,
        },
        sale: {
            type: Boolean,
        },
        user: {
            type: String,
        },
    },
    { timestamps: true }
)

module.exports = model('Favourit', schema)
