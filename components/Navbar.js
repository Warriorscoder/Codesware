import Image from 'next/image'
import Link from 'next/link';
import React, { useRef } from 'react'
import { FaOpencart, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { IoCloseCircle,IoBagCheckSharp } from "react-icons/io5";

function Navbar() {
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
    <div className='flex flex-col md:justify-start md:flex-row justify-center items-center py-2 mx-3 shadow-md'>
      <div>
        <Link href={'/'} >
          <Image src={'/logo.png'} width={200} height={40} />
        </Link>
      </div>

      <div className='nav px-4 ' >
        <ul className='flex space-x-2 font-bold' >
          <Link href={'/tshirts'}> <li>T-shirts</li></Link>
          <Link href={'/hoddies'}> <li>Hoddies</li></Link>
          <Link href={'/mugs'}> <li>Mugs</li></Link>
          <Link href={'/joggers'}> <li>Joggers</li></Link>
        </ul>
      </div>

      <div className="cart absolute right-9 cursor-pointer " onClick={togglecart}>
        <FaOpencart className='text-3xl' />
      </div>

      <div ref={ref} className="cart absolute top-0 right-0 bg-pink-200 py-2 px-8 translate-x-full transform  ease-in-out duration-300 w-72">
        <h2 className='text-xl font-bold underline text-center '>Your cart</h2>
        <span className='absolute top-5 right-2 cursor-pointer text-xl text-pink-500' onClick={togglecart} ><IoCloseCircle /></span>

        <ol className='list-decimal'>
          <li>
            <div className="items flex">
              <div className='flex w-2/3 my-5' >T-shirt - wear the code</div>
              <div className=' flex w-1/3 items-center justify-center' >
                <FaCircleMinus className='text-pink-500' />
                <span className='mx-2' >1</span>
                <FaCirclePlus className='text-pink-500' />
              </div>
            </div>
          </li>
          <li>
            <div className="items flex">
              <div className='flex w-2/3 my-5' >T-shirt - wear the code</div>
              <div className=' flex w-1/3 items-center justify-center' >
                <FaCircleMinus className='text-pink-500' />
                <span className='mx-2' >1</span>
                <FaCirclePlus className='text-pink-500' />
              </div>
            </div>
          </li>
          <li>
            <div className="items flex">
              <div className='flex w-2/3 my-5' >T-shirt - wear the code</div>
              <div className=' flex w-1/3 items-center justify-center' >
                <FaCircleMinus className='text-pink-500' />
                <span className='mx-2' >1</span>
                <FaCirclePlus className='text-pink-500' />
              </div>
            </div>
          </li>
          <li>
            <div className="items flex">
              <div className='flex w-2/3 my-5' >T-shirt - wear the code</div>
              <div className=' flex w-1/3 items-center justify-center' >
                <FaCircleMinus className='text-pink-500' />
                <span className='mx-2' >1</span>
                <FaCirclePlus className='text-pink-500' />
              </div>
            </div>
          </li>
          <li>
            <div className="items flex">
              <div className='flex w-2/3 my-5' >T-shirt - wear the code</div>
              <div className=' flex w-1/3 items-center justify-center' >
                <FaCircleMinus className='text-pink-500' />
                <span className='mx-2' >1</span>
                <FaCirclePlus className='text-pink-500' />
              </div>
            </div>
          </li>
          <li>
            <div className="items flex">
              <div className='flex w-2/3 my-5' >T-shirt - wear the code</div>
              <div className=' flex w-1/3 items-center justify-center' >
                <FaCircleMinus className='text-pink-500' />
                <span className='mx-2' >1</span>
                <FaCirclePlus className='text-pink-500' />
              </div>
            </div>
          </li>
          <li>
            <div className="items flex">
              <div className='flex w-2/3 my-5' >T-shirt - wear the code</div>
              <div className=' flex w-1/3 items-center justify-center' >
                <FaCircleMinus className='text-pink-500' />
                <span className='mx-2' >1</span>
                <FaCirclePlus className='text-pink-500' />
              </div>
            </div>
          </li>
          <li>
            <div className="items flex">
              <div className='flex w-2/3 my-5' >T-shirt - wear the code</div>
              <div className=' flex w-1/3 items-center justify-center' >
                <FaCircleMinus className='text-pink-500' />
                <span className='mx-2' >1</span>
                <FaCirclePlus className='text-pink-500' />
              </div>
            </div>
          </li>
        </ol>
        <button class="flex mx-auto mt-16 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-sm"> <IoBagCheckSharp className='m-0.5 ' />
        Check Out</button>
      </div>

    </div>
  )
}

export default Navbar