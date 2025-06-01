// models/Product.ts
import mongoose, { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Ürün adı zorunludur'],
      trim: true,
    },
    sku: {
      type: String,
      trim: true,
      // unique: true, // gerekirse aç
    },
    price: {
      type: Number,
      required: [true, 'Fiyat zorunludur'],
      min: [0, 'Fiyat negatif olamaz'],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stok negatif olamaz'],
    },
    image: {
      type: String,
      validate: {
        validator: function (v: string) {
          if (!v) return true
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(v)
        },
        message: 'Geçerli bir görsel URL girin (jpg, png, webp)',
      },
    },
    variants: [
      {
        name: {
          type: String,
          required: [true, 'Varyant adı boş bırakılamaz'],
          trim: true,
        },
        options: {
          type: [String],
          validate: {
            validator: (arr: string[]) => arr.length > 0,
            message: 'Her varyant için en az bir seçenek olmalı',
          },
        },
      },
    ],
  },
  { timestamps: true }
)

const Product = models.Product || model('Product', ProductSchema)
export default Product
