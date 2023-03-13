const express= require("express")
const {UserModel}= require("../model/user.model")
// const {authentication}= require("../middleware/authorisation")
const {Blacklist}= require("../config/Blacklist")
const { ProductModel } = require("../model/product.model")
const { authentication } = require("../middleware/authentication")
const { authorise } = require("../middleware/authorise")

const productRouter= express.Router()





productRouter.get("/",authentication,async(req,res)=>{
    try{
        const data= await ProductModel.find()
        // res.send(data)
        res.send(data)
    }catch(err){
        // res.send("unauthorized")
        res.send({ msg: 'unauthorized', error: err.message });
    } 
})


productRouter.post("/addproducts",authorise(["seller"]),async(req,res)=>{
    let post= req.body;
    try{
        const product= new ProductModel(post)
        await product.save()
        res.send("New product has been added")
    }catch(err){
        res.send({"msg":"something went wrong","error":err.message})
    }
})

productRouter.delete("/deleteproducts/:id",authorise(["seller"]),async(req,res)=>{
    let id= req.params.id;
    // const role= req.user.role
    console.log(req.user.role)
    try{
        await ProductModel.findByIdAndDelete({"_id":id})
        res.send(`Delete the user whose id is${id}`)
    }catch(err){

    }
})

  
module.exports={
    productRouter
}