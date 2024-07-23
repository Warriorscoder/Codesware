import connectdb from "@/middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";

const handler = async (req, res)=> {

    if(req.method == 'POST')
    { 
        // console.log(req.body)
        if(req.body.amount <= 0)
        {
            res.status(400).json({success:false,error:"Cart is empty. Please build your cart first"});
            return
        }
        
        // valid Phone no. and pincode check is remaining 
        
        if(req.body.phone.length !== 10  )
        {
            res.status(400).json({success:false,error:"Please enter a valid phone no."});
            return
        }

        if(req.body.pincode.length !== 6)
        {
            res.status(400).json({success:false,error:"Please enter a valid pincode"});
            return
        }
        
        let pro = req.body.products;
        // console.log(pro)

        for(let item of pro)
        {
            let allpro = await Product.findOne({slug : item.title})
            // console.log(item)
            if(item.quantity > allpro.availablity)
            {
                res.status(400).json({success:false ,error:"Some items in your order are out of stock. Please try again later"});
                return 
            }
            else
            {
                await Product.findOneAndUpdate({slug : item.title}, {$inc:{"availablity": - item.quantity}})
                
            }
        }

        let neworder = new Order(req.body)
        await neworder.save()
        res.status(200).json({success:true,id:neworder._id});
        return 
    }
    else
    {
        res.status(400).json({success:false,error:"this method is not supported "});
        return 
    }
}
export default connectdb(handler)
