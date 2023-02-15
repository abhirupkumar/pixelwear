import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, Radio, Stack, TextField } from '@mui/material';
import BaseCard from '../../src/components/baseCard/BaseCard';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Head from 'next/head';
import { MenuItem } from '@mui/material'
import { wordToHex } from '../../colorhex'

const Add = () => {

    const productcatelogue = [
        {
            title: "sarees",
            submenu: [{
                title: "sarees",
            }]
        },
        {
            title: "bottoms",
            submenu: [{
                title: "ankleleggings",
            },
            {
                title: "caprileggings",
            },
            {
                title: "churidarleggings",
            },
            {
                title: "palazzo",
            },
            {
                title: "patiala",
            },
            {
                title: "straightpant",
            },
            ],
        },
        {
            title: "tops",
            submenu: [{
                title: "tshirts",
            },
            {
                title: "hoodies",
            },
            ],
        },
        {
            title: "innerwear",
            submenu: [{
                title: "shorts",
            },
            ],
        },
        {
            title: "kids",
            submenu: [{
                title: "bottoms/ankleleggings",
            },
            {
                title: "bottoms/capri",
            },
            {
                title: "shorts",
            },
            ],
        },
        {
            title: "loungewear",
            submenu: [{
                title: "pyjama",
            },
            {
                title: "capri",
            },
            {
                title: "shorty",
            },
            {
                title: "longtee",
            },
            ],
        },
    ];

    const [form, setForm] = useState({})
    const [size, setSize] = useState('')
    const [type, setType] = useState('')
    const [pid, setPid] = useState(0)

    const router = useRouter()
    const [admin, setAdmin] = useState(true)

    const [subcategory, setSubcategory] = useState('')
    const [color, setColor] = useState('')


    const handleChange = (e) => {
        const value2 = e.target.value
        setSubcategory(value2)
    }

    const handleColorChange = (e) => {
        const value3 = e.target.value
        setColor(value3)
    }

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

    useEffect(() => {
        pid = Math.floor(Math.random() * 10000000 + 9)
        setPid(pid)
    }, [form, size, type, subcategory])

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleCheckboxChange = (event) => {
        setSize(event.target.name)
    }

    const handleRadioChange = (event) => {
        setType(event.target.name)
    }

    const submitForm = async (e) => {
        e.preventDefault()
        if (!form.theme) {
            form.theme = '####';
        }
        let data = [{
            title: form.title,
            slug: (form?.title?.toLowerCase().replaceAll(' ', '-') + "-" + type + "-" + pid + '-' + color + "-" + size.toLowerCase()),
            desc: form.description,
            img: form.img,
            img2: form.img2,
            img3: form.img3,
            img4: form.img4,
            category: type,
            theme: subcategory,
            size: size,
            color: color,
            fabric: form.fabric,
            price: form.price,
            availableQty: form.qty
        }]
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let res = await a.json()
        if (res.success) {
            toast.success("Product Successfully Added", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            form.theme = ''
        }
        else {
            toast.error("Some Error Occured ! Could not add products", {
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


    const clear = () => {
        setForm('')
        type = ''
        setType(type)
        size = ''
        setSubcategory('')
        setSize(null)
        setColor('')
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
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <BaseCard title="Add Products">
                            <Stack spacing={3}>
                                <TextField onChange={onChange} value={form.title ? form.title : ""} name="title" label="Title" variant="outlined" />

                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group">
                                        <div className='flex flex-col lg:flex-row '>
                                            <FormControlLabel
                                                value='sarees'
                                                control={<Radio />}
                                                label="Sarees"
                                                name="sarees"
                                                onChange={handleRadioChange}
                                            />
                                            <FormControlLabel
                                                value='bottoms'
                                                control={<Radio />}
                                                label="Bottoms"
                                                name="bottoms"
                                                onChange={handleRadioChange}
                                            />
                                            <FormControlLabel
                                                value="tops"
                                                control={<Radio />}
                                                label="Tops"
                                                name="tops"
                                                onChange={handleRadioChange}
                                            />
                                            <FormControlLabel
                                                value="innerwear"
                                                control={<Radio />}
                                                label="Inner Wear"
                                                name="innerwear"
                                                onChange={handleRadioChange}
                                            />
                                            <FormControlLabel
                                                value="kids"
                                                control={<Radio />}
                                                label="Kids"
                                                name="kids"
                                                onChange={handleRadioChange}
                                            />
                                            <FormControlLabel
                                                value="loungewear"
                                                control={<Radio />}
                                                label="Lounge Wear"
                                                name="loungewear"
                                                onChange={handleRadioChange}
                                            />
                                        </div>
                                    </RadioGroup>
                                </FormControl>

                                {productcatelogue.map((item) => {
                                    return type == item.title && <TextField label='Subcategory' name='subcategory' select value={subcategory} onChange={handleChange} fullWidth
                                    >
                                        {item.submenu && item.submenu.map((subitems, index) => {
                                            return (<MenuItem key={index} value={subitems.title}>{subitems.title}</MenuItem>);
                                        })}
                                    </TextField>
                                })}

                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Size</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group">
                                        <div className='flex flex-col lg:flex-row '>
                                            <FormControlLabel
                                                value='S'
                                                control={<Radio />}
                                                label="S"
                                                name="S"
                                                onChange={handleCheckboxChange}
                                            />
                                            <FormControlLabel
                                                value='M'
                                                control={<Radio />}
                                                label="M"
                                                name="M"
                                                onChange={handleCheckboxChange}
                                            />
                                            <FormControlLabel
                                                value="L"
                                                control={<Radio />}
                                                label="L"
                                                name="L"
                                                onChange={handleCheckboxChange}
                                            />
                                            <FormControlLabel
                                                value="XL"
                                                control={<Radio />}
                                                label="XL"
                                                name="XL"
                                                onChange={handleCheckboxChange}
                                            />
                                            <FormControlLabel
                                                value="2XL"
                                                control={<Radio />}
                                                label="2XL"
                                                name="2XL"
                                                onChange={handleCheckboxChange}
                                            />
                                            <FormControlLabel
                                                value="3XL"
                                                control={<Radio />}
                                                label="3XL"
                                                name="3XL"
                                                onChange={handleCheckboxChange}
                                            />
                                            <FormControlLabel
                                                value="Standard"
                                                control={<Radio />}
                                                label="Standard"
                                                name="Standard"
                                                onChange={handleCheckboxChange}
                                            />
                                            <FormControlLabel
                                                value="Free"
                                                control={<Radio />}
                                                label="Free"
                                                name="Free"
                                                onChange={handleCheckboxChange}
                                            />
                                        </div>
                                    </RadioGroup>
                                </FormControl>

                                <TextField label='Color' name='color' select value={color} onChange={handleColorChange} fullWidth
                                >
                                    {Object.keys(wordToHex).map((key, value) => {
                                        return (<MenuItem key={value} value={key}>{key}</MenuItem>);
                                    })}
                                </TextField>

                                <TextField onChange={onChange} value={form.qty ? form.qty : ""} name="qty" label="Quantity" variant="outlined" />

                                <TextField onChange={onChange} value={form.fabric ? form.fabric : ""} name="fabric" label="Fabric" variant="outlined" />

                                <TextField onChange={onChange} value={form.img ? form.img : ""} name="img" label="Image1 Link" variant="outlined" />

                                <TextField onChange={onChange} value={form.img2 ? form.img2 : ""} name="img2" label="Image2 Link" variant="outlined" />

                                <TextField onChange={onChange} value={form.img3 ? form.img3 : ""} name="img3" label="Image3 Link" variant="outlined" />

                                <TextField onChange={onChange} value={form.img4 ? form.img4 : ""} name="img4" label="Image4 Link" variant="outlined" />

                                <TextField onChange={onChange}
                                    id="price"
                                    name="price"
                                    label="Price"
                                    value={form.price ? form.price : ""}
                                    variant="outlined"
                                />

                                <TextField onChange={onChange}
                                    id="description"
                                    name="description"
                                    label="Description"
                                    value={form.description ? form.description : ""}
                                    multiline
                                    rows={4}
                                />

                            </Stack>
                            <br />
                            <Button onClick={submitForm} variant="outlined" mt={2}>
                                Submit
                            </Button>
                            <Button onClick={clear} variant="outlined" mt={2}>
                                Clear Form
                            </Button>
                        </BaseCard>
                    </Grid>

                </Grid>
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
    )
}

export default Add