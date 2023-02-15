import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, clearCart, removeFromCart } from '../features/cartSlice'

const Checkout = () => {

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

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if (myuser && myuser.token) {
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)
    }
  }, [])

  useEffect(() => {
    if (name.length > 3 && email.length > 3 && address.length > 3 && phone.length > 3 && pincode.length > 3) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }, [name, email, address, phone, pincode])

  const fetchData = async (token) => {
    let data = { token: token }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
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
        // let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        // let pinJson = await pins.json()
        // if (Object.keys(pinJson).includes(e.target.value)) {
        //   setState(pinJson[e.target.value][1])
        //   setCity(pinJson[e.target.value][0])
        // }
        // else {
        //   setState('')
        //   setCity('')
        // }
      }
    }
  }

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    //Get a transaction token
    const data = { cart, subTotal, oid, email: email, name, address, pincode, phone, state, city };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let txnRes = await a.json()
    if (txnRes.success) {

      let txnToken = txnRes.txnToken


      var config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
          "orderId": oid, /* update order id */
          "token": txnToken, /* update token value */
          "tokenType": "TXN_TOKEN",
          "amount": subTotal /* update amount */
        },
        "handler": {
          "notifyMerchant": function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          }
        }
      };

      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      }).catch(function onError(error) {
        console.log("error => ", error);
      });
    }
    else {
      console.log(txnRes.error)
      if (txnRes.cartClear) {
        clearCart()
      }
      toast.error(txnRes.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
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
        <Script type="application/javascript" crossOrigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} />
        <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
        <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
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
              <input onChange={handleChange} value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">District</label>
              <input onChange={handleChange} value={city} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <h2 className='font-semibold text-xl'>2. Review Cart Items & Pay</h2>
        <div className="sideCart bg-blue-100 p-6 m-2">

          <ol className='list-decimal font-semibold'>
            {cart?.length == 0 && <div className='my-4 font-semibold'>Your cart is Empty!</div>}
            {cart?.map((item, index) => {
              return <li key={index}>
                <div className="item flex my-5">
                  <div className='font-semibold'>{item.name} ({item.size}/{item.variant})</div>
                  <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                    <AiFillMinusCircle onClick={() => dispatch(removeFromCart({ slug: item.slug, qty: 1, price: item.price, name: item.name, size: item.size, color: item.variant, category: item.category, theme: item.theme, img: item.img, img2: item.img2, img3: item.img3, img4: item.img4 }))} className='cursor-pointer text-blue-500' /><span className='mx-2 text-sm' >{item.qty}</span>
                    <AiFillPlusCircle onClick={() => dispatch(addToCart({ slug: item.slug, qty: 1, price: item.price, name: item.name, size: item.size, color: item.variant, category: item.category, theme: item.theme, img: item.img, img2: item.img2, img3: item.img3, img4: item.img4 }))} className='cursor-pointer text-blue-500' /></div>
                </div>
              </li>
            })}
          </ol>
          <span className="font-bold">Subtotal: ₹{subTotal}</span>
        </div>
        <div className="mx-4">
          <Link href={'/checkout'} ><button disabled={disabled} onClick={initiatePayment} className="disabled:bg-indigo-300 flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Pay ₹{subTotal}</button></Link>
        </div>
      </div>
    </>
  )
}

export default Checkout