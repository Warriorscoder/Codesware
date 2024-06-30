import connectdb from "@/middleware/mongoose";

import Product from "@/models/Product";

const handler = async (req, res) => {
  // let products = await Product.find();
  
    //  let tshirts = {};
  
    //  for (let item of products) {
    //    if (item.name in tshirts) {
   
    //      if(!tshirts[item.name].color.includes(item.color) && item.availablity > 0)
    //        {
    //          tshirts[item.name].color.push(item.color);
    //        }
    //      if(!tshirts[item.name].size.includes(item.size) && item.availablity > 0)
    //        {
    //          tshirts[item.name].size.push(item.size);
    //        }
    //    } else {
         
    //      tshirts[item.name] = JSON.parse(JSON.stringify(item));
   
    //      if (item.availablity > 0) {
    //        tshirts[item.name].color = [item.color];
    //        tshirts[item.name].size = [item.size];
    //      }
    //    }
    //   }
  // console.log(Product.find())
  // res.status(200).json({ tshirts });
};

export default connectdb(handler);
