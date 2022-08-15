import Order from "../../models/Order"
import Product from "../../models/Product"
import PaytmCheckSum from "paytmchecksum"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    //Validate paytm checksum
    // var paytmChecksum = '';
    // var paytmParams = {};

    // const received_data = req.body;

    // for (var key in received_data) {
    //     if (key == 'CHECKSUMHASH') {
    //         paytmChecksum = received_data[key];
    //     }
    //     else {
    //         paytmParams[key] = received_data[key];
    //     }
    // }
    // var isValidChecksum = PaytmCheckSum.verifySignature(paytmParams, process.env.PAYTM_MKEY, paytmChecksum);
    // if (!isValidChecksum) {
    //     res.status(500).send("Some Error Occured")
    //     return
    // } 

    // var { validatePaymentVerification } = require('./dist/utils/razorpay-utils');

    // validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);

    // generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, process.env.RAZORPAY_KEY);

    // if (generated_signature == razorpay_signature) {
    //     order = await Order.findOneAndUpdate({ orderId: order_id }, { status: "Payment Successful", paymentinfo: JSON.stringfy(req.body), transactionid: razorpay_payment_id })
    // }
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
        // res.redirect('/order?clearCart=1&id=' + req.body._id, 200)
    }

    // Update into Orders table after checking the transaction status
    // let order;
    // if (req.body.STATUS == 'TXN_SUCCESS') {
    //     order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Payment Successful", paymentinfo: JSON.stringfy(req.body), transactionid: req.body.TXNID })
    //     for (let slug in products) {
    //         await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": - products[slug].qty } })
    //     }
    //     let products = order.products
    // }
    // else if (req.body.STATUS == 'PENDING') {
    //     order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Pending", paymentinfo: JSON.stringfy(req.body), transactionid: req.body.TXNID })
    // }
    //Initiate Shipping

    //Redirect user to the order confirmation page

    // res.status(200).json({ body: req.body })
}

export default connectDb(handler);