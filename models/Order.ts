// models/Order.ts
import mongoose, { Schema, model, models } from "mongoose"

const OrderSchema = new Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    phone: { type: String },
    address: { type: String, required: true },
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
  },
  { timestamps: true }
)

export default models.Order || model("Order", OrderSchema)
