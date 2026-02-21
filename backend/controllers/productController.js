const cloudinary = require("cloudinary").v2;

const ProductModel = require("../models/productModel")


// function for add Products
const addProduct = async (req,res) =>{
    try{

        const{name,description,price,category,subCategory,sizes,bestseller} = req.body

        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]

  

            const images = [image1, image2, image3, image4]
      .filter((item) => item !== undefined )

       const imageUrls = await Promise.all(
        images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
        return result.secure_url
      })
    );


    
      

        
        const productData = {
            name,
            description,
            price: Number(price),

            category,
            subCategory,
            bestseller: bestseller === "true",
            sizes:JSON.parse(sizes),   // convert string to array
            images: imageUrls,
            date:Date.now()
        }




await ProductModel.create(productData)

        res.json({success: true,
      message: "product added successfully"})
    }catch(err){

        res.json({success:false,message:err.message})

    }
}

// function for list Products
const listProduct = async (req,res) =>{

    try{

        
        const product = await ProductModel.find({})

        res.json({success: true,
      message: 'list of products',product})
    }catch(err){

        res.json({success:false,message:err.message})

    }

}

// function for remove Products
const removeProduct = async (req,res) =>{

    try{

         await ProductModel.findByIdAndDelete(req.params.id)

         res.json({success: true,
      message:"succesfully removed"})

    } catch(err){

        res.json({success:false,message:err.message})

    }

}

// function for single Products
const singleProduct = async (req,res) =>{
    try{

        const {productId}  = req.body

        const product = await ProductModel.findById(productId)

        res.json({success:true,product})

    }catch(err){

        res.json({success:false,message:err.message})

    }

}

module.exports = {
    addProduct,
    listProduct,
    removeProduct,
    singleProduct
}

