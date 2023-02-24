import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increment, clearCart, removeFromCart } from '../features/cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
const jwt = require('jsonwebtoken');

const Checkout = () => {

  const router = useRouter()
  const cart = useSelector((state) => state.cartItems.cart);
  const subTotal = useSelector((state) => state.cartItems.subTotal);
  const dispatch = useDispatch();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState({ value: null })
  const [loading, setLoading] = useState(false)
  const [paid, setPaid] = useState(false)
  let CGST_tax = parseFloat(subTotal * 5.5 / 100);
  let SGST_tax = parseFloat(subTotal * 5.5 / 100);
  let amount = parseFloat(subTotal + CGST_tax + SGST_tax).toFixed(2);

  const token = useSelector((state) => state.cartItems.token)

  useEffect(() => {
    if (token) {
      setUser(token)
      setEmail(jwt.decode(token).email)
      fetchData(token)
    }
  }, [])

  useEffect(() => {
    if (name.length > 3 && email.length > 3 && address.length > 3 && phone.length > 3 && pincode.length > 3 && subTotal > 0) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }, [name, email, address, phone, pincode, subTotal])

  const fetchData = async (token) => {
    let data = { token: token }
    let a = await fetch(`/api/getuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await a.json()
    setName(res.name)
    setAddress(res.address)
    setPincode(res.pincode)
    setPhone(res.phone)
    getPinCode(res.pincode)
  }

  const getPinCode = async (pincode) => {
    let url = 'https://api.postalpincode.in/pincode/' + pincode
    let pins = await fetch(url, {
      Method: 'GET'
    })
    let pinJson = await pins.json()
    if (pinJson[0].Status == 'Success') {
      setState(pinJson[0].PostOffice[0].State)
      setCity(pinJson[0].PostOffice[0].District)
    }
    else {
      setState('')
      setCity('')
    }
  }



  const handleChange = async (e) => {

    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
      if (e.target.value.length == 6) {
        getPinCode(e.target.value)
      }
    }
  }

  const initializeRazorpay = async (e) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  }

  const transactions = async (data, id) => {
    let payments = await fetch(`/api/posttransaction`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let pay = await payments.json()
    if (pay.success) {
      setPaid(true)
      router.push(`/order?clearCart=1&id=${id}`)
    }
    else {
      toast.error("Some error occured!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const makePayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await initializeRazorpay();
    let oid = Math.floor(Math.random() * Date.now());
    if (!res) {
      alert("Your are offline.... Razorpay SDK Failed to load");
      return;
    }
    const pdata = { cart, amount: amount, subTotal: subTotal, cgst: CGST_tax, sgst: SGST_tax, email: email, name, address, oid, pincode, phone, state, city };
    let sdata = await fetch(`/api/pretransaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pdata),
    })
    let data = await sdata.json()

    if (data.cartClear) {
      dispatch(clearCart())
    }

    if (!data.success) {
      toast.error(data.error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      var options = {
        key: process.env.RAZORPAY_KEY,
        name: "Le-Soft",
        currency: "INR",
        amount: data.amount,
        order_id: data.id,
        description: "Thank You for purchasing from Le-Soft India.",
        image: "/logo.png",
        handler: function (response) {
          let res = {
            "razorpay_payment_id": response.razorpay_payment_id,
            "razorpay_order_id": response.razorpay_order_id,
            "razorpay_signature": response.razorpay_signature
          }
          const p2data = { cart, subTotal: subTotal, id: data.id, _id: data._id, payment_id: response.razorpay_payment_id, email: email, name, address, pincode, phone, state, city, response: res };
          transactions(p2data, data._id);

        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
    setLoading(false)
  };

  return (
    <div className="min-h-screen">
      <div className='container px-2 sm:m-auto'>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Head>
          <title>Checkout</title>
          <meta name="description" content="Quality of classes at prices of masses." />
          <link rel="icon" href="/icon.png" />
        </Head>
        {!paid ? <>
          <h2 className='text-5xl mt-[2rem] mb-[4rem] font-bold text-center'>Checkout</h2>
          {token ? <>
            <div className='flex lg:flex-row flex-col space-x-4 items-start mb-10 justify-start'>
              <div className='lg:w-[50%] w-[100%]'>
                <h2 className='font-semibold text-xl ml-1'>1. Delivery Details</h2>
                <div className="mx-auto flex my-2">
                  <div className="px-2 w-1/2">
                    <div className="mb-4">
                      <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                      <input value={name} onChange={handleChange} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                  </div>
                  <div className="px-2 w-1/2">
                    <div className="mb-4">
                      <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                      {user && user.token ? <input value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly /> : <input value={email} onChange={handleChange} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}

                    </div>
                  </div>
                </div>
                <div className="px-2 w-full">
                  <div className="mb-4">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                    <textarea onChange={handleChange} value={address} name="address" id="address" cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                  </div>
                </div>
                <div className="mx-auto flex my-2">
                  <div className="px-2 w-1/2">
                    <div className="mb-4">
                      <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                      <input value={phone} onChange={handleChange} placeholder="Your 10 digit phone number" type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                  </div>
                  <div className="px-2 w-1/2">
                    <div className="mb-4">
                      <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                      <input value={pincode} onChange={handleChange} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                  </div>
                </div>
                <div className="mx-auto flex my-2">
                  <div className="px-2 w-1/2">
                    <div className="mb-4">
                      <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                      <input onChange={handleChange} value={state} type="text" id="state" name="state" className="w-full bg-[#E1E1E0] rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                  </div>
                  <div className="px-2 w-1/2">
                    <div className="mb-4">
                      <label htmlFor="city" className="leading-7 text-sm text-gray-600">District</label>
                      <input onChange={handleChange} value={city} type="text" id="city" name="city" className="w-full bg-[#E1E1E0] rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                  </div>
                </div>
              </div>
              <div className='lg:w-[50%] w-[100%] flex flex-col justify-start'>
                <h2 className='font-semibold text-xl'>2. Review Cart Items & Pay</h2>
                <div className="cartItems bg-[#f2e5ff] py-6 px-10">

                  <ol className='list-decimal font-semibold '>
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
                    <div className="font-bold my-2">CGST(5.5%): ₹{CGST_tax}</div>
                    <div className="font-bold my-2">SGST(5.5%): ₹{SGST_tax}</div>
                    <div className="font-bold my-2">Amount Payable: ₹{amount}</div>
                  </ol>
                  <div className="mx-4">
                    {loading ? <CircularProgress color="secondary" /> : <Link href={'/checkout'} ><button disabled={disabled} onClick={makePayment} className="disabled:bg-[#c993ff] flex mx-auto mt-8 w-[15rem] text-white bg-[#9933ff] border-0 py-2 px-2 focus:outline-none hover:bg-[#a044fc] rounded-sm text-sm justify-center"><BsFillBagCheckFill className='m-1' />Complete Payment</button></Link>}
                  </div>
                </div>
              </div>
            </div>
          </>
            :
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-2xl font-semibold">Login to Checkout</h1>
              <div className="flex flex-col justify-center items-center">
                <Link href='/login'><button className="flex mx-auto mt-8 w-[15rem] text-white bg-[#9933ff] border-0 py-2 px-2 focus:outline-none hover:bg-[#a044fc] rounded-sm text-sm justify-center"><BsFillBagCheckFill className='m-1' />Login</button></Link>
              </div>
            </div>}
        </>
          :
          <div className="mt-10 flex w-full justify-center items-center">
            <h1>Thank for Ordering from Le-Soft.</h1>
          </div>}
      </div>
    </div>
  )
}

export default Checkout