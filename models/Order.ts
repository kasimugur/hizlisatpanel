// models/Order.ts
import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true, // benzersiz olsun diye
      trim: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String,
      default: "",
      trim: true,
    },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: String,
      default: "0",
      trim: true,
    },
    cargoIncluded: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["Hazırlanıyor", "Kargoda", "Teslim Edildi", "İptal Edildi"],
      default: "Hazırlanıyor",
    },
    paymentStatus: {
      type: String,
      enum: ["Kapıda ödeme", "Ödendi", "Ödenecek"],
      default: "Kapıda ödeme",
    },

    // 🔽 İleride entegrasyonlar için hazırlık (şimdilik opsiyonel)
    shipment: {
      trackingCode: { type: String, default: "" },
      company: { type: String, default: "" },
      status: {
        type: String,
        enum: ["Hazırlanıyor", "Yolda", "Teslim Edildi", "İptal Edildi"],
        default: "Hazırlanıyor",
      },
      shippedAt: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

export default models.Order || model("Order", OrderSchema);
