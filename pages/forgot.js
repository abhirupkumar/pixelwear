import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')

  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }

  }, [])

  const handleChange = async (e) => {
    if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    if (e.target.name == 'cpassword') {
      setCpassword(e.target.value)
    }
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
  }

  const token = '';
  const sendResetEmail = async (e) => {
    e.preventDefault()
    if (email != '') {
      let data = {
        email,
        sendMail: true
      }
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let res = await a.json()
      if (res.success) {
        toast.success(res.message, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        token = res.token
      }
      else {
        toast.error('Error Encoutered', {
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
  }

  const resetPassword = async (e) => {
    e.preventDefault()
    if (password == cpassword) {
      let data = {
        token: router.query.token,
        password,
        sendMail: false
      }
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let res = await a.json()
      if (res.success) {
        toast.success(res.message, {
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
        toast.error(res.message, {
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
      toast.error(res.message, {
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
    <div className="min-h-full m-10 flex items-center justify-center pt-12 pb-64 px-4 sm:px-6 lg:px-8">
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
      <div className="max-w-md w-full space-y-8">
        {router.query.token && <div>
          <div>
            <Link href={'/'}><img className="mx-auto h-12 w-auto cursor-pointer" src="/logo.png" alt="Workflow" /></Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href={'/login'}><a href="#" className="font-medium text-blue-600 hover:text-blue-500"> Login </a></Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">New Password</label>
                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="New Password" />
              </div>
              <div>
                <label htmlFor="cpassword" className="sr-only">Confirm New Password</label>
                <input value={cpassword} onChange={handleChange} id="cpassword" name="cpassword" type="password" autoComplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Confirm New Password" />
              </div>
            </div>

            <div>
              <button disabled={password !== cpassword} onClick={resetPassword} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                  <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Continue
              </button>
              {cpassword && password != cpassword && <span className='text-red-500'>Passwords didn't match.</span>}
              {password && password == cpassword && <span className='text-green-500'>Passwords matched.</span>}
            </div>
          </form>
        </div>}
        {!router.query.token && <div>
          <div>
            <Link href={'/'}><img className="mx-auto h-12 w-auto cursor-pointer" src="/logo.png" alt="Workflow" /></Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href={'/login'}><a href="#" className="font-medium text-blue-600 hover:text-blue-500"> Login </a></Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input value={email} onChange={handleChange} id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address" />
              </div>
            </div>

            <div>
              <button onClick={sendResetEmail} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                  <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Continue
              </button>
            </div>
          </form>
        </div>}
      </div>
    </div>
  )
}

export default Forgot