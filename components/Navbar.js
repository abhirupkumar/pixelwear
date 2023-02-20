import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AiFillCloseCircle, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { menuItems } from '../menuItems';
import MenuItems from "./MenuItems";
import { Drawer, Box, Typography, IconButton, Modal } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close';
import { List, ListItem, ListItemText, ListItemButton, Divider } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increment, clearCart, removeFromCart, removeToken } from '../features/cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const jwt = require('jsonwebtoken');

const Navbar = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartItems.cart)
  const token = useSelector((state) => state.cartItems.token)
  const subTotal = useSelector((state) => state.cartItems.subTotal)
  const [dropdown, setDropdown] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [search, setSearch] = useState('')
  const [admin, setAdmin] = useState(true)
  const [menu, setMenu] = useState(false)
  const [searchbar, setSearchbar] = useState(false)
  const router = useRouter()

  const animation = ["fadeIn", "fadeOut"];
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
  }, [token])

  useEffect(() => {
    if (token) {
      const expirationTime = getTokenExpiration(token);
      if (expirationTime < Date.now()) {
        dispatch(removeToken())
      }
    }
  }, [router.query, token, sidebar])

  function getTokenExpiration(token) {
    try {
      const decoded = jwt.decode(token);
      return decoded.exp ? decoded.exp * 1000 : null; // convert to milliseconds
    } catch (err) {
      console.error('Error decoding JWT token:', err);
      return null;
    }
  }


  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    if (sidebar) {
      setMenu(false)
    }
  }, [sidebar])

  useEffect(() => {
    if (menu) {
      setSidebar(false)
    }
  }, [menu])

  const [open, setOpen] = useState({});
  const [open2, setOpen2] = useState({});

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click' || e.type === 'submit') {
      router.push(`/search_result?query=${search.toLowerCase()}`)
      setSearch("")
    }
  }

  function handleClick(id) {
    setOpen((prevState => ({ ...prevState, [id]: !prevState[id] })))
  }

  function handleClick2(id) {
    setOpen2((prevState => ({ ...prevState, [id]: !prevState[id] })))
  }

  const ref = useRef()
  const toggleCart = () => {
    setSidebar(!sidebar)
  }
  return (
    <>
      <Head>
        <title>Le-Soft - Women's Leading Fashion Brand</title>
        <meta name="description" content="Quality of classes at prices of masses." />
        <link rel="icon" href="/icon.png" />
      </Head>
      {!sidebar && <span onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className='fixed right-12 top-4 z-50 cursor-pointer md:block hidden' >
        {dropdown && <div className="absolute md:block hidden right-6 bg-indigo-100 shadow-lg top-7 py-4 rounded-md px-5 w-32 z-30">
          <ul>
            <Link href={'/myaccount'}><a><li className='py-1 hover:text-indigo-700 text-sm font-bold'>My Account</li></a></Link>
            <Link href={'/orders'}><a><li className='py-1 hover:text-indigo-700 text-sm font-bold'>My Orders</li></a></Link>
            <li onClick={() => {
              dispatch(removeToken())
              setDropdown(false)
            }} className='py-1 hover:text-indigo-700 text-sm font-bold'>Logout</li>
          </ul>
        </div>}
        <div>
        </div>

      </span>}
      <div className='md:hidden block fixed left-8 top-0 z-[27]'>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo' sx={{ top: '8px' }} onClick={() => setIsDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
      </div>
      <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} className="z-[45]">
        <Box paddingTop={2} paddingLeft={4} width='250px' textAlign='start' role='presentation'
        >
          <Typography variant='h6' component='div'>
            Menu
            <IconButton size='large' edge='end' color='inherit' aria-label='logo' sx={{ marginLeft: '100px' }} onClick={() => setIsDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Typography>
          <List>
            <ul className="flex flex-col items-start space-x-1 font-bold text-md ">
              {menuItems.map((menu, index) => {
                return <div key={index}><ListItem disablePadding>
                  {menu.submenu ? <List>
                    <ListItemButton onClick={() => handleClick(index)}>
                      <ListItemText primary={menu.title} />
                      <ExpandLess />
                    </ListItemButton>
                    {menu.submenu.map((item, ind) => {
                      return <Collapse in={open[index]} key={ind} timeout="auto" unmountOnExit>
                        <ListItem value={item.title}>
                          {item.submenu ? <List>
                            <ListItemButton onClick={() => handleClick2(ind)}>
                              <ListItemText primary={item.title} />
                              <ExpandLess />
                            </ListItemButton>
                            {
                              item.submenu.map((subitem, i) => {
                                return <Collapse in={open2[ind]} key={i} timeout="auto" unmountOnExit>
                                  <ListItem value={subitem.title}>
                                    <Link href={subitem.link}><ListItemButton>
                                      <ListItemText primary={subitem.title} />
                                    </ListItemButton></Link>
                                  </ListItem>
                                </Collapse>
                              })
                            }
                          </List>
                            :
                            <Link href={item.link}>
                              <ListItemButton>
                                <ListItemText primary={item.title} />
                              </ListItemButton>
                            </Link>}
                        </ListItem>
                      </Collapse>
                    })}
                  </List>
                    :
                    <Link href={menu.link}><ListItemButton>
                      <ListItemText primary={menu.title} />
                    </ListItemButton></Link>}
                </ListItem>
                  <Divider sx={{ width: '200px' }} />
                </div>

              })}
            </ul>
          </List>
        </Box>
      </Drawer>

      <div className={`navbar-show flex md:flex-row flex-col bg-white md:justify-start justify-center items-center py-0 md:py-0 shadow-md top-0 z-[25] sticky w-full ${!sidebar && 'overflow-hidden'}`}>
        <div className="logo my-1">
          <Link href={'/'}><a className="mx-4"><Image src="/logo.png" alt="" width={150} height={50} className="" /></a></Link>
        </div>
        <div className="md:block hidden">
          <ul className="flex items-center space-x-1 font-bold">
            {menuItems.map((menu, index) => {
              const depthLevel = 0;
              return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
            })}
          </ul>
        </div>
        <div className='md:flex md:flex-1 justify-end'>
          <div className="md:flex flex-1 top-3 justify-end items-center lg:mx-10 mx-2 hidden">
            <input onKeyDown={handleSearch} onChange={handleChange} value={search} className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 w-[80%] lg:flex hidden rounded-lg text-sm focus:outline-none' type="search" name="search" placeholder="Search" />
            <button type="submit" onClick={handleSearch} className="absolute mx-2 text-xl text-gray-400 lg:flex md:hidden sm:flex">
              <AiOutlineSearch />
            </button>
            <button type="submit" onClick={() => setSearchbar(true)} className="absolute mx-2 text-xl text-gray-400 hidden md:flex lg:hidden">
              <AiOutlineSearch />
            </button>
          </div>
          <span className="md:block hidden" onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>
            {token && <MdAccountCircle className="text-2xl mt-2" />}
          </span>
          <div className="cart md:flex hidden top-4 mx-6 cursor-pointer">
            {token == null && <Link href={'/login'}><a>
              <button className='md:flex hidden mr-2 text-white bg-[#9933ff] border-0 py-2 px-3 focus:outline-none hover:bg-[#8000ff] rounded text-sm' >Login</button>
            </a></Link>}
            <AiOutlineShoppingCart onClick={toggleCart} className="text-2xl mt-2" />
            {Object.keys(cart).length > 0 && <span className='absolute right-4 px-1 text-xs border border-indigo-500 bg-[#9933ff] text-white rounded-full'> {cart?.length} </span>}
          </div>
        </div>
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
                        <div className='flex items-center justify-start mt-2 font-semibold text-lg'><RemoveIcon onClick={() => { dispatch(removeFromCart({ slug: item.slug, qty: 1, price: item.price, name: item.name, size: item.size, color: item.variant, category: item.category, img: item.img, fabric: item.fabric })) }} className='cursor-pointer bg-[#8000ff] text-[#f2e5ff] rounded-sm' /><span className='mx-2 text-sm' > {item.qty} </span><AddIcon onClick={() => { dispatch(increment({ slug: item.slug, qty: 1, price: item.price, name: item.name, size: item.size, color: item.variant, category: item.category, img: item.img, fabric: item.fabric })) }} className='cursor-pointer bg-[#8000ff] text-[#f2e5ff] rounded-sm' /></div>
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
              <Link href={'/checkout'} ><button disabled={cart.length === 0} className="disabled:bg-[#cc99ff] flex mr-2 text-white bg-[#9933ff] border-0 py-2 px-2 focus:outline-none hover:bg-[#8000ff] rounded text-sm"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
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
          <Box sx={{
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "80vw",
            bgcolor: 'white',
            boxShadow: 24,
            border: "1px solid white",
            borderRadius: "8px",
          }}>
            <div className={`flex justify-end items-center`}>
              <input onKeyDown={handleSearch} onChange={handleChange} value={search} className='border-2 border-gray-300 bg-white h-10 w-[100%] rounded-lg text-sm focus:outline-none' type="search" name="search" placeholder="Search" />
              <button type="submit" onClick={handleSearch} className="absolute mx-2 text-xl text-gray-400">
                <AiOutlineSearch />
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  )
}

export default Navbar