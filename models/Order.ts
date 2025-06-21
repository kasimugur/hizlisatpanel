// models/Order.ts
import mongoose, { Schema, model, models } from "mongoose"

const OrderSchema = new Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    phone: { type: String },
    address: { type: String, required: true },
    note: { type: String, default: "", trim: true }, // ✅ Eklendi
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Hazırlanıyor", "Kargoda", "Teslim Edildi", "İptal Edildi"],
      default: "Hazırlanıyor",
    },
    discount: {
      type: String,
      default: "0",
      trim: true,
    },
    cargoIncluded: {
      type: Boolean,
      default: true,
    }, // ✅ Eklendi
    paymentStatus: {
      type: String,
      enum: ["Kapıda ödeme", "Ödendi", "Ödenecek"],
      default: "Kapıda ödeme",
    }, // ✅ Eklendi
  },
  { timestamps: true }
)

export default models.Order || model("Order", OrderSchema)
