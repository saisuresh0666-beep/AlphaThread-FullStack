
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

// const placeOrderStripe = async (req,res) => {

//   try {

//     const {userId,items,amount,address} = req.body
//     const {origin} = req.headers

//     const line_items = items.map((item) => ({
//       price_data:{
//         currency: currency,
//         product_data:{
//           name: item.name
//         },
//         unit_amount: item.price * 100
//       },
//       quantity: item.quantity
//     }))

//     line_items.push({
//       price_data:{
//         currency: currency,
//         product_data:{
//           name:"Delivery Fee"
//         },
//         unit_amount: amount > 0 ? DeliveryFee * 100 : 0
//       },
//       quantity:1
//     })

//     // Create Stripe session first
//     const session = await stripe.checkout.sessions.create({
//       success_url: `${origin}/verify?success=true`,
//       cancel_url: `${origin}/verify?success=false`,
//       line_items,
//       mode:"payment"
//     })

//     // Create order AFTER session creation
//     const orderData = {
//       userId,
//       items,
//       address,
//       amount,
//       PaymentMethod:'Stripe',
//       payment:false,
//       stripeSessionId: session.id,
//       date:Date.now()
//     }

//     const newOrder = new orderModel(orderData)
//     await newOrder.save()

//     res.json({
//       success:true,
//       session_url: session.url
//     })

//   } catch (error) {

//     console.log(error)

//     res.json({
//       success:false,
//       message:error.message
//     })

//   }
// }

// verify Stripe

// const verifyStripe = async (req,res)=>{

//     const {orderId,success,userId} = req.body

//     try { 

//         if(success === true || success === 'true'){

//             await orderModel.findByIdAndUpdate(orderId,{payment:true})

//             await userModel.findByIdAndUpdate(userId,{cartData:{}})

//             res.json({
//                 success:true,
//                 message:"Payment Successful"
//             })

//         }else{

//             await orderModel.findByIdAndDelete(orderId)

//             res.json({
//                 success:false,
//                 message:"Payment Cancelled"
//             })
//         }

//     } catch (error) {

//         console.log(error)

//         res.json({
//             success:false,
//             message:error.message
//         })
        
//     }
// }



// Placing order using razor pay method

const placeOrderRazorpay = async (req,res) => {

  try {

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: "receipt_" + Date.now()
    }

    const order = await razorpayInstance.orders.create(options)

    res.json({
      success:true,
      order
    })

  } catch (error) {

    console.log(error)

    res.json({
      success:false,
      message:error.message
    })
  }

}



const verifyRazorpay = async (req,res) => {

  try {

    const { razorpay_order_id, userId, items, amount, address } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

    if(orderInfo.status === "paid"){

      const orderData = {
        userId,
        items,
        address,
        amount,
        PaymentMethod:'Razorpay',
        payment:true,
        date:Date.now()
      }

      await orderModel.create(orderData)

      await userModel.findByIdAndUpdate(userId,{cartData:{}})

      res.json({
        success:true,
        message:"Payment Successful"
      })

    }else{

      res.json({
        success:false,
        message:"Payment Failed"
      })

    }

  } catch (error) {

    console.log(error)

    res.json({
      success:false,
      message:error.message
    })
  }

}


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
   
    allOrders,
    userOrders,
    updateStatus,
    
    verifyRazorpay
}