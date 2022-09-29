import Head from 'next/head'
import Link from 'next/link'
import { FaShippingFast } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';
import { MdLocalOffer } from 'react-icons/md';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { CSSProperties } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import Image from "/models/Image"
import Product from "/models/Product"
import mongoose from 'mongoose'

const Home = ({ images, products }) => {

  // const images = [
  //   { url: "/home.jpg" },
  //   { url: "https://lesoft.in/images/slider2.jpg" },
  //   { url: "https://lesoft.in/images/slider3.jpg" },
  // ];


  return (
    <div className='mt-[4rem] lg:mt-[4.7rem]'>
      <Head>
        <title>MissNeha - Women's Leading Fashion Brand</title>
        <meta name="description" content="Quality of classes at proces of masses." />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className='carousel-wrapper'>
        <Carousel renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button type="button" onClick={onClickHandler} title={label}
              style={{
                position: 'absolute',
                zIndex: 2,
                top: 'calc(50% - 15px)',
                width: 30,
                height: 30, cursor: 'pointer', left: 15
              }}>
              <BsChevronLeft className='text-4xl text-slate-300' />
            </button>
          )
        }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button type="button" onClick={onClickHandler} title={label}
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: 'calc(50% - 15px)',
                  width: 30,
                  height: 30, cursor: 'pointer', right: 15
                }}>
                <BsChevronRight className='text-4xl text-slate-300' />
              </button>
            )
          } showThumbs={false} autoPlay={true} infiniteLoop={true} interval={4000} stopOnHover={false} showStatus={false}>
          {Object.keys(images).map((item, index) => {
            return <div key={index}>
              <img className='h-[25vh] md:h-[50vh] lg:h-[80vh]' src={`${images[item].img}`} />
            </div>
          })}
          {/* <div>
            <img className='h-[25vh] md:h-[80vh]' src="https://lesoft.in/images/slider2.jpg" />
          </div>
          <div>
            <img className='h-[25vh] md:h-[80vh]' src="https://lesoft.in/images/slider3.jpg" />
          </div> */}
        </Carousel>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">

          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl mb-4 font-medium title-font text-gray-900">Categories</h1>
            <div className="flex flex-col">
              <div className="flex flex-wrap -mx-4 md:-mb-10 md:-mt-4 -mt-8">
                <div className="p-4 md:w-1/3 mb-0 md:mb-6">
                  <div className="rounded-lg mt-6 h-[26rem] overflow-hidden">
                    <img alt="content" className="object-fill object-center h-full w-full" src="https://dummyimage.com/1203x503" />
                  </div>
                  <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Sarees</h2>
                </div>
                <div className="p-4 md:w-1/3 mb-0 md:mb-6">
                  <div className="rounded-lg mt-6 h-[26rem] overflow-hidden">
                    <img alt="content" className="object-fill object-center h-full w-full" src="https://dummyimage.com/1204x504" />
                  </div>
                  <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Bottoms</h2>
                </div>
                <div className="p-4 md:w-1/3 mb-0 md:mb-6">
                  <div className="rounded-lg mt-6 h-[26rem] overflow-hidden">
                    <img alt="content" className="object-fill object-center h-full w-full" src="https://dummyimage.com/1205x505" />
                  </div>
                  <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Tops</h2>
                </div>
                <div className="p-4 md:w-1/3 mb-0 md:mb-6">
                  <div className="rounded-lg mt-6 h-[26rem] overflow-hidden">
                    <img alt="content" className="object-fill object-center h-full w-full" src="https://dummyimage.com/1205x505" />
                  </div>
                  <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Inner Wear</h2>
                </div>
                <div className="p-4 md:w-1/3 mb-0 md:mb-6">
                  <div className="rounded-lg mt-6 h-[26rem] overflow-hidden">
                    <img alt="content" className="object-fill object-center h-full w-full" src="https://dummyimage.com/1205x505" />
                  </div>
                  <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Kids</h2>
                </div>
                <div className="p-4 md:w-1/3 mb-0 md:mb-6">
                  <div className="rounded-lg mt-6 h-[26rem] overflow-hidden">
                    <img alt="content" className="object-fill object-center h-full w-full" src="https://dummyimage.com/1205x505" />
                  </div>
                  <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Lounge Wear</h2>
                </div>
              </div>
            </div>
          </div>
          {Object.keys(products).length !== 0 && <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl mb-4 font-medium title-font text-gray-900">New Arrival</h1>
            <div className="flex flex-wrap -m-4 justify-center">
              {Object.keys(products).reverse().map((item) => {
                return <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}><div className="lg:w-1/5 md:w-1/2 p-4 cursor-pointer shadow-2xl m-7">
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
                    </div>
                  </div>
                </div>
                </Link>
              })}
            </div>
          </div>}
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Quality Of Classes, At Prices Of Masses</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">The collection of products, we make available, neatly stitched using stretchable and anti-piling fabric which guarantees the comfort of the wearer.</p>
          </div>
          <div className="flex justify-center">
            <iframe width="1239" height="400" src="https://www.youtube.com/embed/GRVGWf3vkN8" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
          {/* <div className="flex flex-wrap -m-4">
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
                <h2 className="text-lg text-gray-900 text-center font-medium title-font mb-2">On-Time Shipping</h2>
                <p className="leading-relaxed  text-center">We ship all over India.</p>
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
          </div> */}
          <Link href={'/bottoms?category=ankleleggings'}><button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Checkout All Latest Collections</button></Link>
        </div>
      </section>

    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let images = await Image.find()
  let products = await Product.find()
  let product = {}
  let titlefilter = []
  for (let item of products) {
    if (item.title in product) {
      if (!product[item.title].color.includes(item.color) && item.availableQty > 0) {
        product[item.title].color.push(item.color)
      }
      if (!product[item.title].size.includes(item.size) && item.availableQty > 0) {
        product[item.title].size.push(item.size)
      }
    }
    else {
      product[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        product[item.title].color = [item.color]
        product[item.title].size = [item.size]
      }
      else {
        product[item.title].color = []
        product[item.title].size = []
      }
    }
  }

  return {
    props: { images: JSON.parse(JSON.stringify(images)), products: JSON.parse(JSON.stringify(product)) }, // will be passed to the page component as props
  }
}

export default Home