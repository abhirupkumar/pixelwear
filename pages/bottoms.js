import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Product from "/models/Product"
import mongoose from 'mongoose'
import { useRouter } from 'next/router'
import { Box, FormControl, FormControlLabel, Pagination, Checkbox } from '@mui/material'
import Head from 'next/head'
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

const Bottoms = ({ products, filter, colorfilter, page, totalPages }) => {

    const router = useRouter()

    const [value, setValue] = useState(router.query.category)
    const [showFilter, setShowFilter] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({
        colors: [],
        categories: [],
        fabrics: [],
        sizes: [],
    });

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

    const changeFilter = (event) => {
        setShowFilter(!showFilter)
    }

    useEffect(() => {
        setValue(router.query.category)
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

    const applyFilters = () => {
        const filterParams = [];

        for (const filterType in selectedFilters) {
            const filters = selectedFilters[filterType];

            if (filters.length > 0) {
                filterParams.push(`${filterType}=${filters.join(',')}`);
            }
        }

        const queryString = filterParams.length > 0 ? `?${filterParams.join('&')}` : '';
        const filteredUrl = `/bottoms${queryString}`;

        router.push(filteredUrl);
    };

    const clearFilters = () => {
        setSelectedFilters({
            colors: [],
            categories: [],
            fabrics: [],
            sizes: [],
        });

        router.push('/bottoms');
    };

    return (
        <div>
            <Head>
                <title>Le-Soft - Bottoms</title>
                <meta name="description" content="Quality of classes at proces of masses." />
                <link rel="icon" href="/icon.png" />
            </Head>
            <div className="text-gray-600 body-font min-h-screen flex lg:flex-row flex-col">
                {colorfilter && colorfilter.length > 0 && <div className={`lg:mx-2 lg:my-12 lg:w-[300px] border border-gray-400 w-full rounded-md h-full lg:relative sticky top-0 bg-white z-20 ${showFilter ? '' : 'lg:border-gray-400 border-gray-300'}`}>
                    <p className='lg:flex lg:flex-row hidden justify-center px-1 my-2 mx-10 text-xl'>Filter</p>
                    <button className='flex lg:hidden justify-center px-1 my-2 mx-auto text-xl' onClick={changeFilter}>Filter {showFilter ? <FilterListIcon /> : <FilterListOffIcon />}</button>
                    <div className={`${showFilter ? 'lg:block transition-all overflow-y-scroll' : 'lg:block hidden'}`}>
                        <hr className='lg:mt-2 mt-1 mb-2' />
                        <div className="flex items-center justify-center">
                            <button onClick={applyFilters} className="flex mr-2 text-white bg-[#9933ff] border-0 py-2 px-3 focus:outline-none hover:bg-[#8000ff] rounded text-sm">Apply Filter</button>
                            <button onClick={clearFilters} className="flex mr-2 text-white bg-[#9933ff] border-0 py-2 px-3 focus:outline-none hover:bg-[#8000ff] rounded text-sm">Clear Filter</button>
                        </div>
                        <hr className='lg:mt-2 mt-1' />
                        <div className={`flex flex-col px-10 mx-auto text-base`}>
                            <FormControl>
                                <p className='flex flex-row justify-center px-1 my-2 text-lg text-semibold'>Categories</p>
                                <FormControlLabel
                                    key={1}
                                    control={<Checkbox checked={!!selectedFilters.categories.includes("ankleleggings")} onChange={handleFilterChange} name="categories" value="ankleleggings" />}
                                    label="Ankle Leggings"
                                />
                                <FormControlLabel
                                    key={2}
                                    control={<Checkbox checked={!!selectedFilters.categories.includes("caprileggings")} onChange={handleFilterChange} name="categories" value="caprileggings" />}
                                    label="Capri Leggings"
                                />
                                <FormControlLabel
                                    key={3}
                                    control={<Checkbox checked={!!selectedFilters.categories.includes("churidarleggings")} onChange={handleFilterChange} name="categories" value="churidarleggings" />}
                                    label="Churidar Leggings"
                                />
                                <FormControlLabel
                                    key={4}
                                    control={<Checkbox checked={!!selectedFilters.categories.includes("palazzo")} onChange={handleFilterChange} name="categories" value="palazzo" />}
                                    label="Palazzo"
                                />
                                <FormControlLabel
                                    key={5}
                                    control={<Checkbox checked={!!selectedFilters.categories.includes("patiala")} onChange={handleFilterChange} name="categories" value="patiala" />}
                                    label="Patiala"
                                />
                                <FormControlLabel
                                    key={6}
                                    control={<Checkbox checked={!!selectedFilters.categories.includes("straightpant")} onChange={handleFilterChange} name="categories" value="straightpant" />}
                                    label="Straight Pant"
                                />
                            </FormControl>
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
                            {['S', 'M', 'L', 'XL', '2XL', '3XL', 'Free'].map((item, index) => {
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
                <div className={`w-full px-2 justify-start items-center ${showFilter ? 'hidden' : 'flex flex-col'}`}>
                    <div className="flex flex-wrap justify-center items-center">
                        {Object.keys(products)?.length === 0 && <p className="mt-10">Sorry all the {value} are currently out of stock. New stock comming soon. Stay Tuned!</p>}
                        {Object.keys(products)?.map((item) => {
                            return <div key={products[item]._id} className="lg:w-[310px] w-[39%] cursor-pointer m-4 overlfow-x-hiden">
                                <Link href={`/product/${products[item].slug}`}>
                                    <div className="flex justify-center md:h-[480px] h-[216px] relative overflow-hidden">
                                        <img alt="ecommerce" className="m-auto md:m-0 lg:h-[480px] object-contain transition duration-500 ease-in-out hover:object-cover block" src={products[item].img} loading="lazy" />
                                    </div>
                                    <div className="text-center md:text-left flex flex-col lg:h-[195px] h-[162px] justify-around">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category.toUpperCase()}</h3>
                                        <h2 className="text-gray-900 text-left title-font lg:text-lg sm:text-sm text-xs font-medium">{products[item].title}</h2>
                                        <p className="mt-1 text-left">₹{products[item].price}</p>
                                        <div className="mt-1 flex items-start">
                                            {products[item].size.slice(0, 3).map((size, index) => {
                                                return <span key={index} className='border border-gray-500 px-1 mx-1 lg:text-lg ms:text-md sm:text-sm text-xs'>{size}</span>
                                            })}
                                            {products[item].size.length > 3 && <span className='border border-gray-500 lg:px-1 px-[0.10rem] mx-1 lg:text-lg ms:text-md sm:text-sm text-xs'>+{products[item].size.length - 3} more</span>}
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
                        variant="outlined" color="secondary"
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
    let obj = {
        category: 'bottoms',
    }
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
        if (item.title + item.color in bottoms) {
            if (!bottoms[item.title + item.color].color.includes(item.color) && item.availableQty > 0) {
                bottoms[item.title + item.color].color = item.color
                if (!(colorfilter.includes(item.color))) {
                    colorfilter.push(item.color)
                }
            }
            if (!bottoms[item.title + item.color].size.includes(item.size) && item.availableQty > 0) {
                bottoms[item.title + item.color].size.push(item.size)
            }
        }
        else {
            bottoms[item.title + item.color] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                bottoms[item.title + item.color].color = item.color
                bottoms[item.title + item.color].size = [item.size]
                if (!(colorfilter.includes(item.color))) {
                    colorfilter.push(item.color)
                }
            }
            else {
                bottoms[item.title + item.color].color = []
                bottoms[item.title + item.color].size = []
                if (!(colorfilter.includes(item.color))) {
                    colorfilter.push(item.color)
                }
            }
        }
    }

    let products2 = await Product.find({ category: 'bottoms' })
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

    let page = 1
    if (context.query.page && context.query.page !== 0) {
        page = context.query.page
    }
    const productsPerPage = 15;
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    const filteredProducts = Object.fromEntries(
        Object.entries(bottoms).slice(startIndex, endIndex)
    );

    let unique = []

    for (let i = 0; i < titlefilter.length; i++) {
        if (unique.indexOf(titlefilter[i]) === -1) {
            unique.push(titlefilter[i]);
        }
    }

    return {
        props: { products: JSON.parse(JSON.stringify(filteredProducts)), filter: unique, colorfilter: colorfilter, page: Number(page), totalPages: Math.ceil(Object.values(bottoms).length / productsPerPage), }, // will be passed to the page component as props
        // props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    }
}

export default Bottoms