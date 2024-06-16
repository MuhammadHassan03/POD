const { Chats } = require("../../Database/Schemas/Chat")


const getChats = async (req, res) => {
    const { userId } = req.body;
    const chats = await Chats.find({ownerId : userId})
    res.status(200).json({
        message : "Found Chats",
        chats : chats,
    })
}

const getChatwithID = (req, res) => {

}

const createChat = async (req, res) => {
    const { userId, chatName } = req.body;
    const isExisted = await Chats.findOne({
        chatName : chatName,
        ownerId : userId,
    })
    console.log(isExisted)
    if(isExisted){
        return res.status(200).send({
            message : "Chat Already Exist with Same Name"
        })
    }
    const chat = new Chats({
        chatName : chatName,
        ownerId : userId,
    })
    await chat.save()
    return res.status(200).send({
        message : "Chat Created SucessFully",
        data : chat,
    })
}

const DeleteChat = (req, res) => {

}

const UpdateChat = (req, res) => {

}

module.exports = {getChats, getChatwithID, createChat, DeleteChat, UpdateChat}