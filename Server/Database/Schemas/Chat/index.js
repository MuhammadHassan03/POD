const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  chatName: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
  ],
});

const Chats = mongoose.model('Chats', chatSchema)

module.exports = {Chats}