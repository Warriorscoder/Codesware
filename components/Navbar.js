import Image from 'next/image'
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { FaOpencart, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { IoCloseCircle, IoBagCheckSharp } from "react-icons/io5";
import { CgTrashEmpty } from "react-icons/cg";
import { RiAccountCircleFill } from "react-icons/ri";

function Navbar({ logout, cart, user, addtocart, removefromcart, clearCart, subtotal }) {
  const [togg, Settogg] = useState(false)

  const togglecart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }

  const ref = useRef()
  return (
    <div className='flex flex-col md:justify-start md:flex-row justify-center items-center py-2 shadow-md sticky top-0 left-0 z-10 bg-white '>

      <div>
        <Link href={'/'}>
          <Image src={'/logo.png'} width={200} height={40} alt='logo' />

        </Link>
      </div>

      <div className='nav px-4 ' >
        <ul className='flex space-x-2 font-bold' >
          <Link href={'/tshirts'}> <li>T-shirts</li> </Link>
          <Link href={'/hoddies'}>  <li>Hoddies</li> </Link>
          <Link href={'/mugs'}>  <li>Mugs</li> </Link>
          <Link href={'/joggers'}>  <li>Joggers</li> </Link>
        </ul>
      </div>

      <div className="cart flex absolute right-2 cursor-pointer " >
        <span onMouseOver={() => Settogg(true)} onMouseLeave={() => Settogg(false)} >

          {togg && <div onMouseOver={() => Settogg(true)} onMouseLeave={() => Settogg(false)} className="absolute right-12 top-8 bg-pink-300 p-2 w-32 rounded-md " >
            <ul>
              <Link href={'/myaccount'}><li className='py-1 hover:text-pink-600 text-center ' >My Account</li></Link>

              <Link href={'/orders'}><li className='py-1 hover:text-pink-600 text-center ' >Orders</li></Link>
              
              <li onClick={logout} className='py-1 hover:text-pink-600 text-center ' >Logout</li>
            </ul>
          </div>
          }

          {user.value &&  <Link href={'/login'}> <RiAccountCircleFill
            className='text-3xl mx-2 text-pink-600' /></Link>}

        </span>

        {!user.value && <Link href={'/login'}> <button className='bg-pink-500 px-2 py-1 text-sm rounded-md mx-2 text-white' >Login</button></Link>}


        <FaOpencart onClick={togglecart} className='text-3xl' />
      </div>

      <div ref={ref} className={`cart overflow-y-scroll absolute top-0 right-0 bg-pink-200 py-2 px-8 transform transition-transform ${subtotal === 0 ? 'translate-x-full' : 'translate-x-0'} ease-in-out duration-100 w-72`}>
        <h2 className='text-xl font-bold underline text-center '>Your cart</h2>
        <span className='absolute top-5 right-2 cursor-pointer text-xl text-pink-500' onClick={togglecart} ><IoCloseCircle /></span>

        <ol className='list-decimal'>

          {Object.keys(cart).length == 0 && <div className='mt-5 text-center font-semibold' >Your cart is empty!! </div>}

          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="items flex">
                <div className='flex w-2/3 my-5' >{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                <div className=' flex w-1/3 items-center justify-center' >
                  <FaCircleMinus
                    onClick={() => { removefromcart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-pink-500' />
                  <span className='mx-2' >{cart[k].qty}</span>
                  <FaCirclePlus onClick={() => { addtocart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-pink-500' />
                </div>
              </div>
            </li>
          })}
        </ol>
        <span className='font-bold' >Subtotal: ₹{subtotal}</span>
        <div className="flex">
          <Link href={'/checkout'}>
            <button className="flex mx-1 mt-5 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"> <IoBagCheckSharp className='m-0.5 ' />
              Check Out</button>
          </Link>
          <button onClick={clearCart} className="flex mx-auto mt-5 text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm"><CgTrashEmpty className='m-0.5' />
            Clear cart</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar