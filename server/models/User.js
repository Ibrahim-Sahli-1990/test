const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    image: {
        type: Schema.Types.Mixed
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    friends:{
        type:[mongoose.Types.ObjectId]
    },
    isconnected:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('person', userSchema)