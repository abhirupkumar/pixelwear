import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { setToken } from '../features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

const Signup = () => {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [otpPin, setOtpPin] = useState('')
  const [sendOtp, setSendOtp] = useState(false)

  const token = useSelector((state) => state.cartItems.token)
  useEffect(() => {
    if (token) {
      router.push('/');
    }
  }, [])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pinLoading, setPinLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleChange = async (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'otp') {
      setOtp(e.target.value)
    }
  }

  const OtpSend = async (e) => {
    e.preventDefault() //prevents reloading the form after setup
    setPinLoading(true)
    const data = { name, email, password, sendOtp: true, otp: Math.floor(Math.random() * 1000000) }
    let res = await fetch(`/api/signup`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    setOtpPin(response.pin);
    setPinLoading(false)
    toast.success('OTP Sent Successfully to the entered email id!', {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setSendOtp(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault() //prevents reloading the form after setup
    setLoading(true)
    const data = { name, email, password }
    let res = await fetch(`/api/signup`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    setName('')
    setEmail('')
    setPassword('')
    setLoading(false)
    if (response.success) {
      toast.info('Just wait your account is been created.', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const data2 = { email, password }
      let res2 = await fetch(`/api/login`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data2),
      })
      let response2 = await res2.json()
      dispatch(setToken({ token: response2.token }))
      router.push(`/`)
      toast.success('Your account has been created! Please Login If not logged in automatically.', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast.error(response.error, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }

  return (
    <div>
      <Head>
        <title>Signup - Le-Soft</title>
        <meta name="description" content="Quality of classes at proces of masses." />
        <link rel="icon" href="/icon.png" />
      </Head>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="min-h-full mt-10 flex items-center justify-center pt-12 pb-44 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link href={'/'}><img className="mx-auto h-12 w-auto cursor-pointer rounded-md" src="/logo.png" alt="Workflow" /></Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
            <div className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href={'/login'}><div href="#" className="font-medium text-[#5377ec] hover:text-[#1a4ffd]"> Login </div></Link>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input value={name} onChange={handleChange} id="name" name="name" type="text" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Name" />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address" />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password" />
              </div>
            </div>
            {pinLoading ? <CircularProgress color="secondary" /> : <div>
              <button type="button" onClick={OtpSend} className="my-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1a4ffd] hover:bg-[#1440d3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                  <svg className="h-5 w-5 text-[#ecf3f8] group-hover:text-[#abc6ff]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {!sendOtp ? "Send Otp" : "Resend Otp"}
              </button>
            </div>}
            {sendOtp && <div>
              <label htmlFor="otp" className="sr-only">Otp</label>
              <input value={otp} onChange={handleChange} id="otp" name="otp" type="text" autoComplete="otp" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="OTP" />
            </div>}
            <div>
              {loading ? <CircularProgress color="secondary" /> : sendOtp && <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1a4ffd] hover:bg-[#1440d3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                  <svg className="h-5 w-5 text-[#ecf3f8] group-hover:text-[#abc6ff]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Sign Up
              </button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup