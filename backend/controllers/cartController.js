const userModel =require("../models/userModel.js")


// add products to user cart

const addToCart = async (req,res) => {
    try{

        const {userId,itemId,size} = req.body
        const userData = await userModel.findById(userId)
        let cartData = userData.cartData || {};

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        userData.cartData = cartData;
        userData.markModified('cartData');
        await userData.save();

        res.json({success:true, message:"Add To Cart"})

    }catch(err){
        console.log(err)

        res.json({success:false, message:err.message})

    }
    
}

// update user cart
const updateCart = async  (req,res) => {
    try{
        const {userId,itemId,size,quantity} = req.body

        const userData = await userModel.findById(userId)
        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        cartData[itemId][size] = quantity
        
        userData.cartData = cartData;
        userData.markModified('cartData');
        await userData.save();

        res.json({success:true, message:"Cart Updated"})

    }catch(err){
        console.log(err)
        res.json({success:false, message:err.message})

    }

}

// get user cart data
const getUserCart = async  (req,res) => {
    try{
        const{userId} = req.body
        const userData = await userModel.findById(userId)
        let cartData = userData.cartData || {};
        res.json({success:true,cartData})

    }catch(err){
        console.log(err)
        res.json({success:false, message:err.message})

    }

}

module.exports = {
    addToCart,
    updateCart,
    getUserCart
}