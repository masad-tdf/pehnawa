import mongoose from "mongoose"; // Importing mongoose library

const { Schema } = mongoose; // Destructuring Schema from mongoose

// Defining schema for product
const productSchema = new Schema(
  {
    Name: {
      type: String,
      required: true, // Name is required
    },
    size: {
      type: String,
      required: true, // Size is required
    },
    qty: {
      type: String,
      required: true, // Quantity is required
    },
    price: {
      type: Number,
      required: true, // Price is required
    },
    status: {
      type: String,
      enum: ["Out of Stock", "In Stock"], // Status can only be "Out of Stock" or "In Stock"
      default: "In Stock", // Default status is "In Stock"
    },
  },
  {
    timestamps: true, // Adding createdAt and updatedAt fields
  }
);

// Creating Product model based on productSchema
const Product = mongoose.model("Product", productSchema);

export default Product; // Exporting Product model
