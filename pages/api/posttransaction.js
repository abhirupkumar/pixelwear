import Order from "../../models/Order"
import Product from "../../models/Product"
import PaytmCheckSum from "paytmchecksum"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    //Validate paytm checksum
    var paytmChecksum = '';
    var paytmParams = {};

    const received_data = req.body;

    for (var key in received_data) {
        if (key == 'CHECKSUMHASH') {
            paytmChecksum = received_data[key];
        }
        else {
            paytmParams[key] = received_data[key];
        }
    }
    var isValidChecksum = PaytmCheckSum.verifySignature(paytmParams, process.env.PAYTM_MKEY, paytmChecksum);
    if (!isValidChecksum) {
        res.status(500).send("Some Error Occured")
        return
    } 

    //Update into Orders table after checking the transaction status
    let order;
    if (req.body.STATUS == 'TXN_SUCCESS') {
        order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Payment Successful", paymentinfo: JSON.stringfy(req.body), transactionid: req.body.TXNID })
        for (let slug in products) {
            await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": - products[slug].qty } })
        }
        let products = order.products
    }
    else if (req.body.STATUS == 'PENDING') {
        order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Pending", paymentinfo: JSON.stringfy(req.body), transactionid: req.body.TXNID  })
    }
    //Initiate Shipping

    //Redirect user to the order confirmation page
    res.redirect('/order?clearCart=1&id=' + order._id, 200)

    // res.status(200).json({ body: req.body })
}

export default connectDb(handler);