const { Schema, model, ObjectId } = require('mongoose')
const schema = new Schema(
    {
        _id: { type: String, required: true },
        name: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
        },
        category: { type: Schema.Types.ObjectId, ref: 'Categorys' },
        price: {
            type: Number,
        },
        sale: {
            type: Boolean,
        },
        shelfLife: {
            type: String,
        },
        weight: {
            type: String,
        },
    },
    { timestamps: true }
)

module.exports = model('Products', schema)
