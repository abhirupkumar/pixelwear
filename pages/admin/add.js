import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, RadioGroup, Radio, Stack, TextField } from '@mui/material';
import BaseCard from '../../src/components/baseCard/BaseCard';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Head from 'next/head';


const Add = () => {

    const [form, setForm] = useState({})
    const [size, setSize] = useState('')
    const [type, setType] = useState('')

    const router = useRouter()
    const [admin, setAdmin] = useState(true)

    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem('myuser'));
        if (!myuser) {
            router.push('/')
        }
        if(myuser && myuser.token && (myuser.email == 'abhirupkumar2003@gmail.com')){
            setAdmin(true)
        }
        else{
            setAdmin(false)
        }
    }, [])

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
        let data = [{
            title: form.title,
            slug: form.slug,
            desc: form.description,
            img: form.img,
            category: type,
            size: size,
            color: form.color,
            price: form.price,
            availableQty: form.qty
        }]
        let a = await fetch(`/api/addproducts`, {
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
                                            value='tshirts'
                                            control={<Radio />}
                                            label="T-shirts"
                                            name="tshirts"
                                            onChange={handleRadioChange}
                                        />
                                        <FormControlLabel
                                            value='hoodies'
                                            control={<Radio />}
                                            label="Hoodies"
                                            name="hoodies"
                                            onChange={handleRadioChange}
                                        />
                                        <FormControlLabel
                                            value="jeans"
                                            control={<Radio />}
                                            label="Jeans"
                                            name="jeans"
                                            onChange={handleRadioChange}
                                        />
                                        <FormControlLabel
                                            value="trousers"
                                            control={<Radio />}
                                            label="Trousers"
                                            name="trousers"
                                            onChange={handleRadioChange}
                                        />
                                        </div>
                                    </RadioGroup>
                                </FormControl>

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
                                            value="XXL"
                                            control={<Radio />}
                                            label="XXL"
                                            name="XXL"
                                            onChange={handleCheckboxChange}
                                        />
                                        <FormControlLabel
                                            value="Standard"
                                            control={<Radio />}
                                            label="Standard"
                                            name="Standard"
                                            onChange={handleCheckboxChange}
                                        />
                                        </div>
                                    </RadioGroup>
                                </FormControl>

                                <TextField onChange={onChange} value={form.color ? form.color.toLowerCase() : ""} name="color" label="Color" variant="outlined" />

                                <TextField onChange={onChange} value={form.qty ? form.qty : ""} name="qty" label="Quantity" variant="outlined" />

                                <TextField onChange={onChange} value={form.img ? form.img : ""} name="img" label="Image Link" variant="outlined" />

                                <TextField onChange={onChange} value={form.slug ? (form.slug = form.title+"-"+form.color+"-"+size) : ""} name="slug" label="Slug" variant="outlined" />

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

export default Add
