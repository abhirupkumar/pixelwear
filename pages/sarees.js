import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Product from "/models/Product"
import mongoose from 'mongoose'
import { useRouter } from 'next/router'
import { Box, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import { wordToHex } from '../colorhex'
import Head from 'next/head'
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

const Bottoms = ({ products, filter, colorfilter }) => {

    const router = useRouter()

    const [value, setValue] = useState(router.query.category)
    const [showFilter, setShowFilter] = useState(false)

    const handleChange = (event) => {
        setValue(event.target.value)
        router.push(`/bottoms?category=${event.target.value}`)
    }

    const changeFilter = (event) => {
        setShowFilter(!showFilter)
    }

    useEffect(() => {
        setValue(router.query.category)
    }, [router])


    return (
        <div>
            <Head>
                <title>Le-Soft - Sarees</title>
                <meta name="description" content="Quality of classes at proces of masses." />
                <link rel="icon" href="/icon.png" />
            </Head>
            <div className="text-gray-600 body-font min-h-screen flex lg:flex-row flex-col mt-10">
                {<div className={`lg:mx-2 lg:my-12 my-4 border border-gray-400 lg:w-[300px] w-full rounded-md lg:h-full lg:relative fixed bg-white z-20 ${showFilter ? '' : 'lg:border-gray-400 border-gray-300'} `}>
                    <p className='lg:flex lg:flex-row hidden justify-center px-1 my-2 mx-10 text-xl'>Filter</p>
                    <button className='flex lg:hidden justify-center px-1 my-2 mx-auto text-xl' onClick={changeFilter}>Filter {showFilter ? <FilterListIcon /> : <FilterListOffIcon />}</button>
                    <div className={`${showFilter ? 'lg:block transition-all' : 'lg:block hidden'}`}>
                        {/* <hr className='lg:mt-2 mt-1' /> */}
                        {/* <div className={`flex flex-col px-10 mx-auto text-base`}>
                            <FormControl>
                                <p className='flex flex-row justify-center px-1 my-2 text-lg text-semibold'>Categories</p>
                                <RadioGroup name='job-experience-group-label' aria-labelledby='job-experience-group-label' value={value} onChange={handleChange} col='true'>
                                    <FormControlLabel control={<Radio size='medium' color='primary' />} value='ankleleggings' label='Ankle Leggings' />
                                    <FormControlLabel control={<Radio size='medium' color='primary' />} value='caprileggings' label='Capri Leggings' />
                                </RadioGroup>
                            </FormControl>
                        </div> */}
                        {Object.keys(filter).length != 0 && <><hr className='mt-2' />
                            <p className='flex flex-row justify-center px-1 my-2 mx-10 text-lg text-semibold'>Fabric</p>
                            <div className='flex flex-col px-20  mx-auto text-base'>
                                {Object.keys(filter).map((item, index) => { return <Link passHref={true} key={index} href={`${router.asPath}&fabric=${filter[item]}`}><li className='text-base cursor-pointer hover:text-blue-600 hover:underline'>{filter[item]}</li></Link> })}
                            </div></>}
                        {colorfilter && colorfilter.length > 0 && <>
                            <hr className='mt-3' />
                            <p className='flex flex-row justify-center px-1 my-2 mx-10 text-lg text-semibold'>Color</p>
                            <div className='flex flex-col pl-10 mx-auto text-base pb-2'>
                                {colorfilter && colorfilter.map((color, index) => {
                                    return <div key={index} className='flex flex-row gap-x-3 py-1'><div style={{ backgroundColor: `${wordToHex[color]}` }} className="border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none"></div><Link passHref={true} key={index} href={`${router.asPath}&color=${color}`}><a className='text-base cursor-pointer hover:text-blue-600 hover:underline'>{color}</a></Link></div>
                                })}
                            </div>
                        </>}
                    </div>
                </div>}
                <div className="flex w-full px-2 justify-center">
                    <div className="flex flex-wrap justify-center items-center">
                        {Object.keys(products)?.length === 0 && <p className="">Sorry all the {value} are currently out of stock. New stock comming soon. Stay Tuned!</p>}
                        {Object.keys(products)?.map((item) => {
                            return <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}><div className="lg:w-[310px] w-[39%] cursor-pointer m-4">
                                <a className="flex justify-center lg:h-[480px] relative overflow-hidden">
                                    <img alt="ecommerce" className="m-auto md:m-0 lg:h-[480px] object-contain block" src={products[item].img} />
                                </a>
                                <div className="text-center md:text-left">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category.toUpperCase()}</h3>
                                    <h2 className="text-gray-900 text-left title-font lg:text-lg ms:text-md sm:text-sm text-xs font-medium">{products[item].title}</h2>
                                    <p className="mt-1 text-left">₹{products[item].price}</p>
                                    <div className="mt-1 flex items-start">
                                        {products[item].size.includes('S') && <span className='border border-gray-500 px-1 mx-1'>S</span>}
                                        {products[item].size.includes('M') && <span className='border border-gray-500 px-1 mx-1'>M</span>}
                                        {products[item].size.includes('L') && <span className='border border-gray-500 px-1 mx-1'>L</span>}
                                        {products[item].size.includes('XL') && <span className='border border-gray-500 px-1 mx-1'>XL</span>}
                                        {products[item].size.includes('2XL') && <span className='border border-gray-300 px-1 mx-1'>2XL</span>}
                                        {products[item].size.includes('3XL') && <span className='border border-gray-500 px-1 mx-1'>3XL</span>}
                                        {products[item].size.includes('Free') && <span className='border border-gray-500 px-1 mx-1'>Free</span>}
                                    </div>
                                </div>
                            </div>
                            </Link>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let obj = {
        category: 'sarees',
    }
    if (context.query.category) {
        obj['theme'] = context.query.category
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
    let sarees = {}
    let titlefilter = []
    let colorfilter = []
    for (let item of products) {
        if (item.title + item.color in bottoms) {
            if (!sarees[item.title + item.color].color.includes(item.color) && item.availableQty > 0) {
                sarees[item.title + item.color].color = item.color
                if (!(colorfilter.includes(item.color))) {
                    colorfilter.push(item.color)
                }
            }
            if (!sarees[item.title + item.color].size.includes(item.size) && item.availableQty > 0) {
                sarees[item.title + item.color].size.push(item.size)
            }
        }
        else {
            sarees[item.title + item.color] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                sarees[item.title + item.color].color = item.color
                sarees[item.title + item.color].size = [item.size]
                if (!(colorfilter.includes(item.color))) {
                    colorfilter.push(item.color)
                }
            }
            else {
                sarees[item.title + item.color].color = []
                sarees[item.title + item.color].size = []
                if (!(colorfilter.includes(item.color))) {
                    colorfilter.push(item.color)
                }
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
        props: { products: JSON.parse(JSON.stringify(sarees)), filter: unique, colorfilter: colorfilter }, // will be passed to the page component as props
        // props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    }
}

export default Bottoms