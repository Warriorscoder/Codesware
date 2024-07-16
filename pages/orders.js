import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function orders() {
  const router = useRouter();
  const [myorders, setMyorders] = useState([])

  useEffect(() => {
    const getorders = async ()=>{
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({token:localStorage.getItem('token')}),
      });
      var responce = await res.json();
      // console.log(responce)
      setMyorders(responce.orders)
    }
    
    if(localStorage.getItem('token'))
    {
      getorders();
    }
    else
    router.push('/')
   
}, [])
console.log(myorders.email)
  
  return <div className="container mx-auto min-h-screen" >

    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <h1 className="font-bold text-xl p-6 text-center" >My Orders</h1>
            <table className="min-w-full">
              <thead className="border-b">
                <tr className="border-b" >
                  <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-center">Order Id
                  </th>
                  <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-center">Email
                  </th>
                  <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-center">Amount
                  </th>
                  <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-center">More Info
                  </th>
              </tr>
  
                {myorders.map((item)=>{
                  
                  return <tr key={item.orderId} className="border-b">
                        <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{item.orderId}
                        </th>
                        <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.email}
                        </th>
                        <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{item.amount}
                        </th>
                        <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><Link href={'/order?id='+ item._id} >...</Link>
                        </th>
                      
                      </tr>
                })}
              
                 
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>;
}

export default orders;
