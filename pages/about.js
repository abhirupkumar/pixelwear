import React from 'react'
import Head from 'next/head'

const About = () => {
  return (
    <div>
      <Head>
        <title>About Us - Le-Soft</title>
        <meta name="description" content="Quality of classes at proces of masses." />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="min-h-screen container mx-auto">
        <section className="text-gray-600 body-font">
          <div className="container mx-6 justify-center items-center flex px-5 py-24 flex-col">
            <img className="w-24 md:w-36 mb-10 object-cover object-center border border-indigo-700 rounded-full" alt="hero" src="/logo.png" />
            <div className="w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 flex justify-center">Welcome to Le-Soft.in</h1>
              <p className="mt-6 mb-8 mx-10 leading-relaxed">KabirTextile & Apparelss manufacturer of Le-Soft Leggings / Sarees in the city of joy, Kolkata. We take pride in calling ourselves as one of the best brand in the fashion market nowadays. Our manufactured range has been very successful in market for its premium quality which has won complete faith of clients.<br />Tant (Handloom) Saree is a traditional Indian saree and usually used by Bengali women. It is traditionally made by the weavers from all over West Bengal and Bangladesh but typically few places like Murshidabad, Nadia, Hooghly of West Bengal and Dhaka, Tangail of Bangladesh are famous for tant saree weaving. Tant sarees are woven from cotton threads and distinguished by its lightness and transparency. It is considered to be the most comfortable saree for the Indian hot and humid climate.<br />Le-Soft handloom sarees are enormously demanded by the customers for its vibrant shades, attractive pattern, exclusive design, light weight, stylish & trendy look and superior quality. Moreover, these sarees are vigilantly examined by top quality controllers on different industry parameters. We have been serving our excellence in providing our valuable customers with exquisite designer collection of Tant (Handloom) Sarees. We design sarees according to our customer's taste and preferences. Customer satisfaction is our prime motto and we strive to proffer them with the best dressing experiences that are stylish as well as comfortable.<br />Leggings is extremely popular among women of all ages. If teen aged girls love them for being one of the most comfortable traditional dressing. Worn with kurtis or simply worn with a shirt top, the leggings are a smart fashionable item that is simple and easy to maintain. It is admirable that the blend of leggings with traditional wear and also with modern clothes is balanced well. At KabirApparelss leave no stone unturned to offer you the most comfortable, fashionable, stylist Leggings of unmatchable quality to meet high expectation. We have a direct control over the entire manufacturing process right from the selection of making and ultimately garmenting which gives us the winning edge to maintain consistency in quality always, which is the only barometer desired by our patrons. Our Mantra is “Quality of the Classes at the price of the Masses.”

              </p>
              <div className="flex justify-center">
                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Start Shopping</button>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="mt-8 text-gray-600 body-font mx-6">
          <h2 className="font-semibold my-2 text-3xl text-gray-900">About Le-Soft</h2>
          <p className="mt-4 mb-8 leading-relaxed">Desi elements intermingle with contemporary styles giving birth to Le-Soft. The love affair is prominent in every Le-Soft Legging /Sarees giving the wearer an all encompassing ethnic experience. Integrating the modern Indian woman's quality, design and personal taste requirements. Le-Soft is the fusion fiesta in the wearers wardrobe.<br />The website kabirapparelss.com and the brand 'Le-Soft' are wholly owned and operated by KABIR TEXTILE & APPARELSS, incorporated in 2010, has its Textiles manufacturing plant at Ranaghat, near the city of joy, Kolkata.</p>
        </section>
      </div>
    </div>
  )
}

export default About