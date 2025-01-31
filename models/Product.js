const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name : {type: String, required: true},
    img : {type: String, required: true},
    slug : {type: String, required: true , unique:true},
    desc : {type: String, required: true},
    size : {type: String},
    color : {type: String},
    category : {type: String, required: true},
    price : {type: Number,required:true},
    availablity : {type: Number,required:true}
    
},{timestamps:true})

mongoose.models = {}
export default mongoose.model("Product",ProductSchema);