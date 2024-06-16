const express = require("express");
const { authenticateToken } = require("./Middlewares/auth");
const { connectTODB } = require("./Database/database");
const { authRoutes } = require("./Routes/Authentication");
const cors  = require('cors')

const coresOptions = {
  origin : 'http://localhost:3000',
  optionsSucessStatus: 200,
}

require("dotenv").config();

const app = express();
app.use(cors(coresOptions))
app.use(express.json());
connectTODB();

app.use('/auth', authenticateToken , authRoutes)

app.listen(process.env.PORT, () => {
  console.log("SERVER IS WORKING AT ", process.env.PORT);
});
