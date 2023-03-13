const express= require("express")
const { connection } = require("./config/db")
const { authentication } = require("./middleware/authentication")
const {authorise}= require("./middleware/authorise")
const { userrouter } = require("./route/user.route")
const {productRouter}= require("./route/product.route")


require("dotenv").config()
const app= express()
app.use(express.json())
// app.use(cookieParser())

app.get("/",(req,res )=>{
    res.send("HOME PAGE")
})


app.use("/user",userrouter)
app.use(authentication)

app.use("/products",productRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err.message)
    }
    console.log(`server is running at port ${process.env.port}`)

})