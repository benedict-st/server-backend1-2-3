const { Schema, model } = require('mongoose')
const schema = new Schema(
    {
        comment: {
            type: String,
        },
        pageId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        user: {
            type: String,
        },
        userFio: {
            type: String,
        },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },

    { timestamps: { createdAt: 'created_at' } }
)

module.exports = model('Comment', schema)
