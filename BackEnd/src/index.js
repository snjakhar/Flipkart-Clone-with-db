
const express=require("express")

const app=express()

app.use(express.json())



app.use(express.static("public"))

const electronicsController=require("./controllers/electronics.controller")

const {register,login}=require("./controllers/auth.controller")


const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true })); 

 app.post('/register', register);




app.post("/login",login)
app.use("/product",electronicsController);

module.exports=app