import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import mongoose from 'mongoose'
import Order from "../models/Order"
import { useDispatch } from 'react-redux'
import { clearCart } from '../features/cartSlice'
import { TiTick } from 'react-icons/ti'

const MyOrder = ({ order }) => {

  const dispatch = useDispatch();
  const products = order.products;
  const router = useRouter()
  const [date, setDate] = useState()

  useEffect(() => {

    const date = new Date(order.createdAt)
    setDate(date)
    if (router.query.clearCart == 1) {
      dispatch(clearCart())
    }

  }, [])


  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-full mx-auto flex flex-wrap">
          <div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Pixelwear</h2>
            <h1 className="text-gray-900 text-2xl title-font font-medium mb-4">Order Id: {order.orderId}</h1>
            <p className="leading-relaxed mb-3">Order placed on: <b>{date && date.toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</b> </p>
            <div className='flex items-center mb-2'>
              {new Date().getTime() >= new Date(order.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000 && <TiTick className='mr-2 bg-green-400 text-white rounded-full' />}
              {new Date().getTime() < new Date(order.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000 && <TiTick className='mr-2 bg-gray-400 text-white rounded-full' />}
              <p className="whitespace-nowrap text-sm font-medium text-gray-600">{new Date().getTime() >= new Date(order.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000 ? `Delivered on ${new Date(new Date(order.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` : `Not Shipped Yet! Delivery within 3 days.`}</p>
            </div>
            <p className="leading-relaxed mb-2">Status: <b>{order.status}!</b></p>
            <p className="leading-relaxed mb-6">Shipping Address: <b>{order.address}!</b></p>
            <div className="flex flex-col justify-start items-start bg-[#e5edff] px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              {Object.keys(products).map((key, index) => {
                return <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full" key={index}>
                  <div className="pb-4 md:pb-8 w-full md:w-40">
                    <img className="w-full" src={products[key].img} alt="dress" />
                  </div>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{products[key].name}</h3>
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-700">Category: </span> {products[key].category.toUpperCase()}</p>
                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-700">Size: </span> {products[key].size}</p>
                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-700">Color: </span> {products[key].color}</p>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-8 items-start w-full">
                      <p className="text-base dark:text-white xl:text-lg leading-6">Rs. {products[key].price} </p>
                      <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{products[key].qty}</p>
                      <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Rs. {products[key].qty * products[key].price}</p>
                    </div>
                  </div>
                </div>
              })}
            </div>

            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">₹{order.subtotal}</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">CGST</p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">₹{order.cgst}</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">SGST</p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">₹{order.sgst}</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">₹{order.amount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let order = await Order.findById(context.query.id)

  return {
    props: { order: JSON.parse(JSON.stringify(order)) }, // will be passed to the page component as props
  }
}

export default MyOrder