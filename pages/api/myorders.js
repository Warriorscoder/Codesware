import connectdb from "@/middleware/mongoose";
import Order from "@/models/Order";
import jsonwebtoken from "jsonwebtoken";
const handler = async (req, res)=> {

    const token = req.body.token
    // console.log(token)
    let data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    let orders = await Order.find({email:data.email})
    res.status(200).json({ orders});
  }

export default connectdb(handler)