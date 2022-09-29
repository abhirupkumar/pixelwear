import React, { useEffect } from 'react'
import Link from 'next/link'
import Product from "/models/Product"
import mongoose from 'mongoose'
import { useRouter } from 'next/router'

const Ankleleggings = ({ products, titlefilter }) => {

    const router = useRouter()

    return (
        <div>
            <section className="text-gray-600 body-font min-h-screen flex flex-row">
                <div className="mx-2 my-8 border border-gray-400 w-1/4 rounded-md h-[80vh]">
                    <p className='flex flex-row justify-center px-1 my-2 mx-10 text-xl'>Filter</p>
                    <hr />
                    <p className='flex flex-row justify-center px-1 my-2 mx-10 text-lg'>Color</p>
                    {/* <div className='flex flex-col justify-center mx-auto w-[2.5rem] text-base'>
                        {titlefilter.map((title) => { return <div>{title}</div> })}
                    </div> */}
                    <div className='flex flex-col justify-right px-6 mx-auto text-base'>
                        {/* {Object.keys(products).map((item) => { <Link passHref={true} key={index} href={`/product/bottoms/ankleleggings?title=${products[item].title}`}><li className='text-sm cursor-pointer hover:text-blue-600 hover:underline'>{products[item].title}</li></Link> })} */}
                        {Object.keys(products).map((item, index) => {

                            return <Link passHref={true} key={index} href={`?color=${products[item].color}`}><li className='text-sm cursor-pointer hover:text-blue-600 hover:underline'>{products[item].color}</li></Link>
                        })}
                    </div>
                    <hr />
                    <p className='flex flex-row justify-center px-1 my-2 mx-10 text-lg'>Fabric</p>
                    <div className='flex flex-col justify-right px-6 mx-auto text-base'>
                        {Object.keys(titlefilter).map((item, index) => { return <Link passHref={true} key={index} href={`?fabric=${titlefilter[item]}`}><li className='text-sm cursor-pointer hover:text-blue-600 hover:underline'>{titlefilter[item]}</li></Link> })}
                    </div>
                </div>
                <div className="container px-5 py-12">
                    <div className="flex flex-wrap -m-4 justify-center">
                        {Object.keys(products).length === 0 && <p>Sorry all the leggings are currently out of stock. New stock comming soon. Stay Tuned!</p>}
                        {Object.keys(products).map((item) => {
                            return <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}><div className="lg:w-1/5 md:w-1/2 p-4 w-[600px] cursor-pointer shadow-2xl m-7">
                                <a className="flex justify-center relative rounded overflow-hidden">
                                    <img alt="ecommerce" className="m-auto md:m-0 h-full w-[600px] object-contain block" src={products[item].img} />
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
        category: 'bottoms',
        theme: 'ankleleggings',
    }
    if (context.query.color) {
        obj['color'] = context.query.color
    }
    if (context.query.fabric) {
        obj['fabric'] = context.query.fabric
    }
    let products = await Product.find(obj)
    // let products
    // if (context.query.title) {
    //     products = await product.find({ title: context.query.title })
    // }
    // else {
    //     products = product
    // }
    let bottoms = {}
    let titlefilter = {}
    for (let item of products) {
        if (item.title in bottoms) {
            if (!bottoms[item.title].color.includes(item.color) && item.availableQty > 0) {
                bottoms[item.title].color.push(item.color)
            }
            if (!bottoms[item.title].size.includes(item.size) && item.availableQty > 0) {
                bottoms[item.title].size.push(item.size)
            }
        }
        else {
            bottoms[item.title] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                bottoms[item.title].color = [item.color]
                bottoms[item.title].size = [item.size]
            }
            else {
                bottoms[item.title].color = []
                bottoms[item.title].size = []
            }
        }
    }
    var index = 0
    for (let item of products) {
        if (!(item.fabric in titlefilter)) {
            titlefilter[index] = item.fabric
            index = index + 1
        }
    }
    return {
        props: { products: JSON.parse(JSON.stringify(bottoms)), titlefilter: JSON.parse(JSON.stringify(titlefilter)) }, // will be passed to the page component as props
        // props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    }
}

export default Ankleleggings