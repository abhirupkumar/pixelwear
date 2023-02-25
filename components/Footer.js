import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <div>
      <footer className="text-gray-600 body-font bg-gray-100">
        <div className="container px-5 py-10 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link href={"/"}>
              <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                <Image src="/logo.png" alt="" width={230} height={70} />
              </div>
            </Link>
            <p className="mt-2 text-sm text-gray-500">Best Quality Bottoms, Sarees, Tops, Inner Wear, Kid's Wear and Lounge Wears</p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">SHOP</h2>
              <nav className="list-none mb-10">
                <li className="text-gray-600 hover:text-blue-500 hover:underline">
                  <Link href='/sarees?category=sarees'>Sarees</Link>
                </li>
                <li className="text-gray-600 hover:text-blue-500 hover:underline">
                  <Link href='/bottoms?category=ankleleggings'>Bottoms</Link>
                </li>
                <li className="text-gray-600 hover:text-blue-500 hover:underline">
                  <Link href='/tops?category=tshirts'>Tops</Link>
                </li>
                <li className="text-gray-600 hover:text-blue-500 hover:underline">
                  <Link href='/kids?category=bottom/ankleleggings'>Kid's Wear</Link>
                </li>
                <li className="text-gray-600 hover:text-blue-500 hover:underline">
                  <Link href='/loungewear?category=pyjama'>Lounge Wear</Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CUSTOMER SERVICES</h2>
              <nav className="list-none mb-10">
                <li className="text-gray-600 hover:text-blue-500 hover:underline">
                  <Link href='/contact'>Contact Us</Link>
                </li>
                <li className="text-gray-600 hover:text-blue-500 hover:underline">
                  <Link href='/about'>About Us</Link>
                </li>
                <li className="text-gray-600 hover:text-blue-500 hover:underline">
                  <Link href='/return'>Return Policy</Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">POLICY</h2>
              <nav className="list-none mb-10">
                <li className="text-gray-600 hover:text-blue-500 hover:underline">
                  <Link href='/privacy'>Privacy Policy</Link>
                </li>
                <li className="text-gray-600 hover:text-blue-500 hover:underline">
                  <Link href='/terms_and_condition'>Terms And Condition</Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <Image src="/pay.png" alt="" width={200} height={80} />
            </div>
          </div>
        </div>
        <div className="bg-gray-100 lg:mb-0 mb-14">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">© 2022 lesoft.in - All Rights Reserved
            </p>
            <li className='text-sm list-none flex flex-1 md:justify-end justify-center'><a target="_blank" href='https://abhirupkumar.netlify.app'>Abhirup Kumar Bhowmick</a></li>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer