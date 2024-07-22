import connectdb from "@/middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";

const handler = async (req, res)=> {

    if(req.method == 'POST')
    { 
        if(req.body.subtotal <= 0)
        {
            res.status(400).json({error:"Cart is empty. Please build your cart first"});
        }
        
        let pro = req.body.products;
        // console.log(pro)

        // there is a bug that if the order is not placed still the quantity is decresed in the data base
        for(let item of pro)
        {
            let allpro = await Product.findOne({slug : item.title})
            // console.log(item)
            if(item.quantity > allpro.availablity)
            {
                res.status(400).json({success:false ,error:"Some items in your order are out of stock. Please try again later"});
            }
            else
            {
                await Product.findOneAndUpdate({slug : item.title}, {$inc:{"availablity": - item.quantity}})
            }
        }

        let neworder = new Order(req.body)
        await neworder.save()
        res.status(200).json({success:true,id:neworder._id});
    }
    else
    {
        res.status(400).json({error:"this method is not supported "});
    }
}
export default connectdb(handler)
