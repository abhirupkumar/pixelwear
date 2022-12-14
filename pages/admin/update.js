import React from 'react'
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
import Head from 'next/head';

const Update = ({ product }) => {

    const [title, setTitle] = useState()
    const [slug, setSlug] = useState()
    const [desc, setDesc] = useState()
    const [img, setImg] = useState()
    const [type, setType] = useState()
    const [size, setSize] = useState()
    const [color, setColor] = useState()
    const [price, setPrice] = useState()
    const [qty, setQty] = useState()

    const router = useRouter()
    const [admin, setAdmin] = useState(true)

    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem('myuser'));
        if (!myuser) {
            router.push('/')
        }
        if (myuser && myuser.token && (myuser.email == 'abhirupkumar2003@gmail.com')) {
            setAdmin(true)
        }
        else {
            setAdmin(false)
        }
        fetchData()
    }, [])

    const fetchData = async () => {
        setTitle(product.title)
        setSlug(product.slug)
        setDesc(product.desc)
        setImg(product.img)
        setType(product.category)
        setSize(product.size)
        setColor(product.color)
        setPrice(product.price)
        setQty(product.availableQty)
    }

    const handleChange = async (e) => {

        if (e.target.name == 'title') {
            setTitle(e.target.value)
        }
        if (e.target.name == 'slug') {
            setSlug(e.target.value)
        }
        if (e.target.name == 'img') {
            setImg(e.target.value)
        }
        if (e.target.name == 'desc') {
            setDesc(e.target.value)
        }
        if (e.target.name == 'size') {
            setSize(e.target.value)
        }
        if (e.target.name == 'color') {
            setColor(e.target.value)
        }
        if (e.target.name == 'type') {
            setType(e.target.value)
        }
        if (e.target.name == 'qty') {
            setQty(e.target.value)
        }
        if (e.target.name == 'price') {
            setPrice(e.target.value)
        }
    }

    const submitForm = async (e) => {
        e.preventDefault()
        let data = [{
            _id: product._id,
            title: title,
            slug: slug,
            desc: desc,
            img: img,
            category: type,
            size: size,
            color: color,
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
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="mx-auto flex my-2">
                    <div className="px-2 w-full">
                        <div className="mb-4">
                            <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
                            <input value={title ? title : product.title} onChange={handleChange} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="desc" className="leading-7 text-sm text-gray-600">Description</label>
                            <textarea value={desc ? desc : product.desc} onChange={handleChange} type="text" id="desc" name="desc" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="size" className="leading-7 text-sm text-gray-600">Size</label>
                            <input value={size ? size : product.size} onChange={handleChange} type="text" id="size" name="size" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="color" className="leading-7 text-sm text-gray-600">Color</label>
                            <input value={color ? color : product.color} onChange={handleChange} type="text" id="color" name="color" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="slug" className="leading-7 text-sm text-gray-600">Slug</label>
                            <input value={slug ? slug : product.slug} onChange={handleChange} type="text" id="slug" name="slug" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="type" className="leading-7 text-sm text-gray-600">Category</label>
                            <input value={type ? type : product.type} onChange={handleChange} type="text" id="type" name="type" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="img" className="leading-7 text-sm text-gray-600">Image</label>
                            <input value={img ? img : product.img} onChange={handleChange} type="text" id="img" name="img" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="leading-7 text-sm text-gray-600">Price</label>
                            <input value={price ? price : product.price} onChange={handleChange} type="text" id="price" name="price" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="qty" className="leading-7 text-sm text-gray-600">Available Qty</label>
                            <input value={qty ? qty : product.qty} onChange={handleChange} type="text" id="qty" name="qty" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <button onClick={submitForm} className='mt-3 p-2 text-white bg-indigo-600 hover:bg-indigo-800 rounded-lg'>Submit</button>
                    </div>
                </div>
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
