import { BottomNavigation, BottomNavigationAction, Drawer, Menu, MenuList, MenuItem, Popover, Modal, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { AiFillCloseCircle, AiFillHome, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, removeFromCart, removeToken } from '../features/cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/system';
const jwt = require('jsonwebtoken');

const Bottom = () => {

    const style = {
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80vw",
        bgcolor: 'white',
        boxShadow: 24,
        border: "1px solid white",
        borderRadius: "8px",
    };

    const [bottom, setBottom] = useState('Home');
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cartItems.cart)
    const token = useSelector((state) => state.cartItems.token)
    const subTotal = useSelector((state) => state.cartItems.subTotal)
    const [dropdown, setDropdown] = useState(null)
    const [sidebar, setSidebar] = useState(false)
    const [searchbar, setSearchbar] = useState(false)
    const [admin, setAdmin] = useState(true)
    const [search, setSearch] = useState('')
    const router = useRouter();
    let email = ''

    useEffect(() => {
        if (token) {
            email = jwt.decode(token).email
        }
        if (token && email != '' && (email == process.env.NEXT_PUBLIC_EMAIL1 || email == process.env.NEXT_PUBLIC_EMAIL2)) {
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

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click' || e.type === 'submit') {
            router.push(`/search_result?query=${search.toLowerCase()}`)
            setSearch("")
        }
    }

    return (
        <div className="block md:hidden bottom-0 fixed w-full z-[99]">
            <Menu
                id="simple-menu"
                anchorEl={dropdown}
                open={Boolean(dropdown)}
                onClose={() => setDropdown(null)}
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
                        setDropdown(null)
                        router.push('/myaccount')
                    }}>My Account</MenuItem>}
                    {!sidebar && token && <MenuItem onClick={() => {
                        setDropdown(null)
                        router.push('/orders')
                    }}>My Orders</MenuItem>}
                    {!sidebar && token && <MenuItem onClick={() => dispatch(removeToken())} >Logout</MenuItem>}
                    {!sidebar && !token && <MenuItem onClick={() => {
                        setDropdown(null)
                        router.push('/login')
                    }}>Login</MenuItem>}
                </MenuList>
            </Menu>
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
            <Modal
                open={searchbar}
                keepMounted
                onClose={() => setSearchbar(false)}
                aria-labelledby="modal-modal-search"
                aria-describedby="modal-modal-searchbar"
            >
                <Box sx={style}>
                    <div className={`flex justify-end items-center`}>
                        <input onKeyDown={handleSearch} onChange={handleChange} value={search} className='border-2 border-gray-300 bg-white h-10 w-[100%] rounded-lg text-sm focus:outline-none' type="search" name="search" placeholder="Search" />
                        <button type="submit" onClick={handleSearch} className="absolute mx-2 text-xl text-gray-400">
                            <AiOutlineSearch />
                        </button>
                    </div>
                </Box>
            </Modal>
            <BottomNavigation
                value={bottom}
                onChange={(event, newValue) => {
                    setBottom(newValue);
                }}
                color="secondary"
            >
                <BottomNavigationAction value="Home" icon={<AiFillHome className="text-3xl" />} />

                <BottomNavigationAction value="Search" icon={<span onClick={() => setSearchbar(true)}><AiOutlineSearch className="text-3xl" /></span>} />

                <BottomNavigationAction value="Sidebar" icon={<span onClick={() => {
                    setSidebar(true)
                }}>
                    <Carticon cartlen={cart?.length} />
                </span>} />
                <BottomNavigationAction value="Account" icon={<span onClick={() => setDropdown(1)} onMouseLeave={() => setDropdown(null)}>
                    {<MdAccountCircle className="text-3xl" />}
                </span>} />
            </BottomNavigation>
        </div >
    )
}

const Carticon = (cartlen) => {
    return <div>
        {cartlen.cartlen > 0 && <span className='absolute mt-[-4px] px-1 border border-[#9933ff] bg-[#9933ff] text-white text-xs rounded-full'> {cartlen.cartlen} </span>}
        <AiOutlineShoppingCart className="text-3xl" />
    </div>
}

export default Bottom;