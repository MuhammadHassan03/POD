const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    ownerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    chatId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Chat',
        required : true,
    },
    dateCreated : {
        type : Date,
        default : Date.now,
    }
})

const Message = mongoose.model('Messages', MessageSchema)

module.exports = {Message}