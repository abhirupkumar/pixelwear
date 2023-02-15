import { Grid, Stack, ImageList, ImageListItem, Box, ImageListItemBar, TextField } from "@mui/material";
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
import Video from "../../models/Video";

const Index = ({ images, videos }) => {
    const router = useRouter()
    const [admin, setAdmin] = useState(true)
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [value3, setValue3] = useState('')
    const [value4, setValue4] = useState('')
    const [value5, setValue5] = useState('')
    const [videoValue, setVideoValue] = useState('')

    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem('myuser'));
        if (!myuser) {
            router.push('/');
        }
        if (myuser && myuser.token && (myuser.email == 'abhirupkumar2003@gmail.com' || myuser.email == 'kabirlesoft@gmail.com')) {
            setAdmin(true);
        }
        else {
            setAdmin(false);
            router.push('/');
        }
        fetchimages()
        fetchvideos()
    }, [])

    const fetchimages = () => {
        setValue1(images[0].img.toString())
        setValue2(images[1].img.toString())
        setValue3(images[2].img.toString())
        setValue4(images[3].img.toString())
        setValue5(images[4].img.toString())
    }

    const fetchvideos = () => {
        setVideoValue(videos[0].vid.toString())
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

    const onVChange = (e) => {
        if (e.target.name == 'vid') {
            setVideoValue(e.target.value)
        }
    }

    const handleClick = async (e) => {
        let data = [{
            _id: images[0]._id,
            category: "frontimage",
            img: value1
        },
        {
            _id: images[1]._id,
            category: "frontimage",
            img: value2
        },
        {
            _id: images[2]._id,
            category: "frontimage",
            img: value3
        },
        {
            _id: images[3]._id,
            category: "frontimage",
            img: value4
        },
        {
            _id: images[4]._id,
            category: "frontimage",
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
            toast.success("Images Successfully Updated", {
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

    const handleVClick = async (e) => {
        let data = [{
            _id: images[0]._id,
            vid: videoValue
        }]
        let a = await fetch(`/api/updatevideo`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let res = await a.json()
        if (res.success) {
            toast.success("Video Successfully Updated", {
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
                    <BaseCard>
                        <Stack spacing={4}>
                            <ImageList sx={{ width: '100%', height: '100%' }} cols={1} rowHeight={164}>
                                {images[0] && <div>
                                    <img src={`${value1}`} alt={'photo'} loading='lazy' className='mt-5 mb-2' />
                                    <TextField onChange={onChange} value={value1} name='img1' label={"Image1"} variant="outlined" fullWidth />
                                </div>}
                                {images[1] && <div>
                                    <img src={`${value2}`} alt={'photo'} loading='lazy' className='mt-5 mb-2' />
                                    <TextField onChange={onChange} value={value2} name='img2' label={"Image2"} variant="outlined" fullWidth />
                                </div>}
                                {images[2] && <div>
                                    <img src={`${value3}`} alt={'photo'} loading='lazy' className='mt-5 mb-2' />
                                    <TextField onChange={onChange} value={value3} name='img3' label={"Image3"} variant="outlined" fullWidth />
                                </div>}
                                {images[3] && <div>
                                    <img src={`${value4}`} alt={'photo'} loading='lazy' className='mt-5 mb-2' />
                                    <TextField onChange={onChange} value={value4} name='img4' label={"Image4"} variant="outlined" fullWidth />
                                </div>}
                                {images[4] && <div>
                                    <img src={`${value5}`} alt={'photo'} loading='lazy' className='mt-5 mb-2' />
                                    <TextField onChange={onChange} value={value5} name='img5' label={"Image5"} variant="outlined" fullWidth />
                                </div>}
                            </ImageList>
                            <button onClick={handleClick} className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-lg text-white my-3">Change</button>
                        </Stack>

                        <Stack spacing={2}>
                            <iframe width="100%" height="400" style={{ marginTop: "3rem" }} src={videoValue} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            <TextField onChange={onVChange} value={videoValue} name="vid" label="Video" variant="outlined" />
                            <button onClick={handleVClick} className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-lg text-white my-3">Change</button>
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

    let images = await Image.find({ category: "frontimage" });
    let videos = await Video.find();

    return {
        props: { images: JSON.parse(JSON.stringify(images)), videos: JSON.parse(JSON.stringify(videos)) }, // will be passed to the page component as props
    }
}

export default Index