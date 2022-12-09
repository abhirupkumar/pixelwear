import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Script from 'next/script'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({ cart, clearCart, subTotal, addToCart, removeFromCart }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState({ value: null })

  const router = useRouter()

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
    let a = await fetch(`https://pixelwear.vercel.app/api/getuser`, {
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
        // let pins = await fetch(`https://pixelwear.vercel.app/api/pincode`)
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

  // const initiatePayment = async () => {
  //   let oid = Math.floor(Math.random() * Date.now());
  //   //Get a transaction token
  //   const data = { cart, subTotal, oid, email: email, name, address, pincode, phone, state, city };
  //   let a = await fetch(`https://pixelwear.vercel.app/api/pretransaction`, {
  //     method: 'POST', // or 'PUT'
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //   let txnRes = await a.json()
  //   if (txnRes.success) {

  //     let txnToken = txnRes.txnToken


  //     var config = {
  //       "root": "",
  //       "flow": "DEFAULT",
  //       "data": {
  //         "orderId": oid, /* update order id */
  //         "token": txnToken, /* update token value */
  //         "tokenType": "TXN_TOKEN",
  //         "amount": subTotal /* update amount */
  //       },
  //       "handler": {
  //         "notifyMerchant": function (eventName, data) {
  //           console.log("notifyMerchant handler function called");
  //           console.log("eventName => ", eventName);
  //           console.log("data => ", data);
  //         }
  //       }
  //     };

  //     window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
  //       // after successfully updating configuration, invoke JS Checkout
  //       window.Paytm.CheckoutJS.invoke();
  //     }).catch(function onError(error) {
  //       console.log("error => ", error);
  //     });
  //   }
  //   else {
  //     console.log(txnRes.error)
  //     if (txnRes.cartClear) {
  //       clearCart()
  //     }
  //     toast.error(txnRes.error, {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // }

  const initializeRazorpay = () => {
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
  };

  const transactions = async (data, id) => {
    // let d = await fetch(`https://api.razorpay.com/v1/payments/${payment}/capture`, {
    //   method: 'GET',
    //   mode: 'no-cors',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({"amount": amount, "currency": "INR"}),
    // })
    // let dt = await d.json()
    // console.log(dt)
    let payments = await fetch(`https://pixelwear.herokuapp.com/api/posttransaction`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let pay = await payments.json()
    if(pay.success){
      router.push(`/order?clearCart=1&id=${id}`)
    }
    else{
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

  const makePayment = async () => {
    const res = await initializeRazorpay();
    let oid = Math.floor(Math.random() * Date.now());
    if (!res) {
      alert("Your are offline.... Razorpay SDK Failed to load");
      return;
    }

    // const pdata = { cart, subTotal: subTotal, oid, email: email, name, address, pincode, phone, state, city };
    // let a = await fetch(`https://pixelwear.herokuapp.com/api/pretransaction`, {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(pdata),
    // })
    // let response = a.json()

    // var options = {
    //         key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
    //         name: "Pixelwear",
    //         currency: "INR",
    //         amount: data.amount,
    //         order_id: data.id,
    //         description: "Thank You for your test donation",
    //         image: "/logo.png",
    //         handler: function (response) {
    //             // Validate payment at server - using webhooks is a better idea
    //             alert(response.razorpay_payment_id)
    //             alert(response.razorpay_order_id);
    //             alert(response.razorpay_signature);
    //         },
    //         prefill: {
    //             name: name,
    //             email: email,
    //             contact: phone,
    //         },
    //     };

    //     const paymentObject = new window.Razorpay(options);
    //     paymentObject.open();

    // let received_data = await a.json()
    const pdata = { cart, subTotal: subTotal, email: email, name, address, pincode, phone, state, city };
    let sdata = await fetch(`https://pixelwear.herokuapp.com/api/pretransaction`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pdata),
    })
    let data = await sdata.json()

    if (!data.success) {
      toast.error(data.err, {
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
      // const pdata = { cart, subTotal: subTotal, oid: data.id, email: email, name, address, pincode, phone, state, city };
      // let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      //   method: 'POST', // or 'PUT'
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(pdata),
      // })
      // let response = a.json()
      // if(response.success)
      // {
      // let call_url = `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`
      // var options = {
      //     "key": process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      //     "amount": (req.body.subTotal*100).toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      //     "currency": "INR",
      //     "name": "Pixelwear",
      //     "description": "Test Transaction",
      //     "image": "/logo.png",
      //     "order_id": req.body.oid, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      //     "callback_url": call_url,
      //     "prefill": {
      //         "name": req.body.name,
      //         "email": req.body.email,
      //         "contact": req.body.phone
      //     },
      //     "notes": {
      //         "address": "Razorpay Corporate Office"
      //     },
      //     "theme": {
      //         "color": "#3399cc"
      //     }
      // };

      var options = {
        key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        name: "Pixelwear",
        currency: "INR",
        amount: data.amount,
        order_id: data.id,
        description: "Thank You for your test donation",
        image: "/logo.png",
        handler: function (response) {
          // Validate payment at server - using webhooks is a better idea
          // alert(response.razorpay_payment_id)
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          let res = {
            "razorpay_payment_id": response.razorpay_payment_id,
            "razorpay_order_id": response.razorpay_order_id,
            "razorpay_signature": response.razorpay_signature
          }
          const p2data = { cart, subTotal: subTotal, id: data.id, _id: data._id, payment_id: response.razorpay_payment_id, email: email, name, address, pincode, phone, state, city, response: res };
          transactions(p2data, data._id);
          // var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET })

          // paymentId = "pay_Jypa3wk9PBS7zx"

          // instance.payments.fetch(paymentId)
          // console.log(instance)
          // if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
          //   alert("Payment failed! Please Try Again.")
          // }
          // else {
          //   order = await Order.findOneAndUpdate({ orderId: data.id }, { status: "Payment Successful", paymentinfo: JSON.stringfy(res), transactionid: req.body.TXNID })
          //   for (let slug in products) {
          //     await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": - products[slug].qty } })
          // }
          // let products = order.products
          //   router.push('/order?clearCart=1&id=' + data._id, 200)
          // }
          // const p2data = { cart, subTotal: subTotal, _id: data._id, payment_id: response.razorpay_payment_id, email: email, name, address, pincode, phone, state, city, response: response };
          // await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`, {
          //   method: 'POST', // or 'PUT'
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(p2data),
          // })

        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      // }
      // else{
      //   toast.error(response.error, {
      //     position: "top-center",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });
      // }
    }
    // res.redirect('/order?clearCart=1&id=' + received_data.objectId, 200)
  };

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
        <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head>
        {/* <Script type="application/javascript" crossOrigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} /> */}
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
            {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your cart is Empty!</div>}
            {Object.keys(cart).map((k) => {
              return <li key={k}>
                <div className="item flex my-5">
                  <div className='font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                  <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                    <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant, cart[k].category, cart[k].img) }} className='cursor-pointer text-blue-500' /><span className='mx-2 text-sm' >{cart[k].qty}</span>
                    <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant, cart[k].category, cart[k].img) }} className='cursor-pointer text-blue-500' /></div>
                </div>
              </li>
            })}
          </ol>
          <span className="font-bold">Subtotal: ₹{subTotal}</span>
        </div>
        <div className="mx-4">
          {/* <Link href={'/checkout'} ><button disabled={disabled} onClick={initiatePayment} className="disabled:bg-indigo-300 flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Pay ₹{subTotal}</button></Link> */}
          <Link href={'/checkout'} ><button disabled={disabled} onClick={makePayment} className="disabled:bg-indigo-300 flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Pay ₹{subTotal}</button></Link>
        </div>
      </div>
    </>
  )
}

export default Checkout
