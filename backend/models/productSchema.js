import { Schema, model } from "mongoose";
import Joi from "joi";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    info: {
      type: Array,
      required: false,
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
      default: 4,
    },
    urls: {
      type: Array,
      required: false,
      default: [],
    },
    available: {
      type: Boolean,
      required: false,
      default: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Products = model("product", productSchema);

export const validateProduct = (body) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    oldPrice: Joi.number().required(),
    desc: Joi.string().required(),
    info: Joi.array(),
    category: Joi.string().required(),
    rating: Joi.number(),
    urls: Joi.array(),
    available: Joi.boolean(),
    stock: Joi.number().required(),
    userId: Joi.string(),
  });
  return schema.validate(body);
};
