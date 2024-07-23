const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email : {type: String, required: true},
    orderId : {type: String, required: true},
    products : [{
        title: {type:String},
        quantity: {type:Number,default: 1},
        price:{type:Number, required:true} ,
    }],
    address:{type:String, required: true},
    phone:{type:String, required: true},
    pincode:{type:String, required: true},
    amount:{type:Number,required:true},
    status:{type:String,default:'pending', required: true}
},{timestamps:true})

// mongoose.models = {}
// export default mongoose.model("Order",OrderSchema);
export default mongoose.models.Order  || mongoose.model("Order",OrderSchema)