const mongoose = require("mongoose");

const connectTODB = async () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await mongoose.connection;
  db
    ? console.log("Connection TO MONGO Sucecced")
    : console.log("Connection TO MONGO NOT SUCCED");
};

module.exports = { connectTODB };
