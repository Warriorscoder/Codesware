import Order from "@/models/Order";
import mongoose from "mongoose";
import React from "react";

function Myorder({order}) {
  // console.log(order);
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              CODESWARE.COM
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Order id: #{order.orderId}
            </h1>
            <p className="leading-relaxed">
              Your order has been successfully placed.
            </p>
            <p className="leading-relaxed mb-4">
             Your payment status is: <span className="font-semibold" >{order.status}</span>.
            </p>
            <div className="flex mb-4">
              <a className="flex-grow py-2 text-lg px-1">
                Item Description
              </a>
              <a className="flex-grow  py-2 text-lg px-1">
                Quantity
              </a>
              <a className="flex-grow  py-2 text-lg px-1">
                Total Price
              </a>
            </div>
            {order.products.map((item) =>{

                return <div key={item._id} className="border-t border-gray-200 py-2 grid  grid-cols-3 ">
                  <div className="text-gray-500">{item.title}</div>
                  <div className="ml-auto text-gray-900 text-center">{item.quantity}</div>
                  <div className="ml-auto text-gray-900">₹{item.price * item.quantity}</div>
                </div>
            })}
           
            <div className="flex mt-4">
              <span className="title-font font-medium text-2xl text-gray-900">
                Subtotal: ₹{order.amount}
              </span>
              <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                Track order
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 w-full lg:h-auto h-60 ">
          <img
            alt="ecommerce"
            className="object-cover object-center rounded"
            src="https://imgs.search.brave.com/Mfy0SDVhspkuqHU6POaMppVQJXEPgI1_-ZbjIH32Vvk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/MS5iaWdjb21tZXJj/ZS5jb20vcy04NjM5/NC9pbWFnZXMvc3Rl/bmNpbC81MDB4NjU5/L3Byb2R1Y3RzLzc0/NjMvMTA4MjY1LzEw/XzYyNDdfd2ViX180/NTIxMi4xNjk5OTEx/Nzc4LmpwZz9jPTI"
          />
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.Mongo_URI);
  }
  
  let order = await Order.findById(context.query.id);
  //  console.log(context)
  return {
    props: {order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default Myorder;
