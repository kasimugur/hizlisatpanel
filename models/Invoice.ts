import mongoose, { Schema, model, models } from "mongoose";

const InvoiceSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Eklenecek!
    orderId: { type: Schema.Types.ObjectId, ref: "Order" }, // Opsiyonel, sipariş ile bağlantı
    no: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    customer: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: String, // örn: "₺10", "%5"
      trim: true,
      default: "",
    },
    cargoIncluded: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt
  }
);

const Invoice = models.Invoice || model("Invoice", InvoiceSchema);
export default Invoice;
