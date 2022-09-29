import { Grid, Stack, ImageList, ImageListItem, Box, ImageListItemBar, TextField } from "@mui/material";
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
import BaseCard from "../../src/components/baseCard/BaseCard";
import Image from "/models/Image"
import mongoose from 'mongoose'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import { images } from "../../indeximages";
// import image from "../../dashimages";


const Index = ({ images }) => {
    const router = useRouter()
    const [admin, setAdmin] = useState(true)
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [value3, setValue3] = useState('')
    const [value4, setValue4] = useState('')
    const [value5, setValue5] = useState('')

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
        fetchimages()
    }, [])

    const fetchimages = () => {
        setValue1(images[0].img.toString())
        setValue2(images[1].img.toString())
        setValue3(images[2].img.toString())
        setValue4(images[3].img.toString())
        setValue5(images[4].img.toString())
    }

    const onChange = (e) => {
        if (e.target.name == 'img1') {
            setValue1(e.target.value)
        }
        if (e.target.name == 'img2') {
            setValue2(e.target.value)
        }
        if (e.target.name == 'img3') {
            setValue3(e.target.value)
        }
        if (e.target.name == 'img4') {
            setValue4(e.target.value)
        }
        if (e.target.name == 'img5') {
            setValue5(e.target.value)
        }
    }

    const handleClick = async (e) => {
        let data = [{
            _id: images[0]._id,
            img: value1
        },
        {
            _id: images[1]._id,
            img: value2
        },
        {
            _id: images[2]._id,
            img: value3
        },
        {
            _id: images[3]._id,
            img: value4
        },
        {
            _id: images[4]._id,
            img: value5
        },
        ]
        let a = await fetch(`/api/updateimage`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let res = await a.json()
        if (res.success) {
            toast.success("Product Successfully Updated", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                router.push(`${process.env.NEXT_PUBLIC_HOST}/admin`)
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
                <ToastContainer
                    position="top-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Grid container spacing={0}>
                    <div className="flex flex-col">
                        {/* <div className="mx-auto">Go to add products to add a new product</div>
                        <br />
                        <div className="mx-auto">Go to view products to see and edit all the products</div>
                        <br />
                        <div className="mx-auto">Go to orders to see the order details</div> */}
                    </div>
                    <BaseCard>
                        <Stack spacing={4}>
                            <ImageList sx={{ width: '100%', height: '100%' }} cols={1} rowHeight={164}>
                                {/* {Object.keys(images).map((item, index) => {
                                    return <div key={index}>
                                        <img src={`${images[item].img}`} alt={'photo'} loading='lazy' className='mt-5 mb-2' />
                                        <TextField onChange={onChange} value={value1} name={images[item].img} label={"Image" + (index + 1)} variant="outlined" />
                                    </div>
                                })} */}
                                {images[0] && <div>
                                    <img src={`${images[0].img}`} alt={'photo'} loading='lazy' className='mt-5 mb-2' />
                                    <TextField onChange={onChange} value={value1} name='img1' label={"Image1"} variant="outlined" fullWidth />
                                </div>}
                                {images[1] && <div>
                                    <img src={`${images[1].img}`} alt={'photo'} loading='lazy' className='mt-5 mb-2' />
                                    <TextField onChange={onChange} value={value2} name='img2' label={"Image2"} variant="outlined" fullWidth />
                                </div>}
                                {images[2] && <div>
                                    <img src={`${images[2].img}`} alt={'photo'} loading='lazy' className='mt-5 mb-2' />
                                    <TextField onChange={onChange} value={value3} name='img3' label={"Image3"} variant="outlined" fullWidth />
                                </div>}
                                {images[3] && <div>
                                    <img src={`${images[3].img}`} alt={'photo'} loading='lazy' className='mt-5 mb-2' />
                                    <TextField onChange={onChange} value={value4} name='img4' label={"Image4"} variant="outlined" fullWidth />
                                </div>}
                                {images[4] && <div>
                                    <img src={`${images[4].img}`} alt={'photo'} loading='lazy' className='mt-5 mb-2' />
                                    <TextField onChange={onChange} value={value5} name='img5' label={"Image5"} variant="outlined" fullWidth />
                                </div>}
                            </ImageList>
                            <button onClick={handleClick} className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-lg text-white my-3">Change</button>
                        </Stack>

                        <Stack spacing={2}>
                            {/* {images.map((item, index) => { <TextField key={index} onChange={onChange} value={form.qty ? form.qty : ""} name="qty" label="Image" variant="outlined" /> })} */}
                        </Stack>

                    </BaseCard>
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

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    let images = await Image.find()

    return {
        props: { images: JSON.parse(JSON.stringify(images)) }, // will be passed to the page component as props
    }
}

export default Index