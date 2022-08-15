import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Head from 'next/head'

export default function Index() {
    const router = useRouter()
    const [admin, setAdmin] = useState(true)
    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem('myuser'));
        if (!myuser) {
            router.push('/')
        }
        if (myuser && myuser.token && (myuser.email == 'abhirupkumar2003@gmail.com' || myuser.email == 'kabirlesoft@gmail.com')) {
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
                    <div className="flex flex-col">
                        <div className="mx-auto">Go to add products to add a new product</div>
                        <br />
                        <div className="mx-auto">Go to view products to see and edit all the products</div>
                        <br />
                        <div className="mx-auto">Go to orders to see the order details</div>
                    </div>
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
    );
}
