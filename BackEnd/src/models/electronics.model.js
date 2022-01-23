const mongoose = require("mongoose");


const productSchema = new mongoose.Schema( //----> Product Schema
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        rating: { type: String, required: true},
        d1: { type: String, required: true },
        d2: { type: String, required: true },
        d3: { type: String, required: true },
        d4: { type: String, required: true },
        d5: { type: String, required: true },
        d6: { type: String, required: true },
        price: { type: Number, required: true },
        img: { type: String, required: true },
        
    },
        {
        versionKey: false,
        timestamps: true,
        }
    );

module.exports = mongoose.model("product",productSchema);