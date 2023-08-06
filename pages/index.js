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
import { useDispatch, useSelector } from 'react-redux';
import { checkWishlist } from '../features/cartSlice';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';

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
    1080: {
      items: 3,
    },
    360: {
      items: 2,
    },
    0: {
      items: 1,
    }
  };

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.cartItems.wishlist)

  const renderNextButton = ({ isDisabled }) => {
    return <ArrowForwardIosIcon className="cursor-pointer absolute right-0" />
  };

  const renderPrevButton = ({ isDisabled }) => {
    return <ArrowBackIosIcon className="cursor-pointer absolute left-0" />
  };

  return (
    <div className='max-w-[2500px] mx-auto'>
      <Head>
        <title>Pixelwear - Men's Fashion Brand</title>
        <meta name="description" content="Quality of classes at prices of masses." />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className='carousel-wrapper mx-10'>
        {images && images[0] && <Slider {...settings}>
          {images[0].img.map((item, index) => {
            return <div key={index}>
              <img className='lg:w-[100vw] lg:h-[90vh] md:h-[70vh] sm:h-[50vh] w-full h-[200px] mx-auto' src={`${item}`} loading="lazy" />
            </div>
          })}
        </Slider>}
      </div>
      <div className="text-gray-600 body-font">
        <div className="w-full px-5 py-12 mx-auto">

          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl mb-4 font-medium title-font text-gray-900">Categories</h1>
            <div className="flex flex-col max-w-[1500px] justify-center items-center">
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-4 justify-center">
                  <div className="flex justify-center">
                    <Link href="/caps" target="_blank"><img className="h-auto max-w-full rounded-lg" src="/caps.jpg" alt="1" /></Link>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/hoodies" target="_blank"><img className="h-auto max-w-full rounded-lg" src="/hoodies.jpg" alt="2" /></Link>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/jeans" target="_blank"><img className="h-auto max-w-full rounded-lg" src="/jeans.jpg" alt="3" /></Link>
                  </div>
                </div>
                <div className="grid gap-4 justify-center">
                  <div className="flex justify-center">
                    <Link href="/trousers" target="_blank"><img className="h-auto max-w-full rounded-lg" src="/trousers.jpg" alt="4" /></Link>
                  </div>
                  <div className="flex ustify-center">
                    <Link href="/mouse-pads" target="_blank"><img className="h-auto max-w-full rounded-lg" src="/mousepad.jpg" alt="6" /></Link>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/tshirts" target="_blank"><img className="h-auto max-w-full rounded-lg" src="/tshirts.jpg" alt="5" /></Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
          {Object.keys(products).length !== 0 && <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl mb-4 font-medium title-font text-gray-900">New Arrival</h1>
            <div className="w-full mx-auto max-w-[2080px] items-center">
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
                  {Object.keys(products).map((item) => {
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
                          <h2 className="text-gray-900 mx-auto lg:text-left lg:text-lg md:text-md sm:text-sm text-xs">{products[item].title}</h2>
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
                </AliceCarousel>
              </div>
            </div>
          </div>}
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Dapper Gents, For Trendsetters with Swagger.</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Our curated line boasts impeccably tailored pieces, crafted from premium, resilient fabric ensuring unrivaled comfort and durability for the wearer.</p>
          </div>
          {videos && videos[0] && <div className="flex justify-center">
            <iframe width="1239" height="400" src={videos[0].vid} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>}
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
                <h2 className="text-lg text-gray-900 text-center font-medium title-font mb-2">Free Shipping</h2>
                <p className="leading-relaxed  text-center">We offer the fastest shipping throughout India.</p>
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
          <Link href={'/tshirts?category=polo'}><button className="flex mx-auto mt-16 text-white bg-[#275ef7] border-0 py-2 px-8 focus:outline-none hover:bg-[#4375ff] rounded text-lg">Checkout All The Trendy Collections</button></Link>
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