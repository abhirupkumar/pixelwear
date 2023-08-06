const https = require('https');
const PaytmChecksum = require('paytmchecksum');
import Order from "../../models/Order"
import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {

        //Check if the pincode is serviceable
        let url = 'https://api.postalpincode.in/pincode/' + req.body.pincode
        let pins = await fetch(url, {
            Method: 'GET'
        })
        let pinJson = await pins.json()
        if (pinJson[0].Status != 'Success') {
            res.status(200).json({ success: false, error: "The pincode you have entered is not serviceable.", cartClear: false })
            return
        }

        //Check if the cart is tampered
        let product, sumTotal = 0;
        let cart = req.body.cart;
        if (req.body.subTotal <= 0) {
            res.status(200).json({ success: false, "error": "Your Cart is empty. Please build your cart and try again!", cartClear: false })
            return
        }

        for (let item in cart) {
            product = await Product.findOne({ slug: cart[item].slug })
            if (product == null) {
                res.status(200).json({ success: false, error: "Some Error Occured!", cartClear: true })
                return;
            }
            sumTotal += cart[item].price * cart[item].qty


            //Check if the cart items are out of stock
            if (product.availableQty < cart[item].qty) {
                res.status(200).json({ success: false, "error": "Some items in your cart are out of stock.", cartClear: true })
                return
            }
            if (product.price != cart[item].price) {
                res.status(200).json({ success: false, "error": "Price of some items in cart have changed", cartClear: true })
                return
            }
        }
        console.log(sumTotal + 2 * (sumTotal * 5.5 / 100))
        console.log(req.body.amount)
        if (parseFloat(sumTotal + 2 * (sumTotal * 5.5 / 100)).toFixed(2) != req.body.amount) {
            res.status(200).json({ success: false, "error": "Price of some items in cart have changed", cartClear: true })
            return
        }

        //Check if the details are valid
        if (req.body.phone.length !== 10 || !Number.isInteger(Number(req.body.phone))) {
            res.status(200).json({ success: false, "error": "Please enter your 10 digit phone number", cartClear: false })
            return
        }
        if (req.body.pincode.length !== 6 || !Number.isInteger(Number(req.body.pincode))) {
            res.status(200).json({ success: false, "error": "Please enter your 6 digit pincode", cartClear: false })
            return
        }
        const rdata = { price: req.body.amount, oid: req.body.oid };
        const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/razorpay`, { method: "POST", body: JSON.stringify(rdata), }).then((t) =>
            t.json()
        );

        //Initiate an order corresponding to the order id
        let order = new Order({
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            orderId: data.id,
            address: req.body.address,
            district: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode,
            subtotal: req.body.subTotal,
            cgst: req.body.cgst,
            sgst: req.body.sgst,
            amount: req.body.amount,
            products: req.body.cart,
        })
        await order.save()

        res.status(200).json({ success: true, id: data.id, amount: data.amount, _id: order._id })

    }
}

export default connectDb(handler);