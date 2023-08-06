import React from 'react'
import Head from 'next/head'

const Contact = () => {
  return (
    <div>
      <Head>
        <title>Contact Us - Pizelwear</title>
        <meta name="description" content="Quality of classes at proces of masses." />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="min-h-screen">
        <div className="max-w-screen-xl md:mt-24 px-4 md:px-8 lg:px-12 xl:px-26 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg">
          <div className="flex flex-col justify-center items-center">
            <div>
              <h2 className="text-center text-3xl font-bold leading-tight">Lets talk about everything!</h2>
              <img className="h-40 mx-auto py-2 rounded-full" src="/logo.png" />
              <p className="text-center text-xl lg:text-2xl font-medium leading-tight">Feel free to ask us anything!</p>
              <p className="py-4 px-4 text-md lg:text-md leading-tight text-center">If you have any questions regarding your order, feel free to send email or call us on our support number</p>
              <div className="flex justify-between">
                <div className="text-center px-5 md:px-0 md:text-left py-10">
                  <span className="font-bold">Registered Office</span>
                  <br />
                  Pixelwear<br />
                  Ganganagar, Madhyamgram,<br />
                  Old Jessore Road, North 24 Parganas,<br />
                  Pin Code: 700132, West Bengal, India<br />
                </div>
                <div className="text-center px-5 md:px-0 md:text-left py-10">
                  <span className="font-bold">Customer Support</span>
                  <br />
                  Phone Number: <p className="inline-flex text-blue-600 font-semibold">+91-700xxxxxx</p>
                  <br />
                  Email: <p className="inline-flex text-slate-600 font-semibold">xxxxxxxxxxxxx@gmail.com</p>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact