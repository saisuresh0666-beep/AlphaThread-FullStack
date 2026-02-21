const express = require("express")

const {
  loginUser,
  registerUser,
  adminLogin,getUserProfile,updateUserProfile
} = require("../controllers/userController");
const authUser = require("../middleware/auth");


const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get("/profile",(req, res, next) => { req.body = {}; next(); },authUser,getUserProfile);
userRouter.post('/profile', authUser, updateUserProfile)




module.exports = userRouter
