import mongoose, { Schema, model, models } from "mongoose";

const CounterSchema = new Schema({
  _id: { type: String, required: true }, // örn: 'invoice', 'order'
  seq: { type: Number, default: 0 }
});

export default models.Counter || model("Counter", CounterSchema);
