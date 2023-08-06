import React from "react";
import {
    Typography,
    Table,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import mongoose from "mongoose";
import Order from "../../models/Order";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Head from 'next/head';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
const jwt = require('jsonwebtoken');

const Orderstatus = ({ order, orders }) => {

    const products = order.products;
    const [date, setDate] = useState()

    const router = useRouter()
    const [admin, setAdmin] = useState(false)
    const token = useSelector((state) => state.cartItems.token)
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
    }, [])

    useEffect(() => {

        const date = new Date(order.createdAt)
        setDate(date)

    }, [])

    const handleChange = async (e) => {
        e.preventDefault()
        let data = [{
            _id: order._id,
            name: order.name,
            phone: order.phone,
            orderId: order.orderId,
            paymentinfo: order.paymentinfo,
            products: order.products,
            address: order.address,
            district: order.district,
            state: order.state,
            pincode: order.pincode,
            transactionid: order.transactionid,
            subtotal: order.subtotal,
            cgst: order.cgst,
            sgst: order.sgst,
            amount: order.amount,
            status: order.status,
            deliveryStatus: e.target.name
        }]
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateorders`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let res = await a.json()
        if (res.success) {
            toast.success("Order Successfully Updated", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                router.push(`/admin/orderstatus?id=${order._id}`)
            }, 2000);
        }
        else {
            toast.error("Some Error Occured ! Could not Update products", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const handleOrderChange = () => {
        router.push(`/admin/orderstatus?id=${orders[0]._id}`)
    }

    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
                .navbar-show{
                    display: none;
                }
                footer{
                    display: none;
                }
                `}</style>
            {admin && <FullLayout>
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
                <BaseCard title="Order Details">

                    <div className="container mx-auto">
                        <div className="px-4 mx-auto flex flex-wrap">
                            <div className="w-full lg:pr-10 mb-6 lg:mb-0">
                                <h1 className="text-gray-900 text-xl title-font font-medium mb-4">Order Id: {order.orderId}</h1>
                                <p className="leading-relaxed mb-4">Order placed on: <b>{date && date.toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</b> </p>
                                <p className="leading-relaxed mb-4">Status: <b>{order.status}!</b></p>

                                {Object.keys(products).map((key, index) => {
                                    return <div className="flex flex-wrap my-3 space-x-2 flex-row px-4 shadow-md" key={index}>
                                        <p className="mr-1 font-semibold text-sm">{index + 1}.</p>
                                        <div className='flex flex-col'>
                                            <div className='font-semibold flex flex-row text-black'>{products[key].name} ({products[key].size}/{products[key].variant})</div>
                                            <div className='flex space-x-6'>
                                                <div className='flex items-center justify-start mt-2 font-semibold text-lg'>
                                                    <span className='mx-2 text-sm' > Quantity: {products[key].qty} </span>
                                                </div>
                                                <div className='flex items-center text-sm mt-3 justify-start space-x-1'>
                                                    <p className='font-semibold'>Price Per Item: </p>
                                                    <p>₹{products[key].price}</p>
                                                </div>
                                                <div className='flex items-center text-sm mt-3 justify-start space-x-1'>
                                                    <p className='font-semibold'>Total Price: </p>
                                                    <p>₹{products[key].price * products[key].qty}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <img style={{ height: '110px' }} src={products[key].img} alt={`product-img${index}`} />
                                    </div>
                                })}

                                <div className="flex flex-col">
                                    <div className="flex my-4">
                                        {order.subtotal && <span className="title-font my-1 mx-6 font-medium text-gray-900">Subtotal: ₹{order.subtotal}</span>}
                                        {order.cgst && <span className="title-font my-1 mx-6 font-medium text-gray-900">CGST: ₹{order.cgst}</span>}
                                        {order.sgst && <span className="title-font my-1 mx-6 font-medium text-gray-900">SGST: ₹{order.sgst}</span>}
                                        {order.amount && <span className="title-font my-1 mx-6 font-medium text-gray-900">Total Amount: ₹{order.amount}</span>}
                                    </div>
                                    <div className='my-2'>
                                        {/* <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button> */}
                                    </div>
                                    <p className="mb-2 text-sm"><b>Name:</b> {order.name}</p>
                                    <p className="mb-2 text-sm"><b>Phone:</b> {order.phone}</p>
                                    <p className="mb-2 text-sm"><b>Email:</b> {order.email}</p>
                                    <p className="mb-2 text-sm"><b>Address:</b> {order.address}</p>
                                    <p className="mb-2 text-sm"><b>Pincode:</b> {order.pincode}</p>
                                    <p className="mb-2 text-sm"><b>District:</b> {order.district}</p>
                                    <p className="mb-2 text-sm"><b>State:</b> {order.state}</p>
                                    <p className="mb-2 text-sm"><b>Transaction ID:</b> {order.transactionid}</p>
                                    {/* <p className="mb-2 text-sm"><b>Delivery Status:</b> {order.deliveryStatus}</p> */}
                                    <div className='flex flex-row'>
                                        <button disabled={order.deliveryStatus == 'dispatched'} className="m-4 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer disabled:bg-blue-300" name='dispatched' onClick={handleChange}>Dispatch</button>
                                        <button disabled={order.deliveryStatus == 'unshipped'} className="m-4 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer disabled:bg-blue-300" name='unshipped' onClick={handleChange}>Cancel Dispatch</button>
                                    </div>
                                    {Object.keys(orders).length >= 1 && <div className='flex flex-row'>
                                        <button className="m-4 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer disabled:bg-blue-300" name='dispatched' onClick={handleOrderChange}>Next Order</button>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>

                </BaseCard>
            </FullLayout>}
            {
                !admin && <div className="min-h-screen flex m-auto">
                    <Head>
                        <title>404 - Page Not Found</title>
                        <meta name="description" content="Quality of classes at proces of masses." />
                        <link rel="icon" href="/icon.png" />
                    </Head>
                    <h1 className="m-auto font-semibold text-xl">404 - Page Not Found</h1>
                </div>
            }
        </ThemeProvider >
    );
};

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let orders = await Order.find({ status: 'Payment Successful', deliveryStatus: 'unshipped' })
    let order = await Order.findById(context.query.id)

    return {
        props: { order: JSON.parse(JSON.stringify(order)), orders: JSON.parse(JSON.stringify(orders)) }, // will be passed to the page component as props
    }
}

export default Orderstatus;
