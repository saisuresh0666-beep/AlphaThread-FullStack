const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // You MUST create this 'uploads' folder in your backend directory
    callback(null, 'upload/'); 
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });
module.exports = upload;