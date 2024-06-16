const express = require("express");
const {
  generateContent,
  deleteMessage,
  updateMessage,
  getMessages,
} = require("../../Services/Messages");

const MessagesRoutes = express.Router();

MessagesRoutes.get("/getAll", getMessages)
  .post("/generateText", generateContent)
  .delete("/delete", deleteMessage)
  .put("/update", updateMessage);

module.exports = { MessagesRoutes };
