import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from "@mui/material";
import AllOrders from "../../src/components/dashboard/AllOrders";
import mongoose from 'mongoose'
import Order from "../../models/Order"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Head from 'next/head';
import { useSelector } from 'react-redux';
const jwt = require('jsonwebtoken');

const Allorders = ({ orders }) => {

    const router = useRouter();
    const [admin, setAdmin] = useState(false);
    const token = useSelector((state) => state.cartItems.token);
    let email = '';

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

    return (
        <ThemeProvider theme={theme}>
            {admin && <FullLayout>
                <style jsx global>{`
                .navbar-show{
                    display: none;
                }
                footer{
                    display: none;
                }
                `}</style>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <AllOrders orders={orders} />
                    </Grid>
                </Grid>
            </FullLayout>}
            {!admin && <div className="min-h-screen flex m-auto">
                <Head>
                    <title>404 - Page Not Found</title>
                    <meta name="description" content="Quality of classes at proces of masses." />
                    <link rel="icon" href="/icon.png" />
                </Head>
                <h1 className="m-auto font-semibold text-xl">404 - Page Not Found</h1>
            </div>}
        </ThemeProvider>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let orders = await Order.find()

    return {
        props: { orders: JSON.parse(JSON.stringify(orders)) },
    }
}

export default Allorders