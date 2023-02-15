import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AiFillCloseCircle, AiFillHome, AiFillMinusCircle, AiFillPlusCircle, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdAccountCircle } from 'react-icons/md';
import { menuItems } from '../menuItems';
import MenuItems from "./MenuItems";
import { Drawer, Box, Typography, IconButton, Stack, BottomNavigation, BottomNavigationAction, MenuItem, Menu } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close';
import { List, ListItem, ListItemText, ListItemIcon, ListItemAvatar, Avatar, ListItemButton, Divider } from '@mui/material';
import { RiAccountCircleFill } from 'react-icons/ri';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, removeFromCart } from '../features/cartSlice';
import { PersonAdd, Settings } from '@material-ui/icons';
import { Logout } from '@mui/icons-material';

const Navbar = ({ logout, user }) => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartItems.cart)
  const subTotal = useSelector((state) => state.cartItems.subTotal)
  const [dropdown, setDropdown] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [admin, setAdmin] = useState(true)
  const [menu, setMenu] = useState(false)
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
      {!sidebar && <span onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className='fixed right-12 top-4 z-50 cursor-pointer lg:block hidden' >
        {dropdown && <div className="absolute lg:block hidden right-6 bg-indigo-100 shadow-lg top-7 py-4 rounded-md px-5 w-32 z-30">
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
      <div className='lg:hidden block fixed left-8 top-0 z-[27]'>
        {/* <MenuIcon /> */}
        <IconButton size='large' edge='start' color='inherit' aria-label='logo' sx={{ top: '14px' }} onClick={() => setIsDrawerOpen(true)}>
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

      <div className={`navbar-show flex flex-row bg-white md:justify-start justify-center items-center py-0 md:py-0 shadow-md top-0 z-[25] fixed w-full ${!sidebar && 'overflow-hidden'}`}>
        <div className="logo my-1">
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
            <button className='lg:flex hidden mr-2 text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm' >Login</button>
          </a></Link>}
          <AiOutlineShoppingCart onClick={toggleCart} className="text-2xl mt-2" />
          {Object.keys(cart).length > 0 && <span className='absolute right-0 mx-[-5px] mt-[-2px] px-1 text-xs border border-indigo-500 bg-indigo-500 text-white rounded-full'> {cart?.length} </span>}
        </div>
        <Drawer anchor='right' open={sidebar} onClose={() => setSidebar(false)} className="z-[45]">
          <div className={`h-[100vh] md:min-w-[40rem]  top-0 bg-blue-100 px-8 py-10 transition-all `}>
            <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
            <span onClick={toggleCart} className='absolute top-5 right-3 text-3xl cursor-pointer text-blue-500'><AiFillCloseCircle /></span>
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
      </div></>
  )
}

export default Navbar