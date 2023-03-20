import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, Radio, Stack, TextField, IconButton, Typography, Autocomplete, CircularProgress } from '@mui/material';
import BaseCard from '../../src/components/baseCard/BaseCard';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Head from 'next/head';
import { MenuItem } from '@mui/material'
import { wordToHex } from '../../colorhex'
import DeleteIcon from '@mui/icons-material/Delete';
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
const jwt = require('jsonwebtoken');

function generateSkuId() {
    const randomString = Math.random().toString(36).substring(2, 14);
    const skuId = uuidv4().substr(0, 5) + randomString;
    return skuId.toUpperCase();
}

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
    const router = useRouter()
    const [admin, setAdmin] = useState(false)
    const [subcategory, setSubcategory] = useState('')
    const [color, setColor] = useState('')
    const [imageLinks, setImageLinks] = useState([]);
    const [newLink, setNewLink] = useState('');
    const [desc, setDesc] = useState([]);
    const [newDesc, setNewDesc] = useState('');
    const [loading, setLoading] = useState(false);

    const token = useSelector((state) => state.cartItems.token)
    let email = ''

    const ref = useRef(null)

    const handleAddLink = () => {
        if (newLink != '' && newLink != ' ') {
            setImageLinks([...imageLinks, newLink]);
            setNewLink('');
        }
    };

    const handleRemoveLink = (index) => {
        setImageLinks(imageLinks.filter((_, i) => i !== index));
    };

    const handleAddDesc = () => {
        if (newDesc != '' && newDesc != ' ') {
            setDesc([...desc, newDesc]);
            setNewDesc('');
        }
    };

    const handleRemoveDesc = (index) => {
        setDesc(desc.filter((_, i) => i !== index));
    };

    const handleChange = (e) => {
        const value2 = e.target.value
        setSubcategory(value2)
    }

    const handleColorChange = (e, value) => {
        setColor(value)
    }

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
        const newSkuId = generateSkuId()
        let data = [{
            title: form.title,
            slug: ((((form?.title?.toLowerCase().replaceAll(' ', '-')).replaceAll('%', '+')).replaceAll('/', '+')).replaceAll('@', '-') + "-" + type + '-' + subcategory + '-' + form?.color + "-" + size.toLowerCase()),
            skuId: newSkuId,
            desc: desc,
            img: form.img,
            imgarr: imageLinks,
            category: type,
            theme: subcategory,
            size: size,
            color: form.color,
            fabric: form.fabric,
            price: form.price,
            availableQty: form.qty,
        }]

        setLoading(true);
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let res = await a.json()
        setLoading(false);
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
            toast.error(res.error, {
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
        setType('')
        setType('')
        setSize('')
        setSubcategory('')
        setDesc([])
        setNewDesc('')
        setColor('')
        setImageLinks([])
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

                                {productcatelogue.map((item, index) => {
                                    return type == item.title && <TextField key={index} label='Subcategory' name='subcategory' select value={subcategory} onChange={handleChange} fullWidth
                                    >
                                        {item.submenu && item.submenu.map((subitems, index) => {
                                            return (<MenuItem key={index} value={subitems.title}>{subitems.title}</MenuItem>);
                                        })}
                                    </TextField>
                                })}

                                <div>
                                    <div className="flex space-x-6 items-center">
                                        <TextField onChange={onChange} value={form.img ? form.img : ""} name="img" label="Main Image Link" variant="outlined" className="flex-1" />
                                        {form.img && form.img != "" && <img src={form.img} alt={`product-main-image`} className="w-14" loading="lazy" />}
                                    </div>
                                    <p className="text-sm text-gray-500">Try to give (2400 x 3600) px image for better zoom</p>
                                </div>

                                <div>
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
                                    <p className="text-sm text-gray-500">Try to give all (2400 x 3600) px images for better zoom</p>
                                </div>
                                {imageLinks.length !== 0 && <Typography variant="subtitle1">Entered Image Links:</Typography>}
                                <div className="flex space-x-4">
                                    {imageLinks.map((link, index) => (
                                        <div key={index} style={{ alignItems: 'center' }}>
                                            <img src={link} alt={`img-${index}`} className="h-14" loading="lazy" />
                                            <IconButton onClick={() => handleRemoveLink(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex space-x-4 items-center">
                                    <TextField
                                        label="Description"
                                        value={newDesc}
                                        onChange={(e) => setNewDesc(e.target.value)}
                                        multiline
                                        rows={3}
                                        className="flex-1 pr-4"
                                    />
                                    <Button variant="contained" color="primary" sx={{ height: '50px' }} onClick={handleAddDesc}>
                                        Add Desc
                                    </Button>
                                </div>
                                {desc.length !== 0 && <Typography variant="subtitle1">Entered Descriptions:</Typography>}
                                <div className="flex flex-col space-x-4">
                                    {desc.map((item, index) => (
                                        <div key={index} className="items-center flex">
                                            <p className="bg-gray-200 text-black flex-1 py-1 pl-3 rounded-sm">{item}</p>
                                            <IconButton onClick={() => handleRemoveDesc(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    ))}
                                </div>

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
                                                value="Free"
                                                control={<Radio />}
                                                label="Free"
                                                name="Free"
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

                                <div className='flex space-x-6'>
                                    {/* <Autocomplete
                                        options={Object.keys(wordToHex)}
                                        noOptionsText='No Option Found'
                                        loadingText='Loading...'
                                        renderInput={(params) => (
                                            <TextField {...params} label="Choose a color" variant="outlined" name={"color"} />
                                        )}
                                        isOptionEqualToValue={(option, newValue) => {
                                            return option.id === newValue.id;
                                        }}
                                        onChange={handleColorChange}
                                        onInputChange={(e, v) => {
                                            setColor(v)
                                        }}
                                        renderOption={(props, option) => {
                                            return <li key={option} {...props} style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ backgroundColor: wordToHex[option], width: 20, height: 20, marginRight: 10 }} />
                                                {option}
                                            </li>
                                        }}
                                        style={{
                                            flex: 1,
                                            marginTop: 0,
                                        }}
                                        ref={ref}
                                    /> */}
                                    <TextField onChange={onChange} value={form.color ? form.color : ""} name="color" label="Color" variant="outlined" />
                                    <TextField onChange={onChange} value={form.qty ? form.qty : ""} name="qty" label="Quantity" variant="outlined" />

                                    <TextField onChange={onChange} value={form.fabric ? form.fabric : ""} name="fabric" label="Fabric" variant="outlined" />

                                    <TextField onChange={onChange}
                                        id="price"
                                        name="price"
                                        label="Price"
                                        value={form.price ? form.price : ""}
                                        variant="outlined"
                                    />

                                </div>

                            </Stack>
                            <br />
                            {loading ? <CircularProgress color="primary" /> : <Button onClick={submitForm} variant="contained" mt={2}>
                                Submit
                            </Button>}
                            <Button onClick={clear} variant="contained" mt={2} sx={{ marginLeft: '20px' }}>
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