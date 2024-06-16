const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Message } = require("../../Database/Schemas/Message");
const { Chats } = require("../../Database/Schemas/Chat");

const intializeModel = () => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    return model;
  } catch (error) {
    console.log(error);
  }
};

const generateContent = async (req, res) => {
  try {
    const { prompt, userId, chatId } = req.body;
    const model = intializeModel();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const message = new Message({
      content: text,
      ownerId: userId,
      chatId: chatId,
    });
    await message.save();

    const chat = await Chats.findById(chatId);
    if (!chat) {
      return res.status(200).json({
        message: "Chat Not Found",
      });
    }
    console.log(chat);
    chat.messages.push(message._id);
    await chat.save();
    return res.status(200).json({
      data: message,
    });
  } catch (error) {
    console.error(error);
  }
};

const getMessages = async (req, res) => {
    const {userId, chatId} = req.body
    const chat = await Chats.findById(chatId).populate('messages')
    console.log(chat)
    if(chat){
        return res.status(200).json({
            data : chat
        })
    }
    return res.status(200).json({
        message : "Chat Not Found"
    })
};

const deleteMessage = async (req, res) => {
  const { messageId, userId, chatId } = req.body;
  const messageExist = await Message.findOneAndDelete(messageId);
  if (messageExist) {
    const chat = await Chats.findById(chatId);
    if (chat) {
      chat.messages.pull(messageId);
      await chat.save();
      return res.status(200).json({
        message: "Message Deleted SucessFully",
      });
    }
    return res.status(200).json({
      message: "Message Not Exist, It's either deleted or not sended",
    });
  }
  return res.status(200).json({
    message: "Message Not Exist, It's either deleted or not sended",
  });
};

const updateMessage = async (req, res) => {
  const { messageId, prompt } = req.body;
  const model = intializeModel();
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const message = await Message.updateOne(
    { _id: messageId },
    { content: text }
  );
  const updatedMessage = await Message.findById(messageId);
  if (message) {
    return res.status(200).json({
      message: "Sucessfully Updated",
      data: updatedMessage,
    });
  }
};

module.exports = { generateContent, deleteMessage, updateMessage, getMessages };
