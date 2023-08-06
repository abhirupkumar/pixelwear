import Head from 'next/head'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Product from '../models/Product';
import mongoose from 'mongoose';
import { BsTrash } from 'react-icons/bs';
import Link from 'next/link';
import { addToCart, checkWishlist } from '../features/cartSlice';
import { useState } from 'react';
import { useEffect } from 'react';

const Wishlist = ({ products }) => {

    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.cartItems.wishlist)

    if (wishlist.length === 0) {
        return <div className="min-h-screen flex justify-center w-full">
            <p className="mt-10 text-2xl">Your Wishlist is Empty!</p>
        </div>
    }

    return (
        <>
            <Head>
                <title>Pixelwear - Wishlist</title>
                <meta name="description" content="Men's Fashion Brand" />
                <link rel="icon" href="/icon.png" />
            </Head>
            <div className="text-gray-600 body-font min-h-screen flex lg:flex-row flex-col">
                <div className={`w-full px-2 justify-start items-center lg:mt-12 mt-6 flex flex-col`}>
                    <div className="flex flex-wrap justify-center items-center">
                        {Object.keys(products)?.map((item) => {
                            let discount = 0
                            if (!!products[item].mrp) {
                                discount = (products[item].mrp - products[item].price) / products[item].mrp * 100
                                discount = discount.toFixed(1)
                            }
                            return wishlist.includes(products[item]._id) && <div key={products[item]._id} className="flex mx-auto mb-10 flex-col lg:w-[310px] w-[40vw] cursor-pointer items-center lg:mx-2">
                                <div>
                                    <div className='m-auto md:m-0 flex lg:h-[470px] md:h-[400px] w-full sm-1:h-[40vh] sm-2:h-[30vh] h-[22vh]'>
                                        <button onClick={() => dispatch(checkWishlist(products[item]._id))} className='absolute z-20 lg:w-6 lg:h-6 h-4 w-4 m-2'>
                                            <BsTrash className='h-full w-full  text-gray-800' />
                                        </button>
                                        <Link href={`/product/${products[item].slug}`}><img alt="ecommerce" className="h-full  block" src={products[item]?.img} /></Link>
                                    </div>
                                </div>
                                <Link href={`/product/${products[item].slug}`}>
                                    <div className="text-center mx-[2px] my-1 space-y-2 md:text-justify flex flex-col">
                                        <h2 className="text-gray-900 mx-auto lg:text-left lg:text-lg md:text-md sm:text-sm text-xs">{products[item].title} ({products[item].size}/{products[item].color})</h2>
                                        <div className="flex space-x-2 lg:justify-start items-center justify-center">
                                            <p className="text-left text-black font-semibold md:text-xl text-sm">₹{products[item].price}</p>
                                            {!!products[item].mrp && <p className="text-left text-gray-400 line-through md:text-base text-xs">₹{products[item].mrp}</p>}
                                            {!!products[item].mrp && discount > 0 && <p className="text-left font-semibold text-green-600 md:text-base text-xs">{discount}% off</p>}
                                        </div>
                                    </div>
                                </Link>
                                <button disabled={products[item].availableQty <= 0} onClick={() => dispatch(addToCart({ slug: products[item].slug, qty: 1, price: products[item].price, name: products[item].title, size: products[item].size, color: products[item].color, category: products[item].category, theme: products[item].theme, img: products[item].img }))} className="flex ml-4 text-white bg-[#1a4ffd] hover:bg-[#1440d3] disabled:bg-[#b6c9fd] w-full border-0 py-2 px-2 lg:px-6 justify-center focus:outline-none rounded mt-1">Add To Cart</button>
                            </div>
                        })}
                    </div>
                </div>
            </div >
        </>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    const products = await Product.find()

    return {
        props: { products: JSON.parse(JSON.stringify(products)) },
    }
}

export default Wishlist