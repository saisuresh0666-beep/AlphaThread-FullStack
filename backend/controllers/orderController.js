
require("dotenv").config();
const orderModel =require("../models/orderModel.js");
const userModel = require("../models/userModel");
const Stripe = require('stripe')
const razorpay = require('razorpay')


// global varibles

const currency = 'inr'
const DeliveryFee = 10



// gateway initialize
const razorpayInstance = new razorpay({key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
 })

const  stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// Placing order using COD

const placeOrder = async (req,res) => {

    try{
        const {userId,items,amount,address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            PaymentMethod:'COD',
            payment:false,
            date:Date.now()
        }


const newOrder = new orderModel(orderData)

await newOrder.save()

await userModel.findByIdAndUpdate(userId,{cartData:{}})

res.json({success:true,message:"Order Placed"});


    }catch(err){

        console.log(err)
        res.json({success:false,message:err.message});

    }
    
}



// Placing order using stripe method

const placeOrderStripe = async (req,res) => {

    try {

        const {userId,items,amount,address} = req.body;

        const {origin} = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            PaymentMethod:'Stripe',
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)

        await newOrder.save()

        const line_items = items.map((item) => ({
    price_data: {
        currency: currency, // Ensure 'currency' is defined (e.g., 'usd')
        product_data: {
            name: item.name
        },
        // Multiply by 100 to convert to cents
        unit_amount: item.price * 100 
    },
    quantity: item.quantity
}))

line_items.push({
    price_data: {
        currency: currency,
        product_data: {
            name: "Delivery Fee"
        },
        // Use your actual delivery fee variable * 100
        unit_amount: amount > 0 ? DeliveryFee * 100 : 0 
    },
    quantity: 1
})

        const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderID=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderID=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
res.json({success:true,session_url:session.url});
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message});
        
    }

    

}

// verify Stripe

const verifyStripe = async (req,res)=>{
    const {orderId,success,userId} = req.body

    try { 

        if(success==='true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true});
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false});
        }
        
    } catch (error) {
        console.log(err)
        res.json({success:false,message:err.message});
        
    }
}



// Placing order using razor pay method

const placeOrderRazorpay = async (req,res) => {
    try {
        const {userId,items,amount,address} = req.body;

        

        const orderData = {
            userId,
            items,
            address,
            amount,
            PaymentMethod:'Razorpay',
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)

        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toLocaleUpperCase(),
            receipt : newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error)
                return res.json({success:false,message:error.message});
            }
            res.json({success:true,order})
        })
        

    } catch (error) {
        console.log(error)
                 res.json({success:false,message:error.message});
        
    }

}

// const verifyRazorpay = async (req,res) =>{
//     try {
//         const {userId,razorpay_order_id} =req.body

//         if(orderInfo.status === 'paid'){
// const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
// await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
// await userModel.findByIdAndUpdate(userId,{cartData:{}})
//  res.json({success:true,message:"Payment Successfull"});
//         }else{
// res.json({success:false,message:"Payment Failed"});
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message});
//     }
// }

const verifyRazorpay = async (req, res) => {
  try {

    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {

      await orderModel.findByIdAndUpdate(
        orderInfo.receipt,
        { payment: true }
      );

      res.json({
        success: true,
        message: "Payment Successful"
      });

    } else {

      res.json({
        success: false,
        message: "Payment Failed"
      });

    }

  } catch (error) {
    console.log("VERIFY ERROR:", error);
    res.json({
      success: false,
      message: error.message
    });
  }
};


// All Orders Data for Admin Panel

const allOrders = async (req,res) => {

    try{

        const orders = await orderModel.find({})
        res.json({success:true,orders})

    }catch(err){
       console.log(err)
        res.json({success:false,message:err.message}); 
    }

}

// User Orders Data for Frontend

const userOrders = async (req,res) => {

    try{
        const{userId} = req.body

        const orders = await orderModel.find({userId})

        res.json({success:true,orders})

    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message});
    }
}

// Update order status from admin Panel

const updateStatus= async (req,res) => {

    try {
        const {orderId,status} = req.body

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message});
        
    }

}


module.exports = {
    placeOrder,
    placeOrderRazorpay,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus,verifyStripe,verifyRazorpay
}