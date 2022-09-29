const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    img: { type: String, required: true, unique: false }
}, { timestamps: true });

//   mongoose.models = {}
//   export default mongoose.model("Image", ImageSchema);
export default mongoose.models.Image || mongoose.model("Image", ImageSchema);