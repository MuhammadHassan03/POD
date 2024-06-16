const express = require("express");
const {
  getChats,
  getChatwithID,
  createChat,
  DeleteChat,
  UpdateChat,
} = require("../../Services/Chats");

const ChatRoutes = express.Router();

ChatRoutes.get("/listallchats", getChats)
  .get("/findchatwithId", getChatwithID)
  .post("/create", createChat)
  .delete("/remove", DeleteChat)
  .put("/update", UpdateChat);

module.exports = { ChatRoutes };
