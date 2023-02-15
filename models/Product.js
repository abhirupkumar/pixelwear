const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
  img2: { type: String, required: false },
  img3: { type: String, required: false },
  img4: { type: String, required: false },
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