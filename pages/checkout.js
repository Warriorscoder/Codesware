import React from 'react'
import Link from 'next/link';
import { FaOpencart, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";

function checkout({ cart, addtocart, removefromcart, subtotal }) {
    return (
        <div className=' container m-auto my-5' >
            <div className='text-3xl text-center font-bold ' >
                Checkout
            </div>
            <h1 className='font-bold text-xl'>
                1. Delivery Details
            </h1>

            <div className='flex mx-auto'>
                <div className="mb-4 w-1/2 m-2">
                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                    <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>

                <div className="mb-4  w-1/2 m-2">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                    <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>

            <div className="textarea">
                <div className=" mb-4 m-2">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                    <textarea id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
            </div>

            <div className='flex mx-auto'>
                <div className="mb-4 w-1/2 m-2">
                    <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                    <input type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>

                <div className="mb-4  w-1/2 m-2">
                    <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                    <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>

            <div className='flex mx-auto'>

                <div className="mb-4  w-1/2 m-2">
                    <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                    <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>

                <div className="mb-4  w-1/2 m-2">
                    <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                    <input type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
            <h1 className='font-bold text-xl'>
                2. Review your cart
            </h1>

            <div className="cart  bg-pink-200 m-2 p-5">
                
                <ol className='list-decimal'>

                    {Object.keys(cart).length == 0 && <div className='mt-2 text-center font-semibold' >Your cart is empty!! </div>}

                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className="items flex">
                                <div className='flex w-auto my-5' >{cart[k].name}</div>
                                <div className=' flex w-1/3 items-center justify-center' >
                                    <FaCircleMinus
                                        onClick={() => { removefromcart(k, 1, 499, "Wear the code", "XL", "red") }} className='text-pink-500' />
                                    <span className='mx-2' >{cart[k].qty}</span>
                                    <FaCirclePlus onClick={() => { addtocart(k, 1, 499, "Wear the code", "XL", "red") }} className='text-pink-500' />
                                </div>
                            </div>
                        </li>
                    })}
                </ol>

                <span className='font-bold' >Subtotal: ₹{subtotal}</span>

            </div>
            <button  className="flex mx-2 mt-2 text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm">
            Pay ₹{subtotal}</button>
        </div>
    )
}

export default checkout