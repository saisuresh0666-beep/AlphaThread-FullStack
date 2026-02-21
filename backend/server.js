const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const DBconnect = require("./config/mongodb.js");
const connectCloudinary = require("./config/cloudinary.js");
const userRouter = require("./routes/userRoute.js");
const ProductRoute = require("./routes/productRoute.js");
const cartRoute = require("./routes/cartRoute.js");
const orderRouter = require("./routes/orderRoute.js");

dotenv.config();       // load .env first
DBconnect();           // connect database
connectCloudinary()
// App config
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use(cors({
  origin: [
    'http://localhost:5173', // frontend
    'http://localhost:5174', // admin panel
  ],
  credentials: true,
}))

// api endpoints
app.use('/api/user',userRouter);

app.use('/api/product',ProductRoute);

app.use('/api/cart',cartRoute);

app.use('/api/order',orderRouter);


app.get('/',(req,res)=>{
 res.send("api is working")
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
