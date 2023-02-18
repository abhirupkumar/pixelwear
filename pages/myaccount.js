import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
const jwt = require('jsonwebtoken')

const Myaccount = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [pincode, setPincode] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [npassword, setNpassword] = useState('')
    const [user, setUser] = useState({ value: null })
    const token = useSelector((state) => state.cartItems.token);

    const router = useRouter()
    useEffect(() => {
        if (!token) {
            router.push('/')
        }
        if (token) {
            setUser(token)
            setEmail(jwt.decode(token).email)
            fetchData(token)
        }

    }, [])

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
    }

    const handleUserSubmit = async () => {
        let data = { token: user.token, name, phone, address, pincode }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let res = await a.json()
        if (res.success) {
            toast.success("Delivery Details Successfully Updated!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const handlePassword = async () => {
        let res;
        if (npassword == cpassword) {
            let data = { token: user.token, password, cpassword, npassword }
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            res = await a.json()
        }
        else {
            res = { success: false }
        }
        if (res.success) {
            toast.success("Password Updated Successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            toast.error("Error While Updating Password!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setPassword('')
        setCpassword('')
        setNpassword('')
    }



    const handleChange = async (e) => {

        if (e.target.name == 'name') {
            setName(e.target.value)
        }
        else if (e.target.name == 'address') {
            setAddress(e.target.value)
        }
        else if (e.target.name == 'phone') {
            setPhone(e.target.value)
        }
        else if (e.target.name == 'pincode') {
            setPincode(e.target.value)
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
        else if (e.target.name == 'cpassword') {
            setCpassword(e.target.value)
        }
        else if (e.target.name == 'npassword') {
            setNpassword(e.target.value)
        }
    }


    return (
        <div>
            <ToastContainer
                position="top-right"
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
                <title>My Account - Le-Soft</title>
                <meta name="description" content="Quality of classes at proces of masses." />
                <link rel="icon" href="/icon.png" />
            </Head>
            <div className='container mx-auto my-9'>
                <h1 className='text-3xl text-center font-bold my-6'>Update Your Account</h1>
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
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email(Cannot be updated)</label>
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

                </div>
                <button onClick={handleUserSubmit} className="m-2 ml-5 disabled:bg-indigo-300 flex mb-5 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">Submit</button>

                <h2 className='font-semibold text-xl'>2. Change Password</h2>
                <div className="mx-auto flex my-2">
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Old Password</label>
                            <input value={password} onChange={handleChange} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password</label>
                            <input value={npassword} onChange={handleChange} type="password" id="npassword" name="npassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm New Password</label>
                            <input value={cpassword} onChange={handleChange} type="password" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                </div>
                <button onClick={handlePassword} className="m-2 ml-5 disabled:bg-indigo-300 flex mb-5 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">Submit</button>
            </div>
        </div>
    )
}

export default Myaccount