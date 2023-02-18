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
        if (token && email != '' && (email == process.env.EMAIL1 || email == process.env.EMAIL2)) {
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
            phone: order.name,
            orderId: order.orderId,
            paymentinfo: order.paymentinfo,
            products: order.products,
            address: order.address,
            district: order.district,
            state: order.state,
            pincode: order.pincode,
            transactionid: order.transactionid,
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
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <div className=" w-full lg:pr-10 mb-6 lg:mb-0">
                                <h1 className="text-gray-900 text-xl title-font font-medium mb-4">Order Id: {order.orderId}</h1>
                                <p className="leading-relaxed mb-4">Order placed on: <b>{date && date.toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</b> </p>
                                <p className="leading-relaxed mb-4">Status: <b>{order.status}!</b></p>
                                <Table
                                    aria-label="simple table"
                                    sx={{
                                        mt: 3,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">
                                                <Typography color="textSecondary" variant="h6">
                                                    Item Descritption
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography color="textSecondary" variant="h6">
                                                    Image
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography color="textSecondary" variant="h6">
                                                    Quantity
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography color="textSecondary" variant="h6">
                                                    Price Per Item
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography color="textSecondary" variant="h6">
                                                    Total Price
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    {Object.keys(products).map((key) => {
                                        return <TableRow key={key}>
                                            <TableCell align="center">
                                                <Typography
                                                    sx={{
                                                        fontSize: "13px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {products[key].name} ({products[key].size}/{products[key].variant})
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography
                                                    sx={{
                                                        fontSize: "13px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    <img style={{ height: '60px' }} src={products[key].img} alt='' />
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography
                                                    sx={{
                                                        fontSize: "13px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {products[key].qty}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography
                                                    sx={{
                                                        fontSize: "13px",
                                                        fontWeight: "500",
                                                        color: "blue",
                                                    }}
                                                >
                                                    ₹{products[key].price}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography
                                                    sx={{
                                                        fontSize: "13px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    ₹{products[key].price * products[key].qty}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    })}
                                </Table>

                                <div className="flex flex-col">
                                    <span className="title-font my-2 font-medium text-2xl text-gray-900">Subtotal: ₹{order.amount}</span>
                                    <div className='my-2'>
                                        {/* <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button> */}
                                    </div>
                                    <p className="mb-4"><b>Name:</b> {order.name}</p>
                                    <p className="mb-4"><b>Phone:</b> {order.phone}</p>
                                    <p className="mb-4"><b>Email:</b> {order.email}</p>
                                    <p className="mb-4"><b>Address:</b> {order.address}</p>
                                    <p className="mb-4"><b>Pincode:</b> {order.pincode}</p>
                                    <p className="mb-4"><b>District:</b> {order.district}</p>
                                    <p className="mb-4"><b>State:</b> {order.state}</p>
                                    <p className="mb-4"><b>Transaction ID:</b> {order.transactionid}</p>
                                    <p className="mb-4"><b>Delivery Status:</b> {order.deliveryStatus}</p>
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
            {!admin && <div className="min-h-screen flex m-auto">
                <Head>
                    <title>404 - Page Not Found</title>
                    <meta name="description" content="Quality of classes at proces of masses." />
                    <link rel="icon" href="/icon.png" />
                </Head>
                <h1 className="m-auto font-semibold text-xl">404 - Page Not Found</h1>
            </div>}
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
