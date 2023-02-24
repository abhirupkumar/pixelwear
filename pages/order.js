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
        <div className="lg:w-full mx-auto flex flex-wrap">
          <div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Le-Soft.in</h2>
            <h1 className="text-gray-900 text-2xl title-font font-medium mb-4">Order Id: {order.orderId}</h1>
            <p className="leading-relaxed mb-4">Order placed on: <b>{date && date.toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</b> </p>
            <p className="leading-relaxed mb-4">Status: <b>{order.status}!</b></p>
            <div>
              {Object.keys(products).map((key, index) => {
                return <div className="flex flex-wrap my-3 space-x-2 flex-row px-4 shadow-md" key={index}>
                  <div className='flex flex-col'>
                    <div className='font-semibold flex flex-row text-black'>{products[key].name} ({products[key].size}/{products[key].variant})</div>
                    <div className='flex space-x-6'>
                      <div className='flex items-center justify-start mt-2 font-semibold text-lg'>
                        <span className='mx-2 text-sm' > Quantity: {products[key].qty} </span>
                      </div>
                      <div className='flex items-center text-sm mt-3 justify-start space-x-1'>
                        <p className='font-semibold'>Price Per Item: </p>
                        <p>₹{products[key].price}</p>
                      </div>
                      <div className='flex items-center text-sm mt-3 justify-start space-x-1'>
                        <p className='font-semibold'>Total Price: </p>
                        <p>₹{products[key].price * products[key].qty}</p>
                      </div>
                    </div>
                  </div>
                  <img style={{ height: '110px' }} src={products[key].img} alt={`product-img${index}`} />
                </div>
              })}
            </div>

            <div className="flex flex-col">
              {order.subtotal && <span className="title-font my-1 mx-6 font-medium text-gray-900">Subtotal: ₹{order.subtotal}</span>}
              {order.cgst && <span className="title-font my-1 mx-6 font-medium text-gray-900">CGST: ₹{order.cgst}</span>}
              {order.sgst && <span className="title-font my-1 mx-6 font-medium text-gray-900">SGST: ₹{order.sgst}</span>}
              {order.amount && <span className="title-font my-1 mx-6 font-medium text-gray-900">Total Amount: ₹{order.amount}</span>}
              <div className='my-2'>
                {/* <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button> */}
                {/* {order.status != 'Payment Successful' && <div className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Check out this page after few minutes to see if transaction has succeeded or not.</div>} */}
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