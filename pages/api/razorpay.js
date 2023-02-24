const Razorpay = require("razorpay");
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    // Create an order -> generate the OrderID -> Send it to the Front-end
    const payment_capture = 1;
    const amount = JSON.parse(req.body).price;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: JSON.parse(req.body).oid,
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        success: true,
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default connectDb(handler);