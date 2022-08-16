const https = require('https');
// const PaytmChecksum = require('paytmchecksum');
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
            res.status(200).json({ success: false, "error": "The pincode you have entered is not serviceable.", cartClear: false })
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
            product = await Product.findOne({ slug: item })
            sumTotal += cart[item].price * cart[item].qty

            //Check if the cart items are out of stock
            if (product.availableQty < cart[item].qty) {
                res.status(200).json({ success: false, "error": "Some items in your cart are out of stock.", cartClear: true })
                return
            }
            if (product.price != cart[item].price) {
                res.status(200).json({ success: false, "error": "price of some items in cart have changed", cartClear: true })
                return
            }
        }
        if (sumTotal != req.body.subTotal) {
            res.status(200).json({ success: false, "error": "price of some items in cart have changed", cartClear: true })
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

        const rdata = { price: req.body.subTotal };
        const data = await fetch(`https://pixelwear.herokuapp.com/api/razorpay`, { method: "POST", body: JSON.stringify(rdata), }).then((t) =>
            t.json()
        );
        // Initiate an order corresponding to the order id
        let order = new Order({
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            orderId: data.id,
            address: req.body.address,
            district: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode,
            amount: req.body.subTotal,
            products: req.body.cart,
        })
        await order.save()

        res.status(200).json({ success: true, id: data.id, amount: data.amount, _id: order._id })
        return

        // Insert an entry in Orders table with status as pending
        // var paytmParams = {};

        // paytmParams.body = {
        //     "requestType": "Payment",
        //     "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
        //     "websiteName": "MissNeha.in",
        //     "orderId": req.body.oid,
        //     "callbackUrl": `https://pixelwear.herokuapp.com/api/posttransaction`,
        //     "txnAmount": {
        //         "value": req.body.subTotal,
        //         "currency": "INR",
        //     },
        //     "userInfo": {
        //         "custId": req.body.email,
        //     },
        // };

        /*
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
        */

        // const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY)

        // Make API call to the serverless API
        // const data = await fetch(`https://pixelwear.herokuapp.com/api/razorpay`, {

        //     method: 'POST', // or 'PUT'
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },

        // })

        // let order = new Order({
        //     email: req.body.email,
        //     name: req.body.name,
        //     phone: req.body.phone,
        //     orderId: req.body.oid,
        //     address: req.body.address,
        //     district: req.body.city,
        //     state: req.body.state,
        //     pincode: req.body.pincode,
        //     amount: req.body.subTotal,
        //     products: req.body.cart,
        // })
        // await order.save()

        // let subTotal = req.body.subTotal
        // let razordata = { subTotal }
        // const a = await fetch(`https://pixelwear.herokuapp.com/api/razorpay`, {

        //     method: 'POST', // or 'PUT'
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(razordata),
        // })
        // let data = a.json()
        // if (data.success) {
        //     let order = new Order({
        //       email: req.body.email,
        //       name: req.body.name,
        //       phone: req.body.phone,
        //       orderId: data.id,
        //       address: req.body.address,
        //       district: req.body.city,
        //       state: req.body.state,
        //       pincode: req.body.pincode,
        //       amount: req.body.subTotal,
        //       products: req.body.cart,
        //       transactionid: data.transactionId,
        //     })
        //     await order.save()
        //     res.status(200).json({success: true, objectId: order._id});
        //   }
        //   else{
        //     res.status(400).json({success: false});
        //   }

        // var options = {
        //     key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        //     name: "Pixelwear",
        //     currency: "INR",
        //     amount: req.body.subTotal * 100,
        //     order_id: req.body.oid,
        //     description: "Thank You for your test donation",
        //     image: "/logo.png",
        //     handler: function (response) {
        //         // Validate payment at server - using webhooks is a better idea
        //         alert(response.razorpay_payment_id)
        //         alert(response.razorpay_order_id);
        //         alert(response.razorpay_signature);
        //     },
        //     prefill: {
        //         name: req.body.name,
        //         email: req.body.email,
        //         contact: req.body.phone,
        //     },
        // };

        // let call_url = `https://pixelwear.herokuapp.com/api/posttransaction`
        // var options = {
        //     "key": process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        //     "amount": (req.body.subTotal*100).toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        //     "currency": "INR",
        //     "name": "Pixelwear",
        //     "description": "Test Transaction",
        //     "image": "/logo.png",
        //     "order_id": req.body.oid, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        //     "callback_url": call_url,
        //     "prefill": {
        //         "name": req.body.name,
        //         "email": req.body.email,
        //         "contact": req.body.phone
        //     },
        //     "notes": {
        //         "address": "Razorpay Corporate Office"
        //     },
        //     "theme": {
        //         "color": "#3399cc"
        //     }
        // };

        // const paymentObject = new Razorpay(options);
        // paymentObject.open();

        // let generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret);

        // if (generated_signature == razorpay_signature) {
        //     order = await Order.findOneAndUpdate({ orderId: order_id }, { status: "Payment Successful", paymentinfo: JSON.stringfy(req.body), transactionid: razorpay_payment_id })
        // }

        // paytmParams.head = {
        //     "signature": checksum
        // };

        // var post_data = JSON.stringify(paytmParams);

        // const requestAsync = async () => {
        //     return new Promise((resolve, reject) => {
        //         var options = {

        //             /* for Staging */
        //             // hostname: 'securegw-stage.paytm.in', --[Not This]

        //             /* for Production */
        //             hostname: 'securegw.paytm.in',

        //             port: 443,
        //             path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Content-Length': post_data.length
        //             }
        //         };

        //         var response = "";
        //         var post_req = https.request(options, function (post_res) {
        //             post_res.on('data', function (chunk) {
        //                 response += chunk;
        //             });

        //             post_res.on('end', function () {
        //                 let ress = JSON.parse(response).body;
        //                 ress.success = true
        //                 ress.cartClear = false
        //                 resolve(ress)
        //             });
        //         });

        //         post_req.write(post_data);
        //         post_req.end();
        //     })
        // }

        // let myr = await requestAsync()
        // res.status(200).json(myr)

    }
}

export default connectDb(handler);
