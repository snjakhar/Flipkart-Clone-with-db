const express=require("express")

const app=express()

app.use(express.json())

const electronicsController=require("./controllers/electronics.controller")

const {register,login}=require("./controllers/auth.controller")


app.post("/register",register)

app.post("/login",login)

app.use("/electronics",electronicsController);

module.exports=app