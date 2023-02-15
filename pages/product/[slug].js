import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import mongoose from 'mongoose'
import Product from "../../models/Product"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error'
import Head from 'next/head';
import ReactImageMagnify from "react-image-magnify";
import { wordToHex } from '../../colorhex';
import { useDispatch } from 'react-redux';
import { addToCart, clearCart } from '../../features/cartSlice';
// import {
//   Magnifier,
//   GlassMagnifier,
//   SideBySideMagnifier,
//   PictureInPictureMagnifier,
//   MOUSE_ACTIVATION,
//   TOUCH_ACTIVATION
// } from "react-image-magnifiers";

const Post = ({ product, variants, error }) => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { slug } = router.query
  const [pin, setpin] = useState()
  const [service, setService] = useState()
  const [color, setColor] = useState()
  const [size, setSize] = useState()
  const [image, setImage] = useState()
  const [imgarr, setImgarr] = useState([])

  useEffect(() => {
    if (!error) {
      setColor(product.color)
      setSize(product.size)
      setImage(product.img)
      setImgarr([])
      setImgarr(imgarr => imgarr.concat(product.img))
      if (product.img2 && product.img2 != '') {
        setImgarr(imgarr => imgarr.concat(product.img2))
      }
      if (product.img3 && product.img3 != '') {
        setImgarr(imgarr => imgarr.concat(product.img3))
      }
      if (product.img && product.img4 != '') {
        setImgarr(imgarr => imgarr.concat(product.img4))
      }
    }
  }, [router.query])

  const handleImage = (e) => {
    setImage(e.target.id)
  }

  const buyNow = (slug, qty, price, name, size, variant, theme, category, img, img2, img3, img4, fabric) => {
    dispatch(clearCart());
    dispatch(addToCart({ slug, qty, price, name, size, variant, theme, category, img, img2, img3, img4, fabric }));
    router.push('/checkout');
  }


  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pin)) {
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
  }

  const onChangePin = (e) => {
    setpin(e.target.value)
  }

  const refreshVariant = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]['slug']}`
    router.push(url)
  }

  if (error == 404) {
    return <Error statusCode={404} />
  }


  if (error) {
    router.push('/404')
  }

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
        <title>MissNeha - {product.title}</title>
        <meta name="description" content="Quality of classes at proces of masses." />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="container px-5 py-16 mx-auto mt-12">
        <div className="mx-auto flex flex-wrap">
          {/* <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-center rounded" src={product.img} /> */}
          <div className='lg:w-1/2 mx-auto items-center justify-center'>
            <div className='flex flex-row'>
              {imgarr?.length > 1 && <div className="w-1/3 mx-auto flex flex-col">
                {imgarr?.map((item, index) => (
                  <img key={index} onMouseOver={handleImage} id={item} alt="ecommerce" className={`md:w-32 w-16 rounded-md m-2`} src={item} />
                ))}
              </div>}
              <div className='md:block hidden w-2/3 mx-auto'>
                <ReactImageMagnify className='z-10' {...{
                  smallImage: {
                    alt: `${product.title}`,
                    isFluidWidth: true,
                    src: `${image}`,
                    sizes: '(width: 480px) 100vw, (max-width: 1200px) 50vw, 500px'
                  },
                  largeImage: {
                    src: `${image}`,
                    width: 1200,
                    height: 1800,
                  },
                  enlargedImageContainerDimensions: {
                    width: '200%',
                    height: '100%'
                  }
                }} />
              </div>
              <div className='md:hidden block w-[85%] mx-auto'>
                <img alt="product-image" src={image} />
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">MissNeha</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} - ({product.size}/{product.color})</h1>
            <div className="flex mb-4">
              {/* <span className="flex items-center">
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
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
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
              </span> */}
            </div>
            <p className="leading-relaxed">{product.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants) && Object.keys(variants).map((color1, index) => wordToHex[color1] && <button key={index} onClick={() => { refreshVariant(Object.keys(variants[color1]), color1) }} className={`border-2 mx-[1px] rounded-full w-6 h-6 focus:outline-none ${color === color1 ? 'border-black' : 'border-gray-300'}`} style={{ backgroundColor: wordToHex[color1] }}></button>
                )}
              </div>
              <div className="flex ml-3 items-center">
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
            </div>
            <div className="flex">
              {product.availableQty > 0 && <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>}
              {product.availableQty <= 0 && <span className="title-font font-medium text-2xl text-red-600">Out Of Stock!</span>}
              <button disabled={product.availableQty <= 0} onClick={() => { buyNow(slug, 1, product.price, product.title, size, color, product.category, product.theme, product.img, product.img2, product.img3, product.img4, product.fabric) }} className="flex ml-8 text-white bg-indigo-500 disabled:bg-indigo-300 border-0 py-2 px-1 md:px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
              <button disabled={product.availableQty <= 0} onClick={() => dispatch(addToCart({ slug, qty: 1, price: product.price, name: product.title, size, color, category: product.category, theme: product.theme, img: product.img, img2: product.img2, img3: product.img3, img4: product.img4 }))} className="flex ml-4 text-white bg-indigo-500 disabled:bg-indigo-300 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded">Add to cart</button>
            </div>
            <div className="pin mt-6 flex space-x-2 text-sm">
              <input onChange={onChangePin} className="px-2 border-2 border-gray-400 rounded-md" type="text" placeholder='Enter your pincode' />
              <button onClick={checkServiceability} className="flex ml-14 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Check</button>
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
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }

  return {
    props: { error: error, product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }, // will be passed to the page component as props
  }
}

export default Post
