import { BottomNavigation, BottomNavigationAction, Drawer, Menu, MenuList, MenuItem, Popover } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { AiFillCloseCircle, AiFillHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, removeFromCart } from '../features/cartSlice';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const jwt = require('jsonwebtoken');

const Bottom = () => {

    const [bottom, setBottom] = useState('Home');
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cartItems.cart)
    const token = useSelector((state) => state.cartItems.token)
    const subTotal = useSelector((state) => state.cartItems.subTotal)
    const [dropdown, setDropdown] = useState(false)
    const [sidebar, setSidebar] = useState(false)
    const [admin, setAdmin] = useState(true)
    const router = useRouter();
    let email = ''

    useEffect(() => {
        if (token) {
            email = jwt.decode(token).email
        }
        if (token && email != '' && (email == process.env.EMAIL1 || email == process.env.EMAIL2)) {
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
        setBottom('Home')
    }, [dropdown])

    useEffect(() => {
        setBottom('Home')
    }, [sidebar])

    const toggleCart = () => {
        setSidebar(!sidebar)
    }

    return (
        <div className="block lg:hidden bottom-0 fixed w-full z-[99]">
            <Popover
                id="simple-menu"
                open={Boolean(dropdown)}
                onClose={() => setDropdown(false)}
                elevation={1}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuList>
                    {!sidebar && token && <MenuItem onClick={() => {
                        setDropdown(false)
                        router.push('/myaccount')
                    }}>My Account</MenuItem>}
                    {!sidebar && token && <MenuItem onClick={() => {
                        setDropdown(false)
                        router.push('/orders')
                    }}>My Orders</MenuItem>}
                    {!sidebar && token && <MenuItem onClick={() => dispatch(removeToken())} >Logout</MenuItem>}
                    {!sidebar && !token && <MenuItem onClick={() => {
                        setDropdown(false)
                        router.push('/login')
                    }}>Login</MenuItem>}
                </MenuList>
            </Popover>
            <Drawer anchor='right' open={sidebar} onClose={() => setSidebar(false)} className="z-[45]">
                <div className={`h-[100vh] md:w-[40rem] top-0 bg-[#f2e5ff] px-8 py-10 transition-all overflow-y-scroll`}>
                    <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                    <span onClick={toggleCart} className='absolute top-5 right-3 text-3xl cursor-pointer text-[#8000ff]'><AiFillCloseCircle /></span>
                    <ol className='list-decimal font-semibold'>
                        {cart?.length == 0 && <div className='my-4 font-semibold'>Your cart is Empty!</div>}
                        {cart?.map((item, index) => {
                            return <li key={index}>
                                <div className="flex my-5 space-x-2 flex-row-reverse">
                                    <img style={{ height: '110px' }} src={item.img} alt={index} />
                                    <div className='flex flex-col'>
                                        <div className='max-w-[30rem] font-semibold flex flex-row'>{item.name} ({item.size}/{item.variant})</div>
                                        <div className='flex space-x-6'>
                                            <div className='flex items-center justify-start mt-2 font-semibold text-lg'><RemoveIcon onClick={() => { item.qty <= item.availableQty && dispatch(removeFromCart({ slug: item.slug, qty: 1, price: item.price, name: item.name, size: item.size, color: item.variant, category: item.category, img: item.img, fabric: item.fabric })) }} className='cursor-pointer bg-[#8000ff] text-[#f2e5ff] rounded-sm' /><span className='mx-2 text-sm' > {item.qty} </span><AddIcon onClick={() => { item.qty <= item.availableQty && dispatch(increment({ slug: item.slug, qty: 1, price: item.price, name: item.name, size: item.size, color: item.variant, category: item.category, img: item.img, fabric: item.fabric })) }} className='cursor-pointer bg-[#8000ff] text-[#f2e5ff] rounded-sm' /></div>
                                            <div className='flex mt-3 justify-start space-x-1'>
                                                <p>Price: </p>
                                                <p>₹{item.price * item.qty}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        })}
                        <div className="font-bold my-2">Subtotal: ₹{subTotal}</div>
                    </ol>
                    <div className="flex">
                        <Link href={'/checkout'} ><button onClick={() => setSidebar(false)} disabled={cart.length === 0} className="disabled:bg-[#cc99ff] flex mr-2 text-white bg-[#9933ff] border-0 py-2 px-2 focus:outline-none hover:bg-[#8000ff] rounded text-sm"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
                        <button disabled={cart.length === 0} onClick={() => dispatch(clearCart())} className="disabled:bg-[#cc99ff] flex mr-2 text-white bg-[#9933ff] border-0 py-2 px-2 focus:outline-none hover:bg-[#8000ff] rounded text-sm">Clear Cart</button>
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

                <BottomNavigationAction value="Sidebar" icon={<span onClick={() => {
                    setSidebar(true)
                }}>
                    <Carticon cartlen={cart?.length} />
                </span>} />
                <BottomNavigationAction value="Account" icon={<span onClick={() => setDropdown(!dropdown)} onMouseLeave={() => setDropdown(false)}>
                    {<MdAccountCircle className="text-3xl" />}
                </span>} />
            </BottomNavigation>
        </div >
    )
}

const Carticon = (cartlen) => {
    return <div>
        {cartlen.cartlen > 0 && <span className='absolute mx-[-5px] mt-[3px] px-1 border border-[#9933ff] bg-[#9933ff] text-white text-xs rounded-full'> {cartlen.cartlen} </span>}
        <AiOutlineShoppingCart className="mt-2 text-4xl" />
    </div>
}

export default Bottom;