const mongoose = require("mongoose");

const DBconnect = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DB connected");
    });

    await mongoose.connect(`${process.env.MONGODB_URL}/at_db`);
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
};

module.exports = DBconnect;
