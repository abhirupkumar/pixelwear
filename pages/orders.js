import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loader from '../components/Loader'
import { TiTick } from 'react-icons/ti'

const Orders = () => {

    const router = useRouter()
    const [orders, setOrders] = useState([])
    const token = useSelector((state) => state.cartItems.token);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!token) {
            router.push('/')
        }
        else {
            setLoading(true)
            fetchOrders()
            setLoading(false)
        }
    }, [router.query, token])

    const fetchOrders = async () => {
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        })
        let res = await a.json();
        const tempOrders = res.orders;
        tempOrders.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setOrders(tempOrders);
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className='min-h-screen'>
            {orders.length > 0 && <h1 className='font-semibold text-2xl text-center p-8'>My Orders</h1>}
            {orders.length === 0 && <p className="font-semibold text-2xl text-center p-8">No Orders!</p>}
            <div className="container mx-auto">
                {orders.length > 0 && <div className="py-2 flex min-w-full justify-center">
                    <div className="flex flex-col space-y-6 bg-white my-4 justify-center">
                        {orders.map((item) => {
                            return <div key={item._id} className="flex flex-col w-fit border-2 rounded-md items-center border-gray-300">
                                <div className="bg-white flex rounded-md flex-wrap items-center hover:bg-indigo-50">
                                    <div className='flex flex-col py-4'>
                                        <p className="px-6 whitespace-nowrap text-sm font-medium text-black">
                                            Order Id
                                        </p>
                                        <p className="px-6 whitespace-nowrap text-sm font-medium text-gray-600">{item.orderId}</p>
                                    </div>
                                    <div className='flex flex-col py-4 px-6'>
                                        <p className="whitespace-nowrap text-sm font-medium text-black">
                                            Transaction Id
                                        </p>
                                        <p className="whitespace-nowrap text-sm font-medium text-gray-600">{item.transactionid}</p>
                                    </div>
                                    <div className='flex flex-col py-4 px-6'>
                                        <p className="whitespace-nowrap text-sm font-medium text-black">
                                            Ordered At
                                        </p>
                                        <p className="whitespace-nowrap text-sm font-medium text-gray-600">
                                            {new Date(item.createdAt).toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className='flex flex-col py-4 px-6'>
                                        <p className="whitespace-nowrap text-sm font-medium text-black">
                                            Paid Amount
                                        </p>
                                        <p className="whitespace-nowrap text-sm font-medium text-gray-600">
                                            ₹{item.amount}
                                        </p>
                                    </div>
                                    <button onClick={() => router.push(`/order?id=${item._id}`)} className="flex whitespace-nowrap text-white bg-[#1a4ffd] hover:bg-[#1440d3] border-0 py-2 px-2 mx-6 mb-3 focus:outline-none rounded-full text-sm justify-center">View Order</button>
                                </div>
                                <div className="bg-white w-full flex rounded-b-md border-t-2 items-center border-gray-300">
                                    <div className='flex items-center py-2 px-4'>
                                        {new Date().getTime() >= new Date(item.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000 && <TiTick className='mr-2 bg-green-400 text-white rounded-full' />}
                                        {new Date().getTime() < new Date(item.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000 && <TiTick className='mr-2 bg-gray-400 text-white rounded-full' />}
                                        <p className="whitespace-nowrap text-sm font-medium text-gray-600">{new Date().getTime() >= new Date(item.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000 ? `Delivered on ${new Date(new Date(item.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` : `Not Shipped Yet!`}</p>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Orders