import { Grid, Stack, ImageList, ImageListItem, Box, ImageListItemBar, TextField, Button, IconButton, Typography } from "@mui/material";
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
import DeleteIcon from '@mui/icons-material/Delete';
import Video from "../../models/Video";
import { useSelector } from "react-redux";
const jwt = require('jsonwebtoken');

const Index = ({ images, videos }) => {
    const router = useRouter()
    const [admin, setAdmin] = useState(false)
    const [imageLinks, setImageLinks] = useState([]);
    const [newLink, setNewLink] = useState('');
    const [videoValue, setVideoValue] = useState('')

    const handleAddLink = () => {
        setImageLinks([...imageLinks, newLink]);
        setNewLink('');
    };

    const handleRemoveLink = (index) => {
        setImageLinks(imageLinks.filter((_, i) => i !== index));
    };

    const token = useSelector((state) => state.cartItems.token)
    let email = ''

    useEffect(() => {
        if (token) {
            email = jwt.decode(token).email
        }
        if (token && email != '' && (email == process.env.NEXT_PUBLIC_EMAIL1 || email == process.env.NEXT_PUBLIC_EMAIL2)) {
            setAdmin(true)
            fetchimages()
            fetchvideos()
        }
        else {
            setAdmin(false)
        }
    }, [])

    const fetchimages = () => {
        if (images && images[0]) {
            setImageLinks(images[0].img)
        }
    }

    const fetchvideos = () => {
        if (videos && videos[0]) {
            setVideoValue(videos[0].vid.toString())
        }
    }

    const onVChange = (e) => {
        if (e.target.name == 'vid') {
            setVideoValue(e.target.value)
        }
    }

    const handleClick = async (e) => {
        let data = [{
            img: imageLinks
        }
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
                router.push(`/admin`)
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
        <>
            <Head>
                <title>Pixelwear - Admin Panel</title>
                <meta name="description" content="Quality of classes at prices of masses." />
                <link rel="icon" href="/icon.png" />
            </Head>
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
                    <Grid>
                        <BaseCard style={{
                            width: '100%',
                        }}>
                            <Stack spacing={4} >
                                <div className="flex space-x-4">
                                    <TextField
                                        label="Optional Images Link"
                                        value={newLink}
                                        onChange={(e) => setNewLink(e.target.value)}
                                        className="flex-1 pr-4"
                                    />
                                    <Button variant="contained" color="primary" sx={{ height: '50px' }} onClick={handleAddLink}>
                                        Add Link
                                    </Button>
                                </div>
                                {imageLinks && imageLinks?.length !== 0 && <Typography variant="subtitle1">Entered Image Links:</Typography>}
                                <div className="flex space-x-4">
                                    {imageLinks && imageLinks?.map((link, index) => (
                                        <div key={index} style={{ alignItems: 'center' }}>
                                            <img src={link} alt={`img-${index}`} className="h-14" />
                                            <IconButton onClick={() => handleRemoveLink(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={handleClick} className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-lg text-white my-3">Change</button>
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
        </>
    );
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    let images = await Image.find();
    let videos = await Video.find();

    return {
        props: { images: JSON.parse(JSON.stringify(images)), videos: JSON.parse(JSON.stringify(videos)) }, // will be passed to the page component as props
    }
}

export default Index