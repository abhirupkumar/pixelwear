import Head from 'next/head';
import Link from 'next/link';
import { FaShippingFast } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';
import { MdLocalOffer } from 'react-icons/md';
import React from 'react';
import Image from "/models/Image";
import Product from "/models/Product";
import mongoose from 'mongoose';
import Video from '../models/Video';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Home = ({ videos, images, products }) => {

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    pauseOnHover: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const responsive = {
    2000: {
      items: 5,
    },
    1316: {
      items: 4,
    },
    880: {
      items: 3,
    },
    300: {
      items: 2,
    },
    0: {
      items: 1,
    }
  };

  const renderNextButton = ({ isDisabled }) => {
    return <ArrowForwardIosIcon className="cursor-pointer absolute right-0" />
  };

  const renderPrevButton = ({ isDisabled }) => {
    return <ArrowBackIosIcon className="cursor-pointer absolute left-0" />
  };

  return (
    <div className=''>
      <Head>
        <title>Le-Soft - Women's Leading Fashion Brand</title>
        <meta name="description" content="Quality of classes at prices of masses." />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className='carousel-wrapper'>
        {images && images[0].img && <Slider {...settings}>
          {images[0].img.map((item, index) => {
            return <div key={index}>
              <img src={`${item}`} loading="lazy" />
            </div>
          })}
        </Slider>}
      </div>
      <div className="text-gray-600 body-font">
        <div className="w-full px-5 py-12 mx-auto">

          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl mb-4 font-medium title-font text-gray-900">Categories</h1>
            <div className="flex flex-col">
              <div className="flex flex-wrap -mx-4 md:-mb-10 md:-mt-4 -mt-8">
                <div className="p-2 lg:w-1/3 md:w-1/2 mb-0 md:mb-6">
                  <div className="rounded-xs mt-6 lg:h-[30rem] h-[20rem] overflow-hidden">
                    <img alt="content" className="object-fill object-center h-full w-full" src="https://dummyimage.com/1203x503" />
                  </div>
                  <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Sarees</h2>
                </div>
                <div className="p-2 lg:w-1/3 md:w-1/2 mb-0 md:mb-6">
                  <div className="rounded-xs mt-6 lg:h-[30rem] h-[20rem] overflow-hidden">
                    <img alt="content" className="object-fill object-center h-full w-full" src="https://dummyimage.com/1204x504" />
                  </div>
                  <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Bottoms</h2>
                </div>
                <div className="p-2 lg:w-1/3 md:w-1/2 mb-0 md:mb-6">
                  <div className="rounded-xs mt-6 lg:h-[30rem] h-[20rem] overflow-hidden">
                    <img alt="content" className="object-fill object-center h-full w-full" src="https://dummyimage.com/1205x505" />
                  </div>
                  <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Tops</h2>
                </div>
                <div className="p-2 lg:w-1/3 md:w-1/2 mb-0 md:mb-6">
                  <div className="rounded-xs mt-6 lg:h-[30rem] h-[20rem] overflow-hidden">
                    <img alt="content" className="object-fill object-center h-full w-full" src="https://dummyimage.com/1205x505" />
                  </div>
                  <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Inner Wear</h2>
                </div>
                <div className="p-2 lg:w-1/3 md:w-1/2 mb-0 md:mb-6">
                  <div className="rounded-xs mt-6 lg:h-[30rem] h-[20rem] overflow-hidden">
                    <img alt="content" className="object-fill object-center h-full w-full" src="https://dummyimage.com/1205x505" />
                  </div>
                  <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Kids</h2>
                </div>
                <div className="p-2 lg:w-1/3 md:w-1/2 mb-0 md:mb-6">
                  <div className="rounded-xs mt-6 lg:h-[30rem] h-[20rem] overflow-hidden">
                    <img alt="content" className="object-fill object-center h-full w-full" src="https://dummyimage.com/1205x505" />
                  </div>
                  <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Lounge Wear</h2>
                </div>
              </div>
            </div>
          </div>
          {Object.keys(products).length !== 0 && <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl mb-4 font-medium title-font text-gray-900">New Arrival</h1>
            <div className="w-full mx-auto">
              <div className="flex flex-wrap justify-center">
                <AliceCarousel
                  responsive={responsive}
                  mouseTracking
                  infinite
                  controlsStrategy={"default"}
                  autoPlayStrategy='all'
                  autoPlayInterval={1000}
                  disableDotsControls
                  keyboardNavigation
                  style={{
                    width: "100%",
                    justifyContent: "center",
                  }}
                  renderPrevButton={renderPrevButton}
                  renderNextButton={renderNextButton}>
                  {Object.keys(products).reverse().map((item) => {
                    return <Link key={products[item]._id} href={`/product/${products[item].slug}`}>
                      <div className="lg:w-[310px] cursor-pointer m-4">
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
                </AliceCarousel >
              </div>
            </div>
          </div>}
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Quality Of Classes, At Prices Of Masses</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">The collection of products, we make available, neatly stitched using stretchable and anti-piling fabric which guarantees the comfort of the wearer.</p>
          </div>
          <div className="flex justify-center">
            <iframe width="1239" height="400" src={videos[0].vid} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
          <div className="flex flex-wrap -m-4 mt-20">
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
          </div>
          <Link href={'/bottoms?category=ankleleggings'}><button className="flex mx-auto mt-16 text-white bg-[#9933ff] border-0 py-2 px-8 focus:outline-none hover:bg-[#8000ff] rounded text-lg">Checkout All The Trendy Collections</button></Link>
        </div>
      </div>

    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let images = await Image.find()
  let videos = await Video.find()
  let products = await Product.find()
  let product = {}
  let titlefilter = []
  for (let item of products) {
    if (item.title + item.color in product) {
      if (!product[item.title + item.color].color.includes(item.color) && item.availableQty > 0) {
        product[item.title + item.color].color = item.color
      }
      if (!product[item.title + item.color].size.includes(item.size) && item.availableQty > 0) {
        product[item.title + item.color].size.push(item.size)
      }
    }
    else {
      product[item.title + item.color] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        product[item.title + item.color].color = item.color
        product[item.title + item.color].size = [item.size]
      }
      else {
        product[item.title + item.color].color = []
        product[item.title + item.color].size = []
      }
    }
  }

  return {
    props: { videos: JSON.parse(JSON.stringify(videos)), images: JSON.parse(JSON.stringify(images)), products: JSON.parse(JSON.stringify(product)) }, // will be passed to the page component as props
  }
}

export default Home