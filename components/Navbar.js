import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { menuItems } from '../menuItems';
import MenuItems from "./MenuItems";

const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [dropdown, setDropdown] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [admin, setAdmin] = useState(true)
  const router = useRouter()

  const animation = ["fadeIn", "fadeOut"];

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if (myuser && myuser.token && (myuser.email == 'abhirupkumar2003@gmail.com' || myuser.email == 'kabirlesoft@gmail.com')) {
      setAdmin(true)
    }
    else {
      setAdmin(false)
    }
    let exempted = ['/checkout', '/order', '/orders', '/myaccount']
    if (exempted.includes(router.pathname)) {
      setSidebar(false)
    }
  }, [])

  const ref = useRef()
  const toggleCart = () => {
    setSidebar(!sidebar)
    // if (ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-full')
    //   ref.current.classList.add('translate-x-0')
    // }
    // else if (ref.current.classList.contains('translate-x-0')) {
    //   ref.current.classList.remove('translate-x-0')
    //   ref.current.classList.add('translate-x-full')
    // }
  }
  return (
    <>
      {!sidebar && <span onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className='fixed right-12 top-4 z-50 cursor-pointer' >
        {dropdown && <div className="absolute right-6 bg-indigo-100 shadow-lg top-7 py-4 rounded-md px-5 w-32 z-30">
          <ul>
            {admin && <Link href={'/admin'}><a><li className='py-1 hover:text-indigo-700 text-sm font-bold'>Admin Panel</li></a></Link>}
            <Link href={'/myaccount'}><a><li className='py-1 hover:text-indigo-700 text-sm font-bold'>My Account</li></a></Link>
            <Link href={'/orders'}><a><li className='py-1 hover:text-indigo-700 text-sm font-bold'>My Orders</li></a></Link>
            <li onClick={logout} className='py-1 hover:text-indigo-700 text-sm font-bold'>Logout</li>
          </ul>
        </div>}
        <span onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>
          {user.value && <MdAccountCircle className="text-2xl mx-5 my-2" />}
        </span>

      </span>}
      <div className={`navbar-show flex flex-col md:flex-row bg-white md:justify-start justify-center items-center py-0 md:py-0 shadow-md top-0 z-30 fixed w-full ${!sidebar && 'overflow-hidden'}`}>
        <div className="logo my-1 ">
          <Link href={'/'}><a className="mx-4"><Image src="/logo.png" alt="" width={150} height={50} /></a></Link>
        </div>
        <div className="lg:block hidden">
          <ul className="flex items-center space-x-1 font-bold text-md ">
            {menuItems.map((menu, index) => {
              const depthLevel = 0;
              return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
            })}
          </ul>
        </div>
        <div className="cart absolute right-0 top-4 mx-6 cursor-pointer flex">

          {!user.value && <Link href={'/login'}><a>
            <button className='flex mr-2 text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm' >Login</button>
          </a></Link>}
          <AiOutlineShoppingCart onClick={toggleCart} className="text-2xl mt-2" />
          {Object.keys(cart).length > 0 && <span className='absolute right-0 mx-[-5px] mt-[-2px] px-1 text-xs border border-indigo-500 bg-indigo-500 text-white rounded-full'> {Object.keys(cart).length} </span>}
        </div>

        <div ref={ref} className={`w-72 h-[100vh] sideCart overflow-y-scroll absolute top-0 bg-blue-100 px-8 py-10 transition-all ${sidebar ? 'right-0' : '-right-72'} `}>
          <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
          <span onClick={toggleCart} className='absolute top-5 right-3 text-3xl cursor-pointer text-blue-500'><AiFillCloseCircle /></span>
          <ol className='list-decimal font-semibold'>
            {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your cart is Empty!</div>}
            {Object.keys(cart).map((k) => {
              return <li key={k}>
                <div className="item flex my-5">
                  <div className='w-[100%] font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                  <div className='flex items-center justify-center w-1/3 font-semibold text-lg'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-blue-500' /><span className='mx-2 text-sm' > {cart[k].qty} </span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-blue-500' /></div>
                </div>
              </li>
            })}
            <div className="font-bold my-2">Subtotal: ₹{subTotal}</div>
          </ol>
          <div className="flex">
            <Link href={'/checkout'} ><button disabled={Object.keys(cart).length === 0} className="disabled:bg-indigo-300 flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
            <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className="disabled:bg-indigo-300 flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">Clear Cart</button>
          </div>
        </div>
      </div></>
  )
}

export default Navbar