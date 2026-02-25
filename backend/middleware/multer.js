// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     // You MUST create this 'uploads' folder in your backend directory
//     callback(null,file.filename); 
//   },

// });

// const upload = multer({ storage });
// module.exports = upload;


const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ 
  storage
});

module.exports = upload;