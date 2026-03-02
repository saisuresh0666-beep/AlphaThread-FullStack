const validator = require("validator")
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })

}

// Route for user login
const loginUser = async (req, res) => {
  try{
     
    const {email,password} = req.body

    const user = await userModel.findOne({email});

    if(!user){
      res.json({ success: false, message: "Invalid credentials" });

    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
      res.json(({ success: false, message: "Invalid credentials" }))
    }

    const token = createToken(user._id)

         res.json({
      success: true,
      message: "Login successful",
      token
    });

  }catch(err){
     console.log(err)
   res.json({ success:false, message: err.message })
  }
};

// Route for user register
const registerUser = async (req, res) => {
 try{
  const {name,email,password} = req.body;

  // checking user already exist or not

const exist = await userModel.findOne({ email })


  if(exist){
    return res.json({success:false,message:"user already exist"})
  }

  // validating email format & strong password

if(!validator.isEmail(email)){

return res.json({success:false,message:"please enter a valid email"})

}
if(password.length<8){

return res.json({success:false,message:"please enter a strong password"})

}

// hashing user password


const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt)



const user = await userModel.create({
  name,
  email,
  password:hashedPassword

})

const token = createToken(user._id)

res.json({success:true,token})

 }catch(err){
   console.log(err)
   res.json({ success:false, message: err.message })

 }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
  {
    email: email,
    role: "admin"
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);


      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};


// user profile view


const getUserProfile = async (req, res) => {
    try {
        // Access it from req directly
        
        const userId = req.body.userId; 
       
        
        const userData = await userModel.findById(userId).select('-password');

        
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, userData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


// Add this to userController.js
const updateUserProfile = async (req, res) => {
    try {
        const { userId, name, address } = req.body;

        if (!name) {
            return res.json({ success: false, message: "Name is required" });
        }

        // Updates the name and the nested address object
        await userModel.findByIdAndUpdate(userId, { name, address });

        res.json({ success: true, message: "Profile Updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}





module.exports = {
  loginUser,
  registerUser,
  adminLogin,
  getUserProfile,updateUserProfile
};
