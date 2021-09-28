const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = Schema({
    text: String,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'person'
    },
    postid:{
        type: mongoose.Types.ObjectId,
        ref: 'post'
    },
    createdAt: {
        type: Date,
        default: Date.now()    },
    body:{
        type:String
    }    
   
})

module.exports = mongoose.model('comment', commentSchema)