 const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema({
    description: String,
    between: {
        type:[mongoose.Types.ObjectId]
    ,ref:'person'
        
    },
    createdAt: {
        type: Date,
        default: Date.now()    },

     message:{
        type: [mongoose.Schema.Types.Mixed] 

     }    
})

module.exports = mongoose.model('conversation', conversationSchema) 