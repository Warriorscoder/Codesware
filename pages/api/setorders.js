import connectdb from "@/middleware/mongoose";
import Order from "@/models/Order";

const handler = async (req, res)=> {

    if(req.method == 'POST')
    { 
        let neworder = new Order(req.body)
        
        await neworder.save()
        
        res.status(200).json({success:"order saved ",id:neworder._id});
    }
    else
    {
        res.status(400).json({error:"this method is not supported "});
    }
}
export default connectdb(handler)
