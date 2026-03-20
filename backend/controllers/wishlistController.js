const wishlistModel =require("../models/WishlistModel.js")

const addWishlist = async (req,res)=>{

 try {
  
    const { userId, productId } = req.body;

    const exists = await wishlistModel.findOne({ userId, productId });

    if (exists) {
      await wishlistModel.deleteOne({ userId, productId });
      return res.json({ status: "removed" });
    }

    await wishlistModel.create({ userId, productId });

    res.json({ status: "added" });

  } catch (err) {
    res.status(500).json(err);
  }
};



const getWishlist = async (req, res) => {
  try {
    const { userId } = req.body;

    const wishlist = await wishlistModel
      .find({ userId })
      .populate("productId");

    console.log("WISHLIST:", wishlist);

    res.json({
      success: true,
      wishlist
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error fetching wishlist"
    });
  }
};



const removeWishlist = async (req,res) => {
     try {
    const { userId, productId } = req.body;

    await wishlistModel.findOneAndDelete({ userId, productId });

    res.json({ message: "Removed from wishlist ❌" });
  } catch (err) {
        console.log(err)
    res.status(500).json(err);
  }

} 

module.exports = {
    addWishlist,
    getWishlist,
    removeWishlist
}

