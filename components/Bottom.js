import { BottomNavigation, BottomNavigationAction, Drawer } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { AiFillCloseCircle, AiFillHome, AiFillMinusCircle, AiFillPlusCircle, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { RiAccountCircleFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, removeFromCart } from '../features/cartSlice';

const Bottom = ({ logout, user }) => {

    const [bottom, setBottom] = useState('Home');
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cartItems.cart)
    const subTotal = useSelector((state) => state.cartItems.subTotal)
    const [dropdown, setDropdown] = useState(false)
    const [sidebar, setSidebar] = useState(false)
    const [admin, setAdmin] = useState(true)
    const router = useRouter()

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

    useEffect(() => {
        if (dropdown == false && bottom == 'Account') {
            setBottom('Home')
        }
    }, [dropdown])

    return (
        <div className="block lg:hidden bottom-0 fixed w-full z-[99]">
            {!sidebar && user.value && <span className='fixed right-[12rem] bottom-[10rem] z-50 cursor-pointer' >
                {dropdown && <div className="absolute block lg:hidden bg-indigo-100 shadow-lg py-4 rounded-md px-5 w-32 z-30">
                    <ul>
                        <Link href={'/myaccount'}><a><li className='py-1 hover:text-indigo-700 text-sm font-bold'>My Account</li></a></Link>
                        <Link href={'/orders'}><a><li className='py-1 hover:text-indigo-700 text-sm font-bold'>My Orders</li></a></Link>
                        <li onClick={logout} className='py-1 hover:text-indigo-700 text-sm font-bold'>Logout</li>
                    </ul>
                </div>}
            </span>}
            {!sidebar && !user.value && <span className='fixed right-[10rem] bottom-[6.5rem] z-50 cursor-pointer' >
                {dropdown && <div className="absolute block lg:hidden bg-indigo-100 shadow-lg py-4 rounded-md px-5 w-28 z-30">
                    <ul>
                        <Link href={'/login'}><a><li className='py-1 hover:text-indigo-700 text-sm font-bold'>Login</li></a></Link>
                    </ul>
                </div>}

            </span>}
            <Drawer anchor='right' open={sidebar} onClose={() => setSidebar(false)}>
                <div className={`h-[100vh] md:min-w-[40rem] top-0 bg-blue-100 px-8 py-10 transition-all `}>
                    <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                    <span onClick={() => setSidebar(!sidebar)} className='absolute top-5 right-3 text-3xl cursor-pointer text-blue-500'><AiFillCloseCircle /></span>
                    <ol className='list-decimal font-semibold'>
                        {cart?.length == 0 && <div className='my-4 font-semibold'>Your cart is Empty!</div>}
                        {cart?.map((item, index) => {
                            return <li key={index}>
                                <div className="item flex my-5">
                                    <div className='max-w-[30rem] font-semibold flex flex-row'>{item.name} ({item.size}/{item.variant})</div>
                                    <img style={{ height: '100px' }} src={item.img} alt={index} />
                                    <div className='flex items-center justify-center w-1/3 font-semibold text-lg'><AiFillMinusCircle onClick={() => { dispatch(removeFromCart({ slug: item.slug, qty: 1, price: item.price, name: item.name, size: item.size, color: item.variant, category: item.category, img: item.img, img2: item.img2, img3: item.img3, img4: item.img4, fabric: item.fabric })) }} className='cursor-pointer text-blue-500' /><span className='mx-2 text-sm' > {item.qty} </span><AiFillPlusCircle onClick={() => { dispatch(addToCart({ slug: item.slug, qty: 1, price: item.price, name: item.name, size: item.size, color: item.variant, category: item.category, img: item.img, img2: item.img2, img3: item.img3, img4: item.img4, fabric: item.fabric })) }} className='cursor-pointer text-blue-500' /></div>
                                </div>
                            </li>
                        })}
                        <div className="font-bold my-2">Subtotal: ₹{subTotal}</div>
                    </ol>
                    <div className="flex">
                        <Link href={'/checkout'} ><button disabled={cart.length === 0} className="disabled:bg-indigo-300 flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
                        <button disabled={cart.length === 0} onClick={() => dispatch(clearCart())} className="disabled:bg-indigo-300 flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">Clear Cart</button>
                    </div>
                </div>
            </Drawer>
            <BottomNavigation
                value={bottom}
                onChange={(event, newValue) => {
                    setBottom(newValue);
                }}
            >
                <BottomNavigationAction value="Home" icon={<AiFillHome className="text-3xl" />} />

                <BottomNavigationAction value="Sidebar" icon={<Carticon cartlen={cart?.length} onClick={() => setSidebar(!sidebar)} />} />
                <BottomNavigationAction value="Account" icon={<span onClick={() => setDropdown(!dropdown)} onMouseLeave={() => setDropdown(false)}>
                    {<MdAccountCircle className="text-3xl" />}
                </span>} />
            </BottomNavigation>
        </div >
    )
}

const Carticon = (cartlen) => {
    return <div>
        {cartlen.cartlen > 0 && <span className='absolute px-1 border border-indigo-500 bg-indigo-500 text-white text-sm rounded-full'> {cartlen.cartlen} </span>}
        <AiOutlineShoppingCart className="mt-2 text-3xl" />
    </div>
}

export default Bottom;