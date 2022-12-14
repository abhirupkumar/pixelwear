import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }

  }, [])

  const [name, setName] = useState('')
  const [otp, setOtp] = useState('')
  const [otpPin, setOtpPin] = useState('')
  const [sendOtp, setSendOtp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    otpPin = Math.floor(Math.random() * 1000000);
    setOtpPin(otpPin)
    e.preventDefault() //prevents reloading the form after setup
    const data = { name, email, password, sendOtp: true, otp: otpPin }

    let res = await fetch(`https://pixelwear.vercel.app/api/signup`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    toast.success('OTP Sent Successfully to the entered email id!', {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sendOtp = true;
    setSendOtp(sendOtp)
  }

  const handleSubmit = async (e) => {
    e.preventDefault() //prevents reloading the form after setup
    if (otp == otpPin) {
      const data = { name, email, password, sendOtp: false }

      let res = await fetch(`https://pixelwear.vercel.app/api/signup`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let response = await res.json()
      if (response.success) {
        setName('')
        setEmail('')
        setOtp('')
        setPassword('')
        toast.success('Your account has been created! Please Login', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else{
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
    else {
      toast.error('Otp didnot match! Retype your Otp.', {
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
        <title>Signup - PixelWear</title>
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
      <div className="min-h-full flex items-center justify-center pt-12 pb-44 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link href={'/'}><img className="mx-auto h-12 w-auto cursor-pointer" src="/logo.png" alt="Workflow" /></Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href={'/login'}><a href="#" className="font-medium text-blue-600 hover:text-blue-500"> Login </a></Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address" />
              </div>
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input value={name} onChange={handleChange} id="name" name="name" type="text" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Name" />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password" />
              </div>
              <div>
                <button type="button" onClick={OtpSend} className="my-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                    <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {!sendOtp ? "Send Otp" : "Resend Otp"}
                </button>
              </div>
              {sendOtp && <div>
                <label htmlFor="otp" className="sr-only">Otp</label>
                <input value={otp} onChange={handleChange} id="otp" name="otp" type="text" autoComplete="otp" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="OTP" />
              </div>}
            </div>

            {otp && otp != otpPin && <span className='text-red-500'>Otp didn't match.</span>}
            {otp && otp == otpPin && <span className='text-green-500'>Otp matched.</span>}
            <div>
              {sendOtp && <button onClick={handleSubmit} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                  <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
