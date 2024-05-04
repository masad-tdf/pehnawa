import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    billingDetails: {
      firstName: String,
      country: String,
      address: String,
      city: String,
      state: String,
      postcode: String,
      phone: String,
    },
    OrderSummary: [
      {
        _id: false,
        id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        img: {
          type: [String],
          default: [],
        },
        name:String,
        price:Number,
        quantity: {
          type: Number,
          required: true,
        },
        subtotal: Number,
      },
    ],
    // deliveryInfo: {
    //   orderedDate: {
    //     type: Date,
    //   },
    //   deliveryDate: {
    //     type: Date,
    //   },
    //   deliveryStatus: {
    //     type: String,
    //     enum: ["Scheduled", "Out for Delivery", "Delivered"],
    //     default: "Scheduled",
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
