const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    vid: { type: String, required: true, unique: false }
}, { timestamps: true });

//   mongoose.models = {}
//   export default mongoose.model("Video", VideoSchema);
export default mongoose.models.Video || mongoose.model("Video", VideoSchema);