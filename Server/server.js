const express = require("express");
const { authenticateToken } = require("./Middlewares/auth");
const { connectTODB } = require("./Database/database");
const { authRoutes } = require("./Routes/Authentication");



require("dotenv").config();

const app = express();
app.use(express.json());
connectTODB();

app.use('/auth', authenticateToken , authRoutes)

app.listen(process.env.PORT, () => {
  console.log("SERVER IS WORKING AT ", process.env.PORT);
});
