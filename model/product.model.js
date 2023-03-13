const mongoose= require("mongoose")

const productSchema= mongoose.Schema({
    product:String,
    title:String,
    product_name:String
})


const ProductModel= mongoose.model("product",productSchema)

module.exports={
    ProductModel
}