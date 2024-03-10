import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    consumerInfo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      },
    },
    productsInfo: [
      {
        _id: false,
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        totalAmount: Number,
        payableAmount: Number,
      },
    ],
    deliveryInfo: {
      orderedDate: {
        type: Date,
      },
      deliveryDate: {
        type: Date,
      },
      deliveryStatus: {
        type: String,
        enum: ["Scheduled", "Out for Delivery", "Delivered"],
        default: "Scheduled",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
