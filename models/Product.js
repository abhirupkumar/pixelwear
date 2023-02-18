const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  skuId: { type: String, required: true, unique: true },
  desc: { type: Array, required: true },
  img: { type: String, required: true },
  imgarr: { type: Array, required: false },
  category: { type: String, required: true },
  theme: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  fabric: { type: String },
  price: { type: Number, required: true },
  availableQty: { type: Number, required: true }
}, { timestamps: true });

// mongoose.models = {}
// export default mongoose.model("Product", ProductSchema);
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);