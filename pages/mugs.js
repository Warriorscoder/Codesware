import Link from "next/link";
import React from "react";
import mongoose from "mongoose";
import Product from "@/models/Product";

function mugs({products}) {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center ">
          {Object.keys(products).length === 0 && <p>Currently all the Mugs are out of stock, new stock comming soon. Stay tuned</p>}
            {Object.keys( products).map((item)=>{
              return <div key={products[item]._id} className="lg:w-1/5 md:w-1/2 p-3 mx-2 w-full shadow-lg">
                <Link
                  className="block relative rounded overflow-hidden cursor-pointer"
                  href={`product/${products[item].slug}`}
                >
                  <img
                    alt="ecommerce"
                    className="h-[36vh] m-auto"
                    src={products[item].img}
                  />
                </Link>
                <Link href={"product/wear-the-code"}>
                  <div className="mt-4 text-center md:text-left ">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {products[item].catagory}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[item].name}
                    </h2>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div className="mb-2 mt-2">
                    {products[item].size.includes("S") && <div className=" inline mx-1 px-1 border rounded border-gray-300">S</div>}

                    {products[item].size.includes("M") && <div className=" inline mx-1 px-1 border rounded border-gray-300">M</div>}

                    {products[item].size.includes("L") && <div className=" inline m-1 p-1 border rounded border-gray-300">L</div>}

                    {products[item].size.includes("XL") && <div className=" inline m-1 p-1 border rounded border-gray-300">XL</div>}
                    </div>
                    {products[item].color.includes('Red') &&  <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Blue') &&  <button className="border-2 border-blue-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Green') &&  <button className="border-2 border-green-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Black') &&  <button className="border-2 border-black-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                  </div>
                </Link>
              </div>
              })}
          </div>
        </div>
      </section> 
    </div>
  );   
}     

export async function getServerSideProps({context}) {

  if(!mongoose.connections[0].readyState)
    {
      await mongoose.connect(process.env.Mongo_URI)
    }
   let products = await Product.find({category:'Mugs'});
   let mugs = {};

   for (let item of products) {
     if (item.name in mugs) {
 
       if(!mugs[item.name].color.includes(item.color) && item.availablity > 0)
         {
           mugs[item.name].color.push(item.color);
         }
       if(!mugs[item.name].size.includes(item.size) && item.availablity > 0)
         {
           mugs[item.name].size.push(item.size);
         }
     } else {
       
       mugs[item.name] = JSON.parse(JSON.stringify(item));
 
       if (item.availablity > 0) {
         mugs[item.name].color = [item.color];
         mugs[item.name].size = [item.size];
       }
     }
   }
  //  console.log(products)
  return {
    props: {products:JSON.parse(JSON.stringify(mugs))},
  }
}
export default mugs; 
 