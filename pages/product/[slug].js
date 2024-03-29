import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import mongoose from 'mongoose'
import Product from "../../models/Product"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error'
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, checkWishlist, clearCart, removeFromCart } from '../../features/cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PicModal from '../../components/PicModal';
import { CircularProgress } from '@mui/material';
import ReactImageZoom from 'react-image-zoom';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';

const Post = ({ product, variants, error }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.cartItems.wishlist)
  const router = useRouter()
  const { slug } = router.query
  const [pin, setpin] = useState()
  const [service, setService] = useState()
  const [color, setColor] = useState()
  const [size, setSize] = useState()
  const [image, setImage] = useState()
  const [imgarr, setImgarr] = useState([])
  const [hoveredColor, setHoveredColor] = useState('');
  const [loading, setLoading] = useState(false)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (!error) {
      setColor(product.color)
      setSize(product.size)
      setImage(product.img)
      setImgarr([])
      setImgarr(imgarr => imgarr.concat(product.img))
      for (let i = 0; i < product.imgarr.length; i++) {
        setImgarr(imgarr => imgarr.concat(product.imgarr[i]))
      }
    }
  }, [router.query])

  const handleImage = (e) => {
    setImage(e.target.id)
  }


  const checkServiceability = async () => {
    setLoading(true)
    let url = 'https://api.postalpincode.in/pincode/' + pin
    let pins = await fetch(url, {
      Method: 'GET'
    })
    let pinJson = await pins.json()
    if (pinJson[0].Status == 'Success') {
      toast.success('Your pincode is serviceable', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setService(true)
    }
    else {
      toast.error('Sorry,Pincode not serviceable', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setService(false)
    }
    setLoading(false)
  }

  const onChangePin = (e) => {
    setpin(e.target.value)
  }

  const refreshVariant = (newsize, newcolor) => {
    let url = `/product/${variants[newcolor][newsize]['slug']}`
    router.push(url)
  }

  if (error == 404) {
    return <Error statusCode={404} />
  }


  if (error) {
    router.push('/404')
  }

  let props = { width: 375, height: 540, img: image, zoomStyle: 'z-index:100' };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Head>
        <title>Pixelwear - {product.title}</title>
        <meta name="description" content="Quality of classes at proces of masses." />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="container px-5 mx-auto mt-4">
        <div className="mx-auto flex flex-wrap">
          <div className='lg:w-[50%] mx-auto items-center justify-center'>
            <div className='flex lg:flex-row flex-col-reverse'>
              {imgarr?.length > 1 && <div className="lg:w-[15%] mx-auto items-center flex lg:flex-col flex-row overflow-auto">
                {imgarr?.map((item, index) => (
                  item && <img key={index} onMouseOver={handleImage} id={item} alt="ecommerce" className={`w-[4.5rem] h-[6.5rem] prod-sideimg m-2 object-cover cursor-pointer`} src={item} />
                ))}
              </div>}
              <div className='md:block hidden mx-auto prod-slugimg'>
                {image && <ReactImageZoom {...props} />}
              </div>
              <div className='md:hidden flex mx-auto justify-center items-center'>
                <img alt="product-image" src={image} loading="lazy" className='max-h-[450px]' />
              </div>
            </div>
          </div>
          <div className="lg:w-[50%] w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 lg:text-3xl text-2xl title-font font-medium mb-1">{product.title} - ({product.size}/{product.color})</h1>
            <div className="flex mb-4 items-center">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">295 reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
              <button onClick={() => dispatch(checkWishlist(product._id))} className='lg:w-12 lg:h-12 h-8 w-8 rounded-full m-2 p-2 bg-slate-200'>
                {!(wishlist.includes(product._id)) ? <AiOutlineHeart className='h-full w-full  text-gray-600' /> : <AiTwotoneHeart className='h-full w-full text-[#ff2c2c]' />}
              </button>
            </div>
            <ul className="flex flex-col justify-start flex-wrap list-disc pl-10 lg:text-base md:text-sm text-xs">
              {product?.desc && product?.desc.map((desc, index) => <li key={index} className="leading-relaxed text-md">{desc}</li>)}
            </ul>
            <div className="flex flex-col mt-6 items-left pl-10 pb-5 border-b-2 border-gray-100 mb-5 space-y-4">
              <div className="flex flex-wrap ml-3 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={size} onChange={(e) => { refreshVariant(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    {color && Object.keys(variants[color]).includes('S') && <option value='S'>S</option>}
                    {color && Object.keys(variants[color]).includes('M') && <option value='M'>M</option>}
                    {color && Object.keys(variants[color]).includes('L') && <option value='L'>L</option>}
                    {color && Object.keys(variants[color]).includes('XL') && <option value='XL'>XL</option>}
                    {color && (Object.keys(variants[color]).includes('2XL') || Object.keys(variants[color]).includes('XXL')) && <option value='2XL'>2XL</option>}
                    {color && (Object.keys(variants[color]).includes('3XL') || Object.keys(variants[color]).includes('XXXL')) && <option value='3XL'>3XL</option>}
                    {color && Object.keys(variants[color]).includes('Standard') && <option value='Standard'>Standard</option>}
                    {color && Object.keys(variants[color]).includes('Free') && <option value='Free'>Free</option>}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="flex mx-3">
                Color:
                <p className="mx-1 font-semibold">{product.color}</p>
              </div>
              <div className="flex ml-3 flex-wrap">
                {Object.keys(variants) && Object.keys(variants).map((color1, index) => {
                  return variants[color1][size] && <button key={index} onClick={() => { refreshVariant(size, color1) }} className={`border-2 mx-[1px] w-16 focus:outline-none opacity-[1] image-container relative ${color === color1 ? 'border-black' : 'border-gray-300'}`}
                    onMouseEnter={() => setHoveredColor(color1)}
                    onMouseLeave={() => setHoveredColor('')}>
                    <img src={variants[color1][size]['img']} alt={`img-${index}`} />
                    {hoveredColor === color1 && (
                      <div className='color-label'>
                        {color1}
                      </div>
                    )}
                  </button>
                }
                )}
              </div>
            </div>
            {product.availableQty > 0 && <div className=" flex my-8 space-x-4">
              <p className="font-medium">Quantity: </p>
              <RemoveIcon className="rounded-sm cursor-pointer bg-[#1a4ffd] text-white" onClick={() => { return qty !== 1 && setQty(qty - 1) }} />
              <p className="font-medium w-2">{qty}</p>
              <AddIcon className="rounded-sm cursor-pointer bg-[#1a4ffd] text-white" onClick={() => { return qty !== product.availableQty && setQty(qty + 1) }} />
            </div>}
            <div className="flex space-x-4">
              {product.availableQty > 0 && <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>}
              {!!product.mrp && product.availableQty > 0 && <span className="title-font font-medium text-2xl text-gray-400 line-through">₹{product.mrp}</span>}
              {product.availableQty > 0 && !!product.mrp && <span className="title-font font-medium text-2xl text-green-600">{((product.mrp - product.price) / product.mrp * 100).toFixed(1)}% Off</span>}
              {product.availableQty <= 0 && <span className="title-font font-medium text-2xl text-red-600">Out Of Stock!</span>}
            </div>
            <div className="flex my-4 items-start">
              <button disabled={product.availableQty <= 0} onClick={() => {
                dispatch(clearCart())
                dispatch(addToCart({ slug, qty: qty, price: product.price, name: product.title, size, color, category: product.category, theme: product.theme, img: product.img }))
                router.push('/checkout')
              }} className="flex text-white bg-[#1a4ffd] hover:bg-[#1440d3] disabled:bg-[#b6c9fd]  border-0 py-2 px-2 md:px-6 focus:outline-none  rounded">Buy Now</button>
              <button disabled={product.availableQty <= 0} onClick={() => dispatch(addToCart({ slug, qty: qty, price: product.price, name: product.title, size, color, category: product.category, theme: product.theme, img: product.img }))} className="flex ml-4 text-white bg-[#1a4ffd] hover:bg-[#1440d3] disabled:bg-[#b6c9fd]  border-0 py-2 px-2 md:px-6 focus:outline-none rounded">Add To Cart</button>
            </div>
            <div className="pin my-6 flex space-x-2 text-sm items-center flex-wrap">
              <p className='md:mr-4 mr-1 font-medium lg:text-lg text-base'>Availability:</p>
              <input onChange={onChangePin} className="px-2 py-1 border-2 border-gray-400 rounded-md" type="text" placeholder='Enter your pincode' />
              {loading ? <CircularProgress color="primary" /> : <button onClick={checkServiceability} className="flex ml-14 text-white bg-[#1a4ffd] hover:bg-[#1440d3] border-0 py-2 px-6 focus:outline-none rounded">Check</button>}
            </div>
            {(!service && service != null) && <div className="text-red-700 text-sm mt-3">
              Sorry! We do not deliver to this pincode yet
            </div>}
            {(service && service != null) && <div className="text-green-700 text-sm mt-3">
              Yay! This pincode is serviceable
            </div>}
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let product = await Product.findOne({ slug: context.query.slug })
  if (product == null) {
    return {
      props: { error: true },
    }
  }
  let variant = await Product.find({ title: product.title, category: product.category })
  let colorSizeSlug = {}
  for (let item of variant) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug, img: item.img }
    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug, img: item.img }
    }
  }

  return {
    props: { error: error, product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }, // will be passed to the page component as props
  }
}

export default Post
