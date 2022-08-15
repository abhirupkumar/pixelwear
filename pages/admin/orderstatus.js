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

const Orderstatus = ({ order }) => {

    const products = order.products;
    const [date, setDate] = useState()

    const router = useRouter()
    const [admin, setAdmin] = useState(true)

    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem('myuser'));
        if (!myuser) {
            router.push('/')
        }
        if(myuser && myuser.token && (myuser.email == 'abhirupkumar2003@gmail.com' || myuser.email == 'kabirlesoft@gmail.com')){
            setAdmin(true)
        }
        else{
            setAdmin(false)
        }
    }, [])

    useEffect(() => {

        const date = new Date(order.createdAt)
        setDate(date)

    }, [])

    return (
        <ThemeProvider theme={theme}>
            {admin && <FullLayout>
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
    let order = await Order.findById(context.query.id)

    return {
        props: { order: JSON.parse(JSON.stringify(order)) }, // will be passed to the page component as props
    }
}

export default Orderstatus;
