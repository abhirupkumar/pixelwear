import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            let data = await Product.deleteMany({ _id: { $in: req.body } });
            res.status(200).json({ success: true })
        }
        catch (err) {
            res.status(400).json({ success: false, error: err.message })
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}

export default connectDb(handler);