import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import mongoose from 'mongoose'
import Order from "../models/Order"
import { useDispatch } from 'react-redux'
import { clearCart } from '../features/cartSlice'

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
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Le-Soft.in</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
            <p className="leading-relaxed mb-4">Order placed on: <b>{date && date.toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</b> </p>
            <p className="leading-relaxed mb-4">Status: <b>{order.status}!</b></p>
            <div className="flex mb-4">
              <div scope="col" className="flex-grow text-lg px-6">Item Description</div>
              <div scope="col" className="flex-grow text-lg px-6 ">Quantity</div>
              <div scope="col" className="flex-grow text-lg px-6 ">Price</div>
            </div>

            <div>
              {Object.keys(products).map((key) => {
                return <div key={key} className="flex border-t border-gray-200 py-2">
                  <div className="text-gray-900 px-6 py-4">{products[key].name} ({products[key].size}/{products[key].variant})</div>
                  <div className="text-gray-900 px-6 py-4">{products[key].qty}</div>
                  <div className="text-gray-900 pl-6 pr-2 py-4 whitespace-nowrap">₹{products[key].price} X {products[key].qty} = ₹{products[key].price * products[key].qty}</div>
                </div>
              })}
            </div>

            <div className="flex flex-col">
              <span className="title-font my-2 font-medium text-2xl text-gray-900">Subtotal: ₹{order.amount}</span>
              <div className='my-2'>
                {/* <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button> */}
                {/* {order.status != 'Payment Successful' && <div className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Check out this page after few minutes to see if transaction has succeeded or not.</div>} */}
              </div>
            </div>
          </div>
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="/orders.jpg" />
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