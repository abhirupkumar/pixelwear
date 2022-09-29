import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Product from "/models/Product"
import mongoose from 'mongoose'
import { useRouter } from 'next/router'
import { Box, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import { wordToHex } from '../colorhex'
import Head from 'next/head'

const Tops = ({ products, filter }) => {

    const router = useRouter()

    const [value, setValue] = useState(router.query.category)

    const handleChange = (event) => {
        setValue(event.target.value)
        router.push(`/tops?category=${event.target.value}`)
    }

    useEffect(() => {
        setValue(router.query.category)
    }, [router])


    return (
        <div>
            <Head>
                <title>MissNeha - Tops</title>
                <meta name="description" content="Quality of classes at proces of masses." />
                <link rel="icon" href="/icon.png" />
            </Head>
            <section className="text-gray-600 body-font min-h-screen flex flex-row">
                <div className="mx-2 my-8 sticky border border-gray-400 w-1/4 rounded-md h-full">
                    <p className='flex flex-row justify-center px-1 my-2 mx-10 text-xl'>Filter</p>

                    <hr className='mt-2' />
                    <div className='flex flex-col px-10 mx-auto text-base'>
                        <FormControl>
                            <p className='flex flex-row justify-center px-1 my-2 text-lg text-semibold'>Categories</p>
                            <RadioGroup name='job-experience-group-label' aria-labelledby='job-experience-group-label' value={value} onChange={handleChange} row>
                                <FormControlLabel control={<Radio size='medium' color='primary' />} value='tshirts' label='T-shirts' />
                                <FormControlLabel control={<Radio size='medium' color='primary' />} value='hoodies' label='Hoodies' />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    {Object.keys(filter).length != 0 && <><hr className='mt-2' />
                        <p className='flex flex-row justify-center px-1 my-2 mx-10 text-lg text-semibold'>Fabric</p>
                        <div className='flex flex-col px-20  mx-auto text-base'>
                            {Object.keys(filter).map((item, index) => { return <Link passHref={true} key={index} href={`${router.asPath}&fabric=${filter[item]}`}><li className='text-base cursor-pointer hover:text-blue-600 hover:underline'>{filter[item]}</li></Link> })}
                        </div></>}
                    <hr className='mt-2' />
                    <p className='flex flex-row justify-center px-1 my-2 mx-10 text-lg'>Sizes</p>
                    <div className='flex flex-row justify-center px-6 mx-auto'>
                        <Link href={`${router.asPath}&size=S`}><span className='border border-gray-300 px-2 mx-1 text-base cursor-pointer hover:text-blue-600 hover:border-blue-600'>S</span></Link>
                        <Link href={`${router.asPath}&size=M`}><span className='border border-gray-300 px-2 mx-1 text-base cursor-pointer hover:text-blue-600 hover:border-blue-600'>M</span></Link>
                        <Link href={`${router.asPath}&size=L`}><span className='border border-gray-300 px-2 mx-1 text-base cursor-pointer hover:text-blue-600 hover:border-blue-600'>L</span></Link>
                        <Link href={`${router.asPath}&size=XL`}><span className='border border-gray-300 px-2 mx-1 text-base cursor-pointer hover:text-blue-600 hover:border-blue-600'>XL</span></Link>
                        <Link href={`${router.asPath}&size=XXL`}><span className='border border-gray-300 px-2 mx-1 text-base cursor-pointer hover:text-blue-600 hover:border-blue-600'>XXL</span></Link>
                    </div>
                    <hr className='mt-3' />
                    <p className='flex flex-row justify-center px-1 my-2 mx-10 text-lg text-semibold'>Color</p>
                    <div className='flex flex-col pl-20 mx-auto text-base pb-2'>
                        {Object.keys(products).map((item, index) => {
                            return <div key={index} className='flex flex-row gap-x-3 py-1'><div style={{ backgroundColor: `${wordToHex[products[item].color.toString().toLowerCase()]}` }} className="border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none"></div><Link passHref={true} key={index} href={`${router.asPath}&color=${products[item].color}`}><a className='text-base cursor-pointer hover:text-blue-600 hover:underline'>{products[item].color.toString().toUpperCase()}</a></Link></div>
                        })}
                    </div>
                </div>
                <div className="container px-5 py-12">
                    <div className="flex flex-wrap -m-4 justify-center">
                        {Object.keys(products).length === 0 && <p>Sorry all the {value} are currently out of stock. New stock comming soon. Stay Tuned!</p>}
                        {Object.keys(products).map((item) => {
                            return <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}><div className="lg:w-1/4 md:w-1/2 p-4 w-[600px] cursor-pointer shadow-2xl m-7">
                                <a className="flex justify-center relative rounded overflow-hidden">
                                    <img alt="ecommerce" className="m-auto md:m-0 h-[384px] object-contain block" src={products[item].img} />
                                </a>
                                <div className="mt-4 text-center md:text-left">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category.toUpperCase()}</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                                    <p className="mt-1">₹{products[item].price}</p>
                                    <div className="mt-1">
                                        {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>}
                                        {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'>M</span>}
                                        {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'>L</span>}
                                        {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'>XL</span>}
                                        {products[item].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1'>XXL</span>}
                                        {products[item].size.includes('Standard') && <span className='border border-gray-300 px-1 mx-1'>Standard</span>}
                                        {/* {products[item].size.map((s, index) => { return <span key={index} className='border border-gray-300 px-1 mx-1'>{s}</span> })} */}
                                    </div>
                                    <div className="mt-1">
                                        {/* {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-300 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('dark green') && <button className="border-2 border-gray-300 ml-1 bg-green-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('dark blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('brown') && <button className="border-2 border-gray-300 ml-1 bg-amber-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('orange') && <button className="border-2 border-gray-300 ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-600 rounded-full w-6 h-6 focus:outline-none"></button>} */}
                                        {/* {products[item].color.map((col, index) => { return <button key={index} style={{ backgroundColor: `${col}` }} className={`border-2 border-gray-300 ml-1  rounded-full w-6 h-6 focus:outline-none`}></button> })} */}
                                        {/* <button style={{ backgroundColor: `${products[item].color}` }} className={`border-2 border-gray-300 ml-1  rounded-full w-6 h-6 focus:outline-none`}></button> */}
                                    </div>
                                </div>
                            </div>
                            </Link>
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let obj = {
        category: 'tops',
        theme: context.query.category,
    }
    if (context.query.color) {
        obj['color'] = context.query.color
    }
    if (context.query.fabric) {
        obj['fabric'] = context.query.fabric
    }
    if (context.query.size) {
        obj['size'] = context.query.size
    }
    let products = await Product.find(obj)
    let tops = {}
    let titlefilter = []
    for (let item of products) {
        if (item.title in tops) {
            if (!tops[item.title].color.includes(item.color) && item.availableQty > 0) {
                tops[item.title].color.push(item.color)
            }
            if (!tops[item.title].size.includes(item.size) && item.availableQty > 0) {
                tops[item.title].size.push(item.size)
            }
        }
        else {
            tops[item.title] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                tops[item.title].color = [item.color]
                tops[item.title].size = [item.size]
            }
            else {
                tops[item.title].color = []
                tops[item.title].size = []
            }
        }
    }

    for (let item of products) {
        if (!(Object.keys(titlefilter).includes(item.fabric))) {
            titlefilter.push(item.fabric)
        }
    }

    let unique = []

    for (let i = 0; i < titlefilter.length; i++) {
        if (unique.indexOf(titlefilter[i]) === -1) {
            unique.push(titlefilter[i]);
        }
    }

    return {
        props: { products: JSON.parse(JSON.stringify(tops)), filter: unique }, // will be passed to the page component as props
        // props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    }
}

export default Tops