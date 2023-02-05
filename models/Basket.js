const { Schema, model } = require('mongoose')
const schema = new Schema(
    {
        quantity: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
        },
        product: { type: Schema.Types.ObjectId, ref: 'Products' },
        sum: {
            type: Number,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
)

module.exports = model('Basket', schema)
