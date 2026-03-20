const express = require("express")
const authUser = require("../middleware/auth");
const { addWishlist, getWishlist, removeWishlist } = require("../controllers/wishlistController");

const wishlistRouter = express.Router()

wishlistRouter.post("/add",authUser,addWishlist);
wishlistRouter.get("/get", authUser, getWishlist);
wishlistRouter.delete("/remove",authUser,removeWishlist);

module.exports = wishlistRouter

