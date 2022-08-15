import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { FaShippingFast } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';
import { MdLocalOffer } from 'react-icons/md';
import mongoose from 'mongoose';
import Product from "/models/Product"

export default function Home({ tshirts, hoodies, jeans, trousers }) {
  return (
    <div>
      <Head>
        <title>Pixelwear - Wear The Trend</title>
        <meta name="description" content="Quality of classes at proces of masses." />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className='mt-[5rem] lg:mt-[4rem] flex flex-row object-cover'>
        
        <img className='w-full lg:h-[75vh]' src={"/home2.jfif"} alt="" />
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Premium Tsirts, Hoodies And Many More, Check Out Now</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">The collection of products, we make available, neatly stitched and have high quality fabric which guarantees the comfort of the wearer.</p>
          </div>
          <div className="container px-1 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center">
              <Link passHref={true} key={tshirts[0]._id} href={`/product/${tshirts[0].slug}`}><div className="lg:w-1/5 md:w-1/2 px-1 w-full cursor-pointer shadow-lg m-7">
                <a className="flex mx-auto justify-center relative rounded overflow-hidden">
                  <img alt="ecommerce" className="m-auto md:m-0 h-[30vh] md:h-[44vh] block" src={tshirts[0].img} />
                </a>
                <div className="mt-4 flex flex-col justify-center text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{tshirts[0].category.toUpperCase()}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{tshirts[0].title}</h2>
                  <p className="mt-1">Reasonable Prices</p>
                  <div className="mt-1">
                    Available in Multiple Sizes
                  </div>
                </div>
              </div>
              </Link>
              <Link passHref={true} key={hoodies[0]._id} href={`/product/${hoodies[0].slug}`}><div className="lg:w-1/5 md:w-1/2 px-1 w-full cursor-pointer shadow-lg m-7">
                <a className="flex mx-auto justify-center relative rounded overflow-hidden">
                  <img alt="ecommerce" className="m-auto md:m-0 h-[30vh] md:h-[44vh] block" src={hoodies[0].img} />
                </a>
                <div className="mt-4 flex flex-col justify-center text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{hoodies[0].category.toUpperCase()}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{hoodies[0].title}</h2>
                  <p className="mt-1">Reasonable Prices</p>
                  <div className="mt-1">
                    Available in Multiple Sizes
                  </div>
                </div>
              </div>
              </Link>
              <Link passHref={true} key={jeans[0]._id} href={`/product/${jeans[0].slug}`}><div className="lg:w-1/5 md:w-1/2 px-1 w-full cursor-pointer shadow-lg m-7">
                <a className="flex mx-auto justify-center relative rounded overflow-hidden">
                  <img alt="ecommerce" className="m-auto md:m-0 h-[30vh] md:h-[44vh] block" src={jeans[0].img} />
                </a>
                <div className="mt-4 flex flex-col justify-center text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{jeans[0].category.toUpperCase()}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{jeans[0].title}</h2>
                  <p className="mt-1">Reasonable Prices</p>
                  <div className="mt-1">
                    Available in Multiple Sizes
                  </div>
                </div>
              </div>
              </Link>
              <Link passHref={true} key={trousers[0]._id} href={`/product/${trousers[0].slug}`}><div className="lg:w-1/5 md:w-1/2 px-1 w-full cursor-pointer shadow-lg m-7">
                <a className="flex mx-auto justify-center relative rounded overflow-hidden">
                  <img alt="ecommerce" className="m-auto md:m-0 h-[30vh] md:h-[44vh] block" src={trousers[0].img} />
                </a>
                <div className="mt-4 flex flex-col justify-center text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{trousers[0].category.toUpperCase()}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{trousers[0].title}</h2>
                  <p className="mt-1">Reasonable Prices</p>
                  <div className="mt-1">
                    Available in Multiple Sizes
                  </div>
                </div>
              </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap -m-4 mt-6">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <GiConfirmed />
                </div>
                <h2 className="text-lg text-gray-900 text-center font-medium title-font mb-2">Premium Products</h2>
                <p className="leading-relaxed text-center">We provide products of best quality and great finish.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <FaShippingFast />
                </div>
                <h2 className="text-lg text-gray-900 text-center font-medium title-font mb-2">Free Shipping</h2>
                <p className="leading-relaxed  text-center">We ship all over India for FREE.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <MdLocalOffer />
                </div>
                <h2 className="text-lg text-gray-900 text-center font-medium title-font mb-2">Exciting Offers</h2>
                <p className="leading-relaxed  text-center">We provide amazing offers & discounts on our products.</p>
              </div>
            </div>
          </div>
          <Link href={'/tshirts'}><button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Checkout Our Latest Collection</button></Link>
        </div>
      </section>

    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let tshirts = await Product.find({ category: 'tshirts' })
  let hoodies = await Product.find({ category: 'hoodies' })
  let jeans = await Product.find({ category: 'jeans' })
  let trousers = await Product.find({ category: 'trousers' })

  return {
    props: { tshirts: JSON.parse(JSON.stringify(tshirts)), hoodies: JSON.parse(JSON.stringify(hoodies)), jeans: JSON.parse(JSON.stringify(jeans)), trousers: JSON.parse(JSON.stringify(trousers)) }, // will be passed to the page component as props
  }
}