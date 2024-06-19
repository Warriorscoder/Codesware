import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaOpencart } from "react-icons/fa6";
function Navbar() {
  return (
    <div className='flex flex-col md:justify-start md:flex-row justify-center items-center py-2 mx-3'>
        <div>
          <Link href={'/'} >
          <Image src={'/logo.png'} width={200} height={40} />
          </Link>
        </div>

        <div className='nav px-4 ' >
          <ul className='flex space-x-2 font-bold' >
           <Link href={'/'}> <li>T-shirts</li></Link>
           <Link href={'/'}> <li>Hoddies</li></Link>
           <Link href={'/'}> <li>Mugs</li></Link>
           <Link href={'/'}> <li>Joggers</li></Link>
          </ul>
        </div>

        <div className="cart absolute right-9 ">
        <FaOpencart className='text-3xl' />
        </div>

    </div>
  )
}

export default Navbar