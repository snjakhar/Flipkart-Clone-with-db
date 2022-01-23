const express = require("express");


const Product = require("../models/electronics.model");

const router = express.Router();



router.post("/", async(req,res) =>{
    try{
        const product = await Product.create(req.body);
        return res.status(201).send(product);

    }
    catch(e){
        return res.status(500).send(e.message);
    }
})

router.get("/", async(req,res) =>{
    try{
        const filter = req.query.filter
        const rating = +req.query.rating
        const coustom = +req.query.coustom
        //console.log(filter,rating)
       if(filter=="low")
      {
        const product=await Product.find().sort({price:1}).lean().exec()
        return res.status(200).send(product)
      }
      else if(filter=="high")
      {
        const product=await Product.find().sort({price:-1}).lean().exec()
        return res.status(200).send(product)
      }
//-------------
        if(rating==4)
        {
        const product=await Product.find({"rating":{$gte:5}}).lean().exec()
        return res.status(200).send(product)
        }
        else if(rating==3)
        {
            const product=await Product.find({"rating":{$gte:4}}).lean().exec() 
        return res.status(200).send(product)
        }
//---------------
        if(coustom==30)
        {
        const product=await Product.find({"price":{$lte:30000}}).lean().exec()
        return res.status(200).send(product)
        }
        else if(coustom==60)
        {
            const product=await Product.find({"price":{$gte:60000}}).lean().exec() 
        return res.status(200).send(product)
        }


//-----------------
        const product = await Product.find().lean().exec();
        return res.status(200).send(product);



    }
    catch(e){
        return res.status(500).send(e.message);
    }
})



module.exports = router



