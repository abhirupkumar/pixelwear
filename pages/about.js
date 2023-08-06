import React from 'react'
import Head from 'next/head'

const About = () => {
  return (
    <div>
      <Head>
        <title>About Us - Pixelwear</title>
        <meta name="description" content="Quality of classes at proces of masses." />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="min-h-screen container mx-auto">
        <section className="text-gray-600 body-font">
          <div className="container mx-6 justify-center items-center flex px-5 py-24 flex-col">
            <img className="w-24 md:w-36 mb-10 object-cover object-center border border-indigo-700 rounded-full" alt="hero" src="/logo.png" />
            <div className="w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 flex justify-center">Welcome to Pixelwear.in</h1>
              <p className="mt-6 mb-8 mx-10 leading-relaxed">Welcome to PixelWear, your ultimate destination for trendy and stylish wearables! We are an innovative and forward-thinking e-commerce platform, dedicated to bringing you the latest and most fashionable tech-enabled products. At PixelWear, we believe that technology should seamlessly blend with fashion, creating a perfect harmony between style and functionality.<br />Our carefully curated collection features a diverse range of smartwatches, fitness trackers, augmented reality glasses, and other wearable gadgets from top-notch brands and emerging designers. Whether you're a tech enthusiast, a fitness guru, or a fashionista seeking cutting-edge accessories, PixelWear has something extraordinary for everyone.<br />What sets PixelWear apart is our passion for delivering premium quality products that enhance your lifestyle. Our team of tech experts and fashion aficionados scours the market to handpick only the best wearables, ensuring that each product we offer meets our rigorous standards of excellence. We prioritize innovation, reliability, and user-friendliness, so you can experience the future of wearable technology with confidence.<br />With a user-friendly interface and seamless shopping experience, we make it easy for you to explore our extensive catalog, find your perfect match, and have it delivered right to your doorstep. Our customer-centric approach means that we are always here to assist you, answer your queries, and ensure your complete satisfaction.<br />PixelWear not only strives to provide top-tier products but also fosters a vibrant community of tech-savvy and fashion-forward individuals. Join our growing community and stay updated with the latest trends, tips, and insights into the world of wearables. We believe that staying connected, informed, and stylish should never be a compromise.<br />Thank you for choosing PixelWear as your go-to destination for all things wearable. Embark on a journey of innovation and style with us, as we redefine the way you experience fashion and technology. Your satisfaction is our priority, and we look forward to serving you with excellence every step of the way. Happy shopping!
              </p>
              <div className="flex justify-center">
                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Start Shopping</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About