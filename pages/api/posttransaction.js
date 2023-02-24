import Order from "../../models/Order"
import Product from "../../models/Product"
import PaytmCheckSum from "paytmchecksum"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    let order;
    let response = JSON.stringify(req.body.response)
    if (typeof req.body.payment_id == 'undefined' || req.body.payment_id < 1) {
        alert("Payment failed! Please Try Again.")
        res.status(400).json({ success: false })
    }
    else {
        order = await Order.findOneAndUpdate({ orderId: req.body.id }, { status: "Payment Successful", paymentinfo: response, transactionid: req.body.payment_id })
        let products = order.products
        for (let slug in products) {
            await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": - products[slug].qty } })
        }
        res.status(200).json({ success: true })
    }
}

export default connectDb(handler);