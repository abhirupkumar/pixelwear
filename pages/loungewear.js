import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Product from "/models/Product"
import mongoose from 'mongoose'
import { useRouter } from 'next/router'
import { Box, FormControl, FormControlLabel, RadioGroup, Radio, Pagination } from '@mui/material'
import { wordToHex } from '../colorhex'
import Head from 'next/head'
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

const LoungeWear = ({ products, filter, colorfilter, page, totalPages }) => {

    const router = useRouter()

    const [value, setValue] = useState(router.query.category)
    const [showFilter, setShowFilter] = useState(false)

    const handleChange = (event) => {
        if (router.query.category) {
            router.push(`${router.asPath.replace(router.query.category, event.target.value)}`)
        }
        else {
            if (router.asPath.includes('?')) {
                router.push(`${router.asPath}&category=${event.target.value}`)
            }
            else {
                router.push(`${router.asPath}?category=${event.target.value}`)
            }
        }
    }

    const changeFilter = (event) => {
        setShowFilter(!showFilter)
    }

    useEffect(() => {
        setValue(router.query.category ? router.query.category : "Lounge Wears")
    }, [router])

    const handlePageChange = (event, value) => {
        if (router.query.page) {
            router.push(`${router.asPath.replace(router.query.page, value)}`)
        }
        else {
            if (router.asPath.includes('?')) {
                router.push(`${router.asPath}&page=${value}`)
            }
            else {
                router.push(`${router.asPath}?page=${value}`)
            }
        }
    }

    return (
        <div>
            <Head>
                <title>Le-Soft - LoungeWear</title>
                <meta name="description" content="Quality of classes at proces of masses." />
                <link rel="icon" href="/icon.png" />
            </Head>
            <div className="text-gray-600 body-font min-h-screen flex lg:flex-row flex-col">
                {colorfilter && colorfilter.length > 0 && <div className={`lg:mx-2 lg:my-12 lg:w-[300px] border border-gray-400 w-full rounded-md lg:h-full lg:relative sticky top-0 bg-white z-20 ${showFilter ? '' : 'lg:border-gray-400 border-gray-300'}`}>
                    <p className='lg:flex lg:flex-row hidden justify-center px-1 my-2 mx-10 text-xl'>Filter</p>
                    <button className='flex lg:hidden justify-center px-1 my-2 mx-auto text-xl' onClick={changeFilter}>Filter {showFilter ? <FilterListIcon /> : <FilterListOffIcon />}</button>
                    <div className={`${showFilter ? 'lg:block transition-all' : 'lg:block hidden'}`}>
                        <hr className='lg:mt-2 mt-1' />
                        <div className={`flex flex-col px-10 mx-auto text-base`}>
                            <FormControl>
                                <p className='flex flex-row justify-center px-1 my-2 text-lg text-semibold'>Categories</p>
                                <RadioGroup name='job-experience-group-label' aria-labelledby='job-experience-group-label' value={value ? value : ''} onChange={handleChange} col='true'>
                                    <FormControlLabel control={<Radio size='small' color='primary' />} value='pyjama' label={<span className='text-sm' >Pyjama Set</span>} />
                                    <FormControlLabel control={<Radio size='small' color='primary' />} value='capri' label={<span className='text-sm' >Capri Set</span>} />
                                    <FormControlLabel control={<Radio size='small' color='primary' />} value='shorty' label={<span className='text-sm' >Shorty Set</span>} />
                                    <FormControlLabel control={<Radio size='small' color='primary' />} value='longtee' label={<span className='text-sm' >Long Tee</span>} />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        {Object.keys(filter).length != 0 && <><hr className='mt-2' />
                            <p className='flex flex-row justify-center px-1 my-2 mx-10 text-lg text-semibold'>Fabric</p>
                            <div className='flex flex-col px-20 mx-auto text-base'>
                                {Object.keys(filter).map((item, index) => { return <Link passHref={true} key={index} href={`${router.asPath}&fabric=${filter[item]}`}><li className='text-base cursor-pointer hover:text-blue-600 hover:underline'>{filter[item]}</li></Link> })}
                            </div></>}
                        <hr className='mt-2' />
                        <p className='flex flex-row justify-center px-1 my-2 mx-10 text-lg'>Sizes</p>
                        <div className='flex flex-wrap justify-center px-6 mx-auto'>
                            <Link href={`${router.asPath}&size=S`}><span className='border border-gray-300 px-2 mx-1 text-base my-1  cursor-pointer hover:text-blue-600 hover:border-blue-600'>S</span></Link>
                            <Link href={`${router.asPath}&size=M`}><span className='border border-gray-300 px-2 mx-1 text-base my-1  cursor-pointer hover:text-blue-600 hover:border-blue-600'>M</span></Link>
                            <Link href={`${router.asPath}&size=L`}><span className='border border-gray-300 px-2 mx-1 text-base my-1  cursor-pointer hover:text-blue-600 hover:border-blue-600'>L</span></Link>
                            <Link href={`${router.asPath}&size=XL`}><span className='border border-gray-300 px-2 mx-1 text-base my-1  cursor-pointer hover:text-blue-600 hover:border-blue-600'>XL</span></Link>
                            <Link href={`${router.asPath}&size=2XL`}><span className='border border-gray-300 px-2 mx-1 text-base my-1  cursor-pointer hover:text-blue-600 hover:border-blue-600'>2XL</span></Link>
                            <Link href={`${router.asPath}&size=3XL`}><span className='border border-gray-300 px-2 mx-1 text-base my-1  cursor-pointer hover:text-blue-600 hover:border-blue-600'>3XL</span></Link>
                            <Link href={`${router.asPath}&size=Free`}><span className='border border-gray-300 px-2 mx-1 text-base my-1  cursor-pointer hover:text-blue-600 hover:border-blue-600'>Free</span></Link>
                        </div>
                        {colorfilter && colorfilter.length > 0 && <>
                            <hr className='mt-3' />
                            <p className='flex flex-row justify-center px-1 my-2 mx-10 text-lg text-semibold'>Color</p>
                            <div className='flex flex-col pl-10 mx-auto text-base pb-2'>
                                {colorfilter && colorfilter.map((color, index) => {
                                    return <div key={index} className='flex flex-row gap-x-3 py-1'><div style={{ backgroundColor: `${wordToHex[color]}` }} className="border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none"></div><Link passHref={true} key={index} href={`${router.asPath}&color=${color}`}><a className='text-base cursor-pointer hover:text-blue-600 hover:underline'>{color}</a></Link></div>
                                })}
                            </div>
                            <div className="lg:hidden py-10">
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
                                    <img alt="ecommerce" className="m-auto md:m-0 lg:h-[480px] object-contain block" src={products[item].img} loading="lazy" />
                                </a>
                                <div className="text-center md:text-left">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category.toUpperCase()}</h3>
                                    <h2 className="text-gray-900 text-left title-font lg:text-lg ms:text-md sm:text-sm text-xs font-medium">{products[item].title}</h2>
                                    <p className="mt-1 text-left lg:text-lg ms:text-md sm:text-sm text-xs">₹{products[item].price}</p>
                                    <div className="mt-1 flex items-start">
                                        {products[item].size.includes('S') && <span className='border border-gray-500 px-1 mx-1 lg:text-lg ms:text-md sm:text-sm text-xs'>S</span>}
                                        {products[item].size.includes('M') && <span className='border border-gray-500 px-1 mx-1 lg:text-lg ms:text-md sm:text-sm text-xs'>M</span>}
                                        {products[item].size.includes('L') && <span className='border border-gray-500 px-1 mx-1 lg:text-lg ms:text-md sm:text-sm text-xs'>L</span>}
                                        {products[item].size.includes('XL') && <span className='border border-gray-500 px-1 mx-1 lg:text-lg ms:text-md sm:text-sm text-xs'>XL</span>}
                                        {products[item].size.includes('2XL') && <span className='border border-gray-300 px-1 mx-1 lg:text-lg ms:text-md sm:text-sm text-xs'>2XL</span>}
                                        {products[item].size.includes('3XL') && <span className='border border-gray-500 px-1 mx-1 lg:text-lg ms:text-md sm:text-sm text-xs'>3XL</span>}
                                        {products[item].size.includes('Free') && <span className='border border-gray-500 px-1 mx-1 lg:text-lg ms:text-md sm:text-sm text-xs'>Free</span>}
                                    </div>
                                </div>
                            </div>
                            </Link>
                        })}
                        {Object.keys(products)?.length > 0 && <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            style={{ marginTop: '3rem', marginBottom: '3rem' }}
                            variant="outlined" color="secondary"
                        />}
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
        category: 'loungewear',
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
    let prods = {}
    let titlefilter = []
    let colorfilter = []
    for (let item of products) {
        if (item.title + item.color in prods) {
            if (!prods[item.title + item.color].color.includes(item.color) && item.availableQty > 0) {
                prods[item.title + item.color].color = item.color
                if (!(colorfilter.includes(item.color))) {
                    colorfilter.push(item.color)
                }
            }
            if (!prods[item.title + item.color].size.includes(item.size) && item.availableQty > 0) {
                prods[item.title + item.color].size.push(item.size)
            }
        }
        else {
            prods[item.title + item.color] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                prods[item.title + item.color].color = []
                prods[item.title + item.color].size = [item.size]
                if (!(colorfilter.includes(item.color))) {
                    colorfilter.push(item.color)
                }
            }
            else {
                prods[item.title + item.color].color = []
                prods[item.title + item.color].size = []
                if (!(colorfilter.includes(item.color))) {
                    colorfilter.push(item.color)
                }
            }
        }
    }

    let products2 = await Product.find({ category: 'loungewear' })
    for (let item of products2) {
        if (!(colorfilter.includes(item.color))) {
            colorfilter.push(item.color)
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

    let page = 1
    if (context.query.page && context.query.page !== 0) {
        page = context.query.page
    }
    const productsPerPage = 15;
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    const filteredProducts = Object.fromEntries(
        Object.entries(prods).slice(startIndex, endIndex)
    );

    return {
        props: { products: JSON.parse(JSON.stringify(filteredProducts)), filter: unique, colorfilter: colorfilter, page: Number(page), totalPages: Math.ceil(Object.values(prods).length / productsPerPage), }, // will be passed to the page component as props
        // props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    }
}

export default LoungeWear