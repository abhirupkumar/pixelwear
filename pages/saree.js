import React from 'react'
import Link from 'next/link'
import Product from "/models/Product"
import mongoose from 'mongoose'

const Saree = ({ products }) => {
    return (
        <div>
            <section className="text-gray-600 body-font min-h-screen">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center">
                        {Object.keys(products).length === 0 && <p>Sorry all the sarees are currently out of stock. New stock comming soon. Stay Tuned!</p>}
                        {Object.keys(products).map((item) => {

                            return <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}><div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-7">
                                <a className="flex justify-center relative rounded overflow-hidden">
                                    <img alt="ecommerce" className="m-auto md:m-0 h-[30vh] md:h-[36vh] block" src={products[item].img} />
                                </a>
                                <div className="mt-4 text-center md:text-left">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category.toUpperCase()}</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                                    <p className="mt-1">₹{products[item].price}</p>
                                    {/* <div className="mt-1">
                                        {products[item].size.map((s) => { return <span className='border border-gray-300 px-1 mx-1'>{s}</span> })}
                                    </div> */}
                                    <div className="mt-1">
                                        {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-300 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('dark green') && <button className="border-2 border-gray-300 ml-1 bg-green-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('orange') && <button className="border-2 border-gray-300 ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('dark blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('brown') && <button className="border-2 border-gray-300 ml-1 bg-amber-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-600 rounded-full w-6 h-6 focus:outline-none"></button>}
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
    let products = await Product.find({ category: 'sarees' })
    let sarees = {}
    for (let item of products) {
        if (item.title in sarees) {
            if (!sarees[item.title].color.includes(item.color) && item.availableQty > 0) {
                sarees[item.title].color.push(item.color)
            }
        }
        else {
            sarees[item.title] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                sarees[item.title].color = [item.color]
            }
        }
    }
    return {
        props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
        // props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    }
}

export default Saree