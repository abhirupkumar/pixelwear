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
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 flex justify-center">Welcome to Pixelwear</h1>
              <p className="mt-6 mb-8 mx-10 leading-relaxed">This website is an attempt to deliver amazing products at a good and reasonable price. This entire website was built to showcase my ability to build a ecommerce website using NextJs. This website is powerd by NextJs + React + MongoDB for storing the data. For the server side logic, we use NextJs built in SSR ;)
              </p>
              <div className="flex justify-center">
                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Start Shopping</button>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="mt-8 text-gray-600 body-font mx-6">
          <h2 className="font-semibold my-2 text-3xl text-gray-900">About Pixelwear</h2>
          <p className="mt-4 mb-8 leading-relaxed">Pixelwear is an attempt to serve the people of india with unique designs on apparels. E-commerce is revolutionizing the way we all shop in India. Why do you want to hop from one store to another in search of your favorite geek hoodie when you can find it on the Internet in a single click? Not only hoodies, we also have a wide variety of jeans, trousers and other apparels!
            If you are wondering why you should shop from Pixelwear when there are multiple options available to you, our unique designs and quality products will answer your question.</p>
        </section>
      </div>
    </div>
  )
}

export default About