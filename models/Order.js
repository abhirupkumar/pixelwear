const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  orderId: { type: String, required: true },
  paymentinfo: { type: String, default: '' },
  products: { type: Object, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  transactionid: { type: String, default: '' },
  subtotal: { type: Number, required: true },
  cgst: { type: Number, required: true },
  sgst: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'Initiated', required: true },
  deliveryStatus: { type: String, default: 'unshipped', required: true }
}, { timestamps: true });

//   mongoose.models = {}
//   export default mongoose.model("Order", OrderSchema);
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);