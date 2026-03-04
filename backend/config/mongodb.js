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
// const mongoose = require("mongoose");

// const DBconnect = async () => {
//   try {

//     await mongoose.connect(`${process.env.MONGODB_URL}/at_db`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("DB connected");

//   } catch (error) {
//     console.error("DB connection failed:", error.message);
//     process.exit(1); // stop server if DB fails
//   }
// };

// module.exports = DBconnect;