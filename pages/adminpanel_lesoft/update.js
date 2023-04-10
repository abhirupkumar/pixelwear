import React, { useRef } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import mongoose from 'mongoose';
import Product from '../../models/Product';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { Autocomplete, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, IconButton, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { wordToHex } from '../../colorhex';
import BaseCard from '../../src/components/baseCard/BaseCard';
const jwt = require('jsonwebtoken');

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

const Update = ({ product }) => {
    const [mrp, setMrp] = useState()
    const [price, setPrice] = useState()
    const [size, setSize] = useState('')
    const [title, setTitle] = useState('')
    const [fabric, setFabric] = useState('')
    const [img, setImg] = useState('')
    const [type, setType] = useState('')
    const [admin, setAdmin] = useState(false)
    const [subcategory, setSubcategory] = useState('')
    const [color, setColor] = useState('')
    const [imageLinks, setImageLinks] = useState([]);
    const [newLink, setNewLink] = useState('');
    const [desc, setDesc] = useState([]);
    const [qty, setQty] = useState();
    const [newDesc, setNewDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.cartItems.token)
    let email = ''
    const router = useRouter()
    const ref = useRef()

    const handleCheckboxChange = (event) => {
        setSize(event.target.name)
    }

    const handleAddLink = () => {
        setImageLinks([...imageLinks, newLink]);
        setNewLink('');
    };

    const handleRemoveLink = (index) => {
        setImageLinks(imageLinks.filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (token) {
            email = jwt.decode(token).email
        }
        if (token && email != '' && (email == process.env.NEXT_PUBLIC_EMAIL1 || email == process.env.NEXT_PUBLIC_EMAIL2)) {
            setAdmin(true)
            fetchData()
        }
        else {
            setAdmin(false)
        }
        return fetchData
    }, [])

    const fetchData = async () => {
        setImageLinks(product.imgarr)
        setType(product.category)
        setImg(product.img)
        setTitle(product.title)
        setSize(product.size)
        setColor(product.color)
        setFabric(product.fabric)
        if (product.mrp)
            setMrp(product.mrp)
        setPrice(product.price)
        setQty(product.availableQty)
        setDesc(product.desc)
        setSize(product.size)
        setType(product.category)
        setSubcategory(product.theme)
        setColor(product.color)
        setImageLinks(product.imgarr)
    }

    const handleRadioChange = (event) => {
        setType(event.target.name)
        setSubcategory('')
    }

    const handleAddDesc = () => {
        setDesc([...desc, newDesc]);
        setNewDesc('');
    };

    const handleRemoveDesc = (index) => {
        setDesc(desc.filter((_, i) => i !== index));
    };

    const handleChange = (e) => {
        const value2 = e.target.value
        setSubcategory(value2)
    }

    const handleOtherChange = (e) => {
        if (e.target.name == 'qty') {
            setQty(e.target.value)
        }
        if (e.target.name == 'fabric') {
            setFabric(e.target.value)
        }
        if (e.target.name == 'mrp') {
            setMrp(e.target.value)
        }
        if (e.target.name == 'price') {
            setPrice(e.target.value)
        }
    }

    const handleColorChange = (e, value) => {
        setColor(value)
    }

    const submitForm = async (e) => {
        e.preventDefault()
        setLoading(true)
        let data = [{
            _id: product._id,
            title: title,
            slug: ((((title.toLowerCase().replaceAll(' ', '-')).replaceAll('%', '+')).replaceAll('/', '+')).replaceAll('@', '-') + "-" + type + "-" + product.skuId + '-' + color + "-" + size.toLowerCase()),
            skuId: product.skuId,
            desc: desc,
            img: img,
            imgarr: imageLinks,
            category: type,
            theme: subcategory,
            size: size,
            color: color,
            fabric: fabric,
            mrp: mrp,
            price: price,
            availableQty: qty
        }]
        let a = await fetch(`/api/updateproducts`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let res = await a.json()
        setLoading(false)
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
                <BaseCard>
                    <div className="mx-auto flex my-2">
                        <div className="px-2 w-full space-y-4 flex flex-col">
                            <TextField onChange={(text) => setTitle(text)} value={title} name="title" label="Title" variant="outlined" />

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
                                            checked={type == 'sarees' ? true : false}
                                        />
                                        <FormControlLabel
                                            value='bottoms'
                                            control={<Radio />}
                                            label="Bottoms"
                                            name="bottoms"
                                            onChange={handleRadioChange}
                                            checked={type == 'bottoms' ? true : false}
                                        />
                                        <FormControlLabel
                                            value="tops"
                                            control={<Radio />}
                                            label="Tops"
                                            name="tops"
                                            onChange={handleRadioChange}
                                            checked={type == 'tops' ? true : false}
                                        />
                                        <FormControlLabel
                                            value="innerwear"
                                            control={<Radio />}
                                            label="Inner Wear"
                                            name="innerwear"
                                            onChange={handleRadioChange}
                                            checked={type == 'innerwear' ? true : false}
                                        />
                                        <FormControlLabel
                                            value="kids"
                                            control={<Radio />}
                                            label="Kids"
                                            name="kids"
                                            onChange={handleRadioChange}
                                            checked={type == 'kids' ? true : false}
                                        />
                                        <FormControlLabel
                                            value="loungewear"
                                            control={<Radio />}
                                            label="Lounge Wear"
                                            name="loungewear"
                                            onChange={handleRadioChange}
                                            checked={type == 'loungewear' ? true : false}
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

                            <div className="flex space-x-6 items-center">
                                <TextField onChange={(text) => setImg(img)} value={img} name="img" label="Main Image Link" variant="outlined" className="flex-1" />
                                {<img src={img} alt={`product-main-image`} className="w-14" loading="lazy" />}
                            </div>

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

                                <FormControl sx={{
                                    marginTop: '2rem'
                                }}>
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
                                                checked={size == 'S' ? true : false}
                                            />
                                            <FormControlLabel
                                                value='M'
                                                control={<Radio />}
                                                label="M"
                                                name="M"
                                                onChange={handleCheckboxChange}
                                                checked={size == 'M' ? true : false}
                                            />
                                            <FormControlLabel
                                                value="L"
                                                control={<Radio />}
                                                label="L"
                                                name="L"
                                                onChange={handleCheckboxChange}
                                                checked={size == 'L' ? true : false}
                                            />
                                            <FormControlLabel
                                                value="XL"
                                                control={<Radio />}
                                                label="XL"
                                                name="XL"
                                                onChange={handleCheckboxChange}
                                                checked={size == 'XL' ? true : false}
                                            />
                                            <FormControlLabel
                                                value="2XL"
                                                control={<Radio />}
                                                label="2XL"
                                                name="2XL"
                                                onChange={handleCheckboxChange}
                                                checked={size == '2XL' ? true : false}
                                            />
                                            <FormControlLabel
                                                value="3XL"
                                                control={<Radio />}
                                                label="3XL"
                                                name="3XL"
                                                onChange={handleCheckboxChange}
                                                checked={size == '3XL' ? true : false}
                                            />
                                            <FormControlLabel
                                                value="Free"
                                                control={<Radio />}
                                                label="Free"
                                                name="Free"
                                                onChange={handleCheckboxChange}
                                                checked={size == 'Free' ? true : false}
                                            />
                                            <FormControlLabel
                                                value="Standard"
                                                control={<Radio />}
                                                label="Standard"
                                                name="Standard"
                                                onChange={handleCheckboxChange}
                                                checked={size == 'Standard' ? true : false}
                                            />
                                        </div>
                                    </RadioGroup>
                                </FormControl>

                                <div className='flex space-x-3 my-[1rem]'>
                                    <TextField onChange={handleOtherChange} value={color} name="color" label="Color" variant="outlined" />
                                    <TextField onChange={handleOtherChange} value={qty} name="qty" label="Quantity" variant="outlined" />

                                    <TextField onChange={handleOtherChange} value={fabric} name="fabric" label="Fabric" variant="outlined" />

                                    <TextField onChange={handleOtherChange}
                                        id="mrp"
                                        name="mrp"
                                        label="MRP"
                                        value={mrp}
                                        variant="outlined"
                                    />

                                    <TextField onChange={handleOtherChange}
                                        id="price"
                                        name="price"
                                        label="Price"
                                        value={price}
                                        variant="outlined"
                                    />

                                </div>
                            </div>
                            {loading ? <CircularProgress color="primary" /> : <Button onClick={submitForm} variant="contained" mt={2} sx={{
                                width: '100px'
                            }}>
                                Submit
                            </Button>}
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
        </ThemeProvider>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let product = await Product.findOne({ slug: context.query.slug })

    return {
        props: { product: JSON.parse(JSON.stringify(product)) }, // will be passed to the page component as props
    }
}

export default Update