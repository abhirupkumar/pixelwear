import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Product from "/models/Product"
import mongoose from 'mongoose'
import { useRouter } from 'next/router'
import { Box, FormControl, FormControlLabel, RadioGroup, Radio, Pagination, Checkbox } from '@mui/material'
import { wordToHex } from '../colorhex'
import Head from 'next/head'
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { checkWishlist } from '../features/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai'

const SearchResult = ({ products, filter, colorfilter, page, totalPages }) => {

    const router = useRouter()
    const [showFilter, setShowFilter] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({
        colors: [],
        categories: [],
        fabrics: [],
        sizes: [],
    });

    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.cartItems.wishlist)

    useEffect(() => {
        const { colors = [], categories = [], fabrics = [], sizes = [] } = router.query;
        setSelectedFilters({
            colors: Array.isArray(colors) ? colors : colors.split(','),
            categories: Array.isArray(categories) ? categories : categories.split(','),
            fabrics: Array.isArray(fabrics) ? fabrics : fabrics.split(','),
            sizes: Array.isArray(sizes) ? sizes : sizes.split(','),
        });
    }, [router.query]);

    const handleFilterChange = (event) => {
        setSelectedFilters({
            ...selectedFilters,
            [event.target.name]: event.target.checked ? [...selectedFilters[event.target.name], event.target.value] : selectedFilters[event.target.name].filter((filter) => filter !== event.target.value),
        });
    };

    const applyFilters = () => {
        const filterParams = [];

        for (const filterType in selectedFilters) {
            const filters = selectedFilters[filterType];

            if (filters.length > 0) {
                filterParams.push(`${filterType}=${filters.join(',')}`);
            }
        }

        const queryString = filterParams.length > 0 ? `?${filterParams.join('&')}` : '';
        const filteredUrl = `/search_result${queryString}&query=${router.query.query}`;

        router.push(filteredUrl);
    };

    const clearFilters = () => {
        setSelectedFilters({
            colors: [],
            categories: [],
            fabrics: [],
            sizes: [],
        });

        router.push(`/search_result?query=${router.query.query}`);
    };

    const changeFilter = (event) => {
        setShowFilter(!showFilter)
    }

    useEffect(() => {
    }, [router.query.query])

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
                <title>Le-Soft - Bottoms</title>
                <meta name="description" content="Quality of classes at proces of masses." />
                <link rel="icon" href="/icon.png" />
            </Head>
            <div className="text-gray-600 body-font min-h-screen flex lg:flex-row flex-col">
                {colorfilter && colorfilter.length > 0 && Object.keys(products)?.length > 0 && <div className={`lg:mx-2 lg:my-12 lg:w-[300px] border border-gray-400 w-full rounded-md h-full lg:relative sticky top-0 bg-white z-20 ${showFilter ? '' : 'lg:border-gray-400 border-gray-300'}`}>
                    <p className='lg:flex lg:flex-row hidden justify-center px-1 my-2 mx-10 text-xl'>Filter</p>
                    <button className='flex lg:hidden justify-center px-1 my-2 mx-auto text-xl' onClick={changeFilter}>Filter {showFilter ? <FilterListIcon /> : <FilterListOffIcon />}</button>
                    <div className={`${showFilter ? 'lg:block transition-all overflow-y-scroll' : 'lg:block hidden'}`}>
                        <hr className='lg:mt-2 mt-1 mb-2' />
                        <div className="flex items-center justify-center">
                            <button onClick={applyFilters} className="flex mr-2 text-white bg-[#1a4ffd] hover:bg-[#1440d3] border-0 py-2 px-3 focus:outline-none rounded text-sm">Apply Filter</button>
                            <button onClick={clearFilters} className="flex mr-2 text-white bg-[#1a4ffd] hover:bg-[#1440d3] border-0 py-2 px-3 focus:outline-none  rounded text-sm">Clear Filter</button>
                        </div>
                        {Object.keys(filter).length != 0 && <><hr className='mt-2' />
                            <p className='flex flex-row justify-center px-1 my-2 mx-10 text-lg text-semibold'>Fabric</p>
                            <div className='flex flex-col px-20 mx-auto text-base'>
                                {Object.keys(filter).map((item, index) => {
                                    return <FormControlLabel
                                        key={index}
                                        control={<Checkbox checked={!!selectedFilters.fabrics.includes(filter[item])} onChange={handleFilterChange} name="fabrics" value={filter[item]} />}
                                        label={filter[item]}
                                    />
                                })}
                            </div></>}
                        <hr className='mt-2' />
                        <p className='flex flex-row justify-center px-1 my-2 mx-10 text-lg'>Sizes</p>
                        <div className='flex flex-wrap justify-center px-6 mx-auto'>
                            {['S', 'M', 'L', 'XL', '2XL', '3XL', 'Free', 'Standard'].map((item, index) => {
                                return <FormControlLabel
                                    key={index}
                                    control={<Checkbox checked={!!selectedFilters.sizes.includes(item)} onChange={handleFilterChange} name="sizes" value={item} />}
                                    label={item}
                                />
                            })}
                        </div>
                        {colorfilter && colorfilter.length > 0 && <>
                            <hr className='mt-3' />
                            <p className='flex flex-row justify-center px-1 my-2 mx-10 text-lg text-semibold'>Color</p>
                            <div className='flex flex-col pl-10 mx-auto text-base pb-2'>
                                {colorfilter && colorfilter.map((color, index) => {
                                    return <FormControlLabel
                                        key={index}
                                        control={<Checkbox checked={!!selectedFilters.colors.includes(color)} onChange={handleFilterChange} name="colors" value={color} />}
                                        label={color}
                                    />
                                })}
                            </div>
                            <div className="lg:hidden py-10">
                            </div>
                        </>}
                    </div>
                </div>}
                <div className={`w-full px-2 justify-start items-center lg:mt-12 ${showFilter ? 'hidden' : 'flex flex-col'}`}>
                    <div className="flex flex-wrap justify-center items-center">
                        {Object.keys(products)?.length === 0 && <p className="mt-10">Sorry, Search not found!</p>}
                        {Object.keys(products)?.map((item) => {
                            let discount = 0
                            if (!!products[item].mrp) {
                                discount = (products[item].mrp - products[item].price) / products[item].mrp * 100
                                discount = discount.toFixed(1)
                            }
                            return <div key={products[item]._id} className="flex mx-auto mb-10 flex-col lg:w-[310px] w-[40vw] cursor-pointer items-center">
                                <div>
                                    <div className='m-auto md:m-0 flex lg:h-[470px] md:h-[400px] w-full sm-1:h-[40vh] sm-2:h-[30vh] h-[22vh]'>
                                        {!!products[item].mrp && discount > 0 && <div className='absolute z-20 m-2 bg-[#f3f3f3] px-2 py-1 items-center rounded-full md:block hidden'>
                                            <p className="text-left font-semibold text-green-600 text-xs">{discount}% off</p>
                                        </div>}
                                        <Link href={`/product/${products[item].slug}`}><img alt="ecommerce" className="h-full  block" src={products[item]?.img} /></Link>
                                    </div>
                                </div>
                                <Link href={`/product/${products[item].slug}`}>
                                    <div className="text-center mx-[2px] my-1 space-y-2 md:text-justify flex flex-col">
                                        <h3 className="text-gray-500 mx-auto text-xs tracking-widest capitalize">{products[item].category.toUpperCase()}</h3>
                                        <h2 className="text-gray-900 mx-auto lg:text-left title-font lg:text-lg md:text-md sm:text-sm text-xs font-medium">{products[item].title}</h2>
                                        <div className="flex space-x-2 lg:justify-start items-center justify-center">
                                            <p className="text-left text-black font-semibold md:text-lg text-sm">₹{products[item].price}</p>
                                            {!!products[item].mrp && <p className="text-left text-gray-400 line-through md:text-base text-xs">₹{products[item].mrp}</p>}
                                            {!!products[item].mrp && discount > 0 && <p className="text-left font-semibold text-green-600 text-xs md:hidden block">{discount}% off</p>}
                                        </div>
                                        <div className="lg:justify-start justify-center flex">
                                            {products[item].size.slice(0, 2).map((size, index) => {
                                                return <span key={index} className='border border-gray-500 px-1 mx-1  md:text-md sm:text-sm text-xs'>{size}</span>
                                            })}
                                            {products[item].size.length > 2 && <span className='border border-gray-500 lg:px-1 px-[0.10rem] mx-1 md:text-md sm:text-sm text-xs sm:block hidden'>+{products[item].size.length - 2} more</span>}
                                            {products[item].size.length > 2 && <span className='border border-gray-500 lg:px-1 px-[0.10rem] mx-1 md:text-md sm:text-sm text-xs sm:hidden block'>+{products[item].size.length - 2}</span>}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        })}
                    </div>
                    {Object.keys(products)?.length > 0 && <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        style={{ marginTop: '3rem', marginBottom: '3rem' }}
                        variant="outlined" color="primary"
                    />}
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let obj = {}
    if (context.query.categories) {
        obj['theme'] = Array.isArray(context.query.categories) ? context.query.categories : context.query.categories.split(',')
    }
    if (context.query.colors) {
        obj['color'] = Array.isArray(context.query.colors) ? context.query.colors : context.query.colors.split(',')
    }
    if (context.query.fabrics) {
        obj['fabric'] = Array.isArray(context.query.fabrics) ? context.query.fabrics : context.query.fabrics.split(',')
    }
    if (context.query.sizes) {
        obj['size'] = Array.isArray(context.query.sizes) ? context.query.sizes : context.query.sizes.split(',')
    }
    let products = await Product.find(obj)
    let bottoms = {}
    let titlefilter = []
    let colorfilter = []
    for (let item of products) {
        if (item.title + " " + item.color in bottoms) {
            if (!bottoms[item.title + " " + item.color].color.includes(item.color) && item.availableQty > 0) {
                bottoms[item.title + " " + item.color].color = item.color
                if (!(colorfilter.includes(item.color))) {
                    colorfilter.push(item.color)
                }
            }
            if (!bottoms[item.title + " " + item.color].size.includes(item.size) && item.availableQty > 0) {
                bottoms[item.title + " " + item.color].size.push(item.size)
            }
        }
        else {
            bottoms[item.title + " " + item.color] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                bottoms[item.title + " " + item.color].color = item.color
                bottoms[item.title + " " + item.color].size = [item.size]
                if (!(colorfilter.includes(item.color))) {
                    colorfilter.push(item.color)
                }
            }
            else {
                bottoms[item.title + " " + item.color].color = []
                bottoms[item.title + " " + item.color].size = []
                if (!(colorfilter.includes(item.color))) {
                    colorfilter.push(item.color)
                }
            }
        }
    }


    let results = []
    for (let product in bottoms) {
        const productString = (bottoms[product].title + " " + bottoms[product].category + " " + bottoms[product].color + " " + bottoms[product].theme).toLowerCase();
        const queryWords = context.query.query.toLowerCase().split(' ');
        if (queryWords.every(word => productString.includes(word))) {
            results.push(bottoms[product])
        }
    };


    for (let item of products) {
        if (!(Object.keys(titlefilter).includes(item.fabric))) {
            titlefilter.push(item.fabric)
        }
    }

    let unique = []
    let products2 = await Product.find()
    for (let item of products2) {
        if (!(colorfilter.includes(item.color))) {
            colorfilter.push(item.color)
        }
    }

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
        Object.entries(results).slice(startIndex, endIndex)
    );

    return {
        props: { products: JSON.parse(JSON.stringify(filteredProducts)), filter: unique, colorfilter: colorfilter, page: Number(page), totalPages: Math.ceil(Object.values(results).length / productsPerPage), }, // will be passed to the page component as props
        // props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    }
}

export default SearchResult;