import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            for (let i = 0; i < req.body.length; i++) {
                let p = new Product({
                    title: req.body[i].title,
                    slug: req.body[i].slug,
                    skuId: req.body[i].skuId,
                    desc: req.body[i].desc,
                    img: req.body[i].img,
                    imgarr: req.body[i].imgarr,
                    category: req.body[i].category,
                    theme: req.body[i].theme,
                    size: req.body[i].size,
                    color: req.body[i].color,
                    fabric: req.body[i].fabric,
                    mrp: req.body[i].mrp,
                    price: req.body[i].price,
                    availableQty: req.body[i].availableQty,
                })
                await p.save();
            }
            res.status(200).json({ success: "success" })
        }
        catch (err) {
            res.status(400).json({ error: err.message })
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}

export default connectDb(handler);