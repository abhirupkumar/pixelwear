import Image from "../../models/Image"
import connectDb from "../../middleware/mongoose"
import { connect } from "mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        for (let i = 0; i < req.body.length; i++) {
            let p = await Image.findOneAndUpdate({ category: req.body[i].category }, req.body[i])
            if (!p) {
                p = new Image({
                    img: req.body[i].img,
                })
                await p.save();
            }
        }
        res.status(200).json({ success: "success" })
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}

export default connectDb(handler);