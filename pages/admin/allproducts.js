import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { FormControlLabel, FormControl, FormLabel, Grid, RadioGroup, Radio } from "@mui/material";
import AllProducts from "../../src/components/dashboard/AllProducts";
import mongoose from 'mongoose'
import Product from "../../models/Product"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Head from 'next/head';


const Allproducts = ({ products }) => {
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
                        <AllProducts products={products}/>
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
    let products = await Product.find()

    return {
        props: { products: JSON.parse(JSON.stringify(products)) },
    }
}

export default Allproducts