const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer = require("multer");
const path=require("path");
const cors=require("cors");
const { request } = require("http");
const { User } = require("phosphor-react");
const { emit } = require("process");

app.use(express.json());
app.use(cors());

//Database connection with MongoDB 

mongoose.connect("mongodb+srv://pragyanprotim:23032004@cluster0.isj6h.mongodb.net/");


//API ENDPOINT CREATION

app.get("/",(request,response)=>{
    response.send("Express App is Running");
});

//Imgae Storage Engine
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage})

//creating uploading endpoint for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`https://localhost:${port}/images/${req.file.filename}`
    })
});

//Schema for creating products
const Products = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})

app.post('/addproduct',async(req,res)=>{
    let products = await Products.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id=last_product.id+1;
    }
    else 
    {
        id=1;
    }
    const product = new Products({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})
//creating API for deleting products
app.post('/removeproduct',async(req,res) => {
    await Products.findOneAndDelete({id:req.body.id});
    console.log("Remove");
    res.json({
        success:true,
        name:req.body.name,
    })
})

app.get('/allproducts',async(req,res)=>{
    let products = await Products.find({});
    console.log("All Products Fetched");
    res.send(products);
})

//Schema for user model

const Users=mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:
    {
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    },
})

//Creating EndPoint for registering the user 

app.post('/signup',async(req,res)=>{
    
    let check = await Users.findOne({email:req.body.email});
    if(check)
    {
        return res.status(400).json({success:false,error:"existing user found with same email address"})
    }
    let cart={};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const user=new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

//creating endpoint for user login 
app.post('/login',async(req,res)=>{

    let user = await Users.findOne({email:req.body.email});
    if (user){
        const passCompare = req.body.password === user.password; 
        if (passCompare) {
            const data={
                users:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else 
        {
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else
    {
        res.json({success:false,errors:"Wrong E-Mail ID"});
    }
})

//  creating middleware to fetch user
    const fetchUser = async (req,res,next) =>{
        const token = req.header('auth-token');
        if (!token) {
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
        else
        {
            try {
                const data=jwt.verify(token,'secret_ecom');
                req.user = data.user;
                next();                
            } catch (error) 
            {
                res.status(401).send({errors:"Please authenticate using a valid token"})
            }
        }
    }

//creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log(req.body,req.user);
})

app.listen(port,(error)=>{
    if(!error)
    {
        console.log("Server Running on Port"+port);
    }
    else 
    {
        console.log("Error Connecting :"+error);
    }
});
