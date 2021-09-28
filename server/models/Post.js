const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    description: String,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'person'
    },
    isValidate: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()    },
    image: {
        type: mongoose.Schema.Types.Mixed
    },
    
    rating:{type: mongoose.Schema.Types.Mixed},
    comment:{type:[ mongoose.Schema.Types.Mixed]},
    name:String
})

module.exports = mongoose.model('post', postSchema)